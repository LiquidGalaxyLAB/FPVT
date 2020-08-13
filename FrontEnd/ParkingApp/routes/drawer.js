import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import React from "react";
import { View, TouchableOpacity, Text, Image, Alert } from "react-native";

import HomeStack from "./homeStack";
import AboutStack from "./aboutStack";

import { AuthContext } from "../components/context";

const CustomContent = (props) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <View style={{ backgroundColor: "#4b788f" }}>
        <Image
          style={{
            // flex: 1,
            marginTop: 25,
            alignSelf: "center",
            height: 150,
            width: 150,
            resizeMode: "contain",
          }}
          source={require("../assets/FPVT.png")}
        />
      </View>
      <View>
        <DrawerItems {...props} />
      </View>

      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        style={{
          bottom: -350,
          position: "relative",
          width: "100%",
          marginLeft: 10,
        }}
      >
        <View>
          <Text style={{ color: "white" }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const RootDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    About: {
      screen: AboutStack,
    },
  },
  {
    drawerBackgroundColor: "#39393A",
    statusBarAnimation: "slide",
    contentOptions: {
      activeTintColor: "white",
      inactiveTintColor: "white",
      activeBackgroundColor: "grey",
      labelStyle: {
        fontSize: 15,
        marginLeft: 10,
      },
    },
    initialRouteName: "Home",
    contentComponent: CustomContent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);

export default createAppContainer(RootDrawerNavigator);
