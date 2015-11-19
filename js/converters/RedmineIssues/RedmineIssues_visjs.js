
var RedmineIssues_visjs = function(){
    RedmineIssues.call(this);
};

RedmineIssues_visjs.prototype = {
    __proto__: RedmineIssues.prototype,
    
    readFile: function(filecontent){
        RedmineIssues.prototype.readFile.call(this, filecontent);
        
        hideContainer();
        
        var visjsContainer = $('#browser-view-container');
        visjsContainer
            .width($(document).width() * 0.95) //or window
            .height($(document).height() * 0.95)
            .show();
                
        //this.nodes TODO
        return '';
    },
    
    doDownload: function(){
        return false;
    },
    
    getPopupPostText: function(){
        return 'renders the graph of all issues right here in the browser using <a href="http://visjs.org/">vis.js</a>'; //TODO
    }
};


var VisjsGraphviewer = function(container, nodes){
    this.container = container;
    this.nodes = null;
    var edges = null;
    var network = null;

/*
    function dings(){
        console.log(network);
        nodes.add({id: 9});
    }
*/
    
};

VisjsGraphviewer.prototype = {
    
    destroy: function() {
        if (network !== null) {
            network.destroy();
            network = null;
        }
    },
    
    draw: function(){
        destroy();
        nodes = new vis.DataSet();

        nodes.add([
                 {id: '1', label: 'Node 1'},
                 {id: '2', label: 'Node 2'},
                 {id: '3', label: 'Node 3'},
                 {id: '4', label: 'Node 4'},
                 {id: '5', label: 'Node 5'},
                 {id: 6, label: 'Node 6'},
                 {id: 7, label: 'Node 7'},
                 {id: 8, label: 'Node 8'}  
             ]);


          edges = new vis.DataSet();

          edges.add([
              {id: '1', from: '1', to: '2'},
              {id: '2', from: '1', to: '3'},
              {id: '3', from: '2', to: '4'},
              {id: '4', from: '2', to: '5'}
          ]);

        var data = {
          nodes: nodes,
          edges: edges
        };

      var options = {
          physics:{
              hierarchicalRepulsion: {
                  nodeDistance: 100
              }
          },
          edges: {
              smooth: {
                  type:'cubicBezier',
                  forceDirection: 'vertical',// : 'horizontal',
                  roundness: 0.4
              }
          },
          layout: {
              hierarchical:{
                  direction: 'UD',
                  //levelSeparation: 200
              }
          }
      };
        network = new vis.Network(this.container, data, options);
        
        network.on('select', function(params) {
          console.log(params.nodes);
        });
    }
    
};
