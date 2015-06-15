$(document).ready(function() {
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = d.getFullYear() + '-' +
(month<10 ? '0' : '') + month + '-' +
(day<10 ? '0' : '') + day;

$('#dateend').val(output);

var d = new Date();

var month = d.getMonth();
var day = d.getDate();

var output = d.getFullYear() + '-' +
(month<10 ? '0' : '') + month + '-' +
(day<10 ? '0' : '') + day;

$('#datestart').val(output);
});

$(document).ready(function() {





$('#datestart').daterangepicker({ singleDatePicker: true,format: 'YYYY-MM-DD',
startDate: '2015-01-01',
endDate: '2015-12-31' }, function(start, end, label) {
console.log(start.toISOString(), end.toISOString(), label);
var startxx = $('#datestart').val();

$('#string_datestart').text(''+startxx+'');

});

$('#dateend').daterangepicker({ singleDatePicker: true,format: 'YYYY-MM-DD',
startDate: '2015-01-01',
endDate: '2015-12-31' }, function(start, end, label) {
console.log(start.toISOString(), end.toISOString(), label);
var endxx = $('#dateend').val();
$('#string_dateend').text(''+endxx+'');
});
});

