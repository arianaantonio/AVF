/*
Author: Ariana Antonio
Project 1
AVF 1311
 */

$('#search').on('pageinit', function(){
	//var search = $('#searchBtn');
    //search.addEventListener("click", searchApp);
    //$('#searchBtn').click(function(){
        //searchApp();
    //});
    $("#instaData").empty();
    var screenOutput = function(info) {
        
        console.log(info);
        //$("#instaData").html("<h2>Photos</h2>");
        $.each(info.data, function(index, photo) {
            var pic = "<div><img src='" + photo.images.thumbnail.url + "' class='picSize'/><p>'" + photo.caption.text + "'</p></div>";
            $("#instaData").append(pic);
        });
    };
    $("#submit").click(function(e) {
        e.preventDefault();
        var searchTerm = $("#searchInput").val();       
        var tag = searchTerm
        var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=b82b3459d471430d9d6955668c68d708";
        $.getJSON(url, screenOutput);
        console.log(url);
        
    });
    
});	
