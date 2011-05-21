(function(jQuery){
    /**
     * ChartViz - jQuery plugin for displaying google visualization charts
     * @author Osiloke Emoekpere
     */
    var _chartType = "";

	$.widget("osi.chartViz",

            {
		options: {
			hideTable: true,
			clear: $.noop,
			chartType: 'ColumnChart',
            stacked:true,
			datasource: null,
			selectionHandler:"",
			gvSettings:  { title:"Chart Visualization ",
	            width:900, height:500,
	            vAxis: {title: "Y Axis"},
				legend :'top',
				isStacked: true
			}
		},
		_chart: null,
		_query: null,
		_data: null,
		_chartSettings: null,
        _id: null,
		
		 // Set up the widget
	     _create: function() {
             this._id = this.element.attr('id');
	    	 this._chartSettings = this.options.gvSettings; 
              if(this.options.datasource != null) this.refresh();
	    },
        about:function(){
            alert("ChartViz is a helper plugin for creating google visualization charts.");
        },
	    getChart:function(){
	    	return this._chart;
	    },
        /**
         *
         * @param url
         */
        update: function(url){
            var widget = this;
            if (widget._chart){
                var useUrl;
                if(url != null)
                {
                    useUrl = url;
                }
                else
                {
                    useUrl = this.options.datasource ;
                }
                if(useUrl != null)
                {

                    widget._trigger("preLoadQuery");
                    widget._query = new google.visualization.Query(useUrl);
                    widget._query.send(	function (response){
                        if (response.isError()) {
                            alert('Data Unavailable: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                            widget._trigger("postDrawChart");widget._trigger("dataError");
                         }else{
                        widget._trigger("preDrawChart");
                        widget._chart.draw(response.getDataTable(), widget._chartSettings);
                        widget._data = response.getDataTable();
                        widget._trigger("postDrawChart");
                    }
                    });

                }
            }
            else{
                this.refresh(url);
            }
        },
        /**
         *
         * @param url
         */
	    refresh: function(url){
            var useUrl;
            var widget = this;
            if(url != null)
            {
                useUrl = url;
            }
            else
            {
                useUrl = this.options.datasource ;
            }
            if(useUrl != null)
            {
                eval("this._chart = new google.visualization."+this.options.chartType+"(document.getElementById('"+this._id+"'))"); 
                widget._query = new google.visualization.Query(useUrl);

                var widget = this;
                widget._trigger("preLoadQuery");
                
                widget._query.send(	function (response){
                    if (response.isError()) { 
//                        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                        widget._trigger("postDrawChart");widget._trigger("dataError");
                     }else{
                        widget._trigger("preDrawChart");
                        widget._chart.draw(response.getDataTable(), widget._chartSettings);
                        widget._data = response.getDataTable();
                        widget._trigger("postDrawChart");
                    }
                    });

                if(widget._chart) widget._attachEvents(); 
            }

	    },
        /**
         * Applies format to a data row
         * @param rowNo row to apply format to
         * @param formatter google visualization formatter
         */
        applyFormat: function(rowNo, formatter){
            if(this._data)
            {
                for (var i = 0; i < this._data[0].length; i++) {
                    formatter.format(data, i);
                } 
                this._trigger("formatAdded",this._data,{row: rowNo, format: formatter});
            }
        },
        /**
         * 
         */
        getid: function(){
            return this._id;
        },
        getData: function(){
            return this._data;
        },
	    _attachEvents: function(){
            var widget = this;
	    	google.visualization.events.addListener(this._chart, "select", function(){
                widget._fireChanged("gvSelect");
            });
	    },
        /**
         *
         * @param event
         */
	    _fireChanged: function(event){
	    	this._trigger("changed",null, event);
	    },
        /**
         * 
         * @param key
         * @param value
         */
	    _setOption: function( key, value ) {
	    	var oldValue = this.options[key];
            this.options[ key ] = value;
            this._trigger("setOption", { type: "setOption" }, {
	            option: key,
	            original: oldValue,
	            current: value
	          });
		    this._update(); 
	        $.Widget.prototype._setOption.apply(this,arguments)  

	       },
        _update: function() { 
            },
	       destroy: function() {
	        $.Widget.prototype.destroy.call(this); 
	       }
	     });
})(jQuery);
function ChartVizInit(){
	gvChartCount = 0;
	google.load('visualization', '1.4', {packages: ['table','corechart','motionchart','imagechart','annotatedtimeline'],'language' : 'en'
});
}
	    