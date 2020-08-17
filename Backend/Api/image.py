# Create a handler for GET image
import numpy as np
from flask import send_file
import base64
from base64 import b64encode
from json import dumps
import datetime
import time


def showim_main1():
    filename1 = 'templates/static/images/new_output1.jpg'
    return send_file(filename1, mimetype='image/jpg') #as_attachment=True

def showim_main2():
    filename2 = 'templates/static/images/new_output2.jpg'
    return send_file(filename2, mimetype='image/jpg') #as_attachment=True)

def showim_mag1():
    filename3 = 'templates/static/images/new_output3.jpg'
    return send_file(filename3, mimetype='image/jpg') #as_attachment=True

def showim_mag2():
    filename4 = 'templates/static/images/new_output4.jpg'
    return send_file(filename4, mimetype='image/jpg') #as_attachment=True
