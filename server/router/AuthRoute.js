const {
  Signup,
  Login,
  Room,
  getUserPosts,
  getPostForAllUser,
} = require("../controllers/AuthControllers");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/room", Room);
router.get("/room/:userId", getUserPosts);
router.get("/rooms/:userLocation", getPostForAllUser);
router.get("/rooms", getPostForAllUser);
module.exports = router;
