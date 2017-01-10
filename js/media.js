document.getElementById('top-movies').addEventListener('click', function(e) { // event handler to get most popular movies 
    e.preventDefault();
    getTopMovies();
});

function getTopMovies() { // Get most popular movies
    var getNum = /\d+/g;
    var rating = document.getElementsByClassName('overlay');
    for (var i = 0; i < rating.length; i++) {
        var text = rating[i].innerText;
        var number = text.match(getNum);
        if(number == null || number[0] < 3 && number[1] == null || number[0] <= 3 && number[1] < 5) { // check the rating of the movie/book
            rating[i].parentNode.style.display = 'none';
            rating[i].parentNode.nextSibling.style.display = 'none';
        }
    }
    $("#filter").fadeIn(800);
}