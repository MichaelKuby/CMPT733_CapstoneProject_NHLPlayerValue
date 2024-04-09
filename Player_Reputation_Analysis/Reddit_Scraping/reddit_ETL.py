from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator
import os

absolute_path = os.path.abspath(__file__)
scripts_dir = os.path.dirname(absolute_path)
scraper_script = os.path.join(scripts_dir, 'scraper_to_csv.py')
mongo_script = os.path.join(scripts_dir, 'csv_to_mongoDB.py')
sentiment_script = os.path.join(scripts_dir, 'sentiment_to_mongoDB.py')

default_args = {
    'depends_on_past': False,
    'email': ['sangmun_kim@sfu.ca'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'nhl_reddit_ETL',
    default_args=default_args,
    description='A simple DAG to scrape NHL data and save to MongoDB',
    schedule=timedelta(days=1),
    start_date=datetime(2024, 3, 28),
    catchup=False,
) as dag:

    t1 = BashOperator(
        task_id='scraper_to_csv',
        bash_command=f"python3 {scraper_script}",
    )

    t2 = BashOperator(
        task_id='csv_to_mongoDB',
        bash_command=f"python3 {mongo_script}",
        
    )

    t3 = BashOperator(
        task_id='sentiment_to_mongoDB',
        bash_command=f"python3 {sentiment_script}",
        
    )

    t1 >> t2 >> t3
