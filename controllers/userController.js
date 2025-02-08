import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import User from "../models/UserModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

// export const updateUser = async (req, res) => {
//   // console.log("waaakan", req.file);
//   const obj = { ...req.body };
//   delete obj.password;
//   //   console.log(obj);
//   const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
//   res.status(StatusCodes.OK).json({ msg: "user updated" });
// };

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newUser = { ...req.body };
    console.log("this is new user ", newUser)
    delete newUser.password;

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });
    if(req.file && updateUser.avatarPublicId){
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({ msg: "User updated", user: updatedUser });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};
