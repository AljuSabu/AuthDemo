import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

//? ////////////////////// SignUp /////////////////////////////

export const signup = async (req, res) => {
  try {
    // console.log(req.body);

    //Getting info from frontend
    const { name, email, password } = req.body;

    //Validation and response
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //Checking if the user exists
    const existingUser = await User.findOne({ email });

    //Sending response if the user exists
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exist, Please login",
      });
    }

    //Creating new user
    const user = await User.create({
      name,
      email,
      password,
    });

    //Token creation
    let token = JWT.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });

    //Password safety
    user.password = undefined;

    //Setingup cookies
    res.cookie("token", token, cookieOptions);

    //sending response if everything is ok
    res.status(201).json({
      success: true,
      message: "Successfully Signed Up",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Signing Up",
    });
  }
};

//? /////////////////////////// Login ///////////////////////////////////////

export const login = async (req, res) => {
  try {
    //Getting info from the frontend
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //Checking the user in the database
    const user = await User.findOne({ email }).select("+password");

    //Response if user dosent exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found, Please signin",
      });
    }

    //Comparing the password
    const isPasswordMatched = await user.comparePassword(password);

    //Response if password dosent match
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    //Token generation if password matched
    const token = JWT.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });

    //flushout password
    user.password = undefined;

    //send success message
    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in loggin",
    });
  }
};

//? //////////////////////////////// Logout ////////////////////////////////////

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in logout",
    });
  }
};
