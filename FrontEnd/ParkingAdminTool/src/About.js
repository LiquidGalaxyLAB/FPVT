import React, { Component } from "react";
import image1 from "./GSOC.png";
import image2 from "./FPVT.gif";
import image3 from "./LGLogo.png";
import "./App.css";

function About() {
  return (
    <div className="abt">
      <div>
        {/* <img src={image2} className="image" alt="logo" /> */}
        <img src={image1} className="image" alt="logo" />
        <img src={image3} className="image" alt="logo" />
      </div>
      <div classname="formcomp">
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
      </div>
    </div>
  );
}

export default About;
