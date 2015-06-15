var array_days = [];
var array_impressions = [];
var array_clicks = [];
var array_clickthru = [];
var array_new_like = [];
var array_total_like = [];
var array_new_visits = [];
var array_total_visits = [];


var get_first_date;
var first_date = "zpr";


	
		
		
	/*	function getThe_date2() {
				 get_first_date = $("#datestart").val();
				 if(get_first_date.length == 0) {
				 var d = new Date(); var month = d.getMonth()+1; var day = d.getDate(); 
				 var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
				get_first_date = output;}
				 
				 alert (get_first_date);
				 return get_first_date;
				// alert ("zop");
				
			};
			*/
			
		function scanData(get_first_date,get_last_date) {
		
		// I have to empty all the arrays otherwise all the previous inputs are memorized;
		var array_days = [];
		var array_impressions = [];
		var array_clicks = [];
		var array_clickthru = [];
		var array_new_like = [];
		var array_total_like = [];
		var array_new_visits = [];
		var array_total_visits = [];

	// amass numbers
		var count_total_impressions = 0;
		var count_total_clicks = 0;
		var count_total_clickthru = 0;
		var count_total_newvisits = 0;
		var count_total_totalvisits = 0;
		
		var start_1;
		var start_off = 0;
		$.each(api_data, function(idx, obj) {
		//$( ".inner2" ).append( "<p>"+obj.data.names[0]+"</p>" );
		// first let's grab the timedata

		var names_datatime = obj.data.names[0];
		//var names_datatime = names_datatime + '';
		//var partsOfStr = names_datatime.split(',');

		var k = 0;
		var count_date = 0;
		var count_rows = 0;
		var valid_rows = 0;
		var end_out = 0;
	
	
	
	
	console.log("get_first_date : "+get_first_date);

	$.each(names_datatime, function(idxnames, objnames) { 
	
	// convert strings to date to compare them
	var date_objnames = new Date(objnames);
	var date_get_first_date = new Date(get_first_date);
	var date_get_last_date = new Date(get_last_date);
	
	
	// exclude the data before the initial date, how many element to exclude?
	if (date_objnames >= date_get_first_date) {start_1 = true;} else {start_1 = false; start_off++;}
	
	if (date_objnames <= date_get_last_date) {end_1 = true;} else {end_1 = false; end_out++;}
	
	if (k == 0 && (start_1 == true) && (end_1 == true)) {
		//console.log("start off: "+start_off+"\n");
		//$( ".inner3" ).append( "<p>idnames:"+objnames+"</p>" );
		array_days.push(objnames);
		valid_rows++;
		
		// lets get the first day
		if (count_date == 0) {first_date = objnames;};
	};
	k++; count_date++;
	if (k == 2) { k = 0;};
	});

	//console.log("array days: "+array_days+"\n");
	
	// now lets grab the values 
	var core_data = obj.data.data;
	var i = 0;

	console.log("valid rows: "+valid_rows+"\n");
	
	$.each(core_data, function(idxx, objx) { 
	// first row of the data  CLICKS IMPRESSIONs AND CTR
	//console.log ("count_rows: "+count_rows+" | start_off: "+start_off);
	if ((i == 0) && (count_rows > start_off) && ((count_rows - start_off) < valid_rows*2)) {
	//console.log("count_rows: "+ count_rows);
	
	
        var objx2 = objx + '';
		console.log("oggetto: "+ objx2);
		
	    var partsOfStr = objx2.split(',');
		var impressions = parseInt(partsOfStr[2])/100;
		var clicks = parseInt(partsOfStr[3])/100;
		var clickthru = parseInt(partsOfStr[4]);
		
		// let's count total numbers for the selected period
		 count_total_impressions = count_total_impressions + impressions;
		 count_total_clicks = count_total_clicks + clicks;
		 count_total_clickthru = count_total_clickthru + clickthru;
		 
		//$( ".inner3" ).append( "<p>Impr:"+impressions+" | clicks: "+clicks+" | ctr: "+clickthru+"</p>" );
		
		console.log("impressions: "+ impressions);

		array_impressions.push(impressions);
		array_clicks.push(clicks);
		array_clickthru.push(clickthru);
		}
	// second row of the data  FACEBOOK LIKES
		/*if (i == 1) {
        var objx2 = objx + '';
	    var partsOfStr = objx2.split(',');
		var new_like = partsOfStr[7];
		var total_like = partsOfStr[8];

		$( ".inner3" ).append( "<p>Newlike:"+new_like+" | totallike: "+total_like+"</p>" );


		array_new_like.push(new_like);
		array_total_like.push(total_like);



		}
		*/
		if ((i == 1) && (count_rows > start_off) && ((count_rows - start_off) < valid_rows*2)) {
        var objx2 = objx + '';
	    var partsOfStr = objx2.split(',');
		var new_visits = partsOfStr[5]/100;
		var total_visits = partsOfStr[6]/100;

		//$( ".inner3" ).append( "<p>New Visits:"+new_visits+" | total_visits: "+total_visits+"</p>" );
		
		count_total_newvisits = count_total_newvisits + new_visits;
		count_total_totalvisits = count_total_totalvisits + total_visits;

		array_new_visits.push(new_visits);
		array_total_visits.push(total_visits);

		}

	i++;

	if (i == 2) { i = 0;};
	count_rows++;

	});
});

count_total_clickthru = 0;


function currencyFormat (num) {
    return "" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "1.")
}



