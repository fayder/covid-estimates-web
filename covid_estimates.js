$(document).ready(function () {
	$('#countries').bootstrapTable()

	function customSort(sortName, sortOrder, data) {
	    var order = sortOrder === 'desc' ? -1 : 1
	    data.sort(function (a, b) {
	      var aa = +((a[sortName] + '').replace(/,/g, ''))
	      var bb = +((b[sortName] + '').replace(/,/g, ''))
	      
	      if (aa < bb) {
	        return order * -1
	      }
	      if (aa > bb) {
	        return order
	      }
	      return 0
	    })
	  }
	/**
	var countries_endpoint = "https://covid-estimates-backend.herokuapp.com/worldometer";
	var ifr_endpoint = "https://covid-estimates-backend.herokuapp.com/ifr";
	var ifr_low = 0.39
	var ifr_high = 1.3
	var ifr_consolidated = 0.66

	var countries_response = $.get(countries_endpoint, function(data) {
		process_countries(data);
	}).fail( function(error) {
		console.log(error)
	});

	function process_countries(countries_data) {
		var table = $("#countries")
		countries_data.forEach( country => 
			$("#countries").find('tbody')
			.append('<tr>')
			.append(`<th scope="row">${country["name"]}</th>`)
			.append(`<td>${formant_number(country["population"])}</td>`)
			.append(`<td>${formant_number(country["cases"])}</td>`)
			.append(`<td>${formant_number(country["deaths"])}</td>`)
			.append(`<td>${(country["reported_cfr"] * 100).toFixed((2))}</td>`)
			.append(`<td>${calc_cases_min(country["deaths"])}</td>`)
			.append(`<td>${calc_cases_max(country["deaths"])}</td>`)
			.append(`<td>${calc_cases_single(country["deaths"])}</td>`)
			.append(`<td>${calc_population_percent(calc_cases_single_no_format(country["deaths"]), country["population"])}</td>`)
		);
	}

	function formant_number(num) {
  		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	function calc_cases_min(deaths) {
		var cases_min = (deaths/ifr_low * 100).toFixed(2);
		return formant_number(cases_min);
	}

	function calc_cases_max(deaths) {
		var cases_min = (deaths/ifr_high * 100).toFixed(2);
		return formant_number(cases_min);
	}

	function calc_cases_single(deaths) {
		var cases_consolidated = (deaths/ifr_consolidated * 100).toFixed(2);
		return formant_number(cases_consolidated);
	}

	function calc_cases_single_no_format(deaths) {
		var cases_consolidated = (deaths/ifr_consolidated * 100).toFixed(2);
		return cases_consolidated;
	}

	function calc_population_percent(cases, population) {
		var population_percent = (cases/population * 100).toFixed(2) + '%';
		return population_percent;
	}
	**/
	
});