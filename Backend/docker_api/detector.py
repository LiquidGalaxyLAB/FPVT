#!/usr/bin/python
# coding: utf-8

# Installing required packages
import os
os.system("sudo apt-get install git")
os.system("sudo apt-get install wget")
os.system("sudo apt-get install cv2")
os.system("sudo apt-get install numpy")
os.system("sudo apt-get install pickle")
os.system("sudo apt-get install pathlib")
os.system("sudo apt-get install glob")
os.system("sudo apt-get install pandas")
os.system("sudo apt-get install pykml")

# Importing the required packages
import pickle
from pathlib import Path
import cv2
import numpy as np
import git
import glob
import pandas as pd
import pykml
import wget

def First():
    # Cloning and Building Darknet
    if not os.path.exists("darknet"):
        print("Cloning darknet...")
        git.Git("./").clone("https://github.com/AlexeyAB/darknet.git")
        print('Done')

    # Change makefile to have GPU nad OPENCV enabled
    os.chdir("./darknet")
    os.system("pwd")
    print('dir changed!')
    # os.system("/bin/bash")
    os.system("sed -i 's/OPENCV=0/OPENCV=1/' Makefile")
    os.system("sed -i 's/GPU=0/GPU=1/' Makefile")
    os.system("sed -i 's/CUDNN=0/CUDNN=1/' Makefile")
    os.system("sed -i 's/CUDNN_HALF=0/CUDNN_HALF=1/' Makefile")
    os.system("sed -i 's/LIBSO=0/LIBSO=1/' Makefile")
    print('Changed makefile!')

    # Verify CUDA
    os.system("usr/local/cuda/bin/nvcc - version")

    # Make darknet
    os.system("make")

    # Download pre-trained YOLOv4 weights
    if not os.path.exists("./yolov4.weights"):
        wget.download('https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights')

    return("Setup completed!")

def read_regions():
    with open('../data/regions.p', 'rb') as f:
        parked_car_boxes = pickle.load(f)
    pl_camera = pd.Series(parked_car_boxes).to_frame()
    pl_camera.drop([123], inplace=True)
    park_tags = pd.read_csv('../data/parking_regions.csv')
    parked_cars = pd.merge(pl_camera, park_tags, left_index=True, right_index=True)
    parked_cars.columns = ['polygon','pname']
    return parked_cars


def read_kml(filename):
    from pykml import parser
    from pykml.factory import nsmap

    namespace = {"ns": nsmap[None]}

    with open(filename) as f:
      root = parser.parse(f).getroot()
      pms = root.findall(".//ns:Placemark", namespaces=namespace)
      lst = root.findall(".//ns:LinearRing", namespaces=namespace)

    polygons = []
    for pm in pms:
      poly = pm.name
      polygons.append(poly)

    coord_all = []
    for ls in lst:
      coord = ls.coordinates
      coord_all.append(coord)

    coord_all_df = pd.DataFrame(coord_all)
    polygons_df = pd.DataFrame(polygons)
    data_kml = pd.merge(polygons_df,coord_all_df, left_index=True, right_index=True)
    data_kml.columns = ['PName','geometry']
    return data_kml


def convertBack(x, y, w, h):								# Convert from center coordinates to bounding box coordinates
    xmin = int(round(x - (w / 2)))
    xmax = int(round(x + (w / 2)))
    ymin = int(round(y - (h / 2)))
    ymax = int(round(y + (h / 2)))
    xcen = int(round((xmin+xmax)/2))
    ycen = int(round((ymin+ymax)/2))
    return xmin, ymin, xmax, ymax, xcen, ycen

def rectContains(bbox,pt):
    cont = cv2.pointPolygonTest(bbox, (pt[0],pt[1]), False)
    return cont

