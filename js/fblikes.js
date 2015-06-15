var fburl = "https://graph.facebook.com/139331629464336"

$.getJSON(fburl, function(data){

     var likes = data["likes"];
     $("#profile").append(likes);
 
});