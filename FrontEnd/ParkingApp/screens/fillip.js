// To add: handicapped question in formik.

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

import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import * as yup from "yup";

const SurveySchema = yup.object({
  ip: yup.string().required(),
  port: yup.string().required(),
});

const initialValues = {
  ip: "",
  port: "",
};

export default function FillIp({ ...props }) {
  const pressHandler = (IP, PORT) => {
    console.log("works");
    props.navigation.navigate("Home", {
      ip: IP,
      port: PORT,
    });
  };

  const serverHandle = (IP, PORT) => {
    Alert.alert("IP", IP + ":" + PORT);
  };

  return (
    <View>
      <View style={{ backgroundColor: "#4b788f" }}>
        <Image
          // source={require("..components/images/PSpace.jpg")}
          source={require("../assets/FPVT.png")}
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
      <View style={{ backgroundColor: "white" }}>
        <Formik
          initialValues={initialValues} // { name: "", email: "", phone: "", vehicletype:"" }
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
                  <Text style={globalStyles.signup1}>Server IP</Text>
                  <TextInput
                    style={globalStyles.input}
                    theme={{ colors: { primary: "blue" } }}
                    autoCapitalize="none"
                    placeholder="Enter the IP of the webserver"
                    onChangeText={props.handleChange("ip")}
                    value={props.values.ip}
                    onBlur={props.handleBlur("ip")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.ip && props.errors.ip}
                  </Text>
                </View>

                <View style={globalStyles.fields}>
                  <Text style={globalStyles.signup1}>Port</Text>
                  <TextInput
                    multiline
                    mode="outlined"
                    style={globalStyles.input}
                    placeholder="Enter Port"
                    onChangeText={props.handleChange("port")}
                    value={props.values.port}
                    onBlur={props.handleBlur("port")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.port && props.errors.port}
                  </Text>
                </View>

                <View style={globalStyles.container}>
                  <View style={globalStyles.buttonContainer}>
                    <Button
                      title="Next"
                      color="#4b788f"
                      onPress={() => {
                        pressHandler(props.values.ip, props.values.port);
                        serverHandle(props.values.ip, props.values.port);
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
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({});
