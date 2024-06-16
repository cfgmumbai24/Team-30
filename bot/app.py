from flask import Flask, render_template, request
from serpapi import GoogleSearch
import requests

app = Flask(__name__)

def search_quora(query):
    params = {
        "engine": "google",
        "q": f"site:quora.com {query}",
        "api_key": ""  # Replace with your actual SerpApi key
    }
    
    search = GoogleSearch(params)
    results = search.get_dict()

    # Debugging: Print the entire response
    print("API Response:", results)

    if 'organic_results' in results:
        return results['organic_results']
    else:
        return []

def search_youtube(query):
    api_key = ""  # Replace with your actual YouTube Data API key
    search_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": query,
        "key": api_key,
        "maxResults": 5,
        "type": "video"
    }
    
    response = requests.get(search_url, params=params)
    results = response.json()

    # Debugging: Print the entire response
    print("YouTube API Response:", results)

    if 'items' in results:
        return [{"title": item['snippet']['title'], "link": f"https://www.youtube.com/watch?v={item['id']['videoId']}"} for item in results['items']]
    else:
        return []

@app.route('/', methods=['GET', 'POST'])
def index():
    results = []
    videos = []
    query = ''
    if request.method == 'POST':
        query = request.form['query']
        results = search_quora(query)
        videos = search_youtube(query)
        # Debugging: Print the results
        print("Search Results:", results)
        print("YouTube Results:", videos)
    return render_template('index.html', results=results, videos=videos, query=query)

if __name__ == "__main__":
    app.run(debug=True)