========
Overview
========

Welcome to ChartViz

ChartViz is a `jQuery` plugin which makes creation of google visualization charts and tables easy.
It is primarily used to display data from a remote source. 

========
Usage
========
The following snippet render a basic Column chart by default using Google Visualization Data produced from the url source.
..
	$("#example").chartviz({
		datasource: <url>
	});



ChartViz was built using the jQuery UI Plugin Framework. This method of developing plugins allows users to call
member functions and change default settings by using the following syntax:
..
	$("#example").chartviz

