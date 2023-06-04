import requests

def fetch_hls_urls():
    url = 'https://filespot.platformcraft.ru/2/fs/container/60b080470e47cf6763e5ae85/object/kit'  # Replace with your URL
    headers = {
        'Authorization': 'Bearer eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwibmFtZSI6ImdyZWVuYXRvbSIsImdyb3VwIjoiIiwib3duZXJfbmFtZSI6ImdyZWVuYXRvbSIsInBlcm1pc3Npb25zIjp7IkNETl9zdGF0IjpbeyJpZCI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsIm93bmVyIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1IiwicmlnaHRzIjo3LCJhZHZhbmNlZCI6bnVsbH1dLCJGaWxlc3BvdCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiSWRlbnRpdHkgU2VydmljZSI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiUmVjb3JkZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjp7InNpbXVsdF9saW1pdCI6M319XSwiU3RyZWFtUHVibGlzaCI6W3siaWQiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJvd25lciI6IjYwYjA4MDQ3MGU0N2NmNjc2M2U1YWU4NSIsInJpZ2h0cyI6NywiYWR2YW5jZWQiOm51bGx9XSwiU3RyZWFtZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV0sIlRyYW5zY29kZXIiOlt7ImlkIjoiNjBiMDgwNDcwZTQ3Y2Y2NzYzZTVhZTg1Iiwib3duZXIiOiI2MGIwODA0NzBlNDdjZjY3NjNlNWFlODUiLCJyaWdodHMiOjcsImFkdmFuY2VkIjpudWxsfV19LCJzdXBlciI6ZmFsc2UsImV4cCI6MTY4NTg5NTU4MCwiaWF0IjoxNjg1ODA5MTgwLCJpc3MiOiJhdXRoLnBsYXRmb3JtY3JhZnQucnUifQ.OC5yJPzbmGDvzQnfxcUxRw9w79K8R-eUu7IceiM60Ii0OK3Z5LuM439Y_ldyPBKptl3iYIbspX4qXF4xRA4x7xtW_NoE6KykRywZQkEqoRUywPAl32cjD55Ijj8CvYAu2ScIP34y0TVuWocfZXfcq7ZOjQVNPZp17L43gP3p6xEu0bcpEZnFYW8bVqaIRNV0HGnAdiN8TkeuxW5Nd7E5a-jDUbEeZDJCpKTgIwmuCwHaWY0XjGGIR4-JMelBjwu-rc7hR2hGheZ0_y1KkOae0gXfjQfALkKg17c5VJspyOcXBxV7A_fqYTbylkYjQpi0wotJ-dbixWCm61DZW18USA'}  # Replace with your token

    req = requests.get(url, headers=headers).json()

    link_list = []
    contents = req['contents']

    for link in contents:
        link_list.append(link['download_url'])

    return link_list

if __name__ == '__main__':
    urls = fetch_hls_urls()
    print(urls)
