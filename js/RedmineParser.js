
var RedmineParser = function(){
  
};

RedmineParser.prototype = {
    
    readFile: function(filecontent){
        
        var lines = filecontent.split('\n');
        console.log(lines);
        
        //console.log( CSVToArray( this.value, ' ' ) );

        
    },
    
    sourceFormatOK: function(extension){
        
    },
    
    targetFormatOK: function(extension){
        
    }
    
};
