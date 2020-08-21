#!/usr/bin/python
# coding: utf-8

# Installing required packages
import os
#os.system("sudo pip3 install gitpython")
#os.system("sudo apt-get install wget")
#os.system("sudo apt-get install python-opencv")
#os.system("sudo pip3 install opencv-python")
#os.system("sudo apt-get install numpy")
#os.system("sudo apt-get install pickle")
#os.system("sudo apt-get install glob")
#os.system("pip3 install pandas")
#os.system("sudo pip3 install pykml")
#os.system("sudo pip3 install lxml --upgrade")


# Importing the required packages
import pickle
import cv2
import numpy as np
os.environ["GIT_PYTHON_REFRESH"]="quiet"
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

    # Change makefile
    os.chdir("./darknet")
    os.system("pwd")
    print('dir changed!')
    # os.system("/bin/bash")
    # os.system("sed -i 's/OPENCV=0/OPENCV=1/' Makefile")
    # os.system("sed -i 's/GPU=0/GPU=1/' Makefile")
    # os.system("sed -i 's/CUDNN=0/CUDNN=1/' Makefile")
    # os.system("sed -i 's/CUDNN_HALF=0/CUDNN_HALF=1/' Makefile")
    os.system("sed -i 's/LIBSO=0/LIBSO=1/' Makefile")
    print('Changed makefile!')

    # Verify CUDA
    # os.system("usr/local/cuda/bin/nvcc - version")

    # Make darknet
    os.system("make")

    # Download pre-trained YOLOv4 weights
    if not os.path.exists("./yolov4.weights"):
        wget.download('https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights')

    return("Setup completed!")

def read_regions():
    base_dir = get_base_dir()
    # Read reagions files
    file1 = os.path.join(base_dir + '/Api/data/regions_cam1.p')
    print(file1)
    file2 = os.path.join(base_dir + '/Api/data/regions_cam2.p')
    print(file2)
    file3 = os.path.join(base_dir + '/Api/data/regions_m1.p')
    print(file3)
    file4 = os.path.join(base_dir + '/Api/data/regions_m2.p')
    print(file4)


    with open(file1, 'rb') as f1:
        parked_car_boxes1 = pickle.load(f1)
    print(parked_car_boxes1[0])
    #--use
    pl_camera1 = pd.Series(parked_car_boxes1).to_frame()
    
    with open(file2, 'rb') as f2:
        parked_car_boxes2 = pickle.load(f2)
    print(parked_car_boxes2[0])
    #--use
    pl_camera2 = pd.Series(parked_car_boxes2).to_frame()
    pl_camera2.drop([72], inplace=True)

    with open(file3, 'rb') as f3:
        parked_car_boxes3 = pickle.load(f3)
    print(parked_car_boxes3[0])
    #--use
    pl_camera3 = pd.Series(parked_car_boxes3).to_frame()

    with open(file4, 'rb') as f4:
        parked_car_boxes4 = pickle.load(f4)
    print(parked_car_boxes4[0])
    #--use
    pl_camera4 = pd.Series(parked_car_boxes4).to_frame()


    # read parking region ids
    file_cam1 = os.path.join(base_dir + '/Api/data/parking_regions_cam1.csv')
    print(file_cam1)
    park_tags1 = pd.read_csv(file_cam1)
    print(park_tags1.head())

    file_cam2 = os.path.join(base_dir + '/Api/data/parking_regions_cam2.csv')
    print(file_cam2)
    park_tags2 = pd.read_csv(file_cam2)
    print(park_tags2.head())
    
    file_cam3 = os.path.join(base_dir + '/Api/data/magical_regions1.csv')
    print(file_cam3)
    park_tags3 = pd.read_csv(file_cam3)
    print(park_tags3.head())

    file_cam4 = os.path.join(base_dir + '/Api/data/magical_regions2.csv')
    print(file_cam4)
    park_tags4 = pd.read_csv(file_cam4)
    print(park_tags4.head())

    # Merge the regions with ids
    parked_cars1 = pd.merge(pl_camera1, park_tags1, left_index=True, right_index=True)
    parked_cars1.columns = ['polygon','pname']
    print(parked_cars1.head())

    parked_cars2 = pd.merge(pl_camera2, park_tags2, left_index=True, right_index=True)
    parked_cars2.columns = ['polygon','pname']
    print(parked_cars2.head())

    parked_cars3 = pd.merge(pl_camera3, park_tags3, left_index=True, right_index=True)
    parked_cars3.columns = ['polygon','pname']
    print(parked_cars3.head())

    parked_cars4 = pd.merge(pl_camera4, park_tags4, left_index=True, right_index=True)
    parked_cars4.columns = ['polygon','pname']
    print(parked_cars4.head())

    parked_cars_main = parked_cars1.append(parked_cars2, ignore_index = True)
    print(len(parked_cars_main))

    parked_cars_magical = parked_cars3.append(parked_cars4, ignore_index = True)
    print(len(parked_cars_magical))

    parked_cars = parked_cars_main.append(parked_cars_magical, ignore_index = True)
    print(len(parked_cars))

    print("Step 1 complete!")
    return parked_cars, parked_cars1, parked_cars2, parked_cars3, parked_cars4


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
    print(data_kml.head())
    print("Step 2 complete!")
    return data_kml


