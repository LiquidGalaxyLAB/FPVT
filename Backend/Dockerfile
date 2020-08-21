FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y python3 python3-dev python3-pip && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update

RUN apt-get install iputils-ping openssh-client sshpass python-opencv python-flask -y

RUN pip3 install gitpython python3-wget pandas opencv-contrib-python pykml lxml numpy flask flask_cors connexion glob3 simplekml pillow

RUN mkdir /Api
COPY ./Api /Api

WORKDIR /Api
EXPOSE 5000
CMD ["python3", "server.py"]

