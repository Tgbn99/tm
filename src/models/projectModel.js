import { Schema, model } from "mongoose";

const projectSchema = new Schema(
    {
        projectID: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            maxlength: 100
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task"
            }
        ],
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag"
            }
        ]
    }
)

export default model("Project", projectSchema)