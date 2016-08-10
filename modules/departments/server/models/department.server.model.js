'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Department Schema
 */
var DepartmentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Department name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Department name',
    trim: true
  },
  sales: {
    type: Array,
    default: [],
    trim: true
  },
  products: {
    type: Array,
    default: [],
    trim: true
  },
  employees: {
    type: Array,
    default: [],
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

mongoose.model('Department', DepartmentSchema);
