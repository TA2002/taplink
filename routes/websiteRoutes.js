// // routes/websiteRoutes.js
// const express = require("express");
// const router = express.Router();

// // Create a new website
// router.post("/create", async (req, res) => {
//   try {
//     const website = new Website(req.body);
//     await website.save();
//     res.status(201).json({ message: "Website created successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Get the list of all websites
// router.get("/list", async (req, res) => {
//   try {
//     const websites = await Website.find({});
//     res.status(200).json(websites);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.get("/", async () => {
//   try {
//     res.json({ a: 1 });
//   } catch (error) {}
// });

// module.exports = router;
