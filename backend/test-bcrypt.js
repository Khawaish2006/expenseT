const bcrypt = require('bcrypt');

const hash = "$2b$10$yrBsW65BM6KOIulNYwJ5MOk5qaEONXFCrEpuVO8g8Gx6hT/1Uq1GW"; 
const inputPassword = "your_actual_password"; // Replace with the actual password to check

bcrypt.compare(inputPassword, hash, (err, result) => {
    if (err) {
        console.error("Error:", err);
    } else if (result) {
        console.log("✅ Password matches!");
    } else {
        console.log("❌ Incorrect password.");
    }
});
