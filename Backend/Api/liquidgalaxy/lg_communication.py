import os
import time
from config import *
import subprocess
from os.path import isfile,join

file_kmls_txt_path = BASE_DIR + "/liquidgalaxy/kmls.txt"
print(file_kmls_txt_path)
file_query_txt_path = BASE_DIR + "/liquidgalaxy/query.txt"
print(file_query_txt_path)
file_path = BASE_DIR + "/liquidgalaxy/kmls.txt"
print(file_path)
serverPath = "/var/www/html/"
serverPath_query = "/tmp/"


def get_galaxy_ip():
    f = open(BASE_DIR +'/liquidgalaxy/ipsettings', 'r')
    ip_galaxy = f.read()
    f.close()
    print(ip_galaxy)
    return ip_galaxy


def get_server_ip():
    p = subprocess.Popen("ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}'", shell=True, stdout=subprocess.PIPE)
    ip_server = p.communicate()[0]
    print(ip_server)
    return ip_server



def send_galaxy():
    print ("--------")
    file_path = BASE_DIR + "/liquidgalaxy/kmls.txt"
    print(file_path)
    server_path = "/var/www/html"
    print("sshpass -p 'lqgalaxy' scp " + file_path + " lg@" + get_galaxy_ip() +":" + server_path)
#    os.system("sshpass -p 'lqgalaxy' scp " + file_path + " lg@" + get_galaxy_ip() +":" + server_path)

    print ("--------KML sent!!")


def write_FlyTo_andSend():
    ip_galaxy_master = get_galaxy_ip()
    ip_server = get_server_ip()

    print("sshpass -p 'lqgalaxy' scp " + file_query_txt_path + " lg@"+ip_galaxy_master +":" + serverPath_query)
    #os.system("sshpass -p 'lqgalaxy' scp " + file_query_txt_path + " lg@"+ ip_galaxy_master +":" + serverPath_query)
    print ("--------")

send_galaxy()
write_FlyTo_andSend()




