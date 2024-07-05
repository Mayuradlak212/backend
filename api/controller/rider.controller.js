const express = require('express');
const router = express.Router();
const Ride = require('../model/rides');

// Create a new ride
router.post('/', async (req, res) => {
  try {
    const newRide = new Ride({
        ride_id: '12345',
        rideable_type: 'electric_bike',
        started_at: new Date().toISOString(),
        ended_at: new Date().toISOString(),
        start_station_name: 'Station A',
        start_station_id: 'STA001',
        end_station_name: 'Station B',
        end_station_id: 'STB001',
        start_lat: '40.7128',
        start_lng: '-74.0060',
        end_lat: '40.7128',
        end_lng: '-74.0060',
        member_casual: 'member'
      });
    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all rides
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10
  
  try {
    const rides = await Ride.find()
      .skip((page - 1) * limit)  // Skip records
      .limit(limit);             // Limit records per page

    const totalRides = await Ride.countDocuments();  // Total count of rides
    
    res.status(200).json({
      currentPage: page,
      count:totalRides,
      totalPages: Math.ceil(totalRides / limit),
      data: rides
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a ride by ID
router.get('/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.status(200).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a ride by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRide) return res.status(404).json({ message: 'Ride not found' });
    res.status(200).json(updatedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a ride by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRide = await Ride.findByIdAndDelete(req.params.id);
    if (!deletedRide) return res.status(404).json({ message: 'Ride not found' });
    res.status(200).json({ message: 'Ride deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
