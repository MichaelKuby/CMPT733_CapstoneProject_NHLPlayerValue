import csv
import requests
import json
import os
from datetime import datetime


def write_to_mongodb(api_url, api_key, document):

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': api_key,
    }

    payload = json.dumps({
        "collection": "reddit",
        "database": "nhl",
        "dataSource": "nhlreddit",
        "document": document
    })

    response = requests.post(api_url, headers=headers, data=payload)
    try:
        response_data = response.json()
        if isinstance(response_data, dict):
            if 'insertedId' in response_data:
                print(f"Document inserted - ID: {response_data['insertedId']}")
            elif 'error' in response_data or 'errmsg' in response_data:
                error_message = response_data.get('error') or response_data.get('errmsg', 'Unknown error')
                print(f"Error: {error_message}")
            else:
                print("Unexpected JSON response received.")
        else:
            print(f"Unexpected JSON structure received: {response_data}")

    except json.JSONDecodeError:
        response_data = response.text  # Use raw response text if JSON parsing fails
        if 'duplicate key error' in response_data:
            print("Duplicate document skipped.")
        else:
            print(f"Unexpected response received: {response_data}")

def main():
    api_url = "https://us-west-2.aws.data.mongodb-api.com/app/data-amuyq/endpoint/data/v1/action/insertOne"
    api_key = 'Y33Y4QfoKMgSbCsSRxpULTM66OqQ9wEHg9QbLf4i9mTWM2zo7sI8GvK8UOH4Y02e'

    today = datetime.now().strftime("%Y%m%d")
    absolute_path = os.path.abspath(__file__)
    relative_path = f'scraped_data/Date={today}'
    csv_path = os.path.join(os.path.dirname(absolute_path), relative_path)
    csv_file = f'{csv_path}/part-00000.csv'

    with open(csv_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            url = row.get('URL', '').strip()  # Use 'URL' if your CSV header is 'URL'
            if not url:
                print(f"Skipping document with empty URL: {row}")
                continue

            document = {key.lower(): row[key].strip() if isinstance(row[key], str) else row[key] for key in row}
            # print(f"Processing document with URL: {url}")
            write_to_mongodb(api_url, api_key, document)

    print("Script completed. Check the MongoDB collection for the data.")

if __name__ == '__main__':
    main()
