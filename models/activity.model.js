const mongoose = require("mongoose")
const Schema = mongoose.Schema

const activitySchema = new Schema({
    name: String,
    actType: {
        type: String,
        enum: ["Busqueda", "Carrera", "Pistas", "Trivial"]
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: String,
    minParticipants: {
        type: Number,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    minAge: {
        type: Number,
        required: true,
        minimum: 6
    },
    maxAge: {
        type: Number,
        required: true,
        minimum: 11
    },
    imgURL: {
        type: String,
        required: true,
        default: "../images/Default.png"
    },
    materials: String,
    owner: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        req: true
    }],
    monuments: [{
        type: Schema.Types.ObjectId,
        ref: "Monument"
    }]
}, {
    timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity