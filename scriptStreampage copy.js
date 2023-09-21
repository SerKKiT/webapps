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
            return;
        }
  
        const newLinks = data.contents.map(video => {
          if (video.preview_url) {
            return 'https://' + video.preview_url;
          } else {
            return 'static/images/prevpic.png'; // Replace with your static picture URL
          }
        });
        const newVids =  data.contents.map(link => (link.download_url));
        const names = data.contents.map(video => video.name);

   
 
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