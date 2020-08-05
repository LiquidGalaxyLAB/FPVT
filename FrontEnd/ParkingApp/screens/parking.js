import React, { useState, useEffect } from "react";
// import * as Font from "expo-font";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import ProgressCircle from "react-native-progress-circle";
import { Icon, registerCustomIconType } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
registerCustomIconType("font-awesome-5", FontAwesome5);
import Card from "../shared/card";

// const SCREEN_WIDTH = Dimensions.get("window").width;
const infoURL = "https://myubuntu-5jsdawxgba-uc.a.run.app/api/info";

export default function ParkingView() {
  const pressLogo = () => {
    Alert.alert("Thank you", " Please visit again ", [
      { text: "OK", onPress: () => console.log("Test") },
    ]);
  };

  useEffect(() => {
    fetch(infoURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        // console.log(responseJson);
        var test = responseJson;
        console.log(test["Number in camera view"]);
        console.log(test["Occupied spots"]);
        console.log(test["Free spots"]);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.stats}>
        <ProgressCircle
          percent={100}
          radius={40}
          borderWidth={3}
          color="grey"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 5,
              marginBottom: 2,
              color: "#4b788f",
            }}
          >
            {"159"}
          </Text>
          <Text
            style={{
              fontSize: 11,
              marginTop: 5,
              marginBottom: 2,
              fontFamily: "OpenSans-Regular",
              color: "grey",
            }}
          >
            {"TOTAL"}
          </Text>
        </ProgressCircle>
        <ProgressCircle
          percent={1000 / 159}
          radius={40}
          borderWidth={3}
          color="red" //#EF8354
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 5,
              marginBottom: 2,
              color: "red",
            }}
          >
            {"10"}
          </Text>
          <Text
            style={{
              fontSize: 11,
              marginTop: 5,
              marginBottom: 2,
              fontFamily: "OpenSans-Regular",
              color: "grey",
            }}
          >
            {"BUSY"}
          </Text>
        </ProgressCircle>
        <ProgressCircle
          percent={14600 / 159}
          radius={40}
          borderWidth={3}
          color="green"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 5,
              marginBottom: 2,
              color: "green",
            }}
          >
            {"146"}
          </Text>
          <Text
            style={{
              fontSize: 11,
              marginTop: 5,
              marginBottom: 2,
              fontFamily: "OpenSans-Regular",
              color: "grey",
            }}
          >
            {"FREE"}
          </Text>
        </ProgressCircle>
      </View>

      <View style={globalStyles.container2}>
        <Text style={styles.heading}>PARKING AREA VIEW</Text>
        <Image
          source={{
            uri: "https://myubuntu-5jsdawxgba-uc.a.run.app/api/image",
            method: "GET",
            headers: {
              Pragma: "no-cache",
            },
            body: "Your Body goes here",
          }}
          // source={require("..components/images/PSpace.jpg")}
          //source={require("../components/images/new_output.jpg")}
          style={{
            // flex: 1,
            alignSelf: "center",
            height: 1080 / 4.2,
            width: 1920 / 4.2,
            resizeMode: "contain",
            marginTop: 15,
            marginBottom: 15,
          }}
        />
        <View style={globalStyles.buttonContainer2}>
          <Button title="All" color="#4b788f" />
          {/* <Button title="Electric" color="grey" disabled={true} /> */}
          <Button title="Reserved" color="grey" />
        </View>
      </View>

      <View style={globalStyles.buttonContainer}>
        <Button
          title="Let's park!"
          onPress={() => pressLogo()}
          color="#4b788f"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stats: {
    flex: 1,
    marginTop: 30,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  heading: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 25,
    marginRight: 25,
    color: "#4b788f",
    lineHeight: 23,
    fontFamily: "OpenSans-Bold",
  },
});
