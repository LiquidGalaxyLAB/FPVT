# Create a handler for GET image
import numpy as np
from flask import send_file
import base64
from base64 import b64encode
from json import dumps
import datetime
import time


def showim():
    filename = 'templates/static/images/new_output.jpg'
    return send_file(filename, mimetype='image/jpg') #as_attachment=True

def encode_im():
    image = open('templates/static/images/new_output.jpg', 'rb') #open binary file in read mode
    image_read = image.read()
    # ts = datetime.datetime.now().isoformat()
    ts = time.strftime("%Y%m%d-%H%M%S")
    print(ts)
    image_64_encode = b64encode(image_read)
    image_64_decode = image_64_encode.decode('utf-8') 
    # print(image_64_encode)
    raw_data = {'templates/static/images/new_output.jpg': image_64_decode}

    #encoding data to json
    json_data = dumps(raw_data, indent=2)
    JSON_FILE = f"templates/static/images/output_{ts}.json"
    #write json to memory
    with open(JSON_FILE, 'w') as another_open_file:
        another_open_file.write(json_data)
    # image_result = open('templates\static\images\output_decode.JPG', 'wb') # create a writable image and write the decoding result
    # image_result.write(image_64_decode)
    return image_64_decode
