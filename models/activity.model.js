const mongoose = require("mongoose")
const Schema = mongoose.Schema

const activitySchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ["Busqueda", "Carrera", "Pistas", "Trivial"]
    },
    description: String
}, {
    timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity