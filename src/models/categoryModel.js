import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryID: {
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
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { collection: "categories", timestamps: true }
);

export default model("Category", categorySchema);
