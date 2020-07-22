# Free Parking Visualization Tool

## __Google Summer Of Code 2020__
<p align="center"> 
    <img width="600" src="https://jderobot.github.io/assets/images/activities/gsoc-2020.jpg">
</p>

This project is developed as part of the Google Summer Of Code 2020. Using integration with local security cameras, the goal of the project is to classify the free and occupied parking spaces in parking lots using object detection models (yolov4). Cars are detected by running the model on the image of the parking lot and the free parking areas are identifed. The spots are then visualized in the liquid galaxy. In addition, a mobile application for users is built for monitoring the occupancy of parking spaces.

© Liquid Galaxy, Google Summer of Code 2020 GitHub, Inc.

﻿# Before Installation
The pretrained yolov4 model is trained from AlexeyAB's darknet repository. (https://github.com/AlexeyAB/darknet)

﻿# Installation


## Installing / Getting started
(../master/docs/INSTALL.md)

### Built With
Python3, React Native, Docker

The following tree represents the suggested directory hierarchy 
within the "lg" user's home directory:

### Repository Details
The following tree represents the directory hierarchy:

```
/FPVT
|-- AIModel
|   |-- set_regions.py
|   |-- YOLO_v4.ipynb
|-- Backend
|   |-- docker_api
|   |   |-- data
|   |      |-- regions.p
|   |      |-- parking_Regions.csv
|   |   |-- DockerFile
|   |   |-- requirements.txt
|   |   |-- swagger.yml
|   |   `-- scripts
|   |   |-- liquidgalaxy
|   |      |-- kml_generator.py
|-- README.MD
`-- Frontend
    `-- ParkingApp
        |-- App.js
        `-- Components/Images
```

## Licensing
- Copyright (c) 2020 Charanya Chandrasekaran

