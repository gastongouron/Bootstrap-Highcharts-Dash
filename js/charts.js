  Highcharts.setOptions({
    subtitle: {
      align: 'left',
      x: 24
    },

/*  title: {
    align: 'left',
    x:24,
    useHTML: true,
    style: {
      color: '#0000000',
      fontsize: '14px',
    }
  },*/
  chart: {
    backgroundColor: 'rgb(245,245,245)',
    shadow: false
  },
  xAxis: {
    gridLineWidth: 1,
  },
  yAxis: {
     minorGridLineDashStyle: 'dot',
            minorTickInterval: 'auto',
            minorTickWidth: 0
  }
});


function print_charts(datainizio,datafine) {


				
//first_datez = get_first_date;

// working piece
first_datez = datainizio;
end_datez = datafine;

// we grab only the data from the starting date to the enddate with this function
var multi_Array = scanData(first_datez,end_datez);
var array_impressions = multi_Array[0];
var array_new_visits = multi_Array[1];
var array_total_visits = multi_Array[2];
var array_clicks = multi_Array[3];
var array_days = multi_Array[10];

// totals
var countz_total_impressions = multi_Array[5];
var countz_total_clicks = multi_Array[6];
var countz_total_clickthru = multi_Array[7];
var countz_total_newvisits = multi_Array[8];
var countz_total_totalvisits = multi_Array[9];

// alert(countz_total_impressions);
//count_total_clicks,count_total_clickthru,count_total_newvisits,count_total_totalvisits
$( "div#countx_total_impressions" ).text( countz_total_impressions );
$( "div#countx_total_clicks" ).text( countz_total_clicks );
$( "div#countx_total_clickthru" ).text( countz_total_clicks );
$( "div#countx_total_newvisits" ).text( countz_total_newvisits );
$( "div#countx_total_totalvisits" ).text( countz_total_totalvisits );

// now let's print out the table



var tbody = $('#reservations tbody');
for (k = 0; k < array_days.length; k++) { 
    //text += cars[k] + "<br>";
	var tr = $('<tr>');
	$('<td>').html(array_days[k]).appendTo(tr); 
	$('<td>').html(array_impressions[k]).appendTo(tr); 
	$('<td>').html(array_clicks[k]).appendTo(tr); 
	
	$('<td>').html(array_total_visits[k]).appendTo(tr); 
	$('<td>').html(array_new_visits[k]).appendTo(tr); 
	
	tbody.append(tr);
}



/* impression chart */
$('#impression').highcharts({

  
  credits: {
    enabled: false
  },
  legend: {
            enabled: false
        },
  chart: {
    type: 'area'
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
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
  pointStart: Date.parse(first_datez),
  data: JSON.parse("[" + array_impressions + "]") 
}]
});

/* visits chart */
$('#newvisits').highcharts({
  credits: {
    enabled: false
  },        
  chart: {
    type: 'spline'
  }, 
  title: {
    text: ''
  },
  subtitle: {
    text: ''
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
  pointStart: Date.parse(first_datez),
  data: JSON.parse("[" + array_new_visits + "]") 
},
{
  name: 'Total Visits',
  color: '#08377a',
  pointInterval: 24 * 3600 * 1000,
  pointStart: Date.parse(first_datez),
  data: JSON.parse("[" + array_total_visits + "]") 
}]

});


/* click chart */
$('#clicks').highcharts({
  legend: {
            enabled: false
        },
  credits: {
    enabled: false
  }, 
  chart: {
    type: 'column'
  },

  title: {
    text: ''
  },
  subtitle: {
    text: ''
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
  pointStart: Date.parse(first_datez),
  data: JSON.parse("[" + array_clicks + "]") 
}]
});
return false;
};

/*
var get_first_date;
var d = new Date(); var month = d.getMonth()+1; var day = d.getDate(); 
				 var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
				get_first_date = output;
				alert (get_first_date);
				
	*/		
			
			// This	creates a new object
//var x = new print_charts('2015-04-04');
//x.firstName;   


$(document).ready(function() {

// let's get the first date in the input FORM

//var get_first_date;
var first_date = "zpr";

/* get_first_date = $("#datestart").val();
				 if(get_first_date.length == 0) {
				 var d = new Date(); var month = d.getMonth()+1; var day = d.getDate(); 
				 var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
				get_first_date = output;}
				 
				 alert (get_first_date);
				 */
				var d = new Date(); var month = d.getMonth(); var day = d.getDate(); 
				 var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
				get_first_date = output;
				// alert (get_first_date);
				
				var d = new Date(); var month = d.getMonth()+1; var day = d.getDate(); 
				 var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
				var get_last_date = output;
				

print_charts(get_first_date,get_last_date);

$("#chartform").click(function() {

// clear the html table
$('#reservations tbody').empty();
$('#arrow').css("display","inline");

// let's get the first date in the input FORM

				var get_first_date;
				var get_last_date;
				var first_date = "zpr";

				 get_first_date = $("#datestart").val();
				 get_last_date = $("#dateend").val();
				 if(get_first_date.length == 0) {
				 var d = new Date(); var month = d.getMonth()+1; var day = d.getDate(); 
				 var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
				 get_first_date = output;}
				 
				// alert ("szio"+get_first_date);
				// return get_first_date;
				// alert ("zop");
	
	print_charts(get_first_date,get_last_date);

});

});
