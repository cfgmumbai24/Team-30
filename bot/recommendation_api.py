# Import necessary libraries
from flask import Flask, request, jsonify
import pandas as pd
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize the Flask app
app = Flask(__name__)

# Load dataset
df = pd.read_csv("udemy_courses.csv")

# Clean text
df['clean_course_title'] = df['course_title'].apply(nfx.remove_stopwords)
df['clean_course_title'] = df['clean_course_title'].apply(nfx.remove_special_characters)

# Vectorize the text
count_vect = CountVectorizer()
cv_mat = count_vect.fit_transform(df['clean_course_title'])

# Cosine similarity matrix
cosine_sim_mat = cosine_similarity(cv_mat)

# Get course indices
course_indices = pd.Series(df.index, index=df['course_title']).drop_duplicates()

# Define the recommendation function
def recommend_course(title, num_of_rec=5):
    if title not in course_indices:
        return pd.DataFrame({'course_title': [], 'similarity_scores': []})
    
    idx = course_indices[title]
    scores = list(enumerate(cosine_sim_mat[idx]))
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
    selected_course_indices = [i[0] for i in sorted_scores[1:num_of_rec+1]]
    selected_course_scores = [i[1] for i in sorted_scores[1:num_of_rec+1]]
    result = df['course_title'].iloc[selected_course_indices]
    rec_df = pd.DataFrame(result)
    rec_df['similarity_scores'] = selected_course_scores
    return rec_df

# Define the API route for recommendations
@app.route('/api/recommend', methods=['GET'])
def recommend():
    # Get query parameters
    title = request.args.get('title', default=None, type=str)
    num_of_rec = request.args.get('num_of_rec', default=5, type=int)

    if title is None:
        return jsonify({"error": "Please provide a course title"}), 400

    # Get recommendations
    recommendations = recommend_course(title, num_of_rec)
    recommendations_list = recommendations.to_dict(orient='records')

    return jsonify(recommendations_list)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
