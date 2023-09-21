import requests, re

url = 'https://auth.platformcraft.ru/token'
headers = {'Content-Type': 'application/x-www-form-urlencoded'}
data = {'login': 'greenatom', 'password': '123123'}
    
    # Sending a POST request to retrieve the access token
response = requests.post(url, headers=headers, data=data)
    
if response.status_code != 200:
    print('Request errored with status', response.status_code)
    
    
json_data = response.json()
access_token = json_data.get('access_token')
    
if not access_token:
    print('Access token not found')
    
    # Extracting the name from the page title
page_title = 'create_future'  # Replace with actual page title

name = re.sub(r'\.[^.]*$', '', page_title)
name=name.lower()
print(name)
    # Fetching player data using the access token
url = f'https://api.platformcraft.ru/1/players?name={name}'

print(url)
headers = {'Authorization': f'Bearer {access_token}'}
    
response = requests.get(url, headers=headers)
    
if response.status_code != 200:
    print('Error occurred while fetching data:', response.text)
    
    
json_data = response.json()
new_id = [player['id'] for player in json_data.get('players', [])]
id=new_id[0]

hls_file_url = f'https://video.platformcraft.ru/vod/{id}/playlist.m3u8'
print(hls_file_url)