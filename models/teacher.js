'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Teacher = new Schema({
  name: String,
  born: Date,
});

Teacher.plugin(require('mongoose-history'));

module.exports = mongoose.model('Teacher', Teacher);
