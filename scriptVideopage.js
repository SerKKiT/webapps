const headers = new Headers();
let accessToken = null;
let currentLinks = [];

// Get the query parameters from the URL
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

// Retrieve the video URL and name from the query parameters
let videoID = urlParams.get("videoID");
let name = urlParams.get("name");

function updatePreviews() {
    if (!accessToken) return;
    fetch(`https://api.platformcraft.ru/1/players/${videoID}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.player || !data.player.videos) {
          console.error("Invalid response format or missing 'videos' property.");
          return;
        }
  
        const videos = Object.values(data.player.videos);
        console.log(videos);
  
        // Create an array of video sources
        const sources = videos.map(videoUrl => {
          return {
            src: "https://"+videoUrl,
            type: 'video/mp4' // Adjust the type as per your video format
          };
        });
  
        // Initialize Video.js player
        const player = videojs('videoPlayer');
        player.src(sources);

        //Update the name element
      const nameElement = document.getElementById('videoName');
      nameElement.textContent = name;
  
        // Rest of the code
      })
      .catch(error => {
        console.error("Error occurred while fetching data:", error);
      });
  }
  
  


function getAccessToken() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    var response = JSON.parse(e.target.responseText);
    accessToken = response.access_token;
    updatePreviews();
  });
  xhr.addEventListener('error', function(e) {
    console.error('Request errored with status', e.target.status);
  });
  xhr.open('POST', 'https://auth.platformcraft.ru/token');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var body = 'login=greenatom&password=123123';
  xhr.send(body);
}

getAccessToken();
setInterval(getAccessToken, 86400000);

