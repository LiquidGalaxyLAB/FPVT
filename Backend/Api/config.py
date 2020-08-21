# ipsettings
import os
import subprocess
import configparser

server_IP = ''
lg_IP = ''
lg_pass = ''
kml_data = ''
screen_for_logos=''
screens_for_info=''


def get_server_ip():
    #p = subprocess.Popen("ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}'",
 #shell=True, stdout=subprocess.PIPE)
    p = subprocess.Popen("ifconfig enp2s0 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}'",
 shell=True, stdout=subprocess.PIPE)
    ip_server = p.communicate()[0]
    print(ip_server)
    return ip_server


def LoadConfigFile():
    config = configparser.ConfigParser()
    configFilePath = r'app.conf'
    config.read(configFilePath)
    
    server_IP = config['INSTALLATION']['server_IP']
    lg_IP = config['INSTALLATION']['lg_IP']
    lg_pass = config['INSTALLATION']['lg_pass']
    kml_data = config['INSTALLATION']['kml_data']
    screen_for_logos = config['INSTALLATION']['screen_for_logos']
    screen_for_info = config['INSTALLATION']['screen_for_info']
    return server_IP, lg_IP, lg_pass, kml_data, screen_for_logos, screen_for_info
