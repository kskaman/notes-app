const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  passwordHash: { type: String },
  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Note",
    default: [],
  },
  // for email verification
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Date,
});

// Virtual field for plain-text password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;

    // Validate minimum length
    if (password.length < 8) {
      this.invalidate(
        "password",
        "Password must be at least 8 characters long"
      );
    }

    // Validate password pattern:
    // At least one lowercase, one uppercase, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      this.invalidate(
        "password",
        "Password must contain at least one special character, one uppercase letter, one lowercase letter and one digit."
      );
    }
  })
  .get(function () {
    return this._password;
  });

// Pre-save hook to hash the password if it's been set/modified
userSchema.pre("save", async function (next) {
  if ((this.isModified("password") || this.isNew) && this._password) {
    this.passwordHash = await bcrypt.hash(this._password, 10);
  }
  next();
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
