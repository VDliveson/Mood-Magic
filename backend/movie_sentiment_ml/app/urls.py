from webbrowser import get
from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
# from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# router = DefaultRouter()
# router.register('mood',views.RegisterUserMood,basename = "mood")


get_mood = views.RegisterUserMood.as_view({'get': 'retrieve'})
set_mood = views.RegisterUserMood.as_view({'post': 'create'})


urlpatterns = [
    path('',views.ApiRoot.as_view(),name="api-root"),
    path('emotion', views.Emotion_Predict.as_view(),name="emotion"),
    path('register', views.Register.as_view(),name="register"),
    # path("users",views.UserList.as_view(),name="users-list"),
    # path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login', views.MyObtainTokenPairView.as_view(), name='login'),
    path('login/refresh', TokenRefreshView.as_view(), name='login_refresh'),
  
    path('mood',set_mood, name='set_mood'),
    path('mood/<int:pk>/',get_mood,name='get_mood'),
    # path('get_movie/<int:pk>/',get_movie,name='get_movie'),
    path('recommend', views.RelatedMoviePredictorView.as_view(), name='get_recommendations'),
    path('sentiment_recommend',views.SentimentPredictorView.as_view(), name='sentiment_recommend'),
    # path('get_mood',views.GetUserMood.as_view(), name='get_mood'),
]