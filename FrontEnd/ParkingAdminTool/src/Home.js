import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactBootStrap from "react-bootstrap";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
require("dotenv").config();

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

// alert(JSON.stringify(process.env.REACT_APP_SERVER_IP));
const infoURL = process.env.REACT_APP_SERVER_IP + "/api/info";
const kmlURL = process.env.REACT_APP_SERVER_IP + "/api/orbit_main"; //"http://10.160.67.38:5000/api/kml";
const kml2URL = process.env.REACT_APP_SERVER_IP + "/api/orbit_mag"; //"http://10.160.67.38:5000/api/kml_mag";
const imageURL = [
  process.env.REACT_APP_SERVER_IP + "/api/camera1",
  process.env.REACT_APP_SERVER_IP + "/api/camera2",
  process.env.REACT_APP_SERVER_IP + "/api/camera_mag1",
  process.env.REACT_APP_SERVER_IP + "/api/camera_mag2",
];

export default function Home() {
  const [camimage, setCamImage] = useState(imageURL[1]);

  const renderStat = (stat, index) => {
    return (
      <tr key={index}>
        <td>{stat.statistic}</td>
        <td>{stat.value}</td>
      </tr>
    );
  };

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);
  const [data6, setData6] = useState(null);
  const [data7, setData7] = useState(null);

  function fetchKmlAPI() {
    // param is a highlighted word from the user before it clicked the button
    return fetch(kmlURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Operation successful!:" + JSON.stringify(responseJson));
        console.log(responseJson);
      })
      .catch((error) => {
        alert("Operation successful!:" + JSON.stringify(error));
        console.error(error);
      });
  }

  function fetchKml2API() {
    // param is a highlighted word from the user before it clicked the button
    return fetch(kml2URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Operation successful!:" + JSON.stringify(responseJson));
        console.log(responseJson);
      })
      .catch((error) => {
        alert("Operation successful!:" + JSON.stringify(error));
        console.error(error);
      });
  }

  useEffect(() => {
    fetch(infoURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
        setData1(responseJson["Capacity"]);
        setData2(responseJson["Number in camera view"]);
        setData3(responseJson["Free spots"]);
        setData4(responseJson["Occupied spots"]);
        setData5(responseJson["Percentage free"]);
        setData6(responseJson["Percentage occupied"]);
        setData7(responseJson["Reserved spots"]);

        // alert(JSON.stringify(data));
        // return responseJson;
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }, []);

  const stats = [
    {
      statistic: "Last refresh:",
      value: mm + "-" + dd + "-" + yyyy + " " + time,
    },
    { statistic: "Total capacity:", value: data1 },
    { statistic: "Number in camera view:", value: data2 },
    { statistic: "Free spots:", value: data3 },
    { statistic: "Occupied spots:", value: data4 },
    { statistic: "Percentage Free:", value: Math.round(data5 * 100) / 100 },
    { statistic: "Percentage occupied:", value: Math.round(data6 * 100) / 100 },
    { statistic: "Reserved spots:", value: data7 },
  ];
  return (
    // <h1>Parking Admin Tool</h1>
    <div className="mainlayout">
      <img src={camimage} alt="img" width="75%" />
      <div className="abouttext">
        <div
          style={{
            marginLeft: "120px",
            width: "80px",
            alignItems: "center",
            marginRight: "120px",
          }}
        >
          <CircularProgressbarWithChildren
            strokeWidth={5}
            value={data5}
            styles={{
              path: {
                // Path color
                stroke: `rgba(0, 128, 0, ${data5 / 100})`,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Customize transition animation
                transition: "stroke-dashoffset 0.5s ease 0s",
                // Rotate the path
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              },
              trail: {
                // Trail color
                stroke: "#d6d6d6",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              },
            }}
          >
            <div style={{ marginLeft: 5, fontSize: 14, marginTop: -5 }}>
              <strong>{Math.round(data5 * 100) / 100}</strong> %
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div style={{ margin: "20px" }}>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Statistic</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{stats.map(renderStat)}</tbody>
          </ReactBootStrap.Table>
        </div>
        <button
          style={{
            background: "#061A40",
            marginLeft: "15px",
            borderRadius: "3px",
            marginTop: "15px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          onClick={() => setCamImage(imageURL[0])}
        >
          Main Camera 1
        </button>
        <button
          style={{
            background: "#061A40",
            marginLeft: "15px",
            borderRadius: "3px",
            marginTop: "15px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          onClick={() => setCamImage(imageURL[1])}
        >
          Main Camera 2
        </button>
        <button
          style={{
            background: "#061A40",
            marginLeft: "15px",
            borderRadius: "3px",
            marginTop: "15px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          onClick={() => setCamImage(imageURL[2])}
        >
          Magical Camera 1
        </button>
        <button
          style={{
            background: "#061A40",
            marginLeft: "15px",
            borderRadius: "3px",
            marginTop: "15px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          onClick={() => setCamImage(imageURL[3])}
        >
          Magical Camera 2
        </button>
        <button
          style={{
            background: "#061A40",
            marginLeft: "15px",
            borderRadius: "3px",
            marginTop: "25px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          onClick={fetchKmlAPI}
        >
          Orbit Parking 1
        </button>
        <button
          style={{
            background: "#061A40",
            marginLeft: "15px",
            borderRadius: "3px",
            marginTop: "25px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          onClick={fetchKml2API}
        >
          Orbit Parking 2
        </button>
      </div>
    </div>
  );
}
