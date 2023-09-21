function getTokenAndUpdateSourcesCDN() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    var response = JSON.parse(e.target.responseText);
    let accessToken = response.access_token;

    if (!accessToken) return;

    var pageTitle = document.title;
    var match = pageTitle.match(/^(.*?) -/);
    var fname = match ? match[1].trim() : '';
    var name = fname.replace(/\.[^.]*$/, "");

    fetch(`https://api.platformcraft.ru/1/players?name=${name}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    }).then(response => response.json()).then(data => {
      newID = data.players.map(link => (link.id));
    }).catch(error => {
      console.error("Error occurred while fetching data:", error);
    });
  });

  xhr.addEventListener('error', function(e) {
    console.error('Request errored with status', e.target.status);
  });

  xhr.open('POST', 'https://auth.platformcraft.ru/token');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var body = 'login=greenatom&password=123123';
  xhr.send(body);

//  https://video.platformcraft.ru/vod/64f742200e47cf0706768d6b/playlist.m3u8
//https://video.platformcraft.ru/vod/64f763690e47cf0706768f72/playlist.m3u8
}