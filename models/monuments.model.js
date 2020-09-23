const mongoose = require("mongoose")
const Schema = mongoose.Schema

const monumentSchema = new Schema({
    jsonURL: String,
    originID: Number,
    title: {
        type: String,
        required: true,
    },
    relation: {
        type: String,
        required: true,
    },
    address: {
        districtURL: String,
        areaURL: String,
        locality: String,
        postalCode: Number,
        street: String
    },
    location: { type: { type: String }, coordinates: [Number] },
    references: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
monumentSchema.index({ location: '2dsphere' })

const Monument = mongoose.model("Monument", monumentSchema)

module.exports = Monument