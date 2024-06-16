const path = require('path');
const fs = require('fs');
const User = require('../models/profileModels');

exports.uploadProfilePic = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.files || !req.files.profilePic) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const profilePic = req.files.profilePic;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', profilePic.name);

    // Save the file
    profilePic.mv(uploadPath, async (err) => {
      if (err) {                                                                                                                        
        return res.status(500).json({ success: false, message: 'File upload failed', error: err });
      }

      // Update the user's profile picture path in the database
      const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: `/uploads/${profilePic.name}` }, { new: true });

      return res.status(200).json({ success: true, profilePic: updatedUser.profilePic });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};
