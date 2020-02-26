import React from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
import "index.scss";
import Application from "components/Application";

if (process.env.REACT_APP_API_BASE_URL) {
  Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
  Axios.defaults.baseURL = 'http://localhost:8001/';
}

ReactDOM.render(<Application />, document.getElementById("root"));
