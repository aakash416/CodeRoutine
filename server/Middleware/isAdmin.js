import user from "../Model/userModel.js";

export const isAdmin = async (req, res, next) => {
  try {
    const isAdminOrUser = await user.findOne({ _id: req.id });
    if (!isAdminOrUser) {
      return res.status(404).json({ message: "Profile not found" });
    }
    if (isAdminOrUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
