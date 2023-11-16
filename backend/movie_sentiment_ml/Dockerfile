# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM tensorflow/tensorflow:2.10.1

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /movie_recommend

# Copy the current directory contents into the container at /movie_recommend
COPY . /movie_recommend/

# Set the working directory to /movie_recommend
WORKDIR /movie_recommend

# Update pip
RUN pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --requirement requirements/requirements.txt