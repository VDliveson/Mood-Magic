import tensorflow as tf
from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
from keras.models import load_model
from keras.preprocessing.text import tokenizer_from_json
import json
import os

from silence_tensorflow import silence_tensorflow
silence_tensorflow()

label_dict = ['anger', 'boredom', 'empty', 'enthusiasm', 'fun', 
                  'happiness', 'hate', 'love', 'neutral', 'relief', 
                  'sadness', 'surprise', 'worry']

def get_emotion_from_text(text):
    '''Returns the emotion of the given text based on the trained model'''

    #with open('lstm_isear_model.h5', 'rb') as handle:
        #model = pickle.load(handle)
    #filename = 'lstm_isear_model.h5'
    one_directory_up_path = os.path.dirname(os.path.dirname( __file__ ))
    model_path = os.path.join(one_directory_up_path, 'lstm_model')
    # model_path = r'D:\Django projects\Movie_recommender_ml\lstm_model'
    model = load_model(model_path)

 

    test_sentence = [text]
    # tokenizer = Tokenizer(num_words=2000)
    # file_dir = os.path.dirname(os.path.realpath(__file__))
    tokenizer_path = r'D:\Django projects\Movie_recommender_ml\react-movie-frontend-ml\backend\movie_sentiment_ml\app\tokenizer.json'
    with open(tokenizer_path) as f:
        data = json.load(f)
        tokenizer = tokenizer_from_json(data)
    sequences = tokenizer.texts_to_sequences(texts = test_sentence)
    test_data = pad_sequences(sequences, maxlen=100)


    emo = model.predict(test_data,verbose=0)
    g = emo[0][0]
    index = 0
    for i in range(1,len(label_dict)):
        if emo[0][i] > g:
            g = emo[0][i]
            index = i
    return label_dict[index]


# text = "I feel joy"
# get_emotion_from_text(text)