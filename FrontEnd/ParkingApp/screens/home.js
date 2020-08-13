import React, { useState, Fragment, useEffect } from "react";
import { globalStyles } from "../styles/global";
import {
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { Icon, registerCustomIconType } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
registerCustomIconType("font-awesome-5", FontAwesome5);

const infoURL = "https://myubuntu-5jsdawxgba-uc.a.run.app/api/info";

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("ParkingView");
  };

  const [selectedValue, setSelectedValue] = useState("all");
  const [data1, setData1] = useState(null);

  function round(num, precision = 2) {
    var scaled = Math.round(num + "e" + precision);
    return Number(scaled + "e" + -precision);
  }

  useEffect(() => {
    fetch(infoURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson["Percentage occupied"]);
        setData1(responseJson["Percentage occupied"]);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#4b788f",
          justifyContent: "center",
        }}
      >
        <View style={{ backgroundColor: "#4b788f" }}>
          <Text style={styles.header}>Welcome to Lleida's Scientific Park</Text>
          <Text style={styles.header1}>17 June 2020</Text>
        </View>
      </View>

      <Text style={globalStyles.text1}>Parking Availability</Text>

      <View style={globalStyles.container}>
        <ProgressCircle
          percent={6.3}
          radius={80}
          borderWidth={2}
          color="#EF8354"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Icon
            // reverse
            name="car"
            type="font-awesome-5"
            size={55}
            // color="#f50"
            onPress={() => console.log("hello")}
          />
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
              marginBottom: 2,
              color: "#EF8354",
            }}
          >
            {round(data1) + "%"}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              marginBottom: 2,
              fontFamily: "OpenSans-Regular",
              color: "grey",
            }}
          >
            {"BUSY"}
          </Text>
        </ProgressCircle>
      </View>

      <View style={styles.dropdown}>
        <Fragment>
          <Text style={styles.dropdowntxt}>Choose parking type</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.internalPickerContainer}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            itemStyle={styles.pickerIosListItemContainer}
            itemTextStyle={styles.pickerIosListItemText}
          >
            <Picker.Item label="All" value="all" />
            {/* <Picker.Item label="Electric" value="el" /> */}
            <Picker.Item label="Reserved" value="re" />
          </Picker>
        </Fragment>
      </View>

      <View style={globalStyles.container}>
        <View style={globalStyles.buttonContainer}>
          <Button
            title="View Parking Spaces"
            onPress={pressHandler}
            color="#4b788f"
          />
        </View>
      </View>

      {/* <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={pressHandler2}>
          <View>
            <Text style={globalStyles.ques}>
              Are you a regular user? Sign Up!
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text1: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    backgroundColor: "#fff",
    lineHeight: 23,
    fontFamily: "OpenSans-Light",
  },
  header: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
    fontSize: 30,
    lineHeight: 32,
    fontFamily: "OpenSans-Regular",
    color: "#e2fdff",
  },
  header1: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 40,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
    fontSize: 20,
    lineHeight: 32,
    fontFamily: "OpenSans-Regular",
    color: "white",
  },
  dropdown: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 16,
  },
  dropdowntxt: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#fff",
    lineHeight: 23,
    fontFamily: "OpenSans-Light",
  },
  internalPickerContainer: {
    flex: Platform.OS === "ios" ? 1 : null, // for Android, not visible otherwise.
    width: Platform.OS === "ios" ? undefined : 120,
  },
  pickerIosListItemContainer: {
    flex: 1,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerIosListItemText: {
    fontSize: 16,
  },
});
