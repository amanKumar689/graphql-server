const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secretKey");
module.exports.signUpValidator = (
  username,
  password,
  confirmPassword,
  email
) => {
  let errors = {};
  console.log("username", username);
  if (username === "") {
    errors.username = "username is empty";
  }
  if (email === "") {
    errors.email = "email is empty";
  } else {
    const regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regx.test(email)) {
      errors.email = "email is badly formatted";
    }
  }
  if (confirmPassword === "") {
    errors.confirmPassword = "confirmPassword is empty";
  }
  if (password === "") {
    errors.password = "password is empty";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "password does not match";
  }
  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
  };
};

module.exports.loginValidator = (username, password) => {
  let errors = {};
  console.log("username", username);
  if (username === "") {
    errors.username = "username is empty";
  } else if (password === "") {
    errors.password = "password is empty";
  }
  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
  };
};

module.exports.postValidator = (post, user) => {
  return post.username === user.username;
};
