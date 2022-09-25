import mongoose from "mongoose";

interface ICategory {
  type: string;
  color: string;
}

const CategorySchema = new mongoose.Schema<ICategory>({
  type: {
    type: String,
    default: "Investment",
  },

  color: {
    type: String,
    default: "#FCBE44",
  },
});

export default mongoose.model("Category", CategorySchema);
