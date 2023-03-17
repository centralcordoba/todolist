import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7280/api",
  headers: {
    "Content-type": "application/json"
  }
});