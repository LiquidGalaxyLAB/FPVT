# Create a handler for GET image
import numpy as np
import pandas as pd
from flask import jsonify
import json
import time


def main():
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(ts)
    filename = './data/Consolidated_data.csv'
    df = pd.read_csv(filename)
    print(df.head())
    total_cap = len(df)
    number_uk = len(df[df.color.isin(['yellow'])])
    number_in_cam_view = total_cap - number_uk
    number_free = len(df[df.color == 'green'])
    number_reserved = 3    # existing reserved spots for handicapped
    number_occupied = number_in_cam_view - (number_free + number_reserved)
    perc_occ =  number_occupied*100/number_in_cam_view
    perc_free = number_free*100/number_in_cam_view
    dict_stats = {
    'Last refresh': ts,
    'Capacity': total_cap,
    'Number in camera view': number_in_cam_view,
    'Free spots': number_free,
    'Occupied spots': number_occupied,
    'Reserved spots': number_reserved,
    'Percentage free': perc_free,
    'Percentage occupied': perc_occ,
    }
    print(dict_stats)
    #print(json.dumps(dict_stats, indent=4))
    return dict_stats

