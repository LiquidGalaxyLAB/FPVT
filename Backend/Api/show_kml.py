# Create a handler for GET image
import numpy as np
import pandas as pd
import pykml
import os
from pykml import parser


def download():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(base_dir + '/Api/liquidgalaxy/Free_parking.kml')
    print(file_path)
    #with open(filename) as f:
     # root = parser.parse(f).getroot()
    #print(root)
    return file_path

def show_kml():
    return send_file('/Api/liquidgalaxy/Free_parking.kml')
