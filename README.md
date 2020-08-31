# Free Parking Visualization Tool

## __Google Summer Of Code 2020__
<p align="center"> 
    <img width="600" src="https://jderobot.github.io/assets/images/activities/gsoc-2020.jpg">
</p>

This project is developed as part of the Google Summer Of Code 2020. Using integration with local security cameras, the goal of the project is to classify the free and occupied parking spaces in parking lots using object detection models (yolov4). Cars are detected by running the model on the image of the parking lot and the free parking areas are identifed. The spots are then visualized in the liquid galaxy. In addition, a mobile application for users and a web application for parking administrators are built for monitoring the occupancy of parking spaces.
Before proceeding with the installation, please refer to the following google doc for a general overview of the project.

- FPVT information: https://docs.google.com/document/d/14EUbFxjIUYEIiPBmHRHfunIQHkvbDnO1fnkXOgXieRU/edit?usp=sharing

Other Links:
- Youtube: https://www.youtube.com/watch?v=WWlRR0tqOZU&feature=youtu.be
- Android APK:
    Information: https://docs.google.com/document/d/175FyfcORh-OI1JeCIcpLlEApigEzTy-1zRsSsqekQQg/edit?usp=sharing
    Other files: https://drive.google.com/drive/folders/1JYZ6tpNezlCE1iZvtCEiAh5zQDxnyY-e?usp=sharing
- Worklog: https://docs.google.com/spreadsheets/d/1-w7GdFDhnAvSZ6_EzmSZErcmXyB4-dKgrsecZkpzPVI/edit?usp=sharing
- Commits: https://github.com/LiquidGalaxyLAB/FPVT/blob/master/git_log.txt

© Charanya Chandrasekaran, Liquid Galaxy Lab, Google Summer of Code 2020 GitHub, Inc.

## Before Installation
Please ensure that you have the following software installed on your PC/ Virtual Machine (64-bit only).
 - Docker
 - The liquid galaxy set up
 - Python v3.6
 - Node.js v>9, npm v>6.x.
 - React, React Native for front end applications.

## Installation

## Installing and running the backend
### 1. Clone the repository: 

    $ git clone https://github.com/LiquidGalaxyLAB/FPVT.git

### 2. The darknet repository
Next, download the darknet folder from the following gdrive link and add it to the Backend/Api/ folder. It has already been compiled to align with the requirements of the project
https://drive.google.com/drive/folders/1AZr96fFu5JNAfUhxTN_IDRiMIN2T0uaS?usp=sharing

NOTE: The darknet repository is compiled after downloading the yolov4 weights in a linux (64-bit Ubuntu) OS. If you are using a 32-bit system, you have to run make again on your PC by navigating to the darknet folder and typing “make” in the terminal.

### 3. Launching the CCTV camera media server:
Since we did not have access to the IP of the security cameras,a multipurpose RTSP media server that can simulate RTSP cameras, broadcast RTSP streams, webcams, and create test videos or serve video files was used. The videos of the security cameras from the scientific park in June were downloaded and uploaded to the docker container. 

Link for the RTSP media server: https://hub.docker.com/r/ullaakut/rtspatt/

A stream can be created by launching the official docker image from any Linux/windows/mac operating system by running the following commands from the terminal. They are listed in the RTSP_media_server_launch_README file.

 - Open a terminal window and pull the docker container:
 
       $ docker pull ullaakut/rtspatt
     
 - Run the container which generates the media stream
        Input file: video_footage.avi (The video from the security camera)
      
       $ docker run -e INPUT=”/tmp/video_footage.avi” -e RTSP_ADDRESS=0.0.0.0 -e RTSP_PORT=18554 -v “/home/*<insert path>*/Backend:/tmp” -p 18554:18554 ullaakut/rtspatt
       
 - On a new terminal, run the video.py file: This command runs the file and saves the snapshots of the stream in the Backend/Api folder which serves as an input for the object detection model.
       
       $ python3 video.py
	 Output files: image1.jpg, image2.jpg for two cameras
	
For adding two more camera streams, repeat step 3 and replace/add the name of the output file in the video.py file. For the project, two additional snapshots were also taken from another parking lot (Magical_1.jpg, magical_2.jpg)

### 4. Running the main backend docker container
For running the YOLOv4 object detection model, first, navigate to the Backend Folder in the FPVT project.
Ensure that you have docker installed on your system. For checking the version, you can enter the following command in the terminal.

     $ docker -v
Other useful commands:

     $ docker ps -> Displays the running docker containers
     
     $ docker images -> Displays the list of docker images existing.

Navigate to the Backend/ folder and build the docker container using the image. The container has been named as myubuntu.
     
     $ sudo docker build -t myubuntu .
All the dependencies required are automatically installed. Now you will be able to see the docker image built when you enter “sudo docker images” in the terminal.

Now, run the docker image created by entering the following command:
     
     $ sudo docker run --name=myubuntu -p 5000:5000 -d myubuntu
     
Here, the argument -p indicates the port in which the Flask web server will run.
Some additional docker commands which may be useful:
     
     $ docker exec -it myubuntu bash - To enter the docker container
     $ sudo docker logs myubuntu  - Displays the docker container logs
     $ sudo docker stop myubuntu - Stop the execution of the docker container
     $ sudo docker rm ubuntu - removes the docker container

### 4. Open the web server in the browser on http://0.0.0.0:5000
The information retrieved by the server can be viewed in the following routes:
Basepath: /api
- The image output from camera1: http://0.0.0.0:5000/api/camera1
- The image output from camera2: http://0.0.0.0:5000/api/camera2
- The image output from camera1_magical: http://0.0.0.0:5000/api/camera_mag1
- The image output from camera2_magical: http://0.0.0.0:5000/api/camera_mag2
- The statistics of the entire parking area: http://0.0.0.0:5000/api/info
- The statistics of the main parking area: http://0.0.0.0:5000/api/info1
- The statistics of the magical parking area: http://0.0.0.0:5000/api/info2

