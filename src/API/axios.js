import axios from "axios";

const instance = axios.create({
  // We are now pointing to your live Render backend instead of the local emulator
  baseURL: "https://amazon-api-76qh.onrender.com", 
});

export default instance;