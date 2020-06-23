// To add: handicapped question in formik.

import React, { useState, Fragment } from "react";
import { Button, Text, View, Picker, StyleSheet, Switch } from "react-native";
import { globalStyles } from "../../styles/global.js";
import Card from "../../shared/card";
import { Formik } from "formik";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";

const SurveySchema = yup.object({
  name: yup.string().required().min(4),
  email: yup.string().label("Email").email().required(),
  phone: yup.string().max(9),
  vehicletype: yup.string().required(),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  vehicletype: "",
};

export default function SignUp({ ...props }) {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <View>
      <Formik
        initialValues={initialValues} // { name: "", email: "", phone: "", vehicletype:"" }
        validationSchema={SurveySchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {(props) => (
          <ScrollView>
            <Card>
              <View style={globalStyles.fields}>
                <Text style={globalStyles.signup1}>Name</Text>
                <TextInput
                  multiline
                  mode="outlined"
                  style={globalStyles.input}
                  placeholder="Enter name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.name && props.errors.name}
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
                <Text style={globalStyles.signup1}>Phone</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Enter your phone number"
                  onChangeText={props.handleChange("phone")}
                  value={props.values.phone}
                  keyboardType="numeric"
                  onBlur={props.handleBlur("phone")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.phone && props.errors.phone}
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
                    onValueChange={() => setIsEnabled(!isEnabled)}
                    value={isEnabled}
                    style={styles.switchbox}
                  />
                  <Text style={styles.label2}>Yes</Text>
                </Fragment>
              </View>

              <View style={globalStyles.buttonContainer}>
                <Button
                  title="Reset"
                  color="#1c376e"
                  onPress={props.handleReset}
                />
                <Button
                  title="Submit"
                  color="#1c376e"
                  onPress={props.handleSubmit}
                />
              </View>
            </Card>
          </ScrollView>
        )}
      </Formik>
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
