import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    taskID: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^[A-Za-z]{1}[0-9]{1}$/,
        "Task id must have 1 letter and 1 number",
      ],
      minlength: [2, "Task id must be exatcly 2 characters"],
      maxlength: [2, "Task id must be exatcly 2 characters"],
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
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
      lowercase: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
      lowercase: true,
    },
    dueDate: {
      type: Date,
      lowercase: true,
    },
    status: {
      type: String,
      default: "todo",
      enum: [
        "backlog",
        "todo",
        "in-progress",
        "blocked",
        "review",
        "completed",
      ],
      required: true,
      lowercase: true,
    },
    priority: {
      type: Number,
      default: 4,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    completedAt: {
      type: Date,
      lowercase: true,
    },
    assignee: {
      type: String,
      lowercase: true,
      /* type: Schema.Types.ObjectId,
      ref: "User",
      required: true, */
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
      default: [],
    },
  },
  { collection: "tasks", timestamps: true }
);

export default model("Task", taskSchema);
