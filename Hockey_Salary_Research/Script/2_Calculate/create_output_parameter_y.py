import os
import pandas as pd

import sys
from pathlib import Path

current_dir = Path(__file__).resolve().parent
one_obtain_dir = current_dir.parent / '1_Obtain'
sys.path.append(str(one_obtain_dir))
import create_local_salary_dataframe


def fetch_salary_cap_csv_path():
    return '../../Data/Salary/SALARY_CAP.csv' # not the problem


def convert_currency_to_int(currency_str):
    numeric_str = currency_str.replace('$', '').replace(',', '')
    return int(numeric_str)


def fetch_upper_salary_cap(season):
    df_salary_cap = pd.read_csv(fetch_salary_cap_csv_path())

    season_str_suffix = str(season)[2:]
    # Get the previous season's suffix
    prev_season = str(season -1)
    key_season = f"{prev_season}-{season_str_suffix}"

    matching_row = df_salary_cap[df_salary_cap['SEASON'] == key_season]
    if not matching_row.empty:
        return convert_currency_to_int(matching_row['UPPER LIMIT\n'].iloc[0])
    else:
        return None


def main():
    
    # Set the current working directory to the script's directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    for season in range(2008, 2025):
        csv_file_path = create_local_salary_dataframe.fetch_local_csv_path(season)
        df_season = pd.read_csv(csv_file_path)
        df_season['season'] = str(season-1) + '-' + str(season)[2:]

        upper_salary_cap = fetch_upper_salary_cap(season)
        df_season['Y_Salary_Cap'] = upper_salary_cap
        df_season['Y_Salary_Cap_Percentage'] = df_season['CAP HIT'].apply(convert_currency_to_int) / upper_salary_cap

        df_season.to_csv(create_local_salary_dataframe.fetch_local_csv_path(season), index=False, encoding='utf-8')


if __name__ == '__main__':
    main()
