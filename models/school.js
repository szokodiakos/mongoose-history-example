'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const School = new Schema({
  name: String,
  headmaster: { type: ObjectId, required: true },
  teachers: [{ type: ObjectId, required: true }],
});

School.plugin(require('mongoose-history'));

module.exports = mongoose.model('School', School);
