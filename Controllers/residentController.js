const Bill = require('../Models/Bill');
const Complaint = require('../Models/Complaint');
const Amenity = require('../Models/Amenity');
const Visitor = require('../Models/Visitor');
const cloudinary = require('../config/cloudnary');

exports.getBills = async (req, res) => {
    try {
        const { flat_id } = req.query; // In real app, this should come from req.user
        
        const bills = await Bill.find({ flat_id });
        res.status(200).json({ message: "Bills fetched successfully", success: true, data: bills });
    } catch (error) {
        console.error("Get Bills Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.lodgeComplaint = async (req, res) => {
    try {
        const { resident_id, category, description } = req.body;
        let image_url = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'smart_society_complaints'
            });
            image_url = result.secure_url;
        }

        const complaint = await Complaint.create({
            resident_id,
            category,
            description,
            image_url
        });

        res.status(201).json({ message: "Complaint lodged successfully", success: true, data: complaint });
    } catch (error) {
        console.error("Lodge Complaint Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.getComplaints = async (req, res) => {
    try {
        const { resident_id } = req.query; // Should come from req.user ideally
        
        const complaints = await Complaint.find({ resident_id }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Complaints fetched successfully", success: true, data: complaints });
    } catch (error) {
        console.error("Get Complaints Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.bookAmenity = async (req, res) => {
    try {
        const { resident_id, amenity_name, booking_date } = req.body;

        const amenity = await Amenity.create({ resident_id, amenity_name, booking_date });
        res.status(201).json({ message: "Amenity booked successfully", success: true, data: amenity });
    } catch (error) {
        console.error("Book Amenity Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.generateVisitorPass = async (req, res) => {
    try {
        const { flat_id, visitor_name, phone, vehicle_number } = req.body;

        // Generate a random 5 character alphanumeric code
        const gate_pass_code = Math.random().toString(36).substring(2, 7).toUpperCase();

        const visitor = await Visitor.create({
            flat_id,
            visitor_name,
            phone,
            vehicle_number,
            gate_pass_code,
            type: 'Expected'
        });

        res.status(201).json({ message: "Visitor pass generated successfully", success: true, data: visitor });
    } catch (error) {
        console.error("Generate Visitor Pass Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
