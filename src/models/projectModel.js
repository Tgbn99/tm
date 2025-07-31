import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    projectID: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[0-9]{1}[A-Za-z]{1}$/,
        "Project id must have 1 number and 1 letter",
      ],
      minlength: [2, "Project id must be exatcly 2 characters"],
      maxlength: [2, "Project id must be exatcly 2 characters"],
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
    dueDate: {
      type: Date,
      lowercase: true,
    },
    startedAt: {
      type: Date,
      lowercase: true,
    },
    completedAt: {
      type: Date,
      lowercase: true,
    },
    /* tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ], */
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { collection: "projects", timestamps: true }
);

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project"
})

projectSchema.set("toObject", {virtuals: true})
projectSchema.set("toJSON", {virtuals: true})

export default model("Project", projectSchema);
