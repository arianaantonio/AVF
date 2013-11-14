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
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //alert(latitude);
        //alert(longitude);
        $("#map img").attr("src", "http://maps.google.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=6&size=540x280&maptype=satellite&markers=color:red|" + latitude + "," + longitude + "&sensor=false")
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
     var works = function(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
        navigator.notification.alert("the message!", callbackFunction, "the title!", "button text!");
    }
    var doesntWork = function(imageURI) {
        alert("Could not access your camera");
    }
    var callbackFunction;
        $("#cameraLink").on("click", function(){
        
        navigator.camera.getPicture(works, doesntWork, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI }); 
    });
});
$("#compass").on('pageinit', function(){
    $("#compassLink").on("click", function(){
        var works = function(heading) {
            console.log(heading.magneticHeading);
            var compassPhoto = function() {
                var magHeading = heading.magneticHeading;
                console.log(magHeading);
                var compassImg = $("#compassPic");
                if ((magHeading >= 0 && magHeading <= 22.4) || (magHeading >= 337.5)){
                    compassImg.attr("src", "img/CompassN.gif" )
                }
                if (magHeading >= 22.5 && magHeading <= 67.4) {
                    compassImg.attr("src", "img/CompassNE.gif")
                }
                if (magHeading >= 67.5 && magHeading <= 112.4 ) {
                    compassImg.attr("src", "img/CompassE.gif" )
                }
                if (magHeading >= 112.5 && magHeading <= 157.4) {
                    compassImg.attr("src", "img/CompassSE.gif")
                }
                if (magHeading >= 157.5 && magHeading <= 202.4) {
                    compassImg.attr("src", "img/CompassS.gif")
                }
                if (magHeading >= 202.5 && magHeading <= 247.4) {
                    compassImg.attr("src", "img/CompassSW.gif" )
                }
                if (magHeading >= 247.5 && magHeading <= 292.4) {
                    compassImg.attr("src", "img/CompassW.gif" )
                }
                if (magHeading >= 292.5 && magHeading <= 337.4) {
                    compassImg.attr("src", "img/CompassNW.gif" )
                }
            };
            navigator.notification.alert("Your heading is: " + heading.magneticHeading, compassPhoto, "Compass Heading", "Show me on a compass");
        };

        var doesntWork = function() {
        alert("Oops! Can't get your bearing.");
        };
        navigator.compass.getCurrentHeading(works, doesntWork);
    });
});
