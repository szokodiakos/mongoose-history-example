'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Student = new Schema({
  name: String,
  born: Date,
});

Student.plugin(require('mongoose-history'));

module.exports = mongoose.model('Student', Student);
