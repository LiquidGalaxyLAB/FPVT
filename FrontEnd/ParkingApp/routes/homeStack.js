import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import ParkingView from "../screens/parking";
import Header from "../shared/header";
import React from "react";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        // eslint-disable-next-line react/display-name
        headerTitle: () => <Header navigation={navigation} title="Home" />,
      };
    },
  },
  ParkingView: {
    screen: ParkingView,
    navigationOptions: {
      title: "Parking Zone",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4b788f", height: 60 },
  },
});

export default HomeStack;
