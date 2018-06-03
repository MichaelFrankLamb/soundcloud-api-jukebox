SC.initialize({
  client_id: "f665fc458615b821cdf1a26b6d1657f6"
});

function Jukebox() {
  // Define variables and functions
  var results = [];
  var x = this;
  x.getSearch = getSearch;
  x.getSongById = getSongById;
  x.pauseSong = pauseSong;
  x.playSong = playSong;
  x.displaySongTitle = displaySongTitle;
  x.displayArtistName = displayArtistName;
  x.displayReleaseDate = displayReleaseDate;
  x.displayDescription = displayDescription;
  x.displayGenre = displayGenre;
  x.displayArtwork = displayArtwork;
  x.setArtistLink = setArtistLink;
  x.setSongLink = setSongLink;
  var juke = null;

  // Grab DOM elements and add play, pause and submit event listeners
  document.addEventListener("DOMContentLoaded", () => {
    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");
    x.searchQuery = document.getElementById("search");
    var searchButton = document.getElementById("submit");
    x.artistName = document.getElementById("artistName");
    x.songTitle = document.getElementById("songTitle");
    x.artistLink = document.getElementById("a-link");
    x.songLink = document.getElementById("s-link");
    x.genre = document.getElementById("genre");
    x.descript = document.getElementById("description");
    x.releaseDate = document.getElementById("releaseDate");
    x.artwork = document.getElementById("artwork");

    searchButton.addEventListener("click", getSearch);

    playButton.addEventListener("click", playSong);

    pauseButton.addEventListener("click", pauseSong);
  });

  // Search functionality, populates divs with search results and sets event listeners to play user's selection and display the track/artist data on click

  function getSearch() {
    SC.get("/tracks", {
      q: x.searchQuery.value
    }).then(function(response) {
      results = response;
      response.forEach(function(obj) {
        let box = document.createElement("div");
        box.setAttribute("style", "border:ridge; border-color:#003ba");
        box.addEventListener("click", () => {
          x.getSongById(obj.id);
          x.displaySongTitle(obj.title);
          x.displayArtistName(obj.user.username);
          x.setSongLink(obj.permalink_url);
          x.setArtistLink(obj.user.permalink_url);
          x.displayDescription(obj.description);
          x.displayGenre(obj.genre);
          x.displayReleaseDate(
            obj.release_month,
            obj.release_day,
            obj.release_year
          );
          x.displayArtwork(obj.artwork_url);
        });
        textNode = document.createTextNode(obj.title);
        box.appendChild(textNode);
        document.getElementById("audio-player-cont").appendChild(box);
      });
    });
  }

  // Grab an item from the search results by ID

  function getSongById(id) {
    SC.stream("/tracks/" + id).then(function(song) {
      juke = song;
      juke.play();
    });
  }

  // Basic player functionality and populating information from selected track

  function displaySongTitle(title) {
    x.songTitle.textContent = title;
  }

  function displayArtistName(username) {
    x.artistName.innerHTML = "<b>Artist: </b>" + username;
  }

  function pauseSong() {
    if (juke !== null) {
      juke.pause();
    }
  }

  function playSong() {
    if (juke !== null) {
      juke.play();
    }
  }

  function setSongLink(permalink_url) {
    x.songLink.setAttribute("href", permalink_url);
  }

  function setArtistLink(permalink_url) {
    x.artistLink.setAttribute("href", permalink_url);
  }

  function displayArtwork(artwork_url) {
    if (artwork_url != null) {
      x.artwork.src = artwork_url;
    } else {
      x.artwork.setAttribute("style", "width:100px");
      x.artwork.src = "images/no-artwork-available.jpg";
    }
  }

  function displayGenre(genre) {
    x.genre.innerHTML = "<b>Genre: </b>" + genre;
  }

  function displayDescription(description) {
    if (description.length < 300) {
      x.descript.innerHTML = "<b>Track Description: </b>" + description;
    } else {
      x.descript.innerHTML = "<b>Track Description: </b> N/A";
    }
  }

  function displayReleaseDate(release_month, release_day, release_year) {
    if ((release_month != null, release_day != null, release_year != null)) {
      x.releaseDate.innerHTML =
        "<b>Release Date: </b>" +
        release_month +
        "/" +
        release_day +
        "/" +
        release_year;
    } else {
      x.releaseDate.innerHTML = "";
    }
  }
}

var myJukebox = new Jukebox();
