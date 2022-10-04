import { createError } from "../error.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.param.id);
    const video = await Video.findById(req.param.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.param.id);
      res.status(200).json("Comment has bee ndeleted");
    }
  } catch (e) {
    return next(createError(403, "You can delete only your comments!"));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (e) {
    next(e);
  }
};
