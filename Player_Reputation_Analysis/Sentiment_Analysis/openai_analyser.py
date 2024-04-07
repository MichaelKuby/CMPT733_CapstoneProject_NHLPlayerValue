import os
from openai import OpenAI

client = OpenAI()
# OpenAI.api_key = os.getenv('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')
# os.environ['OPENAI_API_KEY'] = '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'
# OpenAI.api_key = os.getenv('OPENAI_API_KEY')

def sentiment_analysis(text, target):
    completion = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": f"As an AI with expertise in language and emotion analysis, \
                            your task is to analyze the sentiment of the following text focusing on the {target}. \
                            Do the same in case there are mentions of multiple person in the text. \
                            Please give me a score scale of -1 to 1, -1 being very negative and 1 being very positive. \
                            Decimal numbers are welcome, based on the nuance of the text. \
                            Please give me only the score for the {target}, without any explanation. \
                            If the text is insufficient to determine the sentiment, just give a 0."
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )
    return completion.choices[0].message.content

print(sentiment_analysis("McDavid is the best player in the NHL. But Pettersson is definitely overpaid.", "McDavid"))