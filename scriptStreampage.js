const headers = new Headers();
let accessToken = null;
let currentLinks = [];

function updatePreviews() {
    if (!accessToken) return;
    fetch('https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit/streams', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.contents || data.contents.length === 0) {
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = '<img src="https://i.pinimg.com/originals/b9/eb/53/b9eb53ce715ec8b2035e225a83b85547.gif" alt="No live translations available">';
            return;
        }
  
        const newLinks = data.contents.map(video => {
          if (video.preview_url) {
            return 'https://' + video.preview_url;
          } else {
            return 'static/prevpic.png'; // Replace with your static picture URL
          }
        });
        const newVids =  data.contents.map(link => (link.download_url));
        const names = data.contents.map(video => video.name);
  
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = '';

      for (let i = 0; i < newLinks.length; i++) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';

        const img = document.createElement('img');
        img.src = newLinks[i];
        img.className = 'video-preview';
        img.alt = 'Video Preview';
        img.style.cursor = 'pointer';

        const nameElement = document.createElement('p');
        nameElement.textContent = getShortName(names[i]);
        nameElement.className = 'video-name';
        nameElement.style.cursor = 'pointer';

        const frameElement = document.createElement('div');
        frameElement.className = 'video-frame';
        frameElement.style.display = 'none'; // Initially hide the frame

        videoWrapper.appendChild(img);
        videoWrapper.appendChild(nameElement);
        videoWrapper.appendChild(frameElement);

        const showFrameAndUnderline = function() {
          img.style.border = '2px solid rgb(20, 5, 160)'; // Show frame around preview
          nameElement.style.textDecoration = 'underline'; // Underline the name
        };

        const hideFrameAndUnderline = function() {
          img.style.border = 'none'; // Hide frame around preview
          nameElement.style.textDecoration = 'none'; // Remove underline from the name
        };

        img.addEventListener('mouseover', showFrameAndUnderline);
        img.addEventListener('mouseout', hideFrameAndUnderline);
        nameElement.addEventListener('mouseover', showFrameAndUnderline);
        nameElement.addEventListener('mouseout', hideFrameAndUnderline);

        img.addEventListener('click', function() {
          openNewPage(newVids[i], names[i]);
        });

        nameElement.addEventListener('click', function() {
          openNewPage(newVids[i], names[i]);
        });

        videoContainer.appendChild(videoWrapper);
      }
    });
}




function getVideoName(name) {
  return name.split('.')[0]; // Get the part before the dot (file extension)
}

function getShortName(name) {
  let trimmedName = name.split('.')[0]; // Get the part before the dot (file extension)
  if (trimmedName.length > 36) {
    trimmedName = trimmedName.substring(0, 36) + '...'; // Cut the name and add ellipsis
  }
  return trimmedName;
}

function openNewPage(videoUrl, name) {
  // Encode the video URL and name to ensure they are properly formatted for the URL
  var encodedVideoUrl = encodeURIComponent(videoUrl);
  var encodedName = encodeURIComponent(getVideoName(name));

  // Construct the URL with the query parameters
  var url = "streampage.html?videoUrl=" + encodedVideoUrl + "&name=" + encodedName;

  // Navigate to the new page with the URL
  window.location.href = url;
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
