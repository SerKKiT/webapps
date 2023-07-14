const headers = new Headers();
let accessToken = null;
let currentLinks = [];

function updatePreviews() {
  if (!accessToken) return;
  fetch('https://api.platformcraft.ru/1/players', {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + accessToken
    })
  })
    .then(response => response.json())
    .then(data => {
      const newLinks = data.players.map(video => {
        if (video.screen_shot_url) {
          return 'https://' + video.screen_shot_url;
        } else {
          return 'prevpic.png'; // Replace with your static picture URL
        }
      });
      const newVids =  data.players.map(link => (link.frame_tag));
      //const contentTypes = data.players.map(video => video.content_type);
      const names = data.players.map(video => video.name); // Get the names

      const videoContainer = document.getElementById('video-container');
      videoContainer.innerHTML = ''; // Clear existing video preview elements

      for (let i = 0; i < newLinks.length; i++) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';

        const img = document.createElement('img');
        img.src = newLinks[i];
        img.className = 'video-preview';
        img.alt = 'Video Preview';
        img.onclick = function() {
          openNewPage(newVids[i], names[i]);
        };
        videoWrapper.appendChild(img);

        const nameElement = document.createElement('p');
        nameElement.textContent = getVideoName(names[i]);
        nameElement.className = 'video-name';
        videoWrapper.appendChild(nameElement);

        videoContainer.appendChild(videoWrapper);
      }
    });
}

function getVideoName(name) {
  return name.split('.')[0]; // Get the part before the dot (file extension)
}


  
 // Function to open a new page with the video
// Function to open a new page with the video
function openNewPage(cdnIframeCode, name) {
  const newPage = window.open('', '_blank');

  const newPageContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${getVideoName(name)}</title>
        <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet">

        <style>
          body {
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .video-player {
            max-width: 800px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
        </style>
      </head>
      <body>
      <div class="container">
        ${cdnIframeCode}
      </div>
      </body>
    </html>
  `;

  newPage.document.open();
  newPage.document.write(newPageContent);
  newPage.document.close();
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
setInterval(updatePreviews, 10000);
