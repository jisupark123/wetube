import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
