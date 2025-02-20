const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = Trip;

// GET: /trips - Lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        if (!trips || trips.length === 0) {
            return res.status(404).json({ error: "No trips found" });
        }
        return res.status(200).json(trips);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// GET: /trips/:tripCode - Find a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ 'code': req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        return res.status(200).json(trip);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// POST: /trips - Adds a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// PUT: /trips/:tripCode - Updates an existing trip  
const tripsUpdateTrip = async (req, res) => {  
    try {
        console.log("Received update request for trip:", req.params.tripCode);
        console.log("Update data:", req.body);

        // Find and update the trip
        const updatedTrip = await Model.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } // Return updated document
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ error: "Trip not found or could not be updated" });
        }

        return res.status(200).json(updatedTrip);

    } catch (error) {
        console.error("Error updating trip:", error);
        return res.status(500).json({ error: error.message });
    }
};

// DELETE: /trips/:tripCode - Deletes a trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Model.findOneAndDelete({ 'code': req.params.tripCode }).exec();

        if (!deletedTrip) {
            return res.status(404).json({ error: "Trip not found" });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
