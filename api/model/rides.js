const mongoose = require('mongoose');

// Define the schema
const rideSchema = new mongoose.Schema({
  ride_id: {
    type: String,
    required: true
  },
  rideable_type: {
    type: String,
    required: true
  },
  started_at: {
    type: String,
    required: true
  },
  ended_at: {
    type: String,
    required: true
  },
  start_station_name: {
    type: String,
    required: true
  },
  start_station_id: {
    type: String,
    required: true
  },
  end_station_name: {
    type: String,
    required: true
  },
  end_station_id: {
    type: String,
    required: true
  },
  start_lat: {
    type: String,
    required: true
  },
  start_lng: {
    type: String,
    required: true
  },
  end_lat: {
    type: String,
    required: true
  },
  end_lng: {
    type: String,
    required: true
  },
  member_casual: {
    type: String,
    required: true
  }
});

// Create the model
const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
