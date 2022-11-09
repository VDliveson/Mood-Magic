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



# Create your views here.



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
    def retrieve(self, request, *args, **kwargs):
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
        if(movie == ''):
            return JsonResponse(data = '',status = status.HTTP_404_NOT_FOUND,safe = False)
        try:
            movies = get_recommendations(movie)
            data = {'recommendations':movies}
            return JsonResponse(data,status = status.HTTP_200_OK,safe = False)
        except:
            return JsonResponse(data = '',status = status.HTTP_400_BAD_REQUEST,safe = False)
        
        