# import os
# import netifaces as ni
# import time
# from pilt.settings import BASE_DIR
# import subprocess
# from os.path import isfile,join
#
# file_kmls_txt_path = "kml_tmp/kmls.txt"
# file_query_txt_path = "kml_tmp/query.txt"
# serverPath = "/var/www/html/"
# serverPath_query = "/tmp/"
#
# class Project_configuration(object):
#
#     def __init__(self):
#         print("Project configuration ...")
#
#     def get_galaxy_ip(self):
#         f = open(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + '/galaxy_ip', 'r')
#         ip_galaxy_master = f.read()
#         f.close()
#         return ip_galaxy_master
#
#     def get_galaxy_ip():
#         f = open(os.path.dirname(os.path.dirname(os.path.abspath(__file__))) +'/liquidgalaxy/ipsettings', 'r')
#         ip_galaxy = f.read()
#         f.close()
#         return ip_galaxy
#
#     def get_server_ip(self):
#         ni.ifaddresses('eth0')
#         ip_server = ni.ifaddresses('eth0')[2][0]['addr']
#         return ip_server
#
#     def get_server_ip():
#         p = subprocess.Popen(
#             "ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}'",
#             #"ifconfig eno1 | grep 'inet addr:' | cut -d: -f2 | awk '{print $1}'",
#             shell=True,
#             stdout=subprocess.PIPE)
#         ip_server = p.communicate()[0]
#         return ip_server
#
#     def write_kml(kmlFolder,folder):
#         print(kmlFolder)
#         print(BASE_DIR)
#
#         ip_server = get_server_ip()
#         os.system("touch kmls.txt")
#         os.system("rm kmls.txt")
#         os.system("touch kmls.txt")
#         file = open("kmls.txt", 'w')
#         onlyfiles = [f for f in os.listdir(kmlFolder) if isfile(join(kmlFolder, f))]
#         for kmlFile in onlyfiles:
#             file.write("http://" + str(ip_server)[0:(len(ip_server) - 1)] +":8000/static/ibri/"+ folder +"/"+ kmlFile + "\n")
#         file.close()
#         send_galaxy()
#
#     def create_kmlstxt(participants):
#         ip_server = get_server_ip()
#         os.system("touch kmls.txt")
#         os.system("rm kmls.txt")
#         os.system("touch kmls.txt")
#         file = open("kmls.txt", 'w')
#         for participant in participants:
#             file.write(
#                 "http://" + str(ip_server)[0:(len(ip_server) - 1)] + ":8000/" + participant.kmlpath + "\n")
#         file.close()
#
#         send_galaxy()
#
#     def sendKML_ToGalaxy(self, kml_file, kml_name):
#     	ip_galaxy_master = self.get_galaxy_ip()
#     	ip_server = self.get_server_ip()
#
#     	file = open("kml_tmp/kmls.txt", 'w+')
#     	file.write("http://" + str(ip_server) + ":8000/static/kml/" + str(kml_name)+".kml?a=" + str(int(round(time.time()))) + "\n")
#     	file.close()
#
#     	os.system("sshpass -p 'lqgalaxy' scp " + file_kmls_txt_path + " lg@"+ ip_galaxy_master +":" + serverPath)
#
#     	print ("KML send!!")
#
#     def send_galaxy():
#         file_path = "kmls.txt"
#         server_path = "/var/www/html"
#         print("sshpass -p 'lqgalaxy' scp " + file_path + " lg@" + get_galaxy_ip() +":" + server_path)
#         os.system("sshpass -p 'lqgalaxy' scp " + file_path + " lg@" + get_galaxy_ip() +":" + server_path)
#
#
#      def write_FlyTo_andSend(self, kml_file_name):
#     	ip_galaxy_master = self.get_galaxy_ip()
#     	ip_server = self.get_server_ip()
#
#     	file = open(kml_file_name, 'r+')
#     	line = file.read()
#     	flyto_text = line.split("<LookAt>")[1].split("</LookAt")[0]
#     	file.close()
#
#     	file = open("kml_tmp/query.txt", 'w+')
#     	file.write("flytoview=<LookAt>"+flyto_text+"</LookAt>" + '\n')
#     	file.close()
#
#     	os.system("sshpass -p 'lqgalaxy' scp " + file_query_txt_path + " lg@"+ ip_galaxy_master +":" + serverPath_query)
#
#     def flyto(localization):
#         message = "echo 'search={localization}' > /tmp/query.txt".format(localization=localization)
#         comunicate(message)
#
#
#
