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
    imgURL: String,
    materials: [String],
    // owner: { type: Schema.Types.ObjectId, ref: 'User' },     // 'User' es el nombre del modelo
}, {
    timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity