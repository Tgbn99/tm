import { Schema, model } from "mongoose";

const tagSchema = new Schema(
    {
        tagID: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        }
    }
)

export default model("Tag", tagSchema)