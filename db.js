'use strict';

const mongoose = require('mongoose');

const ADDRESS = 'docker.local';
const PORT = '27027';
const DB_NAME = 'mongoHistoryTest';

let dbConnection;

exports.connect = () => new Promise((resolve, reject) => {
  try {
    dbConnection = mongoose.connect(`mongodb://${ADDRESS}:${PORT}/${DB_NAME}`);
    mongoose.connection.on('open', () => {
      return resolve();
    });
  } catch (err) {
    return reject(err);
  }
});

exports.drop = () => new Promise((resolve, reject) => {
  dbConnection.connection.db.dropDatabase((err, result) => {
    if (err) {
      return reject(err);
    }
    return resolve(result);
  });
});
