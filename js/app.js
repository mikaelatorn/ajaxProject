$(document).ready(function () {
    
    $('a[href=about]').click(function (e) {
        e.preventDefault();
        $('#about').animate({ height: 'toggle'});
        scrollTo();
    });
    
    $('a[href=write-post]').click(function (e) {
        e.preventDefault();
        $('#write-post').animate({ height: 'toggle'});
        scrollTo();
    });

    $('.text-field').on("focus", function () {
        var label = $('label[for="' + $(this).attr('id') + '"]');
        label.css("color", "#34ACAF");    
    });
    
    $('.nav a').click(function() {
        $('.navbar-collapse').collapse('hide');  
    });
    
    loadImage();
    
});


function scrollTo() {
     $('html, body').animate( {scrollTop:200}, '1000');
}

var fixedNav = $('nav').offset().top;

$(window).scroll(function() {  
    if ($(window).scrollTop() > fixedNav) {
        $('nav').addClass('nav-fixed');
    }
    else {
        $('nav').removeClass('nav-fixed');
    }  
});

function loadImage() {
    $.getJSON("https://pixabay.com/api/?key=4007555-f11877a1f2f46585ec7be1c8b&q=lila+abstrakt&image_type=photo&lang=sv", function (json) {
        if (json.length !== 0) {
            var images = json.hits;
            var i = 0;
            $('.blog-posts').each(function () {
                $(this).css("background-image", "url(" + images[i].webformatURL + ")");
                i = (i + 1) % images.length;
            });
        }
    });
}

function submitForm() {
    var blogPost = {
        "title" : document.getElementById('title').value,
        "description" : document.getElementById('description').value,
        "category" : document.getElementById('category').value,
        "author" : document.getElementById('author').value,
        "date" : new Date().toDateString()
    };
    
    var fields = document.getElementsByClassName('text-field');
    for (var i in fields) {
        fields[i].value = "";
    }
    postArticle(blogPost, "up");
} 

function postArticle (post, direction) {
    if(direction == "up") {
        $('#blog-articles').prepend('<article><div class="blog-posts"><div class="text-box"><h2>' + post.title + '</h2><p>' + post.description + '</p><h5>' + "Category: " + post.category + '</h5></div></div><div class="overlay">' + "Author: " + post.author + '<br>' + post.date + '</div></article>');
        loadImage();
    } else {
        $('#blog-articles').append('<article><div class="blog-posts"><div class="text-box"><h2>' + post.title + '</h2><p>' + post.description + '</p><h5>' + "Category: " + post.category + '</h5></div></div><div class="overlay">' + "Author: " + post.author + '<br>' + post.date + '</div></article>');
    }
}

function loadMore() {
    $.getJSON('http://mardby.se/AJK15G/blog_json.php', function(json) {
        if (json.length !== 0) {
            var oldPosts = json.blog_posts;
            
            for(var i in oldPosts) {

                var fetchedPost = {
                    "title" : oldPosts[i].title ,
                    "description" : oldPosts[i].text ,
                    "category" : oldPosts[i].tags[0] ,
                    "author" : oldPosts[i].author ,
                    "date" : oldPosts[i].date
                };
                postArticle(fetchedPost, "down");
                loadImage();
            }
        }
    });
}

var movieCount = 0;
var amountOfMovies = 6;

function getMovies() {
    $.getJSON('http://netflixroulette.net/api/api.php?actor=Anthony%20Hopkins', function(json){
        if(json.length !== 0) {
            for(var i = movieCount; i < amountOfMovies; i++) {
                var movie = {
                    "title" : json[i].show_title , 
                    "description" : json[i].summary ,
                    "poster" : json[i].poster , 
                    "rating" : json[i].rating
                }
                movieCount++;
                addMovie(movie);
                
                if(movieCount == json.length) {
                    $('#no-data').css("display", "block");
                    $('#load-btn').prop("disabled", true);
                    $('#load-btn').css("background-color", "#a0b4c1");
                }
            }
            amountOfMovies += amountOfMovies;
        }
    });
}

function addMovie(movie) {
     $('#movies').append('<article><div class="blog-posts" style="background-image:url(' + movie.poster + ')"><div class="text-box"><h2>' + movie.title + '</h2><p>' + movie.description + '</p><h5>' + "Rating: " + movie.rating + '</h5></div></div></article>');
}


