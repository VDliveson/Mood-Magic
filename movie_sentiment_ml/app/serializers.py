from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from app.models import AppUser,UserMood


    
    
class RegisterUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style = {'input_type': 'password'},write_only = True)
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=AppUser.objects.all())]
            )
    username = serializers.CharField(required=True,
            validators=[UniqueValidator(queryset=AppUser.objects.all())])
    class Meta:
        model = AppUser
        fields = ['first_name','last_name','dob','email','username','password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self,validated_data):
        try :
            dobval = validated_data.get['dob']# type: ignore
        except:
            dobval = None
        user = AppUser(
            first_name = validated_data['first_name'],  # type: ignore
            last_name = validated_data['last_name'],# type: ignore
            email = validated_data['email'],# type: ignore
            username = validated_data['username'],# type: ignore
            dob = dobval
        )
        
        password = validated_data['password']# type: ignore
        password2 = validated_data['password2']# type: ignore
        
        if password != password2:
            raise serializers.ValidationError({'passsword':'Password mismatch'})
        user.set_password(password)
        user.save()
        return user
    
        
    
class UserMoodService(serializers.ModelSerializer):
    
    user_id = serializers.PrimaryKeyRelatedField(many = False,queryset = AppUser.objects.all())
    class Meta:
        model = UserMood
        fields = ['user_id','mood_id','current_mood']
    
    

            
    def create(self, validated_data):
        user_id = validated_data.get('user_id',None)
        usermood = UserMood.objects.filter(user_id=user_id).first()
        
        if (usermood is not None):
            usermood.current_mood = validated_data.get('current_mood',None)
            usermood.save()
            return usermood
        usermood = UserMood.objects.create(**validated_data)
        usermood.save()
        return usermood
    
    
    
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer,cls).get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token
    
    
# class MovieRecommendationSerializer(serializers.ModelSerializer):
#     user_id = serializers.PrimaryKeyRelatedField(many = False,queryset = AppUser.objects.all())
#     class Meta:
#         model = UserMood
#         fields = ['user_id','mood_id','current_mood']