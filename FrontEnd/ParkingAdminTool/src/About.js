import React, { useEffect, useState } from "react";
import image1 from "./GSOC.png";
import image2 from "./LGLogo.png";
import image3 from "./logos/1.png";
import image5 from "./logos/3.png";
import image6 from "./logos/4.png";
import image7 from "./logos/5.jpg";
import image8 from "./logos/tue_logo.png";
import "./App.css";
import { Link } from "react-router-dom";

function About() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign("https://github.com/LiquidGalaxyLAB/FPVT");
    }
  });
  return (
    <div>
      <div className="abt">
        <div>
          {/* <img src={image2} className="image" alt="logo" /> */}
          <img src={image1} className="image" alt="logo" />
          <img src={image2} className="image" alt="logo" />
        </div>
        <div>
          {/* <img src={image2} className="image" alt="logo" /> */}
          <img src={image3} className="image2" alt="logo2" />
          <img src={image5} className="image2" alt="logo2" />
          <img src={image6} className="image2" alt="logo2" />
          <img src={image7} className="image2" alt="logo2" />
          <img src={image8} className="image2" alt="logo2" />
        </div>
      </div>
      {/* <div classname="formcomp">
        <form>
          <label>
            Username :
            <input type="text" name="name" />
          </label>
          <label>
            Password. :
            <input type="text" name="name" />
          </label>
          <input classname="button" type="submit" value="Submit" />
        </form>
      </div> */}
      <div>
        <label className="abouttext">
          The Free Parking Visualization Tool project is developed for the
          purpose of detecting free parking spaces from surveillance images in
          parking lots using object detection models. The work is carried out as
          a part of the Google Summer of Code 2020 (June - August 2020), in
          collaboration with the Liquid Galaxy Lab, Lleida, Spain. The
          application is tested using camera data from two security cameras in
          Lleida's Scientific Park. A full description of the project and an
          installation instruction manual can be found below. Please click on
          "View Source Code" for the github repository. The application also
          visulizes the free, occupied and reserved parking spaces on google
          earth in the liuqid galaxy as bounding boxes. Special Contributors:
          Students of the LiquidGalaxyLAB
        </label>
      </div>

      <button
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          marginLeft: "15px",
          background: "grey",
          borderRadius: "3px",
          color: "white",
          padding: "5px",
        }}
        onClick={() => setClicked(true)}
      >
        View Source Code
      </button>
    </div>
  );
}

export default About;
