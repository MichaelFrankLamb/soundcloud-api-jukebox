
SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
});


function Jukebox () {
        var results = [];
        var x = this;
        x.getSearch = getSearch;
        x.getSongById = getSongById;
        x.pauseSong = pauseSong;
        x.playSong = playSong;
        x.displaySongTitle = displaySongTitle;
        x.displayReleaseDate = displayReleaseDate;
        x.displayDescription = displayDescription;
        x.displayGenre = displayGenre;
        x.displayArtwork = displayArtwork;
        x.displayArtistLink = displayArtistLink;
        x.displaySongLink = displaySongLink;
        x.clearSearchResults = clearSearchResults;

    document.addEventListener("DOMContentLoaded", () => {
        var playButton = document.getElementById('play');
        var pauseButton = document.getElementById('pause');
        x.searchQuery = document.getElementById('search');
        var searchButton = document.getElementById('submit');
        x.songTitle = document.getElementById('songTitle');
        x.songLink = document.getElementById('songLink');
        x.genre = document.getElementById('genre');
        x.descript = document.getElementById('description');
        x.releaseDate = document.getElementById('releaseDate');
        // x.artWork = document.getElementById('artwork');
        var player;

        searchButton.addEventListener("click", getSearch);

        playButton.addEventListener("click", playSong);

        pauseButton.addEventListener("click", pauseSong);
    });
    
    function getSearch(){
        x.clearSearchResults();
        SC.get("/tracks", {
            q: x.searchQuery.value
        }).then(function(response) {
            console.log(response)
            results = response;
            // results.concat(response);
            response.forEach(function(obj) {           
                let box = document.createElement('div');
                box.addEventListener("click", ()=>{
                    x.getSongById(obj.id);
                    x.displaySongTitle(obj.title);
                    x.displaySongLink(obj.permalink_url);
                    x.displayArtistLink(obj.user.permalink_url);
                    x.displayDescription(obj.description);
                    x.displayGenre(obj.genre);
                    x.displayReleaseDate(obj.release_month, obj.release_day, obj.release_year);
                    x.displayArtwork(obj.artwork_url);
                })
                textNode = document.createTextNode(obj.title);
                box.appendChild(textNode);
                document.getElementById("audio-player-cont").appendChild(box);
            })
        }); 
    };

    function getSongById(id) {
        SC.stream( '/tracks/' + id ).then(function(song){ 
            player = song;
            player.play();
        });
    }

    function displaySongTitle(title) {
        x.songTitle.textContent = title
    }

    function pauseSong() {
        player.pause();
    }

    function playSong() {
        player.play();
    }

    function clearSearchResults() {
        //// figure out how to do this
    }
    

    function displaySongLink(permalink_url) {
        var link = document.getElementById("s-link");
        link.setAttribute("href", permalink_url);
    }

    function displayArtistLink(permalink_url) {
        var artistLink = document.getElementById("a-link");
        artistLink.setAttribute("href", permalink_url);
    }

    function displayArtwork(artwork_url) {
        var artwork = document.getElementById("artwork");
        artwork.src = artwork_url;
    }

    function displayGenre(genre) {
        x.genre.innerHTML = "<b>Genre: </b>" + genre;
    }

    function displayDescription(description) {
        x.descript.innerHTML = "<b>Track Description: </b>" + description;
    }

    function displayReleaseDate(release_month, release_day, release_year) {
        if(release_month != null, release_day != null, release_year != null) {
            x.releaseDate.innerHTML = "<b>Release Date: </b>" + release_month + "/" + release_day + "/" + release_year;
       }else{
            x.releaseDate.innerHTML = "";
       }
    }   
}



// permalink_url

// user.permalink_url

// SC.stream( '/tracks/216847995' ).then(function(song){    
//     song.play();    ////
//     song.on("finish",function(){  ////
//         console.log( "Done-zo" );    
//     });  
// });


// var currentSong = 0;//load Track objects into songs array elsewhere...
// function playNext() {  
//     SC.stream( '/tracks/' + songs[currentSong].id ).then(function(song){    ////
//         song.play();    ////
//         song.on("finish",function(){      ////
//             currentSong += 1; //increase currentSong by 1      
//             playNext();       //call itself    
//         });  
//     });
// }




var myJukebox = new Jukebox();


