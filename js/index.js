document.getElementById('new-posts').addEventListener('click', function(e) { // event handler to get most popular movies 
    e.preventDefault();
    getNewPosts();
});

function getNewPosts() { // get recent posts
    var getNum = /\d+/g;
    var extractedNum = document.getElementsByClassName('overlay');
    for (var i = 0; i < extractedNum.length; i++) {
        var text = extractedNum[i].innerText;
        var number = text.match(getNum);
        if(number[0] !== '2016') {
            extractedNum[i].parentNode.style.display = 'none';
            extractedNum[i].parentNode.nextSibling.style.display = 'none';
        }
    }
    $("#filter").fadeIn(800);
}

