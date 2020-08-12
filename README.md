# Free Parking Visualization Tool

## __Google Summer Of Code 2020__
<p align="center"> 
    <img width="600" src="https://jderobot.github.io/assets/images/activities/gsoc-2020.jpg">
</p>

This project is developed as part of the Google Summer Of Code 2020. Using integration with local security cameras, the goal of the project is to classify the free and occupied parking spaces in parking lots using object detection models (yolov4). Cars are detected by running the model on the image of the parking lot and the free parking areas are identifed. The spots are then visualized in the liquid galaxy. In addition, a mobile application for users and a web application for parking administrators are built for monitoring the occupancy of parking spaces.
For more detailed information about the project, please refer to the following google doc:
https://docs.google.com/document/d/14EUbFxjIUYEIiPBmHRHfunIQHkvbDnO1fnkXOgXieRU/edit?usp=sharing

© Liquid Galaxy, Google Summer of Code 2020 GitHub, Inc.

## Before Installation
Please ensure that you have the following software installed on your PC/ Virtual Machine.
 - Docker
 - Python v3.6
 - Node.js
 - React, React Native for front end applications.

## Installation

## Installing and running the backend
### 1. Clone the repository: 
$ git clone https://github.com/LiquidGalaxyLAB/FPVT.git

Next, download the darknet folder from the following gdrive link and add it to the Backend/Api/ folder
https://drive.google.com/drive/folders/1fRV38RqWb_hR9w0lN0mRf_ICqN377eMB?usp=sharing


### 2. Launching the CCTV camera media server:
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

### 3. Running the main backend docker container
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
The image output from camera1: http://0.0.0.0:5000/api/camera1
The image output from camera2: http://0.0.0.0:5000/api/camera2
The encoded images: http://0.0.0.0:5000/api/image_encoded1 & http://0.0.0.0:5000/api/image_encoded2 respectively
The statistics of the parking area: http://0.0.0.0:5000/api/info
The path of the KML file generated:  http://0.0.0.0:5000/api/kml
This information has been integrated with the front end apps.

## Installing and running the frontend apps

Android APK Link:

Web Application:

Navigate to the Frontend/ParkingAdminTool folder and enter the following commands in the terminal.
 - npm init
 - npm install
 - npm start

Now the web application will run on localhost//:3000.

### Built With
 - Virtual machines for the liquid galaxy setup
 - IP Security camera docker container that generates images from real-time video footage
 For the Backend:
 - Python v3.6
 - OpenCV and TensorFlow libraries
 - AlexeyAB’s YOLOv4 model
 - Docker
For the front-end
 - Node.js
 - React Native (Mobile application)
 - React.js (Web application)

The following tree represents the suggested directory hierarchy 
within the "lg" user's home directory:

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
|   |   |-- darknet
|   |   |-- data
|   |      |-- regions.p
|   |      |-- regions_cam1.p
|   |      |-- regions_cam2.p
|   |      |-- parking_regions.csv
|   |      |-- parking_regions_cam1.csv
|   |      |-- parking_Regions_cam2.csv
|   |      |-- Full_Parking.kml
|   |      |-- Consolidated_data.csv
|   |   `-- scripts
|   |   |-- server.py
|   |   |-- detector_m.py
|   |   |-- image.py
|   |   |-- show_kml.py
|   |   |-- stats.py
|   |   |-- swagger.yml
|   |   |-- liquidgalaxy
|   |      |-- config.py
|   |      |-- ipsettings
|   |      |-- kml_generator.py
|   |      |-- kmls.txt
|   |      |-- query.txt
|   |      |-- lg_communication.py
|   |      |-- Free_parking.kml
|   |   |-- templates
|   |      |-- home.html
|   |      |-- static
|   |           |-- images
|   |               |-- output.jpg
|   |               |-- Test_img
|   |                   |-- image1.jpg
|   |                   |-- image2.jpg
|-- README.MD   
`-- Frontend
    `-- ParkingApp
        |-- App.js
        `-- Components/Images
    `-- ParkingAdminTool
        |-- src
            |-- App.js
        `-- Components/Images
```

## Licensing
- Copyright (c) 2020 Charanya Chandrasekaran

