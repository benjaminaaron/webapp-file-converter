
var RedmineIssues = function(){
    Converter.call(this);
};

RedmineIssues.prototype = {
    
    __proto__: Converter.prototype,
    
    readFile: function(filecontent, addRoot){
        var csvfile = CSVToArray(filecontent, ',');
        var header = csvfile[0];
        
        this.nodes = [];
        
        if(addRoot){
            var root = new Node('0', undefined, 'root', undefined, undefined);
            this.nodes.push(root);
        }

        var distinctAssigneeNames = [];
        
        var indexParentTask = header.indexOf('Parent task');
        var indexSubject = header.indexOf('Subject');
        var indexAssignee = header.indexOf('Assignee');
        var indexCategory = header.indexOf('Category');
        var indexClosed = header.indexOf('Closed');
        
        for(var i = 1; i < csvfile.length - 1; i ++){ //first line is header, last line is empty
            var line = csvfile[i];
                                    
            var assignee = line[indexAssignee];
            if(!distinctAssigneeNames[assignee])
                distinctAssigneeNames[assignee] = ''; 
                
            var parentTaskStr = parentTaskId = line[indexParentTask];
            if(parentTaskStr != undefined)
                parentTaskId = parentTaskStr.substring(parentTaskStr.indexOf('#') + 1, parentTaskStr.indexOf(':'));
                
            var isClosed = line[indexClosed] != undefined;
                
            this.nodes.push(new Node(line[0], parentTaskId, line[indexSubject], assignee, line[indexCategory], isClosed));
        }        
        
        var colorIndex = 0;
        for (var key in distinctAssigneeNames)
            if (distinctAssigneeNames.hasOwnProperty(key))
                distinctAssigneeNames[key] = Colors.random();
        distinctAssigneeNames['undefined'] = '#eeeeee';
        
        for(i in this.nodes)
            this.nodes[i].color = distinctAssigneeNames[this.nodes[i].assignee];
        if(addRoot)
            root.color = '#ffffff';
    },
    
    sourceFormatOK: function(extension){
        if(extension == 'csv')
            return true;
        else
            return false;
    },
    
    getExpectedExtension: function(){
        return 'csv';
    },
        
    getPopupPreText: function(){
        return 'in Redmine go to the bottom-right of <i>Issues</i> and <i>export All Columns</i> as CSV<br>beforehand you may apply Status \'any\' instead of \'open\' at the top to include closed issues';
    }
    
};

var Node = function(id, parentId, subject, assignee, category, isClosed){
    this.id = id;
    this.parentId = parentId;
    this.subject = subject;
    this.assignee = assignee;
    this.category = category;
    this.isClosed = isClosed;
    this.color;
};

Node.prototype = {
    
    getLabel: function(){
        var subject = this.subject == undefined || this.subject == '' ? '\nno subject' : this.subject;
        var category = this.category == undefined ? '' : ' [' + this.category + ']';
        var assignee = this.assignee == undefined ? '' : '\n' + this.assignee;
        return '#' + this.id + category + '\n' + subject + assignee;
    },
    
    getNodeColor: function(){
        return this.color;
    },
    
    getBrighterColor: function(){
        return increaseBrightness(this.color, 75);
    },
    
    getTextColor: function(){
        return this.isClosed ? '#bbbbbb' : '#000000';
    },
    
    getFontStyle: function(){ // for graphml, cytoscope needs normal instead of plain
        return this.isClosed ? 'italic' : 'plain';
    },
    
    getLinewidth: function(){
        return this.assignee == undefined || this.isClosed ? 2 : 6;
    }
};
