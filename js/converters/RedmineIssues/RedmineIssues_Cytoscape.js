
var RedmineIssues_Cytoscape = function(){
    this.addRoot = false;
    this.layoutRankDir = 'LR';
    RedmineIssues.call(this);
};

RedmineIssues_Cytoscape.prototype = {
    __proto__: RedmineIssues.prototype,
    
    getTitle: function(){    
        return 'Redmine Issues CSV &rarr; Cytoscape.js (browser)';
    },
    
    settingsDialog: function(){    
        notie.confirm('Add a root node? <small>(default: No)</small>', 'Yes', 'No', this.rootYesCallback.bind(this), this.rootNoCallback.bind(this));
    },
    
    rootYesCallback: function(){
        this.settingsDialog2(true);
    },
    
    rootNoCallback: function(){
        this.settingsDialog2(false);
    },
    
    settingsDialog2: function(addRoot){
        this.addRoot = addRoot;
        notie.confirm('Layout direction? <small>(default: left to right)</small>', 'top to bottom', 'left to right', this.layoutTopToBottomCallback.bind(this), this.layoutLeftToRightCallback.bind(this));
    },    
    
    layoutTopToBottomCallback: function(){
        this.layoutRankDir = 'TB';
    },
    
    layoutLeftToRightCallback: function(){
        this.layoutRankDir = 'LR';
    },
    
    readFile: function(filecontent){
        RedmineIssues.prototype.readFile.call(this, filecontent, this.addRoot);
        var self = this;
        $('#container').fadeOut('fast', function() {   
            $('#browser-view-container')
                .width($(document).width() * 0.98) //or window
                .height($(document).height() * 0.94)
                .show();
            var graph = new CytoscapeGraphviewer(document.getElementById('browser-view-container'), self.nodes, self.addRoot, self.layoutRankDir);
            graph.draw();
            $('#png-link-wrapper').show();
        });
    },    
    
    doDownload: function(){
        return false;
    },
    
    getPopupPostText: function(){
        return 'renders the graph of all issues here in the browser using <a href="http://js.cytoscape.org/">Cytoscape.js</a><br>you may drag nodes around and export the graph as PNG';
    }
};



var CytoscapeGraphviewer = function(container, nodes, addRoot, layoutRankDir){
    this.container = container;
    this.layoutRankDir = layoutRankDir;
    this.nodes = [];
    this.edges = [];
    for(i in nodes){
        var node = nodes[i];
        var fontstyle = node.isClosed ? 'italic' : 'normal';
        this.nodes.push({data : {id: node.id, bordercolor: node.getNodeColor(), label: node.getLabel(), fontstyle: fontstyle, textcolor: node.getTextColor(), borderwidth: node.getLinewidth(), backgroundcolor: node.getBrighterColor()}}); 
        if(node.parentId != undefined)
            this.edges.push({data : {source: node.parentId, target: node.id, linecolor: '#cccccc', linewidth: 2}});         
        else 
            if(addRoot && node.id != '0')
                this.edges.push({data : {source: 0, target: node.id, linecolor: '#dddddd', linewidth: 1}});       
    };    
};

CytoscapeGraphviewer.prototype = {
    
    draw: function(){
        
        var cy = window.cy = cytoscape({
            container: this.container,
            layout: {
                name: 'dagre', //cose
                rankDir: this.layoutRankDir
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'width': 'label',
                        'height': 'label',
                        'shape': 'roundrectangle',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'text-wrap' : 'wrap',
                        'background-color': 'data(backgroundcolor)',
                        'content': 'data(label)',
                        'font-style' : 'data(fontstyle)',
                        'color' : 'data(textcolor)',
                        'border-width' : 'data(borderwidth)',
                        'border-color' : 'data(bordercolor)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'target-arrow-shape': 'triangle',
                        'width': 'data(linewidth)',
                        'line-color': 'data(linecolor)',
                        'target-arrow-color': 'data(linecolor)'
                    }
                }
            ],
            elements: {
                nodes: this.nodes,
                edges: this.edges
            },
        });    
    }
};
