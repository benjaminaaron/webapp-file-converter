
var RedmineIssues_visjs = function(){
    RedmineIssues.call(this);
};

RedmineIssues_visjs.prototype = {
    __proto__: RedmineIssues.prototype,
    
    readFile: function(filecontent){
        RedmineIssues.prototype.readFile.call(this, filecontent);
        
        //this.nodes TODO
        return '';
    },
    
    doDownload: function(){
        return false;
    },
    
    getPopupPostText: function(){
        return ''; //TODO
    }
};
