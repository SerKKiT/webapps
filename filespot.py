import requests
import json
url = 'https://api.platformcraft.ru/1/transcoder/presets' #Вместо {your_owner_ID} укажите свой. После "object" укажите желаемый путь и название файла.
headers = {'Authorization': 'Bearer eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwibmFtZSI6ImdyZWVuYXRvbSIsImdyb3VwIjoiIiwib3duZXJfbmFtZSI6ImdyZWVuYXRvbSIsInBlcm1pc3Npb25zIjp7IkNETl9zdGF0IjpbeyJpZCI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsIm93bmVyIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwicmlnaHRzIjo3LCJhZHZhbmNlZCI6bnVsbH1dLCJGaWxlc3BvdCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiSWRlbnRpdHkgU2VydmljZSI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiUmVjb3JkZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjp7InNpbXVsdF9saW1pdCI6M319XSwiU3RyZWFtUHVibGlzaCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiU3RyZWFtZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV0sIlRyYW5zY29kZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV19LCJzdXBlciI6ZmFsc2UsImV4cCI6MTY4Nzk2MzQ4OCwiaWF0IjoxNjg3ODc3MDg4LCJpc3MiOiJhdXRoLnBsYXRmb3JtY3JhZnQucnUifQ.IP7eJczpp2PBhfb42WGTZiNY1iIGCKD4iEDnfcnRcLPiQX6OGgGttcm71-M43EmdZqZ02dPagBiWDiV6gtXAXSOg6KcGTNrSGyI0McnckGY5OT5-iRcpuegswWlalzZi1_MZdFvSCk1sB9IehumWLNPjkZFx6jBfoYZh_e2zBrZ28gNizumE-VMfLAiD5IH36s9gQjni2vX2ML68F3A9jfx0odSxyG0bhik4vKEYRLfcVdwqGX4ZEeAk8-igXoGUnkrr0eiLIF-IHd1ILYYkGKGWn8ILDYK6WeE0w_ZJa4PlXUJKEdoJrfZgGEVTEEPaR9BOZ9h9eZs1RCWdgFix2A'} #Вместо {your_access_token} подставьте свой
#files = {'file' : open('C:/Users/KiT/Videos/chainsawman_video.mp4', 'rb')}

'''body = """{
    "autoencoding": "true",
    "name": "/kit/chainsawman_video.mp4",
    "presets": "5676a27cf9cb101634000006,5676a27cf9cb101634000004"
}"""
'''
#body = json.loads(body)
req = requests.get(url, headers=headers)

print(req.text)


'''link_list = []
contents = req['presets']

for link in contents:
    link_list.append(link['id']+"    "+ link['name']+"      ")

print(link_list)'''