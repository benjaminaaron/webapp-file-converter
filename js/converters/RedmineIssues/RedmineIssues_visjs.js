
var RedmineIssues_visjs = function(){
    RedmineIssues.call(this);
};

RedmineIssues_visjs.prototype = {
    __proto__: RedmineIssues.prototype,
    
    readFile: function(filecontent){
        RedmineIssues.prototype.readFile.call(this, filecontent, false);
        
        hideContainer();
        var visjsContainer = $('#browser-view-container');
        visjsContainer
            .width($(document).width() * 0.95) //or window
            .height($(document).height() * 0.95)
            .show();
                
        var graph = new VisjsGraphviewer(document.getElementById('browser-view-container'), this.nodes);
        graph.draw();
        
        return '';
    },
    
    doDownload: function(){
        return false;
    },
    
    getPopupPostText: function(){
        return 'renders the graph of all issues right here in the browser using <a href="http://visjs.org/">vis.js</a>'; //TODO
    }
};

var Edge = function(id, fromId, toId){
    this.id = id;
    this.from = fromId;
    this.to = toId;
};

var VisjsGraphviewer = function(container, nodes){
    this.container = container;
    
    this.nodes = new vis.DataSet();
    this.edges = new vis.DataSet(); 
    
    for(i in nodes){
        var node = nodes[i];
        node.makeLabel();
        this.nodes.add(node);
        if(node.parentId != undefined)
            this.edges.add(new Edge(this.edges.length, node.parentId, node.id));        
    };

    this.network = null;
/*
    function add(){
        console.log(network);
        nodes.add({id: 9});
    }
*/
};

VisjsGraphviewer.prototype = {
    
    destroy: function() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    },
    
    draw: function(){
        this.destroy();
        
        var data = {
            nodes: this.nodes,
            edges: this.edges
        };


        var options = {
            edges: {
                smooth: {
                    type:'cubicBezier',
                    forceDirection: 'vertical',// : 'horizontal',
                    roundness: 0.4
                }
            },
            layout: {
                hierarchical: {
                      enabled: true,
                      levelSeparation: 150,
                      direction: 'UD'
                    }
            }
        };
        
        console.log(options);
        
        this.network = new vis.Network(this.container, data, options);
        
        /*
        this.network.on('select', function(params) {
          console.log(params.nodes);
      });*/
    }
    
};
