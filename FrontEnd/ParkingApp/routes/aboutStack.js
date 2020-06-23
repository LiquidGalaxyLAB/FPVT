import { createStackNavigator } from "react-navigation-stack";
import About from "../screens/about";
import Header from "../shared/header";
import React from "react";

const screens = {
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => {
      return {
        // title: '073electrisch',
        // eslint-disable-next-line react/display-name
        headerTitle: () => <Header navigation={navigation} title="About" />,
      };
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4b788f", height: 60 },
  },
});

export default AboutStack;
