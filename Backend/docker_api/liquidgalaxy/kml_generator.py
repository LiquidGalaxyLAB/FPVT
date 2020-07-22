import pandas as pd
os.system("sudo apt-get install simplekml")
import simplekml
kml = simplekml.Kml()

def create__kml(df):
  # color = 'red'
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
      print(df.loc[i].color)
    elif (df.loc[i].color == 'green'):
      pol.style.linestyle.color = simplekml.Color.green
      pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.green)
      print(df.loc[i].color)
    elif (df.loc[i].color == 'yellow'):
      pol.style.linestyle.color = simplekml.Color.yellow
      pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.yellow)
      print(df.loc[i].color)
    else:
      pol.style.linestyle.color = simplekml.Color.blue
      pol.style.polystyle.color = simplekml.Color.changealphaint(80, simplekml.Color.blue)
      print(df.loc[i].color)

    # pol.style.linestyle.color = simplekml.Color.yellow
    pol.style.linestyle.width = 3
    # pol.style.polystyle.color = simplekml.Color.changealphaint(30, simplekml.Color.red)

  kml.save("./liquidgalaxy/Free_parking.kml")

if __name__ == "__main__":
    test = pd.read_csv('./data/Consolidated_data.csv')
    test = test.replace('\n','', regex=True)
    test = test.replace('\t','', regex=True)
    test = test.replace(' ',',', regex=True)
    test.drop([352], inplace=True)

    create__kml(test)
