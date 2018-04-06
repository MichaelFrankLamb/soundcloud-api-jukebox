
SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
});

var song = player;

SC.get("/tracks",{
    q: "fish"
}).then(function(response) {
    console.log( response );
    response.forEach(function(obj) {
        console.log("The title of this song is: " + obj.title);
    })
});

SC.stream( '/tracks/216847995' ).then(function(song){ ////
    console.log(song);    ////
    song.play();  ////
});

SC.stream( '/tracks/' + track.id ).then(function(song){
    console.log(song);    ////
    song.play();  
});

SC.stream( '/tracks/216847995' ).then(function(song){    
    song.play();    ////
    song.on("finish",function(){  ////
        console.log( "Done-zo" );    
    });  
});

var songs = [];
var currentSong = 0;//load Track objects into songs array elsewhere...
function playNext() {  
    SC.stream( '/tracks/' + songs[currentSong].id ).then(function(song){    ////
        song.play();    ////
        song.on("finish",function(){      ////
            currentSong += 1; //increase currentSong by 1      
            playNext();       //call itself    
        });  
    });
}


// Functionality from original jukebox page


var music = this;
music.audio = document.createElement('audio');
music.songTitle = document.getElementById('songTitle');
music.nextSongTitle = document.getElementById('nextSongTitle');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var playPause = document.getElementById('playPause');
var stop = document.getElementById('stop'); 



music.loadSong = loadSong;
    function loadSong(){
    music.audio.src = "songs/" + music.songs[music.currentSong];
    music.songTitle.textContent = (music.currentSong + 1) + ". " + music.songs[music.currentSong]; 
    music.nextSongTitle.innerHTML = "<b>Next Song: </b>" + music.songs[(music.currentSong + 1) % +(music.songs.length)];
    music.audio.play();
    }

    playPause.addEventListener("click",function playPause(e) {
        if(music.audio.paused) {
            music.audio.play();
            e.target.src = "images/pause.png";
        }else{
            music.audio.pause();
            e.target.src = "images/play.png";
        }
    } );
next.addEventListener("click",function(e) {
    ++music.currentSong;
    music.currentSong = (music.currentSong > 2) ? music.songs.length - 3 : music.currentSong;
    loadSong();
});

prev.addEventListener("click",function(e) {
    music.currentSong--;
    music.currentSong = (music.currentSong < 0) ? music.songs.length - 1 : music.currentSong;
    loadSong();
});

stop.addEventListener("click",function(e) {  
    music.audio.pause();
    music.audio.load();
    music.audio.src = ""; 
    music.audio.src = "songs/" + music.songs[music.currentSong];                  
});                                           


var myJukebox = new Jukebox()

window.onload = myJukebox.loadSong;