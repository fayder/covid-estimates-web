$(document).ready(function() {

    function requestCEBM() {
        var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/cebm?noformat=true', function(data) {
            chartCEBM(data)
        });
    }

    function chartCEBM(data) {
        var topFive = data.slice(0, 6);
        var labels = [];
        var min_cases = [];
        var max_cases = [];
        var single_cases = [];
        var min_population = [];
        var max_population = [];
        var single_population = []

        topFive.forEach(function(item, index) {
            labels.push(item['name']);
            min_cases.push(numeral(item['high_ifr']).format('0.00'));
            max_cases.push(numeral(item['low_ifr']).format('0.00'));
            single_cases.push(numeral(item['single_ifr']).format('0.00'));
            min_population.push(item['population_percentange_high']);
            max_population.push(item['population_percentange_low']);
            single_population.push(item['population_percentage_single']);
        });
        console.log(min_population)
        drawCasesChart('chart_estimated_cases_min', 'Estimated min. cases', labels, min_cases);
        drawCasesChart('chart_estimated_cases_max', 'Estimated max. cases', labels, max_cases);

        drawPercentageChart('chart_estimated_population_min', 'Estimated min. percentage of population infected', labels, min_population);
        drawPercentageChart('chart_estimated_population_max', 'Estimated max. percentage of population infected', labels, max_population);
    }

    function drawPercentageChart(chart_id, chart_label, labels, data) {
    	var ctx = document.getElementById(chart_id).getContext('2d');
        var theChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chart_label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(23, 152, 174, 0.2)'

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(1, 130, 131, 1)'
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
                            return numeral(tooltipItem['value']).format('0.00%');
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return numeral(value).format('0.00%')
                            }
                        }
                    }]
                }
            }
        });
    }

    function drawCasesChart(chart_id, chart_label, labels, data) {
        var ctx = document.getElementById(chart_id).getContext('2d');
        var theChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chart_label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(23, 152, 174, 0.2)'

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(1, 130, 131, 1)'
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