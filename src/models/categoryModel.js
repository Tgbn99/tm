import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryID: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[A-Za-z]{2}[0-9]{2}$/,
        "Category id must have 2 letters and 2 numbers",
      ],
      minlength: [4, "Category id must be exatcly 4 characters"],
      maxlength: [4, "Category id must be exatcly 4 characters"],
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
    /* subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ], */
  },
  { collection: "categories", timestamps: true }
);

categorySchema.virtual("subcategories", {
  ref: "Subcategory",
  localField: "_id",
  foreignField: "category",
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

export default model("Category", categorySchema);
