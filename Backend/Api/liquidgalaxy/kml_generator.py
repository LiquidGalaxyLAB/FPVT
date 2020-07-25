#!/usr/bin/python
# coding: utf-8

import os
import pandas as pd

import simplekml
kml = simplekml.Kml()

def create_kml():
    base_dir = get_base_dir2()
    # color = 'red'
    df = pre_process()
    for i in range(len(df)):
      # print(i)
      # colorp = test.loc[i].color
      pname = df.loc[i].PName
      coord = (df.loc[i].geometry).split(",")
      pol = kml.newpolygon(name=pname)
      #
      pol.outerboundaryis = [(float(coord[0]),float(coord[1]),float(coord[2])),
                             (float(coord[3]),float(coord[4]),float(coord[5])),
                             (float(coord[6]),float(coord[7]),float(coord[8])),
                             (float(coord[9]),float(coord[10]),float(coord[11])),
                             (float(coord[12]),float(coord[13]),float(coord[14]))]
      if (df.loc[i].color == 'red'):
        pol.style.linestyle.color = simplekml.Color.red
        pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.red)
        # print(df.loc[i].color)
      elif (df.loc[i].color == 'green'):
        pol.style.linestyle.color = simplekml.Color.green
        pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.green)
        # print(df.loc[i].color)
      elif (df.loc[i].color == 'yellow'):
        pol.style.linestyle.color = simplekml.Color.yellow
        pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.yellow)
        # print(df.loc[i].color)
      else:
        pol.style.linestyle.color = simplekml.Color.blue
        pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.blue)
        # print(df.loc[i].color)

      # pol.style.linestyle.color = simplekml.Color.yellow
      pol.style.linestyle.width = 3
      # pol.style.polystyle.color = simplekml.Color.changealphaint(30, simplekml.Color.red)

    kml.save(base_dir + '/liquidgalaxy/Free_parking.kml')
    print("KML file saved!")

def pre_process():
    base_dir = get_base_dir2()
    print(base_dir)
    print(base_dir + '/data/Consolidated_data.csv')
    test = pd.read_csv(base_dir + '/data/Consolidated_data.csv')
    test = test.replace('\n','', regex=True)
    test = test.replace('\t','', regex=True)

    test = test.replace(' ',',', regex=True)
    test.drop([352], inplace=True)
    print("main file read!")
    print(test.head())
    return test

def get_base_dir2():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print(base_dir)
    return base_dir

if __name__ == "__main__":
    # Create kml file with occupancy
    create_kml()
