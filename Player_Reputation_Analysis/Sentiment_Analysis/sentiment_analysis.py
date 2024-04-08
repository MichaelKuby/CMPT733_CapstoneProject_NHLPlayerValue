import requests
import os
import re
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from team_mappings import TEAM_MAPPING
import pandas as pd
from openai_analyser import sentiment_analysis

def connect_to_mongoDB():
    uri = 'mongodb+srv://reddit_analyst:1234567890@nhlreddit.c4p5e6h.mongodb.net/'

    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        print('Connected to MongoDB')
    except Exception as e:
        print(f"Connection error: {e}")
    return client

def retrieve_reddit_data(client):
    db = client['nhl']
    collection = db['reddit']

    try:
        documents = collection.find()
        documents_list = list(documents)
        df_reddit = pd.DataFrame(documents_list)
    except Exception as e:
        print(f"Error retrieving data: {e}")
    
    return df_reddit

# def df_to_db(target_db, collection, df):
#     records = df.to_dict('records')
#     db = target_db
#     new_collection = collection
#     new_collection.insert_many(records)

def retrieve_player_data():
    df = pd.read_csv('../../Hockey_Salary_Research/Data/entitiesResolved/merged_data_clean.csv')
    print(df.shape)
    df_player = (
    df.loc[df['SEASON'] == '2023-24', ['PLAYER', 'TEAM']]
    .drop_duplicates(subset='PLAYER')
    .assign(
        PLAYER=lambda x: x['PLAYER'].str.title(),
        FIRST=lambda x: x['PLAYER'].str.split(' ', n=1, expand=True)[0],
        LAST=lambda x: x['PLAYER'].str.split(' ', n=1, expand=True)[1],
        TEAM_FULLNAME=lambda x: x['TEAM'].map(TEAM_MAPPING)
        )
    .loc[:, ['PLAYER', 'FIRST', 'LAST', 'TEAM_FULLNAME', 'TEAM']]
    )

    return df_player

def add_player_count(df_reddit, df_player):
    names = df_player['PLAYER']
    pattern = '|'.join([re.escape(name) for name in names.unique()])

    def count_player_names(row):
        count = sum(bool(re.search(pattern, str(cell), re.IGNORECASE)) for cell in row)
        return count if count > 0 else None

    df_reddit['player_count'] = df_reddit.apply(count_player_names, axis=1)
    df_reddit['with_name'] = df_reddit['player_count'] > 0
    print(f"Total rows containing player names: {df_reddit['with_name'].sum()}")

    return df_reddit

def analyze_sentiment(df_reddit, df_player):
    df_reddit['combined_text'] = df_reddit['title'] + '\n' + df_reddit['selftext']
    df_sentiment_target = df_reddit[df_reddit['with_name']]
    df_sentiment_target = df_sentiment_target[['_id', 'created_date', 'score', 'combined_text']]

    player_names = df_player['PLAYER'].tolist()
    def find_players_in_text(text, player_names):
        mentioned_players = []

        for name in player_names:
            if name in text:
                mentioned_players.append(name)

        return ', '.join(mentioned_players)
    
    df_sentiment_target['mentioned_players'] = df_sentiment_target['combined_text'].apply(find_players_in_text, player_names=player_names)
    df_sentiment_target['mentioned_players_count'] = df_sentiment_target['mentioned_players'].apply(lambda x: len(x.split(', ')) if x else 0)
    df_sentiment_target_single = df_sentiment_target[df_sentiment_target['mentioned_players_count'] == 1].copy()
    df_sentiment_target_single.loc[:, 'sentiment_result'] = (
        df_sentiment_target_single
        .apply(lambda row: sentiment_analysis(row['combined_text'], row['mentioned_players']), axis=1)
    )
    df_sentiment_target_single.to_csv('sentiment_analysis_results.csv', index=False)

    return df_sentiment_target_single


def main():
    client = connect_to_mongoDB()
    df_player = retrieve_player_data()
    df_reddit = retrieve_reddit_data(client)
    df_reddit = add_player_count(df_reddit, df_player)
    analyze_sentiment(df_reddit, df_player)

    # df_sentiment_target_single = pd.read_csv('sentiment_analysis_results.csv')
    # df_sentiment_result = df_sentiment_target_single
    # min_score = df_sentiment_result['score'].min()
    # max_score = df_sentiment_result['score'].max()
    # df_sentiment_result['normalized_score'] = 1 + ((df_sentiment_result['score'] - min_score) * (9 / (max_score - min_score)))
    # df_sentiment_result['final_result'] = df_sentiment_result['normalized_score'] * df_sentiment_result['sentiment_result']
    # print(df_sentiment_result.head(30))
    # grouped_df = df_sentiment_result.groupby('mentioned_players')['final_result'].sum().reset_index()
    # sorted_grouped_df = grouped_df.sort_values(by='final_result', ascending=False)
    # print(sorted_grouped_df.head(30))
    # print(sorted_grouped_df.tail(30))

    # df_sentiment_target_single.to_csv('sentiment_analysis_results.csv', index=False)

    # def count_player_names_in_column(text, pattern):
    #     if pd.isna(text):
    #         return 0
    #     return int(bool(re.search(pattern, str(text), re.IGNORECASE)))

    # df_reddit['title_player_count'] = df_reddit['title'].apply(count_player_names_in_column, pattern=pattern)
    # df_reddit['selftext_player_count'] = df_reddit['selftext'].apply(count_player_names_in_column, pattern=pattern)

    # print(df_reddit.sort_values(by='title_player_count', ascending=False).head())
    # print(df_reddit.sort_values(by='selftext_player_count', ascending=False).head())

    # title_player_count_sum = df_reddit['title_player_count'].sum()
    # print(f"Total player mentions in title: {title_player_count_sum}")

    # # Sum of 'selftext_player_count'
    # selftext_player_count_sum = df_reddit['selftext_player_count'].sum()
    # print(f"Total player mentions in selftext: {selftext_player_count_sum}")

    # rows_with_both_counts = df_reddit[(df_reddit['title_player_count'] > 0) & (df_reddit['selftext_player_count'] > 0)]

    # # Get the number of rows that have both counts
    # number_of_rows_with_both_counts = len(rows_with_both_counts)
    # print(f"Number of rows with player mentions in both title and selftext: {number_of_rows_with_both_counts}")




    # df_player['appearance_count'] = 0
    # for index, row in df_player.iterrows():
    #     pattern = re.escape(row['LAST'])
    #     count = df_reddit.apply(lambda x: x.astype(str).str.contains(pattern, case=False, regex=True)).any(axis=1).sum()
    #     df_player.at[index, 'appearance_count'] = count
    


    # filtered_df = df_reddit[df_reddit['with_name']].copy()
    # filtered_df['sentiment'] = filtered_df['selftext'].apply(sentiment_analysis)
    # print(filtered_df[['selftext', 'sentiment']])

    # df_to_db(client['nhl'], db['reddit_name_check'], df_reddit)
    # records = df_reddit.to_dict('records')
    # db = client['nhl']
    # new_collection = db['reddit_name_check']
    # new_collection.insert_many(records)

    # records = df_player.to_dict('records')
    # db = client['nhl']
    # new_collection = db['reddit_player']
    # new_collection.insert_many(records)

if __name__ == "__main__":
    main()
