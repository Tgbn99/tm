import { Schema, model } from "mongoose";

const subcategorySchema = new Schema(
  {
    subcategoryID: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[0-9]{2}[A-Za-z]{2}$/,
        "Subcategory id must have 2 numbers and 2 letters",
      ],
      minlength: [4, "Subcategory id must be exatcly 4 characters"],
      maxlength: [4, "Subcategory id must be exatcly 4 characters"],
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: 100,
      lowercase: true,
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
