AIRFLOW_MODE = False

if [ $AIRFLOW_MODE = True ]; then
    echo "Running in Airflow mode"
    python3 reddit_ETL.py
else
    echo "Running in normal mode"
    python3 scraper_to_csv.py
    python3 csv_to_mongoDB.py
fi
