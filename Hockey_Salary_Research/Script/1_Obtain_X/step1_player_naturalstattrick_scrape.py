# Purpose: Scrape data from Natural Stat Trick for NHL player data
import os
import requests
import pandas as pd
import time
from bs4 import BeautifulSoup as BS


def main():
    # Set the current working directory to the script's directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    start_year = 2007
    end_year = 2024

    stat_types = ['std', 'oi', 'bio']

    directory = "../../Data/Lake/1A_Output_NHL_PlayerData_NaturalStatTrick"
    temp_html_directory = "../../Data/Lake/1A_Output_NHL_PlayerData_NaturalStatTrick/html_temp"

    if not os.path.exists(directory):
        os.makedirs(directory)

    if not os.path.exists(temp_html_directory):
        os.makedirs(temp_html_directory)

    for stat_type in stat_types:

        stat_type_directory = os.path.join(directory, stat_type)
        if not os.path.exists(stat_type_directory):
            os.makedirs(stat_type_directory)

        for year in range(start_year, end_year + 1):
            URL = ('https://www.naturalstattrick.com/playerteams.php?fromseason=' + str(year) + str(year + 1) +
                   '&thruseason=' + str(year) + str(year + 1) +
                   '&stype=2&sit=all&score=all&stdoi=' + stat_type +
                   '&rate=y&team=ALL&pos=S&loc=B&toi=0&gpfilt=nonefd=&td=&tgp=410'
                   '&lines=single&draftteam=ALL')
            page = requests.get(URL)

            # Save the page content to a temporary file
            temp_file_path = os.path.join(temp_html_directory, f'{stat_type}_{year}.html')
            with open(temp_file_path, 'w', encoding='utf-8') as temp_file:
                temp_file.write(page.text)

            # Re-load the page content from the saved file
            with open(temp_file_path, 'r', encoding='utf-8') as temp_file:
                soup = BS(temp_file, 'html.parser')

            tables = soup.find_all('table')
            table = tables[0] if tables else None

            if table is None:
                print(f'Table not found for year {year}, and stat_type {stat_type}.')
                print()
            else:
                # Extract the headers
                headers = [header.get_text() for header in table.find_all('th')]

                # Extract the rows
                rows = table.find_all('tr')

                # Extract the data from the rows
                table_data = []
                for row in rows[1:]:
                    cols = row.find_all('td')
                    cols = [ele.text.strip() for ele in cols]
                    table_data.append([ele for ele in cols if ele])

                # Create a pandas dataframe from the table data
                df = pd.DataFrame(table_data, columns=headers)

                # Drop the first column
                df = df.drop(df.columns[0], axis=1)

                # add year column to the first column of the dataframe
                df['Year'] = year

                # Move the year column to the front
                cols = df.columns.tolist()
                cols = cols[-1:] + cols[:-1]
                df = df[cols]

                df = df.sort_values('Player')

                # Save the dataframe as a csv file
                df.to_csv(directory + '/' + stat_type + '/regSeason_allStrengths_allScores_' +
                          stat_type + '_' + str(year) + '.csv', index=False)

                # Avoid overloading their server
                time.sleep(10)

if __name__ == '__main__':
    main()
