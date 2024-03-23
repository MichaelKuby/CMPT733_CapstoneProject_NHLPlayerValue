import time
import requests
from bs4 import BeautifulSoup

def fetch_salary_url(season, page):
    web_url = f'http://www.capfriendly.com/browse/active/{season}?stats-season=2024&display=signing-team,birthday,country,draft,expiry-year,performance-bonus,signing-bonus,aav,length,base-salary,type,signing-age&hide=skater-stats,goalie-stats&pg={str(page)}'
    return web_url


def download_web_page(url_string, file_path, file_name):
    response = requests.get(url_string)
    if response.status_code == 200:
        with open(file_path + '/' + file_name + '.html', 'w', encoding='utf-8') as file:
            file.write(response.text)

            print(f"download successful, url = {url_string}")
    else:
        print(f"download failed, url = {url_string}")


def fetch_page_info(season, page):
    web_url = fetch_salary_url(season, page)

    download_web_page(web_url, '../../Data/Salary/html', f'season={str(season)},page={str(page)}')


def fetch_page_max_count(season):
    web_url = fetch_salary_url(season, 1)

    response = requests.get(web_url)
    if response.status_code == 200:
        print("fetch_page_max_count successful")

        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        pagination_div = soup.find("div", class_="pagination r")
        specific_div = pagination_div.find("div", class_="r", style="margin:0 4px 0 0")
        specific_text = specific_div.get_text(strip=True)
        last_number_part = specific_text.split('of')[1]
        page_number = int(last_number_part.strip())
        return page_number

    else:
        print(f"fetch_page_max_count failed, url = {web_url}")
        return None


def main():
    season_page_count_dict = {}
    for season in range(2008, 2025):
        max_page_count = fetch_page_max_count(season)
        time.sleep(3.5)
        season_page_count_dict[season] = max_page_count

        for page_index in range(1, max_page_count + 1):
            fetch_page_info(season, page_index)
            time.sleep(1.5)

    print("finish")


if __name__ == '__main__':
    main()
