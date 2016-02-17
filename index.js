'use strict';

process.on('unhandledRejection', function(reason, p) {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
});

const db = require('./db.js');
const School = require('./models/school.js');
const House = require('./models/house.js');
const Student = require('./models/student.js');
const Teacher = require('./models/teacher.js');

let dumbledore;
let snape;
let moody;
let harry;
let ron;
let draco;
let hogwarts;
let gryffindor;
let slytherin;

db.connect().then(() => {
  console.log('db connected');
  return db.drop();

}).then(() => {
  console.log('db dropped');

  dumbledore = new Teacher({
    name: 'Dumbledore',
    born: new Date(),
  });

  snape = new Teacher({
    name: 'Snape',
    born: new Date(),
  });

  moody = new Teacher({
    name: 'Moody',
    born: new Date(),
  });

  harry = new Student({
    name: 'Harry',
    born: new Date(),
  });

  ron = new Student({
    name: 'Ron',
    born: new Date(),
  });

  draco = new Student({
    name: 'Draco',
    born: new Date(),
  });

  return Promise.all([
    dumbledore.save(),
    snape.save(),
    moody.save(),
    harry.save(),
    ron.save(),
    draco.save(),
  ]);

}).then(() => {
  hogwarts = new School({
    name: 'Hogwarts',
    headmaster: dumbledore.id,
  });
  return hogwarts.save();

}).then(() => {
  gryffindor = new House({
    name: 'Gryffindor',
    school: hogwarts.id,
    headTeacher: moody.id,
    students: [harry.id, ron.id],
  });

  slytherin = new House({
    name: 'Slytherin',
    school: hogwarts.id,
    headTeacher: snape.id,
    students: [draco.id],
  });

  return Promise.all([
    gryffindor.save(),
    slytherin.save(),
  ]);

}).then(() => {
  console.log('db datafill done');

  harry.name = 'Harry Potter';
  return harry.save();

}).then(() => {
  console.log('Harry modified with instance save');

  return Student.update(
    { name: 'Harry Potter' },
    { $set: { name: 'Potter' } }
  );

}).then(() => {
  return Student.findOne({ name: 'Potter' }).exec();

}).then(newHarry => {
  harry = newHarry;
  console.log('Harry modified with Model update');

  return Student.findOneAndUpdate(
    { name: 'Potter'},
    { $set: { name: 'The boy who lived' }
  });

}).then(() => {
  console.log('Harry modified with Model findOneAndUpdate');

  return harry.remove();

}).then(() => {
  console.log('Harry removed with instance remove');

  return Student.remove({ name: 'Ron' });

}).then(() => {
  console.log('Ron removed with model remove (warning: no hook exists)');

  return Student.findOneAndRemove({ name: 'Draco' });

}).then(res => {
  console.log('Draco removed with model findOneAndRemove');

}).catch(err => console.log(err));
