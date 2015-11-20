# a straightforward file converter
Drop the file and the converted version downloads right away, or renders something in the browser. Processing happens locally and purely offline.

Besides converting from specific source to target formats I want to add functionality to extract stuff from files based on pre- or selfdefined patterns. Maybe also things like filling a template and getting a wxr-formatted .xml file for import in Wordpress...

The rules for conversion and extraction I'd like to store in a DB like Firebase, in that way the entire system is build to be extended by anyone and their usecases.

### first usecase
Convert Redmine Issues in `.csv` format to `.graphml` files that can be layouted in *yEd*. Or render the graph in the browser using *Cytoscape.js*.
