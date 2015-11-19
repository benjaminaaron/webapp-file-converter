
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
