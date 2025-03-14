const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Find user by email
    const user = await User.findOne({ email: "jindal@example.com" });

    if (!user) {
      console.log("❌ User not found");
      return mongoose.disconnect();
    }

    console.log("Stored Password Hash:", user.password);

    // Test password comparison
    const enteredPassword = "1234567"; // Enter the password you used during signup
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    console.log("Password match:", isMatch);

    mongoose.disconnect();
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
