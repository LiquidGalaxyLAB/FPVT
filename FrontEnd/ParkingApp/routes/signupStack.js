import { createStackNavigator } from "react-navigation-stack";
import SignUp from "../screens/userlogin/signup";
import Header from "../shared/header";
import React from "react";

const screens = {
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => {
      return {
        // eslint-disable-next-line react/display-name
        headerTitle: () => (
          <Header navigation={navigation} title="Create account" />
        ),
      };
    },
  },
};

const SignUpStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#4b788f", height: 60 },
  },
});

export default SignUpStack;
