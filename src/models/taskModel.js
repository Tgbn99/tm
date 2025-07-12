import { Schema, model } from "mongoose"

const taskSchema = new Schema(
    {
        taskID: {
            type: String,
            unique: true,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            maxlength: 100
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: "Subcategory",
            required: true,
        },
        dueDate: {
            type: Date
        },
        status: {
            type: String,
            default: "todo",
            enum: ["backlog", "todo", "in-progress", "blocked", "review", "completed"],
            required: true
        },
        priority: {
            type: Number,
            default: 4,
            enum: [1, 2, 3, 4, 5],
            required: true
        },
        completedAt: {
            type: Date,
        },
        assignee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project"
        },
        tags: {
            type: [{type: Schema.Types.ObjectId, ref: "Tags"}],
            default: []
        }
    }
)