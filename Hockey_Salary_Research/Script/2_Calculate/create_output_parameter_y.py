import os
import pandas as pd

import sys
sys.path.append('../1_Obtain')
import create_local_salary_dataframe

def fetch_lower_salary_cap(season):



def main():


    for season in range(2008, 2025):
        csv_file_path = f'../Data/Salary/dataframe/season={str(season)}.csv'
        df_season = pd.read_csv(csv_file_path)
        df_season['season'] = str(season)


if __name__ == '__main__':
    main()
