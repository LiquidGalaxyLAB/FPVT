# Create a handler for GET image
import numpy as np
import pandas as pd
import pykml
import os
from pykml import parser

i = [0,90,180,270,360]

password = dict()
password['lg'] = 'lqgalaxy'



# Main Parking Lot
lon1=0.6065939099961359
lat1=41.60572107949841
alt1=196.8565658700859
range1=230.5098708774676
tilt1=52.27435395949843
fovy1=35

# Magical Parking Lot
lon2=0.6126382400113539
lat2=41.60858236007886
alt2=197.5155640489179
range2=112.2310699382615
tilt2=52.27350541007886
fovy2=35

orbit_info = []
orbit_info.append({'lon':lon1, 'lat':lat1, 'alt':alt1, 'heading':-0.07, 'tilt':tilt1, 'fovy':fovy1, 'range':range1, 'local_path':'liquidgalaxy/tmp/file_1_fpvt.kml', 'server_path':'/tmp/file_1_fpvt.kml'})
orbit_info.append({'lon':lon1, 'lat':lat1, 'alt':alt1, 'heading':90, 'tilt':tilt1, 'fovy':fovy1, 'range':range1, 'local_path':'liquidgalaxy/tmp/file_2.kml', 'server_path':'/tmp/file_2.kml'})
orbit_info.append({'lon':lon1, 'lat':lat1, 'alt':alt1, 'heading':180, 'tilt':tilt1, 'fovy':fovy1, 'range':range1, 'local_path':'liquidgalaxy/tmp/file_3.kml', 'server_path':'/tmp/file_3.kml'})
orbit_info.append({'lon':lon1, 'lat':lat1, 'alt':alt1, 'heading':270, 'tilt':tilt1, 'fovy':fovy1, 'range':range1, 'local_path':'liquidgalaxy/tmp/file_4.kml', 'server_path':'/tmp/file_4.kml'})
orbit_info.append({'lon':lon1, 'lat':lat1, 'alt':alt1, 'heading':360, 'tilt':tilt1, 'fovy':fovy1, 'range':range1, 'local_path':'liquidgalaxy/tmp/file_5.kml', 'server_path':'/tmp/file_5.kml'})

orbit_info2 = []
orbit_info2.append({'lon':lon2, 'lat':lat2, 'alt':alt2, 'heading':-0.07, 'tilt':tilt2, 'fovy':fovy2, 'range':range2, 'local_path':'liquidgalaxy/tmp/file_m1.kml', 'server_path':'/tmp/file_m1.kml'})
orbit_info2.append({'lon':lon2, 'lat':lat2, 'alt':alt2, 'heading':90, 'tilt':tilt2, 'fovy':fovy2, 'range':range2, 'local_path':'liquidgalaxy/tmp/file_m2.kml', 'server_path':'/tmp/file_m2.kml'})
orbit_info2.append({'lon':lon2, 'lat':lat2, 'alt':alt2, 'heading':180, 'tilt':tilt2, 'fovy':fovy2, 'range':range2, 'local_path':'liquidgalaxy/tmp/file_m3.kml', 'server_path':'/tmp/file_m3.kml'})
orbit_info2.append({'lon':lon2, 'lat':lat2, 'alt':alt2, 'heading':270, 'tilt':tilt2, 'fovy':fovy2, 'range':range2, 'local_path':'liquidgalaxy/tmp/file_m4.kml', 'server_path':'/tmp/file_m4.kml'})
orbit_info2.append({'lon':lon2, 'lat':lat2, 'alt':alt2, 'heading':360, 'tilt':tilt2, 'fovy':fovy2, 'range':range2, 'local_path':'liquidgalaxy/tmp/file_m5.kml', 'server_path':'/tmp/file_m5.kml'})
print(orbit_info[0])

def send_kml(file_path, username, ip, server_path):
    #var = "sshpass -p '"+password[username]+"' scp " + file_path + " "+username+"@" + ip +":" + server_path
    #print(var)
    tmp = os.system("sshpass -p '"+password[username]+"' scp -o 'StrictHostKeyChecking=no' " + file_path + " "+username+"@" + ip +":" + server_path)
    return tmp


def generate_orbit_content(lon, lat, alt, heading, tilt, fovy, range1):

    xml = '<?xml version="1.0" encoding="UTF-8"?>'
    xml += '\n'+'<kml xmlns="http://www.opengis.net/kml/2.2"'
    xml += '\n'+'xmlns:gx="http://www.google.com/kml/ext/2.2">'
    xml += '\n\t'+'<Placemark>'
    xml += '\n\t\t'+'<name>LookAt.kml</name>'
    xml += '\n\t\t'+'<LookAt>'
    xml += '\n\t\t'+'<longitude>'+str(lon)+'</longitude>'
    xml += '\n\t\t'+'<latitude>'+str(lat)+'</latitude>'
    xml += '\n\t\t'+'<altitude>'+str(alt)+'</altitude>'
    xml += '\n\t\t'+'<heading>'+str(heading)+'</heading>'
    xml += '\n\t\t'+'<tilt>'+str(tilt)+'</tilt>'
    xml += '\n\t\t'+'<gx:fovy>'+str(fovy)+'</gx:fovy>'
    xml += '\n\t\t'+'<range>'+str(range1)+'</range>'
    xml += '\n\t\t'+'<altitudeMode>absolute</altitudeMode>'
    xml += '\n\t\t'+'</LookAt>'
    xml += '\n\t\t'+'<Point>'
    xml += '\n\t\t\t'+'<coordinates>'+str(lon)+','+str(lat)+','+str(alt)+'</coordinates>'
    xml += '\n\t\t'+'</Point>'
    xml += '\n\t'+'</Placemark>'
    xml += '\n'+'</kml>'
    
    return xml
    
def generate_orbit_file(content, path):
    file1 = open(path, 'w')
    file1.write(content)
    file1.close()
    path1 = '/Api/'+path
    return path1


def send_kml_orbit_files():
    # Sending KML file
    error = send_kml('/Api/liquidgalaxy/Free_parking.kml', 'lg', '192.168.86.228', '/tmp/Free_parking.kml')

    for info in orbit_info:
        #print(info)
        content = generate_orbit_content(info['lon'], info['lat'], info['alt'], info['heading'], info['tilt'],info['fovy'], info['range'])
        path1 = generate_orbit_file(content, info['local_path'])
        print(path1)
        error = send_kml(path1, 'lg', '192.168.86.228', info['server_path'])
              
    return error

def send_mag_kml_orbit_files():
    # Sending KML file
    error = send_kml('/Api/liquidgalaxy/Free_parking.kml', 'lg', '192.168.86.228', '/tmp/Free_parking.kml')

    for info in orbit_info2:
        #print(info)
        content = generate_orbit_content(info['lon'], info['lat'], info['alt'], info['heading'], info['tilt'], info['fovy'], info['range'])
        path2 = generate_orbit_file(content, info['local_path'])
        print(path2)
        error = send_kml(path2, 'lg', '192.168.86.228', info['server_path'])
              
    return error

send_kml_orbit_files()
