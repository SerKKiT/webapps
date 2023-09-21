import requests

headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

accessToken = None
currentLinks = []

def updatePreviews():
    url = 'https://auth.platformcraft.ru/token'
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {'login': 'greenatom', 'password': '123123'} 
    # Sending a POST request to retrieve the access token
    response = requests.post(url, headers=headers, data=data)
    
    json_data = response.json()
    access_token = json_data.get('access_token')

    headers = {'Authorization': f'Bearer {access_token}'}
    # Extracting the name from instance
    response = requests.get('https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit/streams', headers=headers)
    if response.status_code == 200:
        data = response.json()
        if not data.get('contents') or len(data.get('contents')) == 0:
            return
        
        newLinks = ['https://' + video.get('preview_url') if video.get('preview_url') else 'static/images/prevpic.png' for video in data.get('contents')]
        newVids = [link.get('download_url') for link in data.get('contents')]
        names = [video.get('name') for video in data.get('contents')]
        print(newVids)
        print(names)
        
        # Do something with the newLinks, newVids, and names variables
        
    else:
        print('Request errored with status', response.status_code)

updatePreviews()