import axios from "axios";

const myAxios = axios.create({
  baseURL: "https://react-burger-builder-72213-default-rtdb.firebaseio.com/",
});

export default myAxios;
