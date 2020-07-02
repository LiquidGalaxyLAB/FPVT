import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import HomeStack from "./homeStack";
import AboutStack from "./aboutStack";
import SignUpStack from "./signupStack";

const RootDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    About: {
      screen: AboutStack,
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
      activeBackgroundColor: "#4b788f",
      labelStyle: {
        fontSize: 15,
        marginLeft: 10,
      },
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);

export default createAppContainer(RootDrawerNavigator);