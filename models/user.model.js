const { SchemaType } = require("mongoose")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    monuments: [{
        type: Schema.Types.ObjectId,
        ref: "Monument"
    }],
    activities: [{
        type: Schema.Types.ObjectId,
        ref: "Activity"
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User