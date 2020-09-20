const mongoose = require("mongoose")
const Schema = mongoose.Schema

const activitySchema = new Schema({
    name: String,
    actType: {
        type: String,
        enum: ["Busqueda", "Carrera", "Pistas", "Trivial"]
    },
    shortDescription: String,
    longDescription: String,
    minParticipants: Number,
    maxParticipants: Number,
    minAge: Number,
    maxAge: Number,
    materials: [String]
}, {
    timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity