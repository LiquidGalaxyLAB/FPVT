import React, { useState } from "react";
// import * as Font from "expo-font";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Switch,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import ProgressCircle from "react-native-progress-circle";
import { Icon, registerCustomIconType } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
registerCustomIconType("font-awesome-5", FontAwesome5);

// const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ParkingView() {
  const pressLogo = () => {
    Alert.alert("Todo", " Add Functionality ", [
      { text: "OK", onPress: () => console.log("Test") },
    ]);
  };
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {/* <View style={{ marginTop: 25 }}>
        <Text style={globalStyles.text2}>Total Capacity</Text>
        <Text style={globalStyles.text3}>40</Text>
        <Text style={globalStyles.text2}>Number of free spots</Text>
        <Text style={globalStyles.text3}>8</Text>
        <Text style={globalStyles.text2}>Number of occupied spots</Text>
        <Text style={globalStyles.text3}>32</Text>
      </View> */}

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
            {"85"}
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
          percent={2800 / 85}
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
            {"28"}
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
          percent={5700 / 85}
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
            {"57"}
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

      <View style={{ marginTop: 15 }}>
        <Image
          style={{
            // flex: 1,
            alignSelf: "center",
            height: 250,
            // width: 350,
            resizeMode: "contain",
          }}
          source={require("../components/images/Pspace.jpg")}
        />
      </View>
      <View style={globalStyles.container}>
        <View style={globalStyles.buttonContainer2}>
          <Button title="All" color="#4b788f" />
          <Button title="Electric" color="grey" />
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
});
