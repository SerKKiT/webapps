import requests, re

url = 'https://auth.platformcraft.ru/token'
headers = {'Content-Type': 'application/x-www-form-urlencoded'}
data = {'login': 'greenatom', 'password': '123123'} 
    # Sending a POST request to retrieve the access token
response = requests.post(url, headers=headers, data=data)
    
json_data = response.json()
access_token = json_data.get('access_token')
    # Extracting the name from instance
mediatitle = instance.title
name = re.sub(r'\.[^.]*$', '', mediatitle)
name=name.lower()
    # Fetching player data using the access token
url = f'https://api.platformcraft.ru/1/players?name={name}'
headers = {'Authorization': f'Bearer {access_token}'}
    
response = requests.get(url, headers=headers)    
json_data = response.json()
new_id = [player['id'] for player in json_data.get('players', [])]
id=new_id[0]

url_for_player = f'https://api.platformcraft.ru/1/players/{id}?delete_related=true'
url_for_dir= f'https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit/{name}'
req = requests.delete(url_for_player, headers=headers)
req = requests.delete(url_for_dir, headers=headers)
print(req.status_code)
print(req.headers)
print(req.text)

