
var RedmineParser = function(){};

RedmineParser.prototype = {
    
    readFile: function(filecontent){
        var csvfile = CSVToArray(filecontent, ',');
        var header = csvfile[0];
        
        var nodes = [];
        //var root = new Node('0', undefined, 'root', undefined, undefined);
        //nodes.push(root);
        var distinctAssigneeNames = [];
        
        var indexParentTask = header.indexOf('Parent task');
        var indexSubject = header.indexOf('Subject');
        var indexAssignee = header.indexOf('Assignee');
        var indexCategory = header.indexOf('Category');
        
        for(var i = 1; i < csvfile.length - 1; i ++){ //first line is header, last line is empty
            var line = csvfile[i];
                                    
            var assignee = line[indexAssignee];
            if(!distinctAssigneeNames[assignee])
                distinctAssigneeNames[assignee] = ''; 
                
            var parentTaskStr = parentTaskId = line[indexParentTask];
            if(parentTaskStr != undefined)
                parentTaskId = parentTaskStr.substring(parentTaskStr.indexOf('#') + 1, parentTaskStr.indexOf(':'));
                
            nodes.push(new Node(line[0], parentTaskId, line[indexSubject], assignee, line[indexCategory]));
        }        
        
        for (var key in distinctAssigneeNames)
            if (distinctAssigneeNames.hasOwnProperty(key))
                distinctAssigneeNames[key] = Colors.random();
        distinctAssigneeNames['undefined'] = '#cccccc';
        
        for(i in nodes)
            nodes[i].color = distinctAssigneeNames[nodes[i].assignee];
        //root.color = '#ffffff';
        
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
        return 'RedmineIssuesGraph.graphml';
    }
    
};

var Node = function(id, parentId, subject, assignee, category){
    this.id = id;
    this.parentId = parentId;
    this.subject = subject;
    this.assignee = assignee;
    this.category = category;
    this.color;
};

Node.prototype = {
    
    getLabel: function(){
        var subject = this.subject == undefined || this.subject == '' ? '\nno subject' : this.subject;
        var category = this.category == undefined ? '' : ' [' + this.category + ']';
        var assignee = this.assignee == undefined ? '' : '\n' + this.assignee;
        return '#' + this.id + category + '\n' + subject + assignee;
    },
    
    getLinewidth: function(){
        return this.assignee == undefined ? 1 : 5;
    }
};



