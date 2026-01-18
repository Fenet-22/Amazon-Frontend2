import axios from "axios";

const instance = axios.create({
  // IMPORTANT: The path must include your Project ID and the function name (api)
  baseURL: "http://127.0.0.1:5001/backend-ea7ad/us-central1/api", 
});

export default instance;