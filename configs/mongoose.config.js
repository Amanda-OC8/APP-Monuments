const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

mongoose
    .connect(process.env.DB_REMOTE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose