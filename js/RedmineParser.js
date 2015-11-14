
var RedmineParser = function(){};

RedmineParser.prototype = {
    
    readFile: function(filecontent){
        var csvfile = CSVToArray(filecontent, ',');
        var header = csvfile[0];
        
        var nodes = [];
        nodes.push(new Node('0', undefined, 'root', '', ''));
        var distinctAssigneeNames = [];
        
        var indexParentTask = header.indexOf('Parent task');
        var indexSubject = header.indexOf('Subject');
        var indexAssignee = header.indexOf('Assignee');
        var indexCategory = header.indexOf('Category');
        
        for(var i = 1; i < csvfile.length - 1; i ++){ //first line is header, last line is empty
            var line = csvfile[i];
                                    
            var assignee = line[indexAssignee];
            if(distinctAssigneeNames.indexOf(assignee) == -1)
                distinctAssigneeNames.push(assignee); 
                
            var parentTaskStr = parentTaskId = line[indexParentTask];
            if(parentTaskStr != undefined)
                parentTaskId = parentTaskStr.substring(parentTaskStr.indexOf('#') + 1, parentTaskStr.indexOf(':'));
                
            nodes.push(new Node(line[0], parentTaskId, line[indexSubject], assignee, line[indexCategory]));
        }        
        
        var graphmlExporter = new GraphmlExporter(nodes);
        var content = graphmlExporter.getContent();
        
        //console.log(content);
        return content;
    },
    
    sourceFormatOK: function(extension){
        if(extension == 'csv')
            return true;
        else
            return false;
    },
    
    getTargetFilename: function(){
        return 'converted_file.graphml';
    }
    
};

var Node = function(id, parentId, subject, assignee, category){
    this.id = id;
    this.parentId = parentId;
    this.subject = subject;
    this.assignee = assignee;
    this.category = category;
};

Node.prototype = {
    
    getLabel: function(){
        return '#' + this.id + ': ' + this.subject;
    },
    
    getHovertext: function(){
        return 'parent: #' + this.parentId + ', ' + this.category + ', ' + this.assignee;
    }
};



