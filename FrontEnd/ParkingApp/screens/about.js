import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function About() {
  const handlePressSite = () => {
    Linking.openURL("https://github.com/LiquidGalaxyLAB/FPVT").catch(() =>
      alert("Error")
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ backgroundColor: "#4b788f", marginTop: 0 }}>
        <Image
          style={{
            flex: 1,
            alignSelf: "center",
            height: 350,
            width: 350,
            resizeMode: "contain",
          }}
          source={require("../components/images/FPVT.gif")}
        />
      </View>
      <Text style={styles.parag}>
        The FPVT project is developed for detecting free parking spaces from
        surveillance images in parking lots using object detection models. The
        work is carried out as a part of the Google Summer of Code 2020, in
        collaboration with the Liquid Galaxy Lab.
      </Text>
      <TouchableOpacity onPress={handlePressSite}>
        <View>
          <Text style={styles.scode}>Click for more information</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parag: {
    justifyContent: "center",
    textAlign: "justify",
    fontSize: 16,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 45,
    backgroundColor: "#fff",
    color: "#464E51",
    lineHeight: 23,
    fontFamily: "OpenSans-Regular",
  },
  scode: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 25,
    marginRight: 25,
    color: "#4b788f",
    lineHeight: 23,
    fontFamily: "OpenSans-Regular",
    textDecorationLine: "underline",
  },
});
