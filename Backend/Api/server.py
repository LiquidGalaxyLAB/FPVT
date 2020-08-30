#!/usr/bin/python
# coding: utf-8

import os

from flask import (
    Flask,
    render_template,
    send_from_directory,
    url_for
)
from flask_cors import CORS
import connexion
import numpy as np

# load config
from config import *
LoadConfigFile()

# Load the model
# from detector import *
from detector_m import *
#================================================================
# Run the model
YOLO()

# Create KML file
from kml_generator import *

create_kml()

#Send information and logo to lg slaves
from show_kml import *
#create_logo_kml_send()
#create_info_kml_send()
save_orbit_files()
flyTo_initialize()

#Save stats
from stats import *
dict_stats = main()
dict_stats1 = main1()
dict_stats2 = main2()
img1 = save_stats_as_img(dict_stats1)
img1.save('./static/stats/info1.png')
img2 = save_stats_as_img(dict_stats2)
img2.save('./static/stats/info2.png')


# Create the application instance
app = connexion.FlaskApp(__name__, specification_dir='./')


# Read the swagger.yml file to configure the endpoints
app.add_api('swagger.yml')

# Add CORS support
CORS(app.app)


# Create a URL route in our application for "/"
@app.route('/')
def home():
    """
    This function just responds to the browser ULR
    localhost:5000/

    :return:        the rendered template 'home.html'
    """
    return render_template('home.html')

@app.route("/get-data/<path:filename>")
def get_data(filename):
    LoadConfigFile()

    try:
        return send_from_directory('./static', filename=filename, as_attachment=True)
    except FileNotFoundError:
        abort(404)


# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(debug=False) #host='0.0.0.0', port=5000,
