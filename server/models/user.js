import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    isGoogle: { type: Boolean, required: false },
});

export default mongoose.model("User", userSchema);