count_total_clicks = currencyFormat (count_total_clicks);
count_total_impressions = currencyFormat (count_total_impressions);
count_total_newvisits = currencyFormat (count_total_newvisits);
count_total_totalvisits = currencyFormat (count_total_totalvisits);


var multi_Array= [
					array_impressions,
					array_new_visits,
					array_total_visits,
					array_clicks,
					array_clickthru,
					count_total_impressions,
					count_total_clicks,
					count_total_clickthru,
					count_total_newvisits,
					count_total_totalvisits,
					array_days
					];
		return multi_Array;
		
		};
		
	
//scanData('2015-05-05');
	
/*

$.each(api_data, function(idx, obj) {
	//$( ".inner2" ).append( "<p>"+obj.data.names[0]+"</p>" );
	// first let's grab the timedata

	var names_datatime = obj.data.names[0];
	//var names_datatime = names_datatime + '';
	//var partsOfStr = names_datatime.split(',');

	var k = 0;
	var count_date = 0;
	var last_date;

	$.each(names_datatime, function(idxnames, objnames) { 
	if (k == 0) {
		//$( ".inner3" ).append( "<p>idnames:"+objnames+"</p>" );
		array_days.push(objnames);
		
		last_date = objnames;
		
		// lets get the first day
		if (count_date == 0) {first_date = objnames;};
	};
	k++; count_date++;
	if (k == 2) { k = 0;};
	});
	
	// let's get the last day of the data
	
	console.log("data:"+last_date);
	// convert the variable to a datatime variable
	var date_last_date = new Date(last_date);
	date_last_date.setMonth(date_last_date.getMonth() - 1);
	console.log("data 1 motnh ago:"+date_last_date);


	// now lets grab the values 
	var core_data = obj.data.data;
	var i = 0;

	$.each(core_data, function(idxx, objx) { 
	// first row of the data  CLICKS IMPRESSIONs AND CTR
	if (i == 0) {
        var objx2 = objx + '';
	    var partsOfStr = objx2.split(',');
		var impressions = partsOfStr[2]/100;
		var clicks = partsOfStr[3]/100;
		var clickthru = partsOfStr[4];
		//$( ".inner3" ).append( "<p>Impr:"+impressions+" | clicks: "+clicks+" | ctr: "+clickthru+"</p>" );


		array_impressions.push(impressions);
		array_clicks.push(clicks);
		array_clickthru.push(clickthru);
		}
	
		
		if (i == 1) {
        var objx2 = objx + '';
	    var partsOfStr = objx2.split(',');
		var new_visits = partsOfStr[5]/100;
		var total_visits = partsOfStr[6]/100;

		//$( ".inner3" ).append( "<p>New Visits:"+new_visits+" | total_visits: "+total_visits+"</p>" );

		array_new_visits.push(new_visits);
		array_total_visits.push(total_visits);

		}

	i++;

	if (i == 2) { i = 0;};

	});
});

*/

/*
$(function () {


    $('#newvisits').highcharts({
		credits: {
		      enabled: false
		  },        
		chart: {
            type: 'spline'
        },

        title: {
            text: 'Visits'
        },
        subtitle: {
            text: 'Source: Artemis'
        },
        xAxis: {
            type: 'datetime',
            minRange:  24 * 3600000 // fourteen days
        },
        yAxis: {
            title: {
                text: 'Number of Visits'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'New visits',
			color: '#f05814',
			 pointInterval: 24 * 3600 * 1000,
            pointStart: Date.parse(first_date),
            data: JSON.parse("[" + array_new_visits + "]") 
        },
		{
            name: 'Total Visits',
			color: '#08377a',
			 pointInterval: 24 * 3600 * 1000,
            pointStart: Date.parse(first_date),
            data: JSON.parse("[" + array_total_visits + "]") 
        }]

    });


	$('#impression').highcharts({
		credits: {
		      enabled: false
		  },
        chart: {
            type: 'area',
			
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Impressions'
        },
        subtitle: {
            text: 'Source: Artemis'
        },
        xAxis: {
            type: 'datetime',
            minRange:  24 * 3600000 // 1 day
        },
        yAxis: {
            title: {
                text: 'Number of Impressions'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            color: '#08377a',
			name: 'Impressions',
			pointInterval: 24 * 3600 * 1000,
            pointStart: Date.parse(first_date),
            data: JSON.parse("[" + array_total_visits + "]") 
        }]
    });


	// click chart 
	$('#clicks').highcharts({
		credits: {
		      enabled: false
		  },
		  legend: {
            enabled: false
        }, 
        chart: {
            type: 'column'
        },
        title: {
            text: 'Clicks'
        },
        subtitle: {
            text: 'Source: Artemis'
        },
        xAxis: {
            type: 'datetime',
            minRange:  24 * 3600000 // 1 day
        },
        yAxis: {
            title: {
                text: 'Number of Clicks'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Clicks',
			color: '#f05814', 
			pointInterval: 24 * 3600 * 1000,
            pointStart: Date.parse(first_date),
            data: JSON.parse("[" + array_clicks + "]") 
        }]
    });



});
*/


