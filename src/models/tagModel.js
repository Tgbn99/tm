import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    tagID: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[A-Za-z]{2}[0-9]{3}$/,
        "Tag id must have 2 letters and 3 numbers",
      ],
      minlength: [5, "Tag id must be exatcly 5 characters"],
      maxlength: [5, "Tag id must be exatcly 5 characters"],
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { collection: "tags", timestamps: true }
);

export default model("Tag", tagSchema);