- The path of the KML file generated:  http://0.0.0.0:5000/get-data/kml/Free_parking.kml
- Path of orbit files: http://0.0.0.0:5000/get-data/kml/main_parking_tour.kml
- Path of orbit files: http://0.0.0.0:5000/get-data/kml/magical_parking_tour.kml


## Installing and running the frontend apps

### 1. Mobile App:
The link and all the other details of the mobile application can be found in the following link:
https://drive.google.com/drive/folders/1JYZ6tpNezlCE1iZvtCEiAh5zQDxnyY-e?usp=sharing

Android APK link:
https://drive.google.com/file/d/1qc5NRaWLtFQZwb8ryI9m6Kv0fC3ajsR_/view?usp=sharing

The apk can be directly installed in android devices. The default dummy user sign in credentials are -> username: user1; password: password. The user can also sign in using Google by clicking on the "Google" button, entering the credentials and then clicking on "Sign in".

The app was built using react native expo tools. To run the app from the repository, navigate to the */Frontend/ParkingApp/* folder and run the following commands on the terminal. The reference documenttion can be found here: https://docs.expo.io/workflow/expo-cli/
sudo npm install -g expo-cli
- expo init
- expo install
- expo start


### 2. Parking Admin Tool Web Application:

Navigate to the */Frontend/ParkingAdminTool/* folder and enter the following commands in the terminal.
 - npm init
 - npm install
 - npm start

Now the web application will run on localhost on port 3000.
NOTE: Ensure that you have nodejs version > 9 and npm version >=6.x. The package available by default in ubuntu and debian are sometimes out of date. The following command can be used to install the latest version of node.

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

After this, please check the version of node by typing node --version and npm --version on the terminal.


### Built With
 - Virtual machines for the liquid galaxy setup
 - IP Security camera docker container that generates images from real-time video footage
 For the Backend:
 - Python v3.6
 - OpenCV and TensorFlow libraries
 - AlexeyAB’s YOLOv4 model, Darknet, pre-trained yolov4 weights
 - Docker
For the front-end
 - Node.js
 - React Native (Mobile application)
 - React.js (Web application)

### Repository Details
The following tree represents the directory hierarchy:

```
/FPVT
|-- AIModel
|   |-- YOLO_v4.ipynb
|-- Backend
|   |-- RTSP_media_server_launch_README.md
|   |-- video_footage.avi
|   |-- video.py
|   |-- set_regions.py
|   |-- DockerFile
|   |-- Api
|   |   |-- darknet (To be externally downloaded and added)
|   |   |-- data
|   |      |-- regions.p
|   |      |-- regions_cam1.p
|   |      |-- regions_cam2.p
|   |      |-- regions_m1.p
|   |      |-- regions_m2.p
|   |      |-- parking_regions.csv
|   |      |-- magical_regions1.csv
|   |      |-- magical_regions2.csv
|   |      |-- parking_regions_cam1.csv
|   |      |-- parking_Regions_cam2.csv
|   |      |-- Full_Parking.kml
|   |      |-- Magical.kml
|   |      |-- Consolidated_data.csv

|   |   |-- ARIALBD.TTF
|   |   |-- server.py
|   |   |-- detector_m.py
|   |   |-- image.py
|   |   |-- show_kml.py
|   |   |-- stats.py
|   |   |-- swagger.yml
|   |   |-- app.cpnf
|   |   |-- config.py
|   |   |-- kml_generator.py
|   |   |-- signup.py


|   |   |-- templates
|   |      |-- home.html
|   |      |-- static
|   |           |-- images
|   |               |-- Test_img
|   |                   |-- image1.jpg
|   |                   |-- image2.jpg
|   |                   |-- magical_1.jpg
|   |                   |-- magical_2.jpg
|   |   |-- static
|   |      |-- logos
|   |           |-- all_logos.JPG
|   |      |-- stats
|   |           |-- info.png
|   |           |-- info1.png
|   |           |-- info2.png
|   |      |-- demos
|   |   |-- kml_tmp
|   |      |-- slave_3.kml
|   |      |-- Test
|   |           |-- kmls.txt
|   |           |-- slave_5.kml


|-- README.MD   
`-- Frontend
    `-- ParkingApp
        |-- App.js
        `-- Components/Images
    `-- ParkingAdminTool
        |-- .env
        |-- src
            |-- App.js
        `-- Components/Images

```

## Future Work
The future work that can be done to further develop the project includes:
- Integrating the app with IP security camera by inputting the IP of the camera in the RTSP media server docker container
- Accommodating more cameras and automating the annotation of parking spaces, as it was done manually due to time constraints.
- Additional functionalities for the app:
	- Have the backend server up and run it using Google Kubernetes Engine/Cloud run
The application was tested by uploading the Docker Image to Google cloud console and running it using cloud run with PORT 5000, memory 2gb, 2 CPUs.

## Implementation steps:
To implement the project in another parking lot, one needs to follow these steps:
1. Get the IP of the CCTV camera generate a stream, and run the video.py file to save snapshots
2. Annotate the parking lots using a video downloaded from the stream, and annotating the parking spaces on google earth to generate a KML file with all parking lots (Full_parking.kml)
3. Run the main docker container to launch the server
4. Install and run the apps.


## Licensing
- Copyright (c) 2020 Charanya Chandrasekaran
Mentoring organization: Liquid Galaxy Lab
Mentors: Moises Martinez, Andreu Ibanez, Marc Gonzales

