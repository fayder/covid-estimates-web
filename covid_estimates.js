$(document).ready(function() {
    $('#countries').bootstrapTable();

    $('#btn_medrxiv').click(function(event){
    	if ($('#btn_medrxiv').hasClass('active')) {
    		return;
    	} else {
    		$('#countries').bootstrapTable('refreshOptions', 
    			{url: 'https://covid-estimates-backend.herokuapp.com/medrxiv'})
    	}
    });

    $('#btn_imperial').click(function(event){
    	if ($('#btn_imperial').hasClass('active')) {
    		return;
    	} else {
    		$('#countries').bootstrapTable('refreshOptions', 
    		{ url: 'https://covid-estimates-backend.herokuapp.com/imperial_college'})	
    	}
    });

    $('#btn_cebm').click(function(event){
    	if ($('#btn_cebm').hasClass('active')) {
    		return;
    	} else {
    		$('#countries').bootstrapTable('refreshOptions', 
    		{ url: 'https://covid-estimates-backend.herokuapp.com/cebm'})	
    	}
    });

    $('#btn_iceland').click(function(event){
    	if ($('#btn_iceland').hasClass('active')) {
    		return;
    	} else {
    		$('#countries').bootstrapTable('refreshOptions', 
    		{ url: 'https://covid-estimates-backend.herokuapp.com/iceland'})	
    	}
    });

    $('.source_link').click(function(event) {
    	var win = window.open(this.href, '_blank');
  		win.focus();
    });
});