def cvOverlapcheck(parked_cars, detections, img):
  #================================================================
  # 1. Purpose : Vehicle Counting and Parking Space classification
  #================================================================
  if len(detections) > 0:                    # If there are any detections
      car_detection = 0
      pstatusall = []
      list_occ = []
      for detection in detections:
        name_tag = detection[0].decode()      # Decode list of classes
        if name_tag == 'car':
          x, y, w, h = detection[2][0],\
                        detection[2][1],\
                        detection[2][2],\
                        detection[2][3]
          xmin, ymin, xmax, ymax, xcen, ycen = convertBack(
                        float(x), float(y), float(w), float(h))
          pt = (xcen, ycen)

          all_bbox_occ = []
          # parked_cars.Status = np.nan
          for p in range(len(pd.Series(parked_cars.polygon).array)):
            k = rectContains((pd.Series(parked_cars.polygon).array)[p], pt)
            if (k == 1.0) | (k == 0.0):
              bbox_occ = (pd.Series(parked_cars.polygon).array)[p]
              all_bbox_occ.append(bbox_occ)
              list_occ.append(p)
              # parked_cars.Status = 'occupied'
              cv2.fillPoly(img, [np.array(bbox_occ)], (255, 0, 0))
              cv2.circle(img, (xcen, ycen), radius=3, color=(0, 255, 0), thickness=-1)
              #print(bbox_occ)
              break

        car_detection += 1                  # Increment to the next detected car

      print(list_occ)
      parked_cars.loc[:, 'Status'] = np.where(parked_cars.index.isin(list_occ), 'Occupied', 'Free')

      cv2.putText(img,
                  "Total cars %s" % str(car_detection), (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 1,
                  [0, 255, 50], 2)            # Place text to display the car count
  return img


netMain = None
metaMain = None
altNames = None

def YOLO(image_list):

    global metaMain, netMain, altNames
    configPath = "./cfg/yolov4.cfg"
    weightPath = "./yolov4.weights"
    metaPath = "./cfg/coco.data"
    if not os.path.exists(configPath):
        raise ValueError("Invalid config path `" +
                         os.path.abspath(configPath)+"`")
    if not os.path.exists(weightPath):
        raise ValueError("Invalid weight path `" +
                         os.path.abspath(weightPath)+"`")
    if not os.path.exists(metaPath):
        raise ValueError("Invalid data file path `" +
                         os.path.abspath(metaPath)+"`")
    if netMain is None:
        netMain = darknet.load_net_custom(configPath.encode(
            "ascii"), weightPath.encode("ascii"), 0, 1)  # batch size = 1
    if metaMain is None:
        metaMain = darknet.load_meta(metaPath.encode("ascii"))
    if altNames is None:
        try:
            with open(metaPath) as metaFH:
                metaContents = metaFH.read()
                import re
                match = re.search("names *= *(.*)$", metaContents,
                                  re.IGNORECASE | re.MULTILINE)
                if match:
                    result = match.group(1)
                else:
                    result = None
                try:
                    if os.path.exists(result):
                        with open(result) as namesFH:
                            namesList = namesFH.read().strip().split("\n")
                            altNames = [x.strip() for x in namesList]
                except TypeError:
                    pass
        except Exception:
            pass
    # i = 0
    # while True:
    for i in range(len(image_list)):
        image = cv2.imread(image_list[i])
        width = image.shape[1]
        height = image.shape[0]

        # Create an image we reuse for each detect
        darknet_image = darknet.make_image(width, height, 3)

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image_rgb = cv2.resize(image_rgb,
                                       (width, height),
                                       interpolation=cv2.INTER_LINEAR)

        darknet.copy_image_from_bytes(darknet_image, image_rgb.tobytes())

        detections = darknet.detect_image(netMain, metaMain, darknet_image, thresh=0.25)
        # Print detections
        # image = cvDrawBoxesonCars(detections, image_rgb)
        # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Draw occupied parking spaces
        image = cvOverlapcheck(parked_cars, detections, image_rgb)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        from cv2 import imwrite
        imwrite( "../templates/static/images/new_output.jpg", image);

        # cv2.imshow('Output', image)
        cv2.waitKey(0)
        # i += 1
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Run setup steps
    First()
    #================================================================
    parked_cars = read_regions()
	#================================================================
    # Get the list of Input Image Files
    #================================================================
    image_path = "./templates/static/images/Test_img"			#  Directory of the image folder
    image_list = glob.glob(image_path + "*.jpg")			#  Get list of Images
    print(pd.DataFrame(image_list))
    #=================================================================#

    YOLO(image_list)

    filename = './data/Full_Parking.kml'
    data_kml = read_kml(filename)
    final_df = pd.merge(data_kml, parked_cars, left_on=['PName'], right_on=['pname'], how='left')
    final_df['color'] = np.nan
    final_df['color'][final_df.Status == 'Occupied'] = "red"
    final_df['color'][final_df.Status == 'Free'] = "green"
    final_df['color'].fillna('yellow', inplace=True)
    # Setting reserved parking regions to blue color
    final_df['color'][final_df.pname.isin(['R10-S27','R1-1','R8-S29'])] = "blue"
    final_df.to_csv('./data/Consolidated_data.csv')
