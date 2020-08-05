import { createStackNavigator } from "react-navigation-stack";
import SignIn from "../screens/userlogin/signin";
import Header from "../shared/header";
import React from "react";

const screens = {
  SignIn: {
    screen: SignIn,
    navigationOptions: ({ navigation }) => {
      return {
        // eslint-disable-next-line react/display-name
        headerTitle: () => <Header navigation={navigation} title="Login" />,
      };
    },
  },
};

const SignInStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4b788f", height: 60 },
  },
});

export default SignInStack;
