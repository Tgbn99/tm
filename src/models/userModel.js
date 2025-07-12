import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      set: (value) =>
        value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toUpperCase(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format"],
    },
    contact: {
      type: String,
      match: [/^[+]?[0-9]{9,12}$/, "Invalid phone number format"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
  },
  { collection: "users", timestamps: true }
);
export default model("User", userSchema);
