	var width = 1000,
		height = 1000;
		
	var svg = d3.select("body").append("svg")
		.attr("width",width)
		.attr("height", height);
		
	var force = d3.layout.force()
		.size([width,height]);
	
	d3.csv("Data/BubbleData.csv", function(error,links){
		var nodesByNames = {};
		
		//create the nodes
		links.foreach(function(link){
			link.App_no = nodeByName(link.App_no);
			link.Server_no = nodeByName(link.Server_no);
		});
		
		var nodes = d3.values(nodesByNames);
		
		//create the links
		var link = svg.selectall(".link")
			.data(links)
			.enter().append("line")
			.attr("class","link");
			
		//create the nodes circles
		var circle = svg.selectall(".node")
			.data(nodes)
			.enter().append("node")
			.attr("class","node")
			.attr("r",5)
			.call(force.drag);
			
		force
			.nodes(nodes)
			.links(links)
			.on("tick",tick)
			.start();
			
	//draws the lines
	function tick(){
		link.attr("x1", function(d) {return d.App_no.x})
			.attr("y1", function(d) {return d.App_no.y})
			.attr("x2", function(d) {return d.Server_no.x})
			.attr("y2", function(d) {return d.Server_no.y});
			
		node.attr("cx", function(d) {return d.x})
			.attr("cy", function(d) {return d.y});
	}	
	
	function nodeByName(name){
		return nodesByNames[name] || (nodesByNames[name] = {Name: name});
	}

		
	});