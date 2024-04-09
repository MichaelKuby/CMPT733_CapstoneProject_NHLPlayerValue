import pandas as pd
import re
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from team_mappings import TEAM_MAPPING
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

def retrieve_player_data():
    df = pd.read_csv('../../Hockey_Salary_Research/Data/Warehouse/MergedData/merged_data_clean.csv')
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
    df_sentiment_target_single.to_csv('sentiment_result_raw.csv', index=False)

    return df_sentiment_target_single

def group_by_name(df):
    player_grouped_df = df.groupby('mentioned_players').agg(
        count=('sentiment_result', 'size'),
        average_sentiment=('sentiment_result', 'mean')
    ).reset_index().rename(columns={'mentioned_players': 'name'})
    return player_grouped_df


def main():
    client = connect_to_mongoDB()

    # df_player = retrieve_player_data()
    # df_reddit = retrieve_reddit_data(client)
    # df_reddit = add_player_count(df_reddit, df_player)
    # df_reddit = analyze_sentiment(df_reddit, df_player)
    df_reddit = pd.read_csv('sentiment_result_raw.csv')
    df_reddit = group_by_name(df_reddit)

    records = df_reddit.to_dict('records')
    db = client['nhl']
    new_collection = db['sentiment_result']
    new_collection.insert_many(records)

if __name__ == "__main__":
    main()
