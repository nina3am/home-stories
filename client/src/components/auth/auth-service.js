import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL || ""}`, // lien vers BD
  withCredentials: true, //ça transmets des cookies, ça envoie en même temps le cookies
});

export default service;
