import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// GET ALL USER
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.send({
    email, password
  })
});

// GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
});

// REGISTER NEW USER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name, email, password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

// UPDATE USER PROFILE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const udatedUser = await user.save();

    res.json({
      _id: udatedUser._id,
      name: udatedUser.name,
      email: udatedUser.email,
      isAdmin: udatedUser.isAdmin,
      token: generateToken(udatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }

});

// GET ALL USER | Protected Route | Admin only
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users)
});

// DELETE USER | Protected Route | Admin only
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

// GET USER BY ID | Protected Route | Admin only
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

// UPDATE USER | Protected Route | Admin only
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const udatedUser = await user.save();

    res.json({
      _id: udatedUser._id,
      name: udatedUser.name,
      email: udatedUser.email,
      isAdmin: udatedUser.isAdmin,
    });
  } else {
    res.status(404)
    throw new Error('User not Found')
  }

});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
}