import os
import pandas as pd
from bs4 import BeautifulSoup


def load_local_html_file(season, page):
    file_path = f'../Data/Salary/html/season={str(season)},page={str(page)}.html'
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        thead = soup.select_one('table.tbl.sortable > thead')
        tbody = soup.select_one('table.tbl.sortable > tbody')
        columns = [th.get_text(strip=True) for th in thead.select('th')]
        rows = []
        for tr in tbody.select('tr'):
            rows.append([td.get_text(strip=True) for td in tr.select('td')])

        item_df = pd.DataFrame(rows, columns=columns)
        item_df['PLAYER'] = item_df['PLAYER'].str.replace(r'^\d+\.', '', regex=True)
        return item_df


def main():
    for season in range(2007, 2025):
        item_df_array = []

        for page in range(1, 40):
            file_path = f'../Data/Salary/html/season={str(season)},page={str(page)}.html'
            if os.path.exists(file_path):
                item_df = load_local_html_file(season, page)
                item_df_array.append(item_df)

            else:
                break

        combined_df = pd.concat(item_df_array, ignore_index=True)
        combined_df.to_csv(f'../Data/Salary/dataframe/season={str(season)}.csv', index=False, encoding='utf-8')

    print('finish')


if __name__ == '__main__':
    main()
