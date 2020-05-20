$(document).ready(function() {

    $('#btn_cebm').click(function(event) {
        if ($('#btn_cebm').hasClass('active')) {
            return;
        } else {
            requestCEBM();
        }
    });

    $('#btn_medrxiv').click(function(event) {
        if ($('#btn_medrxiv').hasClass('active')) {
            return;
        } else {
            requestMedrxiv();
        }
    });

    $('#btn_imperial').click(function(event) {
        if ($('#btn_imperial').hasClass('active')) {
            return;
        } else {
            requestImperialCollege();
        }
    });

    $('#btn_gangelt').click(function(event) {
        if ($('#btn_gangelt').hasClass('active')) {
            return;
        } else {
            requestGangelt();
        }
    });

    $('.source_link').click(function(event) {
        var win = window.open(this.href, '_blank');
        win.focus();
    });

    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 

    var chart_min_population;
    var chart_max_population;
    var chart_single_population;
    var countries;
    var selected_country;

    function initializeCharts() {
        var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/medrxiv?noformat=true', function(data) {
            var result = process(data);
            chart_min_population = initializePercentageChart('#chart_estimated_population_min', 'Estimated min. percentage of population infected', result.labels, result.min_population);
            chart_max_population = initializePercentageChart('#chart_estimated_population_max', 'Estimated max. percentage of population infected', result.labels, result.max_population);
            chart_single_population = initializePercentageChart('#chart_estimated_population_single', 'Estimated percentage of population infected', result.labels, result.single_population);

            if (result.min_cases != null) {
                $('.js-range-chart').css('display', 'flex');
            } else {
                $('.js-range-chart').css('display', 'none');
            }

            if (result.single_cases != null) {
                $('.js-single-chart ').css('display', 'flex');
            } else {
                $('.js-single-chart ').css('display', 'none');
            }

            initializeDropdown();
        });
    }

    function requestCEBM() {
        $('.js-range-chart').css('display', 'flex');
        $('.js-single-chart ').css('display', 'none');
        var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/cebm?noformat=true', function(data) {
            updateCharts(data)
        });
    }

    function requestMedrxiv() {
        $('.js-range-chart').css('display', 'flex');
        $('.js-single-chart ').css('display', 'none');
        var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/medrxiv?noformat=true', function(data) {
            updateCharts(data)
        });
    }

    function requestImperialCollege() {
        $('.js-range-chart').css('display', 'flex');
        $('.js-single-chart ').css('display', 'none');
        var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/imperial_college?noformat=true', function(data) {
            updateCharts(data)
        });
    }

    function requestGangelt() {
        $('.js-range-chart').css('display', 'none');
        $('.js-single-chart ').css('display', 'flex');
        var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/gangelt?noformat=true', function(data) {
            updateCharts(data)
        });
    }

    function updateCharts(data) {
        var result = process(data);

        console.log(result.min_cases);

        if (result.min_cases[0] != "0.00") {

            $('.js-range-chart').css('display', 'flex');

            chart_min_population.data.labels = result.labels;
            chart_min_population.data.datasets.forEach((dataset) => {
                dataset.data = result.min_population;
            });
            chart_min_population.update();

            chart_max_population.data.labels = result.labels;
            chart_max_population.data.datasets.forEach((dataset) => {
                dataset.data = result.max_population;
            });
            chart_max_population.update();

        } else {
            $('.js-range-chart').css('display', 'none');
        }

        if (result.single_cases[0] != "0.00") {

            $('.js-single-chart ').css('display', 'flex');

            chart_single_population.data.labels = result.labels;
            chart_single_population.data.datasets.forEach((dataset) => {
                dataset.data = result.single_population;
            });
            chart_single_population.update();
        } else {
            $('.js-single-chart ').css('display', 'none');
        }

        if (selected_country != null) {
            selectCountry();
        }

    }

    function process(data) {
        var topCountries = data.slice(0, 8);
        var labels = [];
        var min_cases = [];
        var max_cases = [];
        var single_cases = [];
        var min_population = [];
        var max_population = [];
        var single_population = []
        var result = {};

        countries = data;

        topCountries.forEach(function(item, index) {
            labels.push(item['name']);
            min_cases.push(numeral(item['high_ifr']).format('0.00'));
            max_cases.push(numeral(item['low_ifr']).format('0.00'));
            single_cases.push(numeral(item['single_ifr']).format('0.00'));
            min_population.push(item['population_percentange_high']);
            max_population.push(item['population_percentange_low']);
            single_population.push(item['population_percentage_single']);
        });

        result.labels = labels;
        result.min_cases = min_cases;
        result.max_cases = max_cases;
        result.min_population = min_population;
        result.max_population = max_population;
        result.single_cases = single_cases;
        result.single_population = single_population;
        return result;
    }

    function initializePercentageChart(chart_id, chart_label, labels, data) {
        var ctx = $(chart_id)[0].getContext('2d');
        return new Chart(ctx, {
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
                        'rgba(23, 152, 174, 0.2)',
                        'rgba(75, 153, 0, 0.2)',
                        'rgba(153, 0, 255, 0.2)'

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(1, 130, 131, 1)',
                        'rgba(0, 102, 0, 1)',
                        'rgba(102, 0, 204, 1)'
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

    function initializeDropdown() {
        var names = [];
        countries.forEach(function(country, index) {
            names.push(country['name']);
        });
        names.sort();
        names.forEach(function(name, index) {
            $('#js-add-country').append(`<button class="dropdown-item js-add-country" type="button" class="btn btn-light">${name}</button>`);
        });

        $('.js-add-country').click(function(event) {
            var country_data;
            selected_country = this.textContent;
            $('#dropdown-menu-btn').html(selected_country);
            selectCountry();

        });
    }

    function selectCountry() {
        countries.forEach(function(country, index) {
            if (country['name'] == selected_country) {
                addCountry(country);
            }
        });
    }

    function addCountry(country) {
        if ($('.js-single-chart').css('display') == "flex") {
            chart_single_population.data.labels.splice(0, 1);
            chart_single_population.data.labels.push(country['name']);

            removeFirst(chart_single_population);
            addCountryToChart(chart_single_population, country['population_percentage_single']);

            chart_single_population.update();
        }

        if ($('.js-range-chart').css('display') == "flex") {

            if ($('.js-single-chart').css('display') == "none") {
                chart_min_population.data.labels.splice(0, 1);
                chart_min_population.data.labels.push(country['name']);
            }

            removeFirst(chart_min_population);
            addCountryToChart(chart_min_population, country['population_percentange_high']);

            removeFirst(chart_max_population);
            addCountryToChart(chart_max_population, country['population_percentange_low']);

            chart_min_population.update();
            chart_max_population.update();
        }
    }

    function removeFirst(chart) {
        chart.data.datasets.forEach((dataset) => {
            dataset.data.splice(0, 1);
        });
    }

    function addCountryToChart(chart, data) {
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
    }

    initializeCharts();
});