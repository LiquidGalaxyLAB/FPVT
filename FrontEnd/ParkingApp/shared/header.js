import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation, title }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    // paddingTop: 30,
    alignItems: "center", // vertical alignment
    justifyContent: "center",
    backgroundColor: "#4b788f",
    flexDirection: "row",
    height: "100%", // default navigator that stack navigator gives
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: -50,
    color: "#fff",
  },
});
