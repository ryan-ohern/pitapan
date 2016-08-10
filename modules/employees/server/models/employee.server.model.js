'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  firstName: {
    type: String,
    default: '',
    required: 'Please fill Employee first name',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    required: 'Please fill Employee last name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill Employee address',
    trim: true
  },
  phoneNumber: {
    type: String,
    default: '',
    required: 'Please fill Employee phone number',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Employee email',
    trim: true
  },
  dob: {
    type: Date,
    default: Date.now
  },
  dateHired: {
    type: Date,
    default: Date.now
  },
  department: {
    type: String,
    default: '',
    required: 'Please fill Employee department',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Employee', EmployeeSchema);
