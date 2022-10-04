import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  } else {
    return next(createError(403, " You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (e) {
      next(e);
    }
  } else {
    return next(createError(403, " You can delete only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription succesful");
  } catch (e) {
    next(e);
  }
};

export const unsibscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription succesful");
  } catch (e) {
    next(e);
  }
};

export const like = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;
    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: id },
        $pull: { dislikes: id },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Video has been liked!");
  } catch (e) {
    next(e);
  }
};

export const dislike = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;
    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: id },
        $pull: { likes: id },
      },
      {
        new: true,
      }
    );
    res.status(200).json("Video has been disliked!");
  } catch (e) {
    next(e);
  }
};
