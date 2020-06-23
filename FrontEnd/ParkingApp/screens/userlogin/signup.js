import React, { Fragment } from "react";
import { Button, Text, View, Picker } from "react-native";
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
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={initialValues} // { name: "", email: "", phone: "", vehicletype:"" }
        validationSchema={SurveySchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {(props) => (
          <ScrollView style={globalStyles.container}>
            <Card>
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
