/*
Author: Ariana Antonio
Project 1
AVF 1311
 */

//global varibles
var movieInfo;

// search page for instagram
$('#search').on('pageinit', function(){
    //displaying instagram data
    $("#instaData").empty();
    var instagramOutput = function(info) {
        
        console.log(info);
        $.each(info.data, function(index, photo) {
            var pic = "<div class='picDiv'><h3>'"+ photo.user.username +"'</h3><img src='" + photo.images.thumbnail.url + "' class='picSize'/><p>'" + photo.caption.text + "'</p></div>";
            $("#instaData").append(pic);
        });
    };
    //pulling instagram api
    $("#submit").click(function(e) {
        e.preventDefault();
        var searchTerm = $("#searchInput").val();       
        var tag = searchTerm;
        var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=b82b3459d471430d9d6955668c68d708";
        $.getJSON(url, instagramOutput);
        console.log(url);
        
    });
    
});
$('#movieSearch').on('pageinit', function(){
    $("#movieData").empty();
    //displaying movie db data by id
    var idOutput = function(json){
                console.log(json);
                movieInfo += "<li><b>Title:</b> '" + json.title + "'</li><li><b>Release Date:</b> '" + json.release_date + "'</li><li><p><b>Synopsis:</b> '" + json.overview + "'</p></li><br>";
                /*$.each(json, function(index, detail) {
                    //console.log(json.overview);
                    movieInfo += "<li>Title: '" + json.title + "'</li><li>Release Date: '" + json.release_date + "'</li><li><p>Synopsis: '" + json.overview + "'</p></li><br>";
                    //movieInfo += "<li>'" + json.overview + "'</li>";
                    console.log(movieInfo);
                    
                });*/
                $("#movieData").append(movieInfo);
            };
        
    var movieOutput = function(info) {
        console.log(info);
        //pulling movie db data by id
        $.each(info.results, function(index, movie){
            var id = movie.id;
            //console.log(id);
            var idUrl = "http://api.themoviedb.org/3/movie/" + id + "?api_key=086941b3fdbf6f475d06a19773f6eb65";
            console.log(idUrl);
            $.getJSON(idUrl, idOutput);
            
            
            
           
            //movieInfo += "<li>Title: '" + movie.original_title + "'</li><li>Release Date: '" + movie.release_date + "'</li><br>";    
            //$("#movieData").append(movieInfo);
        });
        
       /* $.each(info.Search, function(index, movie){
            var movieTitle = movie.Title.replace(/['"]/g,'');
             var movieInfo = "<li>Title: '" + movieTitle + "'</li><li>Year Released: '" + movie.Year + "'</li><li><a href='www.imdb.com/title/' +'" + movie.imdbID + "'></a></li><br>";
             $("#movieData").append(movieInfo);
        });*/
       
    };
    //$("#movieData").append(movieInfo);
    //pulling movie db data for search
    $("#movieSubmit").click(function(e){
        e.preventDefault();
        var movieSearch = $("#movieInput").val();
        var title = movieSearch;
        var url = "http://api.themoviedb.org/3/search/movie?query=" + title + "&api_key=086941b3fdbf6f475d06a19773f6eb65";
        //var url = "http://www.omdbapi.com/?s=" + title;
        $.getJSON(url, movieOutput);
        //console.log(url);
    });
});
//geolocation function
$("#geo").on('pageinit', function(){
    var works = function(position){
        alert(position.coords.latitude);
    };
    var doesntWork = function(){
        alert("Could not get your location");
    };
    $("#geoLink").click(function(){
        navigator.geolocation.getCurrentPosition(works, doesntWork);
    });
});
//camera function
$("#camera").on('pageinit', function(){
    function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
    $("#cameraLink").click(function(){
        alert("working");
        navigator.notification.vibrate(2000);
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI }); 
    });
});
