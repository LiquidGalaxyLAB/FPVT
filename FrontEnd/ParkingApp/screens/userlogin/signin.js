import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import { globalStyles } from "../../styles/global.js";
import { Formik } from "formik";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";

import Users from "./users";

import { AuthContext } from "../../components/context";

const SurveySchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(4),
});

const initialValues = {
  username: "",
  password: "",
};

export default function SignIn({ ...props }) {
  // const IP = props.navigation.getParam("ip", " ");
  // const PORT = props.navigation.getParam("port", " ");

  // let data = { ip: IP, port: PORT };

  const pressHandlermain = () => {
    console.log("Signin Successful!");
    props.navigation.push("Home"); //,data
    // Alert.alert("", JSON.stringify(props.navigation.state.params));
  };
  const pressHandler2 = () => {
    console.log("works");
    props.navigation.navigate("SignUp");
  };

  const { signIn } = React.useContext(AuthContext);

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (foundUser.length == 0) {
      Alert.alert("Invalid User", "Username or password is incorrect", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <View>
      <View style={{ backgroundColor: "#4b788f" }}>
        <Image
          // source={require("..components/images/PSpace.jpg")}
          source={require("../../assets/FPVT.png")}
          style={{
            // flex: 1,
            alignSelf: "center",
            height: 1080 / 5,
            width: 1920 / 5,
            resizeMode: "contain",
            marginTop: 15,
            marginBottom: 15,
          }}
        />
      </View>
      {/* <Text>
        Server IP: {IP}:{PORT}
      </Text> */}
      <View style={{ backgroundColor: "white" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={SurveySchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <ScrollView style={{ backgroundColor: "white" }}>
              <View
                style={{
                  backgroundColor: "white",
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 15,
                }}
              >
                <View>
                  <Text style={globalStyles.signup1}>Username</Text>
                  <TextInput
                    style={globalStyles.input}
                    theme={{ colors: { primary: "blue" } }}
                    autoCapitalize="none"
                    placeholder="Enter email ID"
                    onChangeText={props.handleChange("username")}
                    value={props.values.username}
                    onBlur={props.handleBlur("username")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.username && props.errors.username}
                  </Text>
                </View>

                <View style={globalStyles.fields}>
                  <Text style={globalStyles.signup1}>Password</Text>
                  <TextInput
                    multiline
                    mode="outlined"
                    style={globalStyles.input}
                    placeholder="Enter password"
                    onChangeText={props.handleChange("password")}
                    value={props.values.password}
                    onBlur={props.handleBlur("password")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.password && props.errors.password}
                  </Text>
                </View>

                <View style={globalStyles.container}>
                  <View style={globalStyles.buttonContainer}>
                    <Button
                      title="Submit"
                      color="#4b788f"
                      onPress={() => {
                        loginHandle(
                          props.values.username,
                          props.values.password
                        );
                        pressHandlermain();
                      }} // props.handleSubmit, pressHandlermain
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "white",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity onPress={pressHandler2}>
          <View>
            <Text style={globalStyles.ques}>
              Are you a regular user? Sign Up!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
