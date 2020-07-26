import React from "react";
import camoutput from "./new_output.jpg";
import "./App.css";

function Home() {
  return (
    // <h1>Parking Admin Tool</h1>
    <div className="stat">
      <img src={camoutput} alt="img" loading="lazy" width="1600" />
      <div className="stat1">
        <label>Last refresh: </label>
        <label>2020-07-25 17:28:48 </label>
        {/* <input type="textarea" 
          name="textValue"
          onChange={this.handleChange}
        /> */}
        <label>Total capacity: </label>
        <label>353 </label>
        <label>Number in camera view: </label>
        <label>159 </label>
        <label>Free spots: </label>
        <label>146 </label>
        <label>Occupied spots: </label>
        <label>10 </label>
        <label>Percentage Free: </label>
        <label>91.823 </label>
        <label>Percentage occupied: </label>
        <label>6.289 </label>
        <label>Reserved spots: </label>
        <label>3 </label>
      </div>
    </div>
  );
}

export default Home;
