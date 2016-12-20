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
        if(number == undefined || number[0] < 4 && number[1] == null || number[0] < 4 && number[1] < 5) {
            rating[i].style.display = 'none';
            rating[i].previousSibling.style.display = 'none';
            var header = document.createElement("h2");
            var text = document.createTextNode("This low rated post was removed");
            header.appendChild(text);
            rating[i].parentNode.appendChild(header);
        }
    }
    document.getElementById('filter').style.display = 'block';
}