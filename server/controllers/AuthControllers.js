const User = require("../models/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const Room = require("../models/roomModel");
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (err) {
    console.error(err);
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    console.log(user._id);
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User is loggedin successfully", success: true, token });
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports.Room = async (req, res, next) => {
  try {
    const { title, description, price, location, createdBy } = req.body;
    const room = new Room({
      title,
      description,
      price,
      location,
      createdBy,
    });
    const newRoom = await room.save();
    res
      .status(201)
      .json({ data: newRoom, message: "Successfully created a new post" });
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports.getUserPosts = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await Room.find({ createdBy: userId });
    res.status(201).json(posts);
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.getPostForAllUser = async (req, res, next) => {
  try {
    const userAddress = req.params.userLocation;
    if (userAddress) {
      const locationBasedPosts = await Room.find({
        location: userAddress,
      }).sort({
        createdAt: -1,
      });
      res.status(201).json(locationBasedPosts);
    } else {
      const allPosts = await Room.find().sort({ createdAt: -1 });
      res.status(201).json(allPosts);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
