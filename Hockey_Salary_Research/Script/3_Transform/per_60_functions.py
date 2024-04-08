
import pandas as pd
import numpy as np

def per_60_to_totals(df, per_60_columns):
    new_df = pd.DataFrame()
    
    for column in per_60_columns:
        this_series = np.round(df[column] * (df['TOI'] / 60)).astype('int')
        new_col = column[:-3]
        new_df[new_col] = this_series
    
    return new_df

def per_60_to_GP(df, per_60_columns):
    new_df = pd.DataFrame()
    
    for column in per_60_columns:
        totals = np.round(df[column] * (df['TOI'] / 60)).astype('int')
        this_series = np.round(totals / df['GP'], 4)
        new_col = column[:-3] + '/GP'
        new_df[new_col] = this_series
    
    return new_df