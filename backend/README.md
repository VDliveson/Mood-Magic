# Sentiment-movie-recommender

> pip install -r requirements.txt

> cd .\movie_sentiment_ml\

> python manage.py flush --no-input ; python manage.py shell -c "from app.models import AppUser; AppUser.objects.create_superuser('vd', 'admin@example.com', '1234')";python manage.py makemigrations;python manage.py migrate;  python manage.py runserver