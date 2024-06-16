# Import libraries
import streamlit as st
import pandas as pd

# Page setup
st.set_page_config(page_title="Multiply user helper", page_icon="🐍", layout="wide")
st.title("Search what you need")


df = pd.read_csv('all_videos_table.csv', dtype=str).fillna("")

# Show the dataframe (we'll delete this later)
# st.write(df.head())



text_search = st.text_input("Search videos by title or speaker", value="")

import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
warnings.filterwarnings("ignore", message="Unverified HTTPS request")
warnings.filterwarnings("ignore", message="InsecureRequestWarning")
from opensearchpy import OpenSearch

CLUSTER_URL = 'https://localhost:9200'

def get_os_client(cluster_url = CLUSTER_URL,
                  username='admin',
                  password='admin'):
    '''
    Get OpenSearch client
    :param cluster_url: cluster URL like https://ml-te-netwo-1s12ba42br23v-ff1736fa7db98ff2.elb.us-west-2.amazonaws.com:443
    :return: OpenSearch client
    '''
    client = OpenSearch(
        hosts=[cluster_url],
        http_auth=(username, password),
        verify_certs=False
    )
    return client

client = get_os_client()

from sentence_transformers import SentenceTransformer

MODEL_NAME = "sentence-transformers/msmarco-distilbert-base-tas-b"
model = SentenceTransformer(MODEL_NAME)

# EMBEDDING_DIM = model.encode(["Sample sentence"])[0].shape[0]
# # print(EMBEDDING_DIM)#will be used ahead

index_name = "all_videos"

# index_body = {
#   "settings": {
#     "index": {
#       "knn": True,
#       "knn.algo_param.ef_search": 100
#     }
#   },
#   "mappings": { #how do we store, 
#     "properties": {
#         "embedding": {
#           "type": "knn_vector", #we are going to put 
#           "dimension": EMBEDDING_DIM,
#           "method": {
#             "name": "hnsw",
#             "space_type": "l2",
#             "engine": "nmslib",
#             "parameters": {
#               "ef_construction": 128,
#               "m": 24
#             }
#          }
#      }
#     }
# }}


# response = client.indices.delete(index = index_name)

# response = client.indices.create(index=index_name, body=index_body)

# import pandas as pd

# for index, row in df.iterrows():
#     # print(f"Id: {row['time']}, Start: {row['time']}, Overview: {row['text']},url:{row['video_url']}")
#     # original_title = row['time']
#     overview = row['text']
#     id = row['time']
#     st_time=row['time']
#     url=row['video_url']
#     # Sentence transformer model takes list of documents as input and returns list of embeddings.
#     embedding = model.encode([overview])[0]
#     # We are inserting a data point with 3 attribute, "id", "text" and "embedding" as knn_vector type.
#     my_doc = {"id": id, "plot": overview, "embedding": embedding,"time" : st_time,"url":url}
#     res = client.index(
#         index=index_name,
#         body=my_doc,
#         id = str(index),
#         refresh = True
#         )
# # """ Example query text """
# # user_query = "Applying Lens Blur"
# # user_query = "hide content"
# # user_query = "expanding"
# # user_query="deleting people"
# # user_query='How does the Generative AI Remove feature in Lightroom work?'
# # user_query="What steps does Jacob describe for creating a drop shadow in Illustrator?"
# # user_query="Inserting drop shadow"
# # user_query="cut it"
# # user_query="How to create a montage using markers in Premiere Pro?"
# # user_query="select and arrange photos for a video montage?"
# # user_query="add markers to a timeline for precise editing"
# # user_query="delete unwanted sections of a video sequence in Premiere Pro"
# user_query="Asset Availability and Customization in adobe"
user_query=text_search


# # """ Embedding the query by using the same model """
query_embedding = model.encode((user_query))


query_body = {
    "query": {"knn": {"embedding": {"vector": query_embedding, "k": 10}}},
    "_source": False,
    "fields": ["id", "title", "plot","time","url"],
    "size":10  # vivek added this , top 5
}

results = client.search(
    body=query_body,
    index=index_name
)


for i, result in enumerate(results["hits"]["hits"]):
    # print(i,results)
    plot = result['fields']['plot'][0]
    url = result['fields']['url'][0]
    score = result['_score']
    time=result['fields']['time'][0]
    # start_time=
    # st.write(f"{i+1}., Start Time: {time} Score: {score}, Url: {url}  Plot: {plot}")
    VIDEO_URL = url
    with st.container():
        if time!=0:
            # st.write(plot)
            col1,col2=st.columns(spec=[0.7,0.3])
            # st.video(VIDEO_URL,start_time=int(time))
            with col1:
                st.video(VIDEO_URL,start_time=int(time))
            st.write("")

            # st.write(f"Start Time: {time}")
        else:
            to_show=plot
            url_to_show=url
            col1,col2=st.columns(spec=[0.7,0.3])
            # st.video(VIDEO_URL,start_time=int(time))
            with col1:
                    # st.video(VIDEO_URL,start_time=int(time))
                st.write(f"Title : {to_show}")
                st.link_button("Go to module", VIDEO_URL)
                st.write("")



    # print(f"{i+1}., Start Time: {time} Score: {score}, Url: {url}  Plot: {plot}")
# st.video("https://www.youtube.com/watch?v=xUcIe1Sg7jw",start_time=60)  #trying if it starts from the correct time and it does