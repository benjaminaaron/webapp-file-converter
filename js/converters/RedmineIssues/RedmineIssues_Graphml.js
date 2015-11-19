
var RedmineIssues_Graphml = function(){
    RedmineIssues.call(this);
};

RedmineIssues_Graphml.prototype = {
    __proto__: RedmineIssues.prototype,
    
    readFile: function(filecontent){
        RedmineIssues.prototype.readFile.call(this, filecontent);
        var graphmlExporter = new GraphmlExporter(this.nodes);
        return graphmlExporter.getContent();
    },

    getTargetFilename: function(){
        return 'RedmineIssuesGraph.graphml';
    },
    
    getPopupPostText: function(){
        return 'open the graphml-file in <a href=\"http://www.yworks.com/products/yed\">yEd</a><br><br>go to <i>Tools > Fit Node to Label ></i> uncheck <i>Ignore Height</i> and press <i>OK</i><br><br>go to Layout and choose your layout algorithm<br><i>Tree > Directed</i> looks good for instance';
    }
};



var GraphmlExporter = function(nodes){
	this.nodes = nodes;
};

GraphmlExporter.prototype = {

	getContent: function(){
		var content = "<graphml xmlns=\"http://graphml.graphdrawing.org/xmlns\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:y=\"http://www.yworks.com/xml/graphml\" xmlns:yed=\"http://www.yworks.com/xml/yed/3\" xsi:schemaLocation=\"http://graphml.graphdrawing.org/xmlns http://www.yworks.com/xml/schema/graphml/1.1/ygraphml.xsd\">"
        	+ "\t<key attr.name=\"description\" attr.type=\"string\" for=\"node\" id=\"d5\"/>"
        	+ "\t<key for=\"node\" id=\"d6\" yfiles.type=\"nodegraphics\"/>"
        	+ "\t<key attr.name=\"description\" attr.type=\"string\" for=\"edge\" id=\"d9\"/>"
        	+ "\t<key for=\"edge\" id=\"d10\" yfiles.type=\"edgegraphics\"/>"
        	+ "<graph>";

        var edgeCounter = 0;
        for(i in this.nodes){
          	var node = this.nodes[i];
            var nodeLabel = replaceAll("&", "&amp;", node.getLabel());
			var nodecontent = this.getNodeCode(node.id, nodeLabel, node.getNodeColor(), node.getLinewidth(), node.getTextColor(), node.getFontStyle());
			content += nodecontent;
			
			var edgecontent = '';
            if(node.parentId != undefined)
				edgecontent = this.getEdgeCode(edgeCounter ++, node.parentId, node.id, '');
			/*
			else
				if(node.id != '0') //otherwise an edge from root to root
					edgecontent = this.getEdgeCode(edgeCounter ++, '0', node.id, ''); // connect to root
			*/
			content += edgecontent;
        }

        return content + "</graph>\n</graphml>";
	},

	getNodeCode: function(ID, label, color, linewidth, textcolor, fontstyle){
		return "<node id=" + '"' + ID + '"' + ">" +
                "<data key=\"d5\"><![CDATA[" + label + "]]></data>" +
                "<data key=\"d6\">" +
                "<y:ShapeNode><y:Fill hasColor=\"false\" transparent=\"false\"/>" +
                //"<y:BorderStyle hasColor=\"false\" type=\"line\" width=\"1.0\"/>" +
				 "<y:BorderStyle color=\"" + color + "\" type=\"line\" width=\"" + linewidth + "\"/>" +
                "<y:NodeLabel fontFamily=\"Dialog\" fontStyle=\"" + fontstyle + "\" textColor=\"" + textcolor + "\">" + label + "</y:NodeLabel>" +
                "<y:Shape type=\"roundrectangle\"/></y:ShapeNode></data></node>";
	},

	getEdgeCode: function(ID, parentID, childID, edgelabel){
		return 	"<edge id=" + '"' + ID + '"' + " source=" + '"' + parentID + '"' + " target=" + '"' + childID + '"' + ">" +
                "<data key=\"d9\"><![CDATA[Edge ID: " + ID + "]]></data>" +
                "<data key=\"d10\"><y:BezierEdge>" +
                "<y:LineStyle color=\"#C0C0C0\" type=\"line\" width=\"1.0\"/>" +
                "<y:Arrows source=\"none\" target=\"standard\"/>" +
                "<y:EdgeLabel>" + edgelabel + "</y:EdgeLabel>" +
                "</y:BezierEdge></data></edge>";
	}
};
