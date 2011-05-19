var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || 3000;

var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
    	if(!exists) {
    		response.writeHead(404, {"Content-Type": "text/plain"});
    		response.write("404 Not Found\n");
    		response.end();
    		return;
    	}
        if (filename.indexOf(".json") > 1) {
    		fs.readFile(filename, "binary", function(err, file) {
    			if(err) {
	    			response.writeHead(500, {"Content-Type": "text/plain"});
	    			response.write(err + "\n");
	    			response.end();
	    			return;
	    		}
				response.writeHead(200, {"Content-Type": "application/json"});
    			response.write(file, "binary");
    			response.end();
				return;
    		});
		} else { 
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("<html><head><title>Activity Streams JSON Schemas</title></head><body>");
	   		response.write("<h1>Activity Streams JSON Schemas</h1>");
			response.write("<p>GitHub: <a href='https://github.com/activitystreams/json-schema'>");
			response.write("https://github.com/activitystreams/json-schema</a></p>");
			response.write ("<ul><li><a href='collection.json'>collection.json</a></li>");
			response.write ("<li><a href='activity.json'>activity.json</a></li>");
			response.write ("<li><a href='object.json'>object.json</a></li>");
			response.write ("<li><a href='media_link.json'>media_link.json</a></li>");
			response.write("</ul>");
			response.write("</body></html>");
	   		response.end();
	   		return;	
		}
		 
    });
}).listen(port, null);

console.log('JSON Activity Streams Schema Server running at http://' + host + ':' + port + '/');
