const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const sendEmail = require("../utils/email");
const usersRouter = express.Router();

// POST /api/users/signup - User registration
usersRouter.post("/signup", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({ error: "Email is required" });
    }
    if (!password || password.length < 8) {
      return response
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ error: "Email already registered" });
    }
    const user = new User({ email });
    user.password = password; // triggers virtual validations and pre-save hook

    // Generate verification token and expiry (e.g., valid for 15 minutes)
    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    user.verificationTokenExpiry = Date.now() + 15 * 60 * 1000;

    const savedUser = await user.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${email}`;
    await sendEmail(
      email,
      "Verify Your Email",
      `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`
    );

    response
      .status(201)
      .json({ message: "User created. Please verify your email." });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login - User login and token generation
usersRouter.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ error: "Invalid email or password" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return response.status(401).json({ error: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return response.status(401).json({ error: "Email not verified" });
    }
    const userForToken = { email: user.email, id: user._id };
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "1h",
    });
    response.status(200).json({ token, email: user.email });
  } catch (error) {
    next(error);
  }
});

// GET /api/users - Get all users (for admin/testing)
usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("notes", { title: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Get a single user by ID
usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate("notes", {
      title: 1,
    });
    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id - Update a user's password
usersRouter.put("/:id", async (request, response, next) => {
  try {
    const { password } = request.body;
    if (!password) {
      return response.status(400).json({ error: "Password is required" });
    }
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    user.password = password;
    const updatedUser = await user.save();
    response.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id - Remove a user account
usersRouter.delete("/:id", async (request, response, next) => {
  try {
    const deletedUser = await User.findByIdAndRemove(request.params.id);
    if (deletedUser) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users/verify-email - Production-level email verification endpoint
usersRouter.post("/verify-email", async (request, response, next) => {
  try {
    const { email, token } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    if (
      user.verificationToken !== token ||
      Date.now() > user.verificationTokenExpiry
    ) {
      return response
        .status(400)
        .json({ error: "Invalid or expired verification token" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    response.json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/reset-password - Production-level password reset endpoint
usersRouter.post("/reset-password", async (request, response, next) => {
  try {
    const { email, token, newPassword } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    if (
      user.resetPasswordToken !== token ||
      Date.now() > user.resetPasswordTokenExpiry
    ) {
      return response
        .status(400)
        .json({ error: "Invalid or expired reset token" });
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();
    response.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/request-password-reset - Request a password reset email
usersRouter.post("/request-password-reset", async (request, response, next) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    // Generate a reset token valid for 1 hour
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiry = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    );
    response.json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
