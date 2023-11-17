# Sentiment based movie recommender system

This project is a combination of -

## 1) LSTM-based sentiment recommender chatbot trained on Twitter data
* Dataset used - [Figure 8 labelled textual dataset](https://www.kaggle.com/datasets/manuelbenedicto/figure-eight-labelled-textual-dataset)

* Model summary :

![image](https://github.com/VDliveson/react-movie-frontend-ml/assets/72307306/96cd5f79-eeec-4368-94b8-207717df8ff1)

* List of emotions detected :


| Index | Emotion     |
|-------|-------------|
| 0     | anger       |
| 1     | boredom     |
| 2     | empty       |
| 3     | enthusiasm  |
| 4     | fun         |
| 5     | happiness   |
| 6     | hate        |
| 7     | love        |
| 8     | neutral     |
| 9     | relief      |
| 10    | sadness     |
| 11    | surprise    |
| 12    | worry       |


* Model Evaluation

![image](https://github.com/VDliveson/react-movie-frontend-ml/assets/72307306/ba08adc9-841a-43ac-ae87-8b908e7c63bd)
![image](https://github.com/VDliveson/react-movie-frontend-ml/assets/72307306/4dba1bac-c76d-4d43-aae2-8e7722325669)

* Model Accuracy : 37%

## 2) Cosine Similarity based Movie Recommendation System

![image](https://github.com/VDliveson/react-movie-frontend-ml/assets/72307306/d7e5f410-71ae-4f74-b307-28780e48ea3d)

* Dataset used : [The Movies Dataset](https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset/discussion)
* Vectorizer used : Count Vectorizer
* Cosine Similarity used to recommend movie IDs based on movie title

## Frameworks used
The frontend has been developed in ```React JS``` & the backend consists of APIs made in ```Django Rest Framework``` & ```Python```.
The project has been dockerised and near deployment.

## Preview
![image](https://github.com/VDliveson/react-movie-frontend-ml/assets/72307306/37432be8-b4ce-47a3-bc0f-50d995786f6d)

![image](https://github.com/VDliveson/react-movie-frontend-ml/assets/72307306/96dc80c6-9d73-4db1-874e-d6d1324397fa)

