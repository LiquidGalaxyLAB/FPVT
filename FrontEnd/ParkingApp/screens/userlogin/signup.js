// To add: handicapped question in formik.

import React, { useState, Fragment } from "react";
import {
  Button,
  Text,
  View,
  Picker,
  StyleSheet,
  Switch,
  TouchableOpacity,
  // AsyncStorage,
} from "react-native";
import { globalStyles } from "../../styles/global.js";
import Card from "../../shared/card";
import { Formik } from "formik";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";

// import { authContext, AuthContext } from "../../components/context";
import Users from "./users";

const SurveySchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(4),
  email: yup.string().label("Email").email().required(),
  vehicletype: yup.string().required(),
});

const initialValues = {
  username: "",
  password: "",
  email: "",
  vehicletype: "",
  handicapped: false,
};

export default function SignUp({ ...props }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const pressHandlerSignIn = () => {
    console.log("works");
    props.navigation.navigate("SignIn");
  };

  const saveData = (items) => {
    // console.log(JSON.stringify(items));
    Users.push(items);
    console.log(Users);
  };

  return (
    <View>
      <Formik
        initialValues={initialValues} // { name: "", email: "", phone: "", vehicletype:"" }
        validationSchema={SurveySchema}
        onSubmit={(values, actions) => {
          // console.log(values);
          // AsyncStorage.setItem('id', JSON.stringify(values))
          // console.log(JSON.stringify(values));
          saveData(values);
        }}
      >
        {(props) => (
          <ScrollView>
            <Card>
              <View style={globalStyles.fields}>
                <Text style={globalStyles.signup1}>Username</Text>
                <TextInput
                  multiline
                  mode="outlined"
                  style={globalStyles.input}
                  placeholder="Enter username"
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

              <View style={globalStyles.fields}>
                <Text style={globalStyles.signup1}>Email ID</Text>
                <TextInput
                  style={globalStyles.input}
                  label="Email"
                  theme={{ colors: { primary: "blue" } }}
                  placeholder="Enter email ID"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.email && props.errors.email}
                </Text>
              </View>

              <View style={globalStyles.fields}>
                <Fragment>
                  <Text style={globalStyles.signup1}>Vehicle Type</Text>
                  <Picker
                    selectedValue={props.values.vehicletype}
                    onValueChange={(itemValue) =>
                      props.setFieldValue("vehicletype", itemValue)
                    }
                    style={globalStyles.picker}
                  >
                    <Picker.Item
                      label="Select your vehicle type"
                      value={initialValues.vehicletype}
                      key={0}
                      mode="dropdown"
                    />
                    <Picker.Item label="Fuel Vehicle" value="f" key={1} />
                    <Picker.Item label="Electric Vehicle" value="e" key={2} />
                  </Picker>
                </Fragment>
              </View>

              <View style={styles.checkboxContainer}>
                <Fragment>
                  <Text style={styles.label}>Are you handicapped?</Text>
                  <Text style={styles.label2}>No</Text>
                  <Switch
                    trackColor={{ false: "black", true: "#62A87C" }}
                    thumbColor={isEnabled ? "white" : "ghostwhite"}
                    ios_backgroundColor="gray"
                    value={props.values.handicapped}
                    // onValueChange={() => setIsEnabled(!isEnabled)}
                    onValueChange={(value) =>
                      props.setFieldValue("handicapped", value)
                    }
                    // value={isEnabled}
                    style={styles.switchbox}
                  />
                  <Text style={styles.label2}>Yes</Text>
                </Fragment>
              </View>

              <View style={globalStyles.buttonContainer}>
                <Button
                  title="Reset"
                  color="#4b788f"
                  onPress={props.handleReset}
                />
                <Button
                  title="Submit"
                  color="#4b788f"
                  onPress={props.handleSubmit}
                />
              </View>
            </Card>
          </ScrollView>
        )}
      </Formik>
      <View
        style={{
          justifyContent: "center",
          // backgroundColor: "white",
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity onPress={pressHandlerSignIn}>
          <View>
            <Text style={globalStyles.ques}>
              Already have an account? Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  switchbox: {
    alignItems: "center",
    // marginRight: 10,
  },
  label: {
    alignSelf: "center",
    fontSize: 16,
    paddingLeft: 5,
    paddingBottom: 5,
    marginRight: 45,
    justifyContent: "space-evenly",
    color: "#292929",
    fontFamily: "OpenSans-Light",
  },
  label2: {
    alignSelf: "center",
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "space-evenly",
    color: "#292929",
    fontFamily: "OpenSans-Light",
  },
});
