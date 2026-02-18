import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOneAndUpdate(
    { email: 'mostafa@email.com' },
    { isAdmin: true },
    { new: true }
  );
  if (user) {
    console.log('✅ Admin granted to:', user.email);
  } else {
    console.log('❌ User not found.');
  }
  process.exit();
});