# Free Parking Visualization Tool

## __Google Summer Of Code 2020__
<p align="center"> 
    <img width="600" src="https://jderobot.github.io/assets/images/activities/gsoc-2020.jpg">
</p>

This project is developed as part of the Google Summer Of Code 2020. Using integration with local security cameras, the goal of the project is to classify the free and occupied parking spaces in parking lots using object detection models (yolov4). Cars are detected by running the model on the image of the parking lot and the free parking areas are identifed. The spots are then visualized in the liquid galaxy. In addition, a mobile application for users is built for monitoring the occupancy of parking spaces.

© Liquid Galaxy, Google Summer of Code 2020 GitHub, Inc.

# Before Installation
The pretrained yolov4 model is trained from AlexeyAB's darknet repository. (https://github.com/AlexeyAB/darknet)

# Installation


## Installing / Getting started


### Built With
Python3, React Native, React.js, Docker

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

