const { UserInputError } = require("apollo-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../Model/userModel");
const { secretKey } = require("../../config/secretKey");
const { signUpValidator, loginValidator } = require("../../util/validator");

const  createToken = id => jwt.sign( { id }, secretKey)


module.exports = {
  Mutation: {
    async register(
      _,
      { signUp: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      // Validate first then --> check

      const { valid, errors } = signUpValidator(
        username,
        password,
        confirmPassword,
        email
      );

      if (!valid) {
        throw new UserInputError("some Input is not valid", {
          errors,
        });
      }

     const user = await userModel.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            message: "uername already exist", // this error is used as client side validation
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new userModel({
        username,
        password,
        createdAt: new Date().toDateString(),
        email,
      });
      const res = await newUser.save();
      const token = createToken(res._doc._id);

      return { ...res._doc, token, id: res._doc._id };
    },

    async login(_, { username, password }, context, info) {
      const { valid, errors } = loginValidator(username, password);

      if (!valid) {
        throw new UserInputError("fill up form correctly", {
          errors,
        });
      } else {
        // Form validated now --> step 2 [Is record exist or not ]
        const loginUser = await userModel.findOne({ username });

        if (!loginUser) {
          throw new UserInputError("username is unavailable");
        } else {
          const IsPasswordCorrect = bcrypt.compareSync(
            password,
            loginUser.password
          );
          if (!IsPasswordCorrect) {
            throw new UserInputError("passowrd incorrect");
          }
          const token = createToken(loginUser._doc._id);
          return {
            ...loginUser._doc,
            token,
            id: loginUser._doc._id,
          };
        }
      }
    },
  },
};
