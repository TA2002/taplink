const express = require("express");
const { authenticate } = require("../middlewares/auth");

const Website = require("../models/Website");

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

router.post(
  "/websites",
  authenticate,
  validateRequiredFields,
  async (req, res) => {
    const {
      website_path,
      display_name,
      bio,
      contact,
      contact_email,
      instagram_link,
      facebook_link,
    } = req.body;
    const userId = req.user.id;

    const existingWebsite = await Website.findOne({ website_path });
    if (existingWebsite) {
      return res
        .status(400)
        .json({ error: "A website with the same path name already exists" });
    }

    const newWebsite = new Website({
      website_path,
      display_name,
      bio,
      contact,
      contact_email,
      instagram_link,
      facebook_link,
      owner: userId,
    });

    try {
      const savedWebsite = await newWebsite.save();
      console.log("Website saved:", savedWebsite);
      res
        .status(200)
        .json({ message: "Website saved successfully", website: savedWebsite });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving website" });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const websiteId = req.params.id;

    const website = await Website.findOne({ website_path: websiteId });
    return res.status(200).json({ website });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/websites", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const userWebsites = await Website.find({ owner: userId });
    return res.status(200).json({ userWebsites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put(
  "/websites/:id",
  authenticate,
  validateUpdateFields,
  async (req, res) => {
    const {
      display_name,
      bio,
      contact,
      contact_email,
      instagram_link,
      facebook_link,
    } = req.body;
    const userId = req.user.id;
    const websiteId = req.params.id;

    try {
      // Check if the user owns the website
      const existingWebsite = await Website.findOne({
        _id: websiteId,
        owner: userId,
      });

      if (!existingWebsite) {
        return res.status(404).json({
          error: "Website not found or you don't have permission to update it.",
        });
      }

      // Update the website fields
      existingWebsite.display_name = display_name;
      existingWebsite.bio = bio;
      existingWebsite.contact = contact;
      existingWebsite.contact_email = contact_email;
      existingWebsite.instagram_link = instagram_link;
      existingWebsite.facebook_link = facebook_link;

      // Save the updated website
      const updatedWebsite = await existingWebsite.save();

      res.status(200).json({
        message: "Website updated successfully",
        website: updatedWebsite,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating website" });
    }
  }
);

function validateUpdateFields(req, res, next) {
  const {
    display_name,
    bio,
    contact,
    contact_email,
    instagram_link,
    facebook_link,
  } = req.body;

  if (
    !display_name &&
    !bio &&
    !contact &&
    !contact_email &&
    !instagram_link &&
    !facebook_link
  ) {
    return res.status(400).json({
      error: "At least one field is required for updating the website.",
    });
  }

  next();
}

// Middleware to validate required fields
function validateRequiredFields(req, res, next) {
  const { website_path, display_name, bio } = req.body;

  if (!website_path) {
    return res.status(400).json({ error: "Website path is a required field." });
  }

  if (!display_name) {
    return res.status(400).json({ error: "Display name is a required field." });
  }

  if (!bio) {
    return res.status(400).json({ error: "Bio is a required field." });
  }

  next();
}

module.exports = router;
