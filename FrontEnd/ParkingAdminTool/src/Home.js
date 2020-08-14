import React, { useEffect, useState } from "react";
import camoutput from "./new_output.jpg";
import "./App.css";
import * as ReactBootStrap from "react-bootstrap";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const percentage = 91.8;

// var proxyUrl = "https://cors-anywhere.herokuapp.com/";
const infoURL = "http://0.0.0.0:5000/api/info";

export default function Home() {
  const stats = [
    { statistic: "Last refresh:", value: "2020-07-25 17:28:48" },
    { statistic: "Total capacity:", value: "353" },
    { statistic: "Number in camera view:", value: "159" },
    { statistic: "Free spots:", value: "146" },
    { statistic: "Occupied spots:", value: "10" },
    { statistic: "Percentage Free:", value: "91.823" },
    { statistic: "Percentage occupied:", value: "6.289" },
    { statistic: "Reserved spots:", value: "3" },
  ];

  const renderStat = (stat, index) => {
    return (
      <tr key={index}>
        <td>{stat.statistic}</td>
        <td>{stat.value}</td>
      </tr>
    );
  };

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(infoURL, {
      // proxyUrl + inforURL
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        // // console.log(responseJson);
        // var test = responseJson;
        // console.table(responseJson);
        console.log(responseJson);
        setData(responseJson);
        return responseJson;
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }, []);
  return (
    // <h1>Parking Admin Tool</h1>
    <div className="mainlayout">
      <img src={camoutput} alt="img" loading="lazy" width="1100" />
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
            value={percentage}
            styles={{
              path: {
                // Path color
                stroke: `rgba(0, 128, 0, ${percentage / 100})`,
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
              <strong>{percentage}</strong> %
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
            marginTop: "25px",
            color: "white",
            borderColor: "grey",
            padding: "5px",
          }}
          // onClick={() => setClicked(true)}
        >
          Camera 1
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
          // onClick={() => setClicked(true)}
        >
          Camera 2
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
          // onClick={() => setClicked(true)}
        >
          Camera 3
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
          // onClick={() => setClicked(true)}
        >
          Orbit
        </button>
      </div>

      <div>{data}</div>
    </div>
  );
}
