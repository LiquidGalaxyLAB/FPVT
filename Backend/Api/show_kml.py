# Create a handler for GET image
import numpy as np
import pandas as pd
import pykml
import os
from pykml import parser
from config import *
from stats import *
from flask import send_from_directory

get_server_ip()
server_IP, lg_IP, lg_pass, kml_data, screen_for_logos, screen_for_info = LoadConfigFile()
dict_stats = main()

file_kmls_txt_path = "kml_tmp/kmls.txt"
file_query_txt_path = "kml_tmp/query.txt"
serverPath = "/var/www/html/"
serverPath_query = "/tmp/"
query_filename = 'query.txt'
kmls_filename = 'kmls.txt'
img_url = "http://" + str(server_IP) + ":5000/get-data/logos/all_logos.JPG"
info1_img_url = "http://" + str(server_IP) + ":5000/get-data/stats/info1.png"
info2_img_url = "http://" + str(server_IP) + ":5000/get-data/stats/info2.png"

# Main Parking Lot
lon1=0.6065939099961359
lat1=41.60572107949841
alt1=196.8565658700859
range1=150.5098708774676
tilt1=52.27435395949843
fovy1=35

# Magical Parking Lot
lon2=0.6126382400113539
lat2=41.60858236007886
alt2=197.5155640489179
range2=112.2310699382615
tilt2=52.27350541007886
fovy2=35


def generate_orbit_content(lon, lat, alt, tilt, fovy, range1):

    i=0
    xml = '<?xml version="1.0" encoding="UTF-8"?>'
    xml += '\n'+'<kml xmlns="http://www.opengis.net/kml/2.2"'
    xml += '\n'+'xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">'
    xml += '\n'+'<gx:Tour>'
    xml += '\n\t'+'<name>Orbit</name>'
    xml += '\n\t'+'<gx:Playlist>'
    for i in range(0,360,10):
        print(i)
        xml += '\n\t\t'+'<gx:FlyTo>'
        xml += '\n\t\t\t'+'<gx:duration>1.2</gx:duration>'
        xml += '\n\t\t\t'+'<gx:flyToMode>smooth</gx:flyToMode>'
        xml += '\n\t\t\t'+'<LookAt>'
        xml += '\n\t\t\t\t'+'<longitude>'+str(lon)+'</longitude>'
        xml += '\n\t\t\t\t'+'<latitude>'+str(lat)+'</latitude>'
        xml += '\n\t\t\t\t'+'<altitude>'+str(alt)+'</altitude>'
        xml += '\n\t\t\t\t'+'<heading>'+str(i)+'</heading>'
        xml += '\n\t\t\t\t'+'<tilt>'+str(tilt)+'</tilt>'
        xml += '\n\t\t\t\t'+'<gx:fovy>'+str(fovy)+'</gx:fovy>'
        xml += '\n\t\t\t\t'+'<range>'+str(range1)+'</range>'
        xml += '\n\t\t\t\t'+'<gx:altitudeMode>absolute</gx:altitudeMode>'
        xml += '\n\t\t\t'+'</LookAt>'
        xml += '\n\t\t'+'</gx:FlyTo>'

    xml += '\n\t'+'</gx:Playlist>'
    xml += '\n'+'</gx:Tour>'
    xml += '\n'+'</kml>'
    return xml

def generate_orbit_file(content, filename):

    mypath ="static/kml"
    if not os.path.exists(mypath):
        os.makedirs(mypath)
        print("Path is created")
    fname = mypath + "/" + filename
    with open(fname,"w") as f:
        f.write(content)
    f.close()
    print(fname)
    return fname

def save_orbit_files():

    content = generate_orbit_content(lon1, lat1, alt1, tilt1, fovy1, range1)
    path1 = generate_orbit_file(content, 'main_parking_tour.kml')

    content2 = generate_orbit_content(lon2, lat2, alt2, tilt2, fovy2, range2)
    path2 = generate_orbit_file(content2, 'magical_parking_tour.kml')
    print(path1,path2)

    return path1,path2

def sendKML_ToGalaxy(kml_name1, kml_name2, kmls_filename):
    save_orbit_files()
    mypath ="kml_tmp"
    if not os.path.exists(mypath):
        os.makedirs(mypath)
        print("Path is created")
    fname = mypath + "/" + kmls_filename
    with open(fname,"w") as f:
        f.write("http://" + str(server_IP) + ":5000/get-data/kml/" + str(kml_name1)+".kml"+"\n")
        f.write("http://" + str(server_IP) + ":5000/get-data/kml/" + str(kml_name2)+".kml")
    f.close()
    print(fname)

    #sshpass -p 'lqgalaxy' scp -o 'StrictHostKeyChecking=no' kml_tmp/kmls.txt lg@10.160.67.148:/var/www/html/
    command = "sshpass -p '"+lg_pass+"' scp -o 'StrictHostKeyChecking=no' " + file_kmls_txt_path + " lg@"+ lg_IP +":" + serverPath
    print(command)
    error = os.system(command)

    return error



