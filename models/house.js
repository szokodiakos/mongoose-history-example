'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const House = new Schema({
  name: String,
  school: { type: ObjectId, required: true },
  headTeacher: { type: ObjectId, required: true },
  students: [{ type: ObjectId, required: true }],
});

House.plugin(require('mongoose-history'));

module.exports = mongoose.model('House', House);
