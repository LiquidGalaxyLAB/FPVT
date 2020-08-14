# ipsettings
import os
import subprocess

def get_ip():
    f = open("./ipsettings", "r")
    ip = f.read()
    f.close()
    return ip

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(BASE_DIR)
ip1 = get_ip()

print(ip1)
