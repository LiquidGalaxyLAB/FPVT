# Create a handler for GET image
import numpy as np
import pandas as pd
from flask import jsonify
import json
import time
from PIL import Image, ImageDraw,ImageFont

def get_data(df, tc):
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    print(ts)
    total_cap = tc
    number_in_cam_view = len(df)
    number_uk = total_cap - number_in_cam_view
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

def main():
    filename = './data/Consolidated_data.csv'
    df = pd.read_csv(filename)
    dict_stats = get_data(df, 489)
    
    return dict_stats

def main1():
    filename = './data/Consolidated_data.csv'
    df = pd.read_csv(filename)
    df_c1 = df[df['PL'].isin(['PL1C1', 'PL1C2'])]
    dict_stats1 = get_data(df_c1, 353)
    
    return dict_stats1

def main2():
    filename = './data/Consolidated_data.csv'
    df = pd.read_csv(filename)
    df_c2 = df[df['PL'].isin(['PL2C1', 'PL2C2'])]
    dict_stats2 = get_data(df_c2, 136)

    return dict_stats2

def save_stats_as_img(dict_stats):
    img = Image.new('RGB', (1100, 1400), color = 'white')

    info = '\n'+'PARKING LOT OCCUPANCY STATISTICS'+'\n'
    info += '__________________________________'+'\n\n\n'
    info += 'TIMESTAMP:'+f'{dict_stats["Last refresh"]}'+'\n\n'
    info += 'CAPACITY:'+f'{dict_stats["Capacity"]}'+'\n\n'
    info += 'NUMBER IN CAMERA VIEW:'+f'{dict_stats["Number in camera view"]}'+'\n\n'
    info += 'FREE SPOTS:'+f'{dict_stats["Free spots"]}'+'\n\n'
    info += 'OCCUPIED SPOTS:'+f'{dict_stats["Occupied spots"]}'+'\n\n'
    info += 'RESERVED SPOTS:'+f'{dict_stats["Reserved spots"]}'+'\n\n'
    info += 'PERCENTAGE FREE:'+f'{dict_stats["Percentage free"]}'+'\n\n'
    info += 'PERCENTAGE OCCUPIED:'+f'{dict_stats["Percentage occupied"]}'+'\n\n'
    print(info)

    d = ImageDraw.Draw(img)
    font = ImageFont.truetype('ARIALBD.TTF', 40)
    d.text((70,70), info, fill=(0,0,0), font=font)
    return img




