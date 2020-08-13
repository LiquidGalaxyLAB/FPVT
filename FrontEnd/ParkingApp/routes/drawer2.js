import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import React from "react";
import { View, Image } from "react-native";

import SignUpStack from "./signupStack";
import SignInStack from "./signinStack";

const CustomContent = (props) => {
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
    </View>
  );
};

const RootDrawerNavigator = createDrawerNavigator(
  {
    Login: {
      screen: SignInStack,
    },
    SignUp: {
      screen: SignUpStack,
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
    contentComponent: CustomContent,
    initialRouteName: "Login",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);

export default createAppContainer(RootDrawerNavigator);
