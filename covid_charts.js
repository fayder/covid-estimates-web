$(document).ready(function() {

	function requestCEBM() {
		var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/cebm?noformat=true', function(data) {
  			chartCEBM(data)
		});
	}

	function chartCEBM(data) {
		var topFive = data.slice(0, 5);
		var labels = []; var min_cases = []; var max_cases = []; var single_cases = [];
		topFive.forEach(function(item, index) {
			labels.push(item['name']);
			min_cases.push(numeral(item['high_ifr']).format('0.00'));
			max_cases.push(numeral(item['low_ifr']).format('0.00'));
			single_cases.push(numeral(item['single_ifr']).format('0.00'));
		});
		drawChart('chart_estimated_cases', labels, min_cases);
	}

	function drawChart(chart_id, labels, min_cases) {
		var ctx = document.getElementById(chart_id).getContext('2d');
		var theChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: labels,
	        datasets: [{
	            label: 'Estimated minimum cases',
	            data: min_cases,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(255, 159, 64, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(75, 192, 192, 0.2)'
	                
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(255, 159, 64, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(75, 192, 192, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	legend: {
	    		display: false
	    	},
	    	tooltips: {
	    		callbacks: {
	    			label: function(tooltipItem, data) {
	    				return numeral(tooltipItem['value']).format('0,0');
	    			}
	    		}
	    	},
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true,
	                    callback: function(value, index, values) {
                        	return numeral(value).format('0,0')
                    	}
	                }
	            }]
	        }
	    }
	});		
	}

	requestCEBM();	
});