/*
Author: Ariana Antonio
Project 1
AVF 1311
 */

$('#search').on('pageinit', function(){

    $("#instaData").empty();
    var instagramOutput = function(info) {
        
        console.log(info);
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
        $.getJSON(url, instagramOutput);
        console.log(url);
        
    });
    
});
$('#movieSearch').on('pageinit', function(){
    $("#movieData").empty();
    var movieOutput = function(info) {
        console.log(info);
        $.each(info.results, function(index, movie){
            var id = movie.id;
            console.log(id);
            var idUrl = "http://api.themoviedb.org/3/movie/" + id + "?api_key=086941b3fdbf6f475d06a19773f6eb65";
            console.log(idUrl);
            
            var idOutput = function(json){
                console.log(json);
                $.each(json, function(index, detail) {
                    console.log(json.overview);
                    movieInfo += "<li>'" + json.overview + "'</li>";
                
                });
            };
            
            $.getJSON(idUrl, idOutput);
           
            movieInfo += "<li>Title: '" + movie.original_title + "'</li><li>Release Date: '" + movie.release_date + "'</li><br>";    
            $("#movieData").append(movieInfo);
        });
        
       /* $.each(info.Search, function(index, movie){
            var movieTitle = movie.Title.replace(/['"]/g,'');
             var movieInfo = "<li>Title: '" + movieTitle + "'</li><li>Year Released: '" + movie.Year + "'</li><li><a href='www.imdb.com/title/' +'" + movie.imdbID + "'></a></li><br>";
             $("#movieData").append(movieInfo);
        });*/
       
    };
    $("#movieSubmit").click(function(e){
        e.preventDefault();
        var movieSearch = $("#movieInput").val();
        var title = movieSearch;
        var url = "http://api.themoviedb.org/3/search/movie?query=" + title + "&api_key=086941b3fdbf6f475d06a19773f6eb65";
        //var url = "http://www.omdbapi.com/?s=" + title;
        $.getJSON(url, movieOutput);
        console.log(url);
    });
    


});
var movieInfo;