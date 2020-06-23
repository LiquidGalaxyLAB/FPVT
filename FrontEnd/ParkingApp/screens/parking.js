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

// const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ParkingView() {
  const pressLogo = () => {
    Alert.alert("Todo", " Add Functionality ", [
      { text: "OK", onPress: () => console.log("Test") },
    ]);
  };
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ marginTop: 25 }}>
        <Text style={globalStyles.text2}>Total Capacity</Text>
        <Text style={globalStyles.text3}>40</Text>
        <Text style={globalStyles.text2}>Number of free spots</Text>
        <Text style={globalStyles.text3}>8</Text>
        <Text style={globalStyles.text2}>Number of occupied spots</Text>
        <Text style={globalStyles.text3}>32</Text>
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

const styles = StyleSheet.create({});
