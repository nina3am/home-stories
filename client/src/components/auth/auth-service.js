import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/", // lien vers BD
  withCredentials: true, //ça transmets des cookies, ça envoie en même temps le cookies
});

export default service;

// LOGIN
function login(email, password) {
  return service
    .post("/auth/login", { email, password })
    .then((response) => response.data);
}
export { login };

// SIGNUP
function signup(firstname, lastname, email, password, avatar) {
  return service
    .post("/auth/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      avatar: avatar,
    })
    .then((response) => {
      return response;
      //console.log(response);
    });
}
export { signup };

// LOGOUT
function logout() {
  return service.post("/auth/logout", {}).then((response) => response.data);
}
export { logout };

// LOGGED IN
function loggedin() {
  return service.get("/auth/loggedin").then((response) => response.data);
}
export { loggedin };

// USER
function getUser() {
  return service.get("/user").then((response) => response.data);
}
export { getUser };
