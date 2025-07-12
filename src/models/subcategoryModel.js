import { Schema, model } from "mongoose";

const subcategorySchema = new Schema(
  {
    subcategoryID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 100,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { collection: "subcategories", timestamps: true }
);

export default model("Subcategory", subcategorySchema);
