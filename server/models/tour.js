import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [String],
  file: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;