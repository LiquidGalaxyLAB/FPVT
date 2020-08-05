FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y python3 python3-dev python3-pip && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install python-opencv python-flask -y

RUN pip3 install gitpython python3-wget pandas opencv-python pykml lxml numpy flask connexion glob3 simplekml

RUN mkdir /Api
COPY ./Api /Api

WORKDIR /Api
EXPOSE 5000
CMD ["python3", "server.py"]

