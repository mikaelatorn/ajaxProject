$(document).ready(function () {
    
    $('a[href=about]').click(function (e) { // toggle about div
        e.preventDefault();
        $('#about').animate({ height: 'toggle'});
        var displayValue = document.getElementById('about').style.display; /* only scroll down when open tab*/
        if(displayValue == 'block' ) {
            scrollTo("about");
        }
    });
    
    $('a[href=write-post]').click(function (e) { // toggle write post form
        e.preventDefault();
        $('#write-post').animate({ height: 'toggle'});
        var displayValue = document.getElementById('write-post').style.display; /* only scroll down when open tab*/
        if(displayValue == 'block' ) {
            scrollTo("write");
        }
    });
    
    $('.text-field').on("focus", function () { // add color to form label
        var label = $('label[for="' + $(this).attr('id') + '"]');
        label.css("color", "#34ACAF");    
    });
    
    $('.nav a').click(function() { // hide navbar on link press (collapsible menu)
        $('.navbar-collapse').collapse('hide');  
    });
    
    loadImage();
    
});

function scrollTo(tab) {
    if(tab == "about") {
        var aboutPos = $('#about').offset().top
        aboutPos -= 100;
        $('html, body').animate( {scrollTop: aboutPos}, '1000'); // scroll to top with 350 offset
    } else {
        var writePos = $('#write-post').offset().top;
        writePos -= 100;
         $('html, body').animate( {scrollTop: writePos}, '1000'); // scroll to top with 350 offset
    }   
}

var fixedNav = $('nav').offset().top;

$(window).scroll(function() {    // fixed navbar when it reaches top 
    if ($(window).scrollTop() > fixedNav) {
        $('nav').addClass('nav-fixed');
    }
    else {
        $('nav').removeClass('nav-fixed');
    } 
});

function loadImage() { // reqeust images from pixabay api and add as background images to posts
    $.getJSON("https://pixabay.com/api/?key=4007555-f11877a1f2f46585ec7be1c8b&q=lila+abstrakt&image_type=photo&lang=sv", function (json) {
        if (json.length !== 0) {
            var images = json.hits;
            var i = 0;
            $('.text-box').each(function () {
                $(this).css("background-image", "url(" + images[i].webformatURL + ")");
                i = (i + 1) % images.length;
            });
        }
    });
}

function submitForm() { // get input values from form 
    var blogPost = {
        "title" : document.getElementById('title').value,
        "description" : document.getElementById('description').value,
        "author" : document.getElementById('author').value,
        "date" : new Date().toISOString()
    };
    blogPost.date = blogPost.date.split('T')[0];
    var fields = document.getElementsByClassName('text-field');
    for (var i in fields) { // reset fields after submitting
        fields[i].value = "";
    }
    postArticle(blogPost, "up"); 
} 

function postArticle (post, direction) { 
    if(direction == "up") { // prepend user written article 
        $('#blog-articles').prepend('<article><div class="text-box"></div><div class="blog-posts"><h2>' + post.title + '</h2><p>' + post.description + '</p></div><div class="overlay">' + "Author: " + post.author + '<br>' + post.date + '</div></article><hr>');
        loadImage(); // add background image
    } else {  // append old posts when user presses load more articles
        $('#blog-articles').append('<article><div class="text-box"></div><div class="blog-posts"><h2>' + post.title + '</h2><p>' + post.description + '</p></div><div class="overlay">' + "Author: " + post.author + '<br>' + post.date + '</div></article><hr>');
    }
}

function loadPosts() { // get posts texts from filltext api
    (function() {
        var url = "http://www.filltext.com/?callback=?";
        $.getJSON( url, {
            "rows" : 6,
            "title" : '{username}' ,
            "description" : "{lorem|50}" ,
            "author" : '{firstName}~{lastName}',
            "date" : '{date|01-01-2015,10-12-2016}'
        })
        .done(function( data ) {
            $.each( data, function( i, item ) {
                data[i].date = data[i].date.substr(0,10);
                postArticle(data[i], "down");
                loadImage();
            });
        });
    })();
}

function loadMedia() { // load both movies and books on button press ( load more media )
    getMovies();
    getBooks();
}

// to keep track how many movies are posted and how many to post each time
var movieCount = 0; 
var amountOfMovies = 3;

function getMovies() { // get movies from netflix roulette api 
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
                addMedia(movie);

                if(movieCount == json.length) { // if theres nothing more to load
                    noMovies = true;
                    $('#no-data').css("display", "block");
                    $('#load-btn').prop("disabled", true);
                    $('#load-btn').css("background-color", "#a0b4c1");
                }
            }
            amountOfMovies += amountOfMovies;
        }
    });
}

//keep track of books posted and how many are posted each time
var bookCount = 0;
var amountOfBooks = 3;

function getBooks() { // get books from google books api 
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&printType=books&langRestrict=en', function(json) {
        if(json.length !== 0) {
            console.log(json.items[0].volumeInfo);
            for(var i = bookCount; i < amountOfBooks; i++) {
                var book = {
                    "title" : json.items[i].volumeInfo.title , 
                    "description" : json.items[i].volumeInfo.description ,
                    "poster" : json.items[i].volumeInfo.imageLinks.thumbnail , 
                    "rating" : json.items[i].volumeInfo.averageRating
                }
                bookCount++;
                addMedia(book);
            }
            amountOfBooks += amountOfBooks;
        } 
    });
}

function addMedia(media) { // add media to page when page loads or when user presses load more media button
     $('#movies').append('<article><div class="text-box"  style="background-image:url(' + media.poster + ')"></div><div class="blog-posts"><h2>' + media.title + '</h2><p>' + media.description + '</p></div><div class="overlay">' + "Rating: " + media.rating + '</div></article><hr>');
}
