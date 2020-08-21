import { createStackNavigator } from "react-navigation-stack";
import FillIp from "../screens/fillip";
import Header from "../shared/header";
import React from "react";

const screens = {
  ServerIP: {
    screen: FillIp,
    navigationOptions: ({ navigation }) => {
      return {
        // eslint-disable-next-line react/display-name
        headerTitle: () => <Header navigation={navigation} title="ServerIP" />,
      };
    },
  },
};

const FillIpStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4b788f", height: 60 },
  },
});

export default FillIpStack;
