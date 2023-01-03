from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from .emotion import get_emotion_from_text
from .movie_recommend import get_recommendations
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserMoodService, RegisterUserSerializer
from .models import AppUser,UserMood
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import MyTokenObtainPairSerializer
import requests

API_KEY = "3112db6508f38d836229cb436cfd8e12"

# Create your views here.


response = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key={}&language=en-US".format(API_KEY))
a = response.json()['genres']
class ApiRoot(generics.GenericAPIView):
    name = 'api-root'
    def get(self, request, *args, **kwargs):
        return Response({
            'emotion': reverse('emotion', request=request),
            'register': reverse('register', request= request),
            'login': reverse('login', request= request),
            'login/refresh': reverse('login_refresh',request = request),
            'mood': reverse('set_mood', request= request),
            'mood/<int:pk>': reverse('get_mood',kwargs={"pk": 2},request = request),
            'recommend':reverse('get_recommendations',request = request),
            'sentiment_recommend':reverse('sentiment_recommend',request = request),
            })    
        
    

class Emotion_Predict(APIView):
    """
    Predicts the user emotion based on the trained model
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return HttpResponse('Emotion API')
    
    def post(self, request, *args, **kwargs):

        message = JSONParser().parse(request)['message']
        if(message == ''):
            return JsonResponse(data = '',status = status.HTTP_404_NOT_FOUND,safe = False)
        try:
            emotion = get_emotion_from_text(message)
            data = {'emotion':emotion}
            return JsonResponse(data,status = status.HTTP_200_OK,safe = False)
        except:
            return JsonResponse(data = '',status = status.HTTP_400_BAD_REQUEST,safe = False)
    
    
class Register(APIView):
    """
    Register a new user account
    """
    def post(self, request, *args, **kwargs):
        # print(request.data)
        permission_classes = (AllowAny,)
        serializer = RegisterUserSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Successfully registered a new user"
            data['email'] = user.email
            data['username'] = user.username

            tokenserializer = MyTokenObtainPairSerializer
            if(tokenserializer.is_valid):
                refresh = tokenserializer.get_token(user)
                ref = str(refresh)

                access = str(refresh.access_token)
                data['token'] = {
                    "refresh": ref,
                    "access": access
                }
        else:
            data = serializer.errors
            return JsonResponse(data,status = status.HTTP_400_BAD_REQUEST)
        return JsonResponse(data,status=status.HTTP_201_CREATED)
        

        
    
class RegisterUserMood(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserMoodService
    queryset = UserMood.objects.all()
    
    # lookup_field = "user_id"
    def retrieve(self, *args, **kwargs):
        user_id = kwargs[self.lookup_field]
        user = UserMood.objects.filter(user_id=user_id).first()
        if not user:
            return JsonResponse({'error': "No such user found!"})
        else:
            serializer = self.serializer_class(user)
            return Response(serializer.data,status= status.HTTP_404_NOT_FOUND)
    # def post(self, request,*args, **kwargs):
        
        

        # data = {}
        # try:
        #     if serializer.is_valid(raise_exception=True):
        #         usermood = serializer.save()
        #         data['response'] = 'Mood updated'
        #         return JsonResponse(data,status = status.HTTP_201_CREATED)
        # except:
        #     data = serializer.errors
        #     return JsonResponse(data,status = status.HTTP_400_BAD_REQUEST)
        


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer
    
    
    
# class SentimentPredictorView(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, *args, **kwargs):
#         user = UserMood.objects.filter(user_id=user_id).first()
        
class RelatedMoviePredictorView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return HttpResponse('Recommender')
    
    def post(self, request, *args, **kwargs):

        movie = JSONParser().parse(request)['movie']
        print(movie)
        if(movie == ''):
            return JsonResponse(data = '',status = status.HTTP_404_NOT_FOUND,safe = False)
        try:
            movies = get_recommendations(movie)
            data = {'recommendations':movies}
            print(movies)
            return JsonResponse(data,status = status.HTTP_200_OK,safe = False)
        except:
            return JsonResponse(data = '',status = status.HTTP_400_BAD_REQUEST,safe = False)


def get_genre_id(genre):
    for i in a:
        if(i['name']==genre):
            return i['id']

def filter_genre_by_mood(mood):
    recommended_genre_list = []
    if (mood == 'anger'):
        recommended_genre_list.append(get_genre_id('Comedy'))
        recommended_genre_list.append(get_genre_id('Western'))
        recommended_genre_list.append(get_genre_id('Family'))
    elif(mood == 'sadness'):
        recommended_genre_list.append(get_genre_id('Comedy'))
        recommended_genre_list.append(get_genre_id('Drama'))
        recommended_genre_list.append(get_genre_id('Music'))
        recommended_genre_list.append(get_genre_id('Adventure'))
    elif(mood == 'neutral'):
        recommended_genre_list.append(get_genre_id('Horror'))
        recommended_genre_list.append(get_genre_id('War'))
        recommended_genre_list.append(get_genre_id('Documentary'))
        recommended_genre_list.append(get_genre_id('Animation'))
        recommended_genre_list.append(get_genre_id('History'))
        recommended_genre_list.append(get_genre_id('Crime'))
    elif (mood == 'love'):
        recommended_genre_list.append(get_genre_id('Romance'))
    elif(mood == 'happiness'):
        recommended_genre_list.append(get_genre_id('Fantasy'))
        recommended_genre_list.append(get_genre_id('Thriller'))
        recommended_genre_list.append(get_genre_id('Mystery'))
        recommended_genre_list.append(get_genre_id('Science Fiction'))
        recommended_genre_list.append(get_genre_id('Action'))
    else:
        recommended_genre_list = []
    return recommended_genre_list
    # print()

          
class SentimentPredictorView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        id = request.user.id 
        mood = UserMood.objects.filter(user_id=id).first()
        mood = mood.current_mood
        genre_list = filter_genre_by_mood(mood)
        res = ""
        if(genre_list!=[]):
            for i in range(len(genre_list)):
                if(i != (len(genre_list) -1)):
                    res +=str(genre_list[i])+","
                else:
                    res+=str(genre_list[i])
            data = {}
            data["genre"] = res;
            
            return JsonResponse(data,status = status.HTTP_200_OK,safe = False)
        else:
            return JsonResponse({},status = status.HTTP_400_BAD_REQUEST,safe = False)
        # if mood:
        #     mood = mood.current_mood
        
            # filter_genre_by_mood(mood)
            
            
            
            
                
        
    
    # def post(self, request, *args, **kwargs):
        
        