


var app = angular.module('myApp', []);

app.controller('myCtrl',function($scope){

});

app.directive('clockTime', ['$interval', function($interval){

	return {
	
	restrict: 'E',
	template: '<h1 style="color:#770099;">{{currentTimeString}}</h1>',
	scope: {
	data: '='
	},
	link: function(scope, element, attrs){
		
var currentTime = new Date ( );	

function updateClock()
	{
var currentHours = currentTime.getHours ( );
var currentMinutes = currentTime.getMinutes ( );
var currentSeconds = currentTime.getSeconds ( );
var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
currentHours = ( currentHours == 0 ) ? 12 : currentHours;
scope.currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
	}
	
	
		
		
	}//link
	};//return
	}]);//clockTime

app.directive('barDirective', function(){


var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement =  document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(100);
var svgHeight = '200';
var svgWidth = '800';
var barPadding = '1';

return {
	restrict: 'E',
	scope: {
	data: '=',
	r: '=',
	g: '=',
	b: '=',
	}, 
	link: function (scope, element, attrs){ 
	
$(document).ready(function () {



		function createSvg(parent, height, width) {
			return d3.select(parent)
					 .append('svg')
					 .attr('height', height)
					 .attr('width', width);
					
		}
		
		
		var graph = createSvg('bar-directive', svgHeight, svgWidth);
		var reflection = createSvg('bar-directive', svgHeight, svgWidth);			
		
	graph.selectAll('rect')
	   .data(frequencyData)
	   .enter()
	   .append('rect')
	   .attr('width', svgWidth / frequencyData.length - barPadding)
	   .attr('transform', 'translate(160, 0)')
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / frequencyData.length);
	   });
	   
	 reflection.selectAll('rect')
	   .data(frequencyData)
	   .enter()
	   .append('rect')
	   .attr('width', svgWidth / frequencyData.length - barPadding)
	   .attr('transform', 'translate(160, 0)')
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / frequencyData.length) + 160;
	   });
	   
	   // Continuously loop and update chart with frequency data.
function renderChart() {
   requestAnimationFrame(renderChart);
	
   // Copy frequency data to frequencyData array.
   analyser.getByteFrequencyData(frequencyData);
   // Update d3 chart with new data.
   graph.selectAll('rect')
      .data(frequencyData)
      .attr('y', function(d) {
         return svgHeight - d/2;
      })
      .attr('height', function(d) {
         return d;
      })
      .attr('fill', function(d) {
         return 'rgb( '+ d +',0,'+ d + ')';
      })
	  .attr('fill-opacity', '0.6');
	  
	reflection.selectAll('rect')
      .data(frequencyData)
	  
      .attr('height', function(d, i) {
		if(i>frequencyData.length *0.11 && i< frequencyData.length *0.74)
         return d/3;
      })
      .attr('fill', function(d) {
         return 'rgb('+ d +', 0,'+ d + ')';
      })
	  .attr('fill-opacity', '0.2')
	  	  .attr('transform', function(d, i)
	  {
		return 'skewX('+ (((i+frequencyData.length*0.11) *2.40)-120) +')';
	  });
		
		


}

// Run the loop
renderChart();

		//}); //scope.watch

	    }); //document ready function
		
		}//link:function
		
		} //directive return
});


	
