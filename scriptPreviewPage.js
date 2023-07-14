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
      const newVids =  data.players.map(link => (link.href));
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
function openNewPage(cdnUrl, name) {
  const newPage = window.open('', '_blank');

  const newPageContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${getVideoName(name)}</title>
        <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet">
        <link rel="stylesheet" href="chatstyles.css">
        <link rel="stylesheet" href="videopage_header_style.css">
      </head>
      <body>
      <header>
      <a href="PageWithPreviews.html" class="header-link">
        <div class="logo">
          <img src="logo.png" alt="Logo">
        </div>
      </a>
    </header>

        <div id="container">
          <div id="videoContainer">
            <div class="video-container">
              <iframe src="https://${cdnUrl}" width="1280" height="720" frameborder="0" allowfullscreen></iframe>
            </div>
            <div id="videoName">${getVideoName(name)}</div>
          </div>

          <div id="chatContainer">
            <div id="chat"></div>
            <div id="inputContainer">
              <input type="text" id="usernameInput" placeholder="Your username">
              <input type="text" id="messageInput" placeholder="Type your message" onkeydown="sendMessage(event)" onkeyup="sendMessage(event)">
            </div>
            <div id="buttonContainer">
              <button onclick="sendMessagebutton()">Send</button>
            </div>
          </div>
        </div>

        <!-- Add the script tag for the external JavaScript file -->
        <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-database.js"></script>
        <script src="chat.js"></script>
        <script src="https://vjs.zencdn.net/7.11.4/video.js"></script>
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
