import praw
import csv
import os
from datetime import datetime, timezone


def scrape_subreddit(subreddit, writer, category):
    for post in getattr(subreddit, category)(limit=100):
        created_date_time = datetime.fromtimestamp(post.created_utc, tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
        created_date = created_date_time[:10]
        writer.writerow([post.title, post.url, post.score, post.subreddit, post.selftext, created_date_time, created_date, category])
        print(f"Writing post from r/{post.subreddit}: {post.title}")

def main():
    reddit = praw.Reddit(
        client_id='TGZgAcflknntVV2ahSrauQ',
        client_secret='DtmJKbP9iTNqpWTYX1CwLtXBC9u5KQ',
        user_agent='NHL_scrap'
    )

    categories = ['new', 'hot', 'top']
    subreddits_to_scrape = ['NHL']
    today = datetime.now().strftime("%Y%m%d")
    absolute_path = os.path.abspath(__file__)
    relative_path = f'scraped_data/Date={today}'
    output_directory = os.path.join(os.path.dirname(absolute_path), relative_path)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    filename = f"{output_directory}/part-00000.csv"

    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Title', 'URL', 'Score', 'Subreddit', 'Selftext', 'Created_Date_Time', 'Created_Date', 'Category'])
        for subreddit_name in subreddits_to_scrape:
            subreddit = reddit.subreddit(subreddit_name)
            for category in categories:
                print(f"Scraping r/{subreddit_name} [{category}]")
                scrape_subreddit(subreddit, writer, category)

    print("Script completed. Check the CSV file in the directory.")

if __name__ == "__main__":
    main()
    