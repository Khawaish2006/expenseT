const mongoose = require("mongoose");
const { hashPassword } = require("../utils/authutils"); // ✅ Import authUtils

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    monthlyLimit: { type: Number, default: 0 }  // ✅ Added field
});

// ✅ Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    console.log("Before Hashing:", this.password); // ✅ Debugging
    this.password = await hashPassword(this.password);
    console.log("After Hashing:", this.password); // ✅ Debugging

    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

