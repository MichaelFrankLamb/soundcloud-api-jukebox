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


var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');

//var currentSong = 0;

window.onload = loadSong;

function loadSong() {
    song.src = "songs/" + songs[currentSong];
    songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong]; 
    nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
    song.playbackRate = 1; //
    song.volume = volumeSlider.value;
    song.play();
    setTimeout(showDuration, 1000); //
}

setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    var c = Math.round(song.currentTime); 
    songSlider.value = c;
    currentTime.textContent = convertTime(c); 
    if(song.ended){ 
        next(); 
    } 
}

function convertTime (secs) {
    var min = Math.floor(secs/60);
    var sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ":" + sec);
}

function showDuration() {
    var d = Math.floor(song.duration);
    songsSlider.setAttribute("max", d);
    duration.textContent = convertTime(d); 
}

function playOrPauseSong (img) {
    song.playbackRate = 1;
    if(song.paused) {
        song.play();
        img.src = "images/pause.png";
    }else{
        song.pause();
        img.src = "images/play.png";
    }
}


function next() {
    currentSong = currentSong + 1 % songs.length;
    loadSong();
}

function previous() {
    currentSong--;
    currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
    loadSong();
}

function seekSong() {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime); 
}

function adjustVolume() {
    song.volume = volumeSlider.value;
}

function increasePlaybackRate() {
    song.playbackRate += 0.5;       
}

function decreasePlaybackRate() {
    song.playbackRate -= 0.5;       
}