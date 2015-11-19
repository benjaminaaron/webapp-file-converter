
var RedmineIssues_Cytoscape = function(){
    RedmineIssues.call(this);
};

RedmineIssues_Cytoscape.prototype = {
    __proto__: RedmineIssues.prototype,
    
    readFile: function(filecontent){
        RedmineIssues.prototype.readFile.call(this, filecontent);
        
        hideContainer();
        $('#browser-view-container')
            .width($(document).width() * 0.95) //or window
            .height($(document).height() * 0.95)
            .show();
                
        var graph = new CytoscapeGraphviewer(document.getElementById('browser-view-container'), this.nodes);
        graph.draw();
        
        return '';
    },
    
    doDownload: function(){
        return false;
    },
    
    getPopupPostText: function(){
        return 'renders the graph of all issues right here in the browser using <a href="http://js.cytoscape.org/">Cytoscape.js</a>'; //TODO
    }
};

var Edge = function(id, fromId, toId){
    this.id = id;
    this.from = fromId;
    this.to = toId;
};

var CytoscapeGraphviewer = function(container, nodes){

};

CytoscapeGraphviewer.prototype = {
    
    draw: function(){
        
    }
    
};