def convertBack(x, y, w, h):							# Convert from center coordinates to bounding box coordinates
    xmin = int(round(x - (w / 2)))
    xmax = int(round(x + (w / 2)))
    ymin = int(round(y - (h / 2)))
    ymax = int(round(y + (h / 2)))
    xcen = int(round((xmin+xmax)/2))
    ycen = int(round((ymin+ymax)/2))
    print("Step 3 complete!")
    return xmin, ymin, xmax, ymax, xcen, ycen

def rectContains(bbox,pt):
    cont = cv2.pointPolygonTest(bbox, (pt[0],pt[1]), False)
    print("Step 4 complete!")
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

        car_detection += 1              # Increment to the next detected car

      print(list_occ)
      parked_cars.loc[:, 'Status'] = np.where(parked_cars.index.isin(list_occ), 'Occupied', 'Free')
      parked_cars_updated = parked_cars
      cv2.putText(img,
                  "Total cars %s" % str(car_detection), (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 1,
                  [0, 255, 50], 2)        # Place text to display the car count
  return img, parked_cars_updated

def read_image():
    # Get the list of Input Image Files
    base_dir = get_base_dir()
    image_path1 = base_dir + '/*Api/*templates/*static/*images/*Test_img/image1.jpg'
    print(image_path1)			#  Directory of the image folder
    image_list1 = glob.glob(image_path1)   # Get list of Images + "*.jpg"

    image_path2 = base_dir + '/*Api/*templates/*static/*images/*Test_img/image2.jpg'
    print(image_path2)			#  Directory of the image folder
    image_list2 = glob.glob(image_path2)   # Get list of Images

    image_path3 = base_dir + '/*Api/*templates/*static/*images/*Test_img/magical_1.jpg'
    print(image_path3)			#  Directory of the image folder
    image_list3 = glob.glob(image_path3)   # Get list of Images

    image_path4 = base_dir + '/*Api/*templates/*static/*images/*Test_img/magical_2.jpg'
    print(image_path4)			#  Directory of the image folder
    image_list4 = glob.glob(image_path4)   # Get list of Images

    print(pd.DataFrame(image_list1))
    print(pd.DataFrame(image_list2))
    print(pd.DataFrame(image_list3))
    print(pd.DataFrame(image_list4))
    return image_list1, image_list2, image_list3, image_list4

netMain = None
metaMain = None
altNames = None

def YOLO():
    #os.chdir("./darknet")
    #os.system("pwd")
    #print('dir changed!')

    from darknet import darknet
    print("Imported")
    #================================================================
    base_dir = get_base_dir()
    image_list1, image_list2, image_list3, image_list4 = read_image()
    #=================================================================#
    # Read parking regions file
    parked_cars, parked_cars1, parked_cars2, parked_cars3, parked_cars4 = read_regions()
    #================================================================
    global metaMain, netMain, altNames
    configPath = "./darknet/cfg/yolov4.cfg"
    weightPath = "./darknet/yolov4.weights"
    metaPath = "./darknet/cfg/coco.data"
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

    #--------------FOR camera 1 image-------------------
    for i in range(len(image_list1)):
        image = cv2.imread(image_list1[i])
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
        image, parked_cars_updated1 = cvOverlapcheck(parked_cars1, detections, image_rgb)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        from cv2 import imwrite
        file_out1 = os.path.join(base_dir + '/Api/templates/static/images/new_output1.jpg')
        imwrite(file_out1, image);
        print("Image 1 saved!")


	#------------------Repeat for the second camera
    for i in range(len(image_list2)):
        image = cv2.imread(image_list2[i])
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

        # Draw occupied parking spaces
        image, parked_cars_updated2 = cvOverlapcheck(parked_cars2, detections, image_rgb)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        from cv2 import imwrite
        file_out2 = os.path.join(base_dir + '/Api/templates/static/images/new_output2.jpg')
        imwrite(file_out2, image);
        print("Image 2 saved!")

	#------------------Repeat for the first magical camera
    for i in range(len(image_list3)):
        image = cv2.imread(image_list3[i])
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

        # Draw occupied parking spaces
        image, parked_cars_updated3 = cvOverlapcheck(parked_cars3, detections, image_rgb)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        from cv2 import imwrite
        file_out3 = os.path.join(base_dir + '/Api/templates/static/images/new_output3.jpg')
        imwrite(file_out3, image);
        print("Image 3 saved!")

	#------------------Repeat for the second magical camera
    for i in range(len(image_list4)):
        image = cv2.imread(image_list4[i])
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

        # Draw occupied parking spaces
        image, parked_cars_updated4 = cvOverlapcheck(parked_cars4, detections, image_rgb)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        from cv2 import imwrite
        file_out4 = os.path.join(base_dir + '/Api/templates/static/images/new_output4.jpg')
        imwrite(file_out4, image);
        print("Image 4 saved!")


    parked_cars_updated_main = parked_cars_updated1.append(parked_cars_updated2, ignore_index = True)
    parked_cars_updated_magical = parked_cars_updated3.append(parked_cars_updated4, ignore_index = True)
    parked_cars_updated = parked_cars_updated_main.append(parked_cars_updated_magical, ignore_index = True)
        # cv2.imshow('Output', image)
        #cv2.waitKey(0)
        # i += 1
	
    cv2.destroyAllWindows()
    #================================================================
    # Save the file with occupancy
    post_process(parked_cars_updated)

def get_base_dir():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print(base_dir)
    return base_dir

def post_process(data):
    base_dir = get_base_dir()
    filename_a = base_dir + '/Api/data/Full_Parking.kml'
    filename_b = base_dir + '/Api/data/Magical.kml'
    data_kml_a = read_kml(filename_a)
    data_kml_b = read_kml(filename_b)
    data_kml = data_kml_a.append(data_kml_b, ignore_index = True)
    
    final_df = pd.merge(data_kml, data, left_on=['PName'], right_on=['pname'], how='left')
    final_df['color'] = np.nan
    final_df['color'][final_df.Status == 'Occupied'] = "red"
    final_df['color'][final_df.Status == 'Free'] = "green"
    final_df['color'].fillna('yellow', inplace=True)
    # Setting reserved parking regions to blue color
    final_df['color'][final_df.pname.isin(['R10-S27','R1-1','R8-S29'])] = "blue"
    final_df.to_csv(base_dir +'/Api/data/Consolidated_data.csv')
    return "Success!"


#if __name__ == "__main__":
    # Run setup steps
    # First()   # to remake darknet and download the pretrained weights
    # os.system("pwd")
    #================================================================
    
    #YOLO()
    #print("Success!")
