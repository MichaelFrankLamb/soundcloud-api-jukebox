
SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
});


function Jukebox () {
        var results = [];
        var x = this;
        x.getSearch = getSearch;
        x.getSongById = getSongById;
        x.pauseSong = pauseSong;

        var playButton = document.getElementById("play");
        var pauseButton = document.getElementById("pause");
        var searchQuery = document.getElementById("search");
        var searchButton = document.getElementById("submit");
        var player;

        searchButton.addEventListener("click", getSearch);

        playButton.addEventListener("click", getSongById);

        pauseButton.addEventListener("click", pauseSong);
    
    function getSearch(){
        SC.get("/tracks", {
            q: searchQuery.value
        }).then(function(response) {
            console.log(response)
            results = response;
            // results.concat(response);
            response.forEach(function(obj) {     
                console.log("anything");           
                let box = document.createElement('div');
                box.addEventListener("click", ()=>{
                    x.getSongById(obj.id)
                })
                let textNode = document.createTextNode(obj.title);
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

    function pauseSong() {
        player.pause();
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


