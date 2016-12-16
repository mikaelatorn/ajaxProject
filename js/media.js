document.getElementById('top-movies').addEventListener('click', function(e) { // event handler to get most popular movies 
    e.preventDefault();
    getTopMovies();
});


function getTopMovies() { // Get most popular movies
    var div = document.getElementsByClassName('blog-posts');
    var rating = document.getElementsByTagName('h5');
    console.log(rating);
  
    for (var i = 0; i < rating.length; i++) {
        var text = rating[i].innerHTML;
        console.log(text);
        var number = text.substring(text.indexOf(":") + 1);
        console.log(number);
        if(number < 3.5) {
            div[i].parentElement.style.display = 'none';
        }
    }    
}