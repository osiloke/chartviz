========
Overview
========

Welcome to ChartViz

ChartViz is a `jQuery` plugin which makes creation of google visualization charts and tables easy.
It is primarily used to display data from a remote source. 

========
Usage
========
The following snippet render a basic Bar chart (Column Chart is the Default chart.) using Google Visualization Data produced from the url source.:

	$("#example").chartviz({
		chartType: "Bar",
		datasource: <url>
	});

Google Visualization Settings can also be passed to the plugin as shown in the following snippet::

	$("#example").chartViz({
		chartType: "Column",
		datasource: <url>,
		gvSettings: {
		    title: "Example Chart",
		    height: 450,
		    width:800,
		    vAxis: {
		        title: "Vertical Axis"
		    },
		    legend: 'top',
		    isStacked: true
		}
	 });

The plugin allows customization through events. The following snippets allows users to bind to an event which is triggered
just before the chart is drawn::

	$("#example").bind("preDrawChart",function(){
		alert("About to Draw Chart");	
	});

