'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill product name',
    trim: true
  },
  upc: {
    type: Number,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill product description',
    trim: true
  },
  price: {
    type: Number,
    default: '',
    required: 'Please fill product price',
    trim: true
  },
  inventory: {
    type: Number,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  cost: {
    type: Number,
    default: '',
    required: 'Please fill product cost',
    trim: true
  },
  department: {
    type: String,
    default: '',
    required: 'Please fill product department',
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

mongoose.model('Product', ProductSchema);
