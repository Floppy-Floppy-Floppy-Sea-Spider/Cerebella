const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://floppy:letmein123@cluster0.mz4yqra.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connect to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  content: String,
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = { Calendar };