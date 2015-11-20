
var RedmineIssues_Cytoscape = function(){
    RedmineIssues.call(this);
};

RedmineIssues_Cytoscape.prototype = {
    __proto__: RedmineIssues.prototype,
    
    readFile: function(filecontent){
        this.filecontent = filecontent;
        notie.confirm('Do you want to add a root node?', 'Yes', 'No', this.yes_callback.bind(this), this.no_callback.bind(this));
    },
    
    yes_callback: function(){
        this.addRoot = true;
        this.readFileContinue();
    },
    
    no_callback: function(){
        this.addRoot = false;
        this.readFileContinue();
    },
    
    readFileContinue: function(){
        RedmineIssues.prototype.readFile.call(this, this.filecontent, this.addRoot);
        
        hideContainer();
        $('#browser-view-container')
            .width($(document).width() * 0.95) //or window
            .height($(document).height() * 0.95)
            .show();
                
        var graph = new CytoscapeGraphviewer(document.getElementById('browser-view-container'), this.nodes, this.addRoot);
        graph.draw();
    },    
    
    doDownload: function(){
        return false;
    },
    
    getPopupPostText: function(){
        return 'renders the graph of all issues right here in the browser using <a href="http://js.cytoscape.org/">Cytoscape.js</a>'; //TODO
    }
};



var CytoscapeGraphviewer = function(container, nodes, addRoot){
    this.container = container;
    this.nodes = [];
    this.edges = [];
    for(i in nodes){
        var node = nodes[i];
        this.nodes.push({data : {id: node.id, col: node.getNodeColor(), content: node.getLabel()}}); 
        if(node.parentId != undefined)
            this.edges.push({data : {source: node.parentId, target: node.id}});         
        else 
            if(addRoot && node.id != '0')
                this.edges.push({data : {source: 0, target: node.id}});       
    };    
};

CytoscapeGraphviewer.prototype = {
    
    draw: function(){
        
        var cy = window.cy = cytoscape({
            container: this.container,
            layout: {
                name: 'dagre'//'dagre' //cose
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'width': 'label',
                        'height': 'label',
                        'shape': 'roundrectangle',
                        'content': 'data(content)',
                        'text-opacity': 1,
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'text-wrap' : 'wrap',
                        'background-color': 'data(col)',
                        //'font-style' : 'italic'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'target-arrow-shape': 'triangle',
                        'line-color': '#dddddd',
                        'target-arrow-color': '#dddddd'
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
