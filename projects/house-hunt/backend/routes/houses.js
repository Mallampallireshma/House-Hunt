const express = require('express');
const House = require('../models/House');
const { auth, requireOwner } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/houses
// @desc    Get all houses (with optional location filter)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { location, minPrice, maxPrice, bedrooms } = req.query;
    let filter = { available: true };

    // Build filter based on query parameters
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (bedrooms) {
      filter.bedrooms = parseInt(bedrooms);
    }

    const houses = await House.find(filter)
      .populate('owner', 'name phone email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: houses.length,
      data: houses
    });
  } catch (error) {
    console.error('Get houses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/houses/my-listings
// @desc    Get houses by owner
// @access  Private (Owner only)
router.get('/my-listings', auth, requireOwner, async (req, res) => {
  try {
    const houses = await House.find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: houses.length,
      data: houses
    });
  } catch (error) {
    console.error('Get owner houses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/houses/:id
// @desc    Get single house
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const house = await House.findById(req.params.id)
      .populate('owner', 'name phone email');

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    res.json({
      success: true,
      data: house
    });
  } catch (error) {
    console.error('Get house error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/houses
// @desc    Create new house listing
// @access  Private (Owner only)
router.post('/', auth, requireOwner, async (req, res) => {
  try {
    const { title, location, price, bedrooms, description, imageUrl, contact } = req.body;

    // Validate required fields
    if (!title || !location || !price || !bedrooms || !description || !contact) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const house = new House({
      title,
      location,
      price,
      bedrooms,
      description,
      imageUrl: imageUrl || "https://via.placeholder.com/200",
      contact,
      owner: req.user._id
    });

    await house.save();

    // Populate owner info
    await house.populate('owner', 'name phone email');

    res.status(201).json({
      success: true,
      data: house
    });
  } catch (error) {
    console.error('Create house error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/houses/:id
// @desc    Update house listing
// @access  Private (Owner only - own listings)
router.put('/:id', auth, requireOwner, async (req, res) => {
  try {
    let house = await House.findById(req.params.id);

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Check if user owns the house
    if (house.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    const { title, location, price, bedrooms, description, imageUrl, contact, available } = req.body;

    house = await House.findByIdAndUpdate(
      req.params.id,
      {
        title,
        location,
        price,
        bedrooms,
        description,
        imageUrl,
        contact,
        available
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('owner', 'name phone email');

    res.json({
      success: true,
      data: house
    });
  } catch (error) {
    console.error('Update house error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/houses/:id
// @desc    Delete house listing
// @access  Private (Owner only - own listings)
router.delete('/:id', auth, requireOwner, async (req, res) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Check if user owns the house
    if (house.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await House.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'House listing deleted successfully'
    });
  } catch (error) {
    console.error('Delete house error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/houses/locations/available
// @desc    Get available locations
// @access  Private
router.get('/locations/available', auth, async (req, res) => {
  try {
    const locations = await House.distinct('location', { available: true });
    
    res.json({
      success: true,
      data: locations.sort()
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 