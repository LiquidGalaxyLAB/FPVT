# Create a handler for GET image
import numpy as np
from flask import send_file


def showim():
    filename = 'templates\static\images\output.JPG'
    return send_file(filename, mimetype='image/jpg') #as_attachment=True
