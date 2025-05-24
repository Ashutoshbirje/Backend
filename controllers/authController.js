const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

// Ensure default admin exists
const ensureDefaultAdmin = async () => {
  const admin = await Admin.findOne({ username: "admin" });
  if (!admin) {
    const hashed = await bcrypt.hash("12345", 10);
    await Admin.create({ username: "admin", password: hashed });
    console.log("Default admin created with password '12345'");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) return res.status(404).json({ error: "Admin not found." });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

  res.status(200).json({ message: "Login successful." });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = await Admin.findOne({ username: "admin" });

  if (!admin) return res.status(404).json({ error: "Admin not found." });

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) return res.status(401).json({ error: "Old password incorrect." });

  const hashedNew = await bcrypt.hash(newPassword, 10);
  admin.password = hashedNew;
  await admin.save();

  res.status(200).json({ message: "Password changed successfully." });
};

module.exports = {
  login,
  changePassword,
  ensureDefaultAdmin
};