def create_logo_kml_send():
    logo_kml = 'slave_4.kml'

    xml = '<?xml version="1.0" encoding="UTF-8"?>'
    xml += '<kml xmlns="http://www.opengis.net/kml/2.2" '
    xml += 'xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:atom="http://www.w3.org/2005/Atom">'
    xml += '\n\t'+'<Document>'
    xml += '\n\t\t'+'<Folder>'
    xml += '\n\t\t\t'+'<ScreenOverlay>'
    xml += '\n\t\t\t\t'+'<name>Logos</name>'
    xml += '\n\t\t\t\t'+'<Icon>'
    xml += '\n\t\t\t\t\t'+'<href>'+str(img_url)+'</href>'
    xml += '\n\t\t\t\t'+'</Icon>'
    xml += '\n\t\t\t\t'+'<overlayXY x="0" y="1" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t\t'+'<screenXY x="0" y="1" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t\t'+'<rotationXY x="0" y="0" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t\t'+'<size x="0" y="0" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t'+'</ScreenOverlay>'
    xml += '\n\t\t'+'</Folder>'
    xml += '\n\t'+'</Document>'
    xml += '\n'+'</kml>'
    
    mypath ="kml_tmp"
    if not os.path.exists(mypath):
        os.makedirs(mypath)
        print("Path is created")
    fname = mypath + "/" + logo_kml
    with open(fname,"w") as f:
        f.write(xml)
    f.close()
    print(fname)

    command = "sshpass -p '"+lg_pass+"' scp -o 'StrictHostKeyChecking=no' "+fname+ " lg@"+ lg_IP +":" + serverPath+"kml"
    print(command)
    #sshpass -p 'lqgalaxy' scp -o 'StrictHostKeyChecking=no' kml_tmp/slave_5.kml lg@10.160.67.148:/var/www/html/kml
    error = os.system(command)

    return error


def create_info_kml_send(info_img_url):
    info_kml = 'slave_3.kml'
    
    xml = '<?xml version="1.0" encoding="UTF-8"?>'
    xml += '<kml xmlns="http://www.opengis.net/kml/2.2" '
    xml += 'xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:atom="http://www.w3.org/2005/Atom">'
    xml += '\n\t'+'<Document>'
    xml += '\n\t\t'+'<Folder>'
    xml += '\n\t\t\t'+'<ScreenOverlay>'
    xml += '\n\t\t\t\t'+'<name>Logos</name>'
    xml += '\n\t\t\t\t'+'<Icon>'
    xml += '\n\t\t\t\t\t'+'<href>'+str(info_img_url)+'</href>'
    xml += '\n\t\t\t\t'+'</Icon>'
    xml += '\n\t\t\t\t'+'<overlayXY x="0" y="1" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t\t'+'<screenXY x="0" y="1" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t\t'+'<rotationXY x="0" y="0" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t\t'+'<size x="0" y="0" xunits="fraction" yunits="fraction"/>'
    xml += '\n\t\t\t'+'</ScreenOverlay>'
    xml += '\n\t\t'+'</Folder>'
    xml += '\n\t'+'</Document>'
    xml += '\n'+'</kml>'
    
    
    print(info_kml)
    

    mypath ="kml_tmp"
    if not os.path.exists(mypath):
        os.makedirs(mypath)
        print("Path is created")
    fname = mypath + "/" + info_kml
    with open(fname,"w") as f:
        f.write(xml)
    f.close()
    print(fname)

    command = "sshpass -p '"+lg_pass+"' scp -o 'StrictHostKeyChecking=no' "+fname+ " lg@"+ lg_IP +":" + serverPath+"kml"
    print(command)
    #sshpass -p 'lqgalaxy' scp -o 'StrictHostKeyChecking=no' kml_tmp/slave_5.kml lg@10.160.67.148:/var/www/html/kml
    error = os.system(command)

    return error



def play_orbit():
    command = "echo 'playtour=Orbit' | sshpass -p "+lg_pass+" ssh lg@"+lg_IP+" 'cat - > /tmp/query.txt'"
    print(command)
    error = os.system(command)

    print ("Play orbit!")
    return error

def send_main_file_orbit1():

    # Send the files to galaxy
    create_logo_kml_send()
    create_info_kml_send(info1_img_url)
    error = sendKML_ToGalaxy('Free_parking', 'main_parking_tour', kmls_filename)
    play_orbit()
    return error

def send_main_file_orbit2():

    # Send the files to galaxy
    create_logo_kml_send()
    create_info_kml_send(info2_img_url)
    error = sendKML_ToGalaxy('Free_parking', 'magical_parking_tour', kmls_filename)
    play_orbit()
    return error


# To start tour
#command = "echo 'playtour=Orbit' | sshpass -p lq ssh lg@192.168.10.185 'cat - > /tmp/query.txt'"
#os.system(command)

# To end tour
#command = "echo 'exittour=true' | sshpass -p lq ssh lg@192.168.10.185 'cat - > /tmp/query.txt'"
#os.system(command)

#def write_FlyTo_andSend(kml_file_name):
    #ip_galaxy_master = lg_IP
    #ip_server = server_IP

    #file = open(kml_file_name, 'r+')
    #line = file.read()
    #flyto_text = line.split("<LookAt>")[1].split("</LookAt")[0]
    #file.close()

    #file = open("kml_tmp/query.txt", 'w+')
    #file.write("flytoview=<LookAt>"+flyto_text+"</LookAt>" + '\n')
    #file.close()

    #os.system("sshpass -p 'lqgalaxy' scp " + file_query_txt_path + " lg@"+ ip_galaxy_master +":" + serverPath_query)


def flyTo_initialize():

    flyto_text = "<LookAt><longitude>40.77</longitude><latitude>-3.6</latitude><altitude>0</altitude><heading>0</heading><tilt>5</tilt><range>10000000</range><altitudeMode>absolute</altitudeMode></LookAt>"

    file = open("kml_tmp/query.txt", 'w+')
    file.write("flytoview="+ flyto_text + '\n')
    file.close()

    error = os.system("sshpass -p "+lg_pass+" scp " + file_query_txt_path + " lg@"+ lg_IP +":" + serverPath_query)
    return error

