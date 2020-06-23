import React, { useState } from "react";
import { globalStyles } from "../styles/global";
import {
  Button,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, registerCustomIconType } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
registerCustomIconType("font-awesome-5", FontAwesome5);

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("ParkingView");
  };

  const pressLogo = () => {
    Alert.alert("Todo", " Add Functionality ", [
      { text: "OK", onPress: () => console.log("Test") },
    ]);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#4b788f",
          justifyContent: "center",
          // alignItems: "center",
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
          percent={80}
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
            {"80%"}
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

      <View style={globalStyles.container}>
        <View style={globalStyles.buttonContainer}>
          <Button
            title="View Parking Spaces"
            onPress={pressHandler}
            color="#4b788f"
          />
        </View>
      </View>

      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <View>
            <Text style={globalStyles.ques}>
              Are you a regular user? Sign Up!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
});
