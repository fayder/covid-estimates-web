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

    var countries;
    var selected_country;

    var jqxhr = $.get('https://covid-estimates-backend.herokuapp.com/cebm', function(data) {
        countries = data;
        var result = process(data);
        initalizeDropdown(result.labels);
        selected_country = "USA";
        selectCountry(selected_country);
        $('#dropdown-menu-btn').html(selected_country);
    });

    function process(data) {
        var labels = [];
        var min_cases = [];
        var max_cases = [];
        var single_cases = [];
        var min_population = [];
        var max_population = [];
        var single_population = []
        var result = {};

        data.forEach(function(item, index) {
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

    function initalizeDropdown(country_names) {
        country_names.sort();
        country_names.forEach(function(name, index) {
            $('#js-add-country').append(`<button class="dropdown-item js-add-country" type="button" class="btn btn-light">${name}</button>`);
        });

        $('.js-add-country').click(function(event) {
            var country_data;
            selected_country = this.textContent;
            $('#dropdown-menu-btn').html(selected_country);
            selectCountry(selected_country);
        });
    }

    function selectCountry(country_name) {
        var country = findCountry(country_name);
        renderCases(country);
    }

    function findCountry(country_name) {
        var result;
        countries.forEach(function(country, index) {
            if (country['name'] == country_name) {
                result = country;
            }
        });
        return result;
    }

    function renderCases(country) {
        var cases_range = country["ifr_range"];
        var population_range = country["population_percentage_range"];
        var cases_single = country["single_ifr"]
        var population_single = country["population_percentage_single"]

        if (cases_range != null) {
            $("#cases-range").css('display', 'block');
            $("#estimated-cases-range").append(cases_range);
        } else {
            $("#cases-range").css('display', 'none');
        }

        if (population_range != null) {
            $("#percentage-range").css("display", "block");
            $("#estimated-percentage-range").append(population_range);
        } else {
            $("#percentage-range").css("display", "none");
        }

        if (cases_single != null) {
            $("#cases-single").css('display', 'block');
            $("#estimated-cases-single").append(cases_range);
        } else {
            $("#cases-single").css('display', 'none');
        }

        if (population_single != null) {
            $("#percentage-single").css("display", "block");
            $("#estimated-percentage-single").append(population_range);
        } else {
            $("#percentage-single").css("display", "none");
        }
    }
});