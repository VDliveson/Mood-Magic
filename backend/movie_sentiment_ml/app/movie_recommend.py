import pandas as pd 
import numpy as np
import difflib
import sys, os,pathlib
import json


BASE_DIR = os.path.realpath(__file__)
FOLDER_PATH = os.path.join(os.path.dirname(os.path.dirname(BASE_DIR)),'assets')

df1 = pd.read_csv(os.path.join(FOLDER_PATH,'df.csv'))

cosine_sim = np.load(os.path.join(FOLDER_PATH,'test.npy'))



def get_recommendations(title, cosine_sim=cosine_sim):
    # Get the index of the movie that matches the title
    # idx = indices[title]
    list_of_all_titles = df1['title'].tolist()
    closest_match = difflib.get_close_matches(title,list_of_all_titles)[0]

    idx = df1.index[df1['title']==closest_match].tolist()[0]
    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return movie_indices


# print(df1['title'].iloc[get_recommendations('Spider Man')])  # type: ignore