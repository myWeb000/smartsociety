const Flat = require('../Models/Flat');
const User = require('../Models/userModel');
const Bill = require('../Models/Bill');
const Complaint = require('../Models/Complaint');

exports.createFlat = async (req, res) => {
    try {
        const { block_name, flat_number } = req.body;
        
        const existingFlat = await Flat.findOne({ block_name, flat_number });
        if (existingFlat) {
            return res.status(400).json({ message: "Flat already exists", success: false });
        }

        const flat = await Flat.create({ block_name, flat_number });
        res.status(201).json({ message: "Flat created successfully", success: true, data: flat });
    } catch (error) {
        console.error("Create Flat Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.assignResident = async (req, res) => {
    try {
        const { id } = req.params; // Flat ID
        const { resident_id } = req.body;

        const flat = await Flat.findById(id);
        if (!flat) {
            return res.status(404).json({ message: "Flat not found", success: false });
        }

        const resident = await User.findById(resident_id);
        if (!resident || resident.role !== 'Resident') {
            return res.status(400).json({ message: "Invalid resident ID", success: false });
        }

        flat.resident_id = resident._id;
        await flat.save();

        resident.flat_id = flat._id;
        await resident.save();

        res.status(200).json({ message: "Resident assigned successfully", success: true, data: flat });
    } catch (error) {
        console.error("Assign Resident Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.generateBill = async (req, res) => {
    try {
        const { flat_id, amount_due, due_date } = req.body;

        const flat = await Flat.findById(flat_id);
        if (!flat) {
            return res.status(404).json({ message: "Flat not found", success: false });
        }

        const bill = await Bill.create({ flat_id, amount_due, due_date });
        res.status(201).json({ message: "Bill generated successfully", success: true, data: bill });
    } catch (error) {
        console.error("Generate Bill Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params; // Complaint ID
        const { status, admin_remark } = req.body;

        const validStatuses = ['Pending', 'In-Progress', 'Resolved'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status", success: false });
        }

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found", success: false });
        }

        if (status) complaint.status = status;
        if (admin_remark !== undefined) complaint.admin_remark = admin_remark;
        
        await complaint.save();

        res.status(200).json({ message: "Complaint updated successfully", success: true, data: complaint });
    } catch (error) {
        console.error("Update Complaint Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const totalResidents = await User.countDocuments({ role: 'Resident' });
        const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
        const pendingBills = await Bill.countDocuments({ status: 'Pending' });

        res.status(200).json({
            message: "Dashboard stats fetched successfully",
            success: true,
            data: {
                totalResidents,
                pendingComplaints,
                pendingBills
            }
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.getAllFlats = async (req, res) => {
    try {
        const flats = await Flat.find().populate('resident_id', 'name email phone');
        res.status(200).json({ message: "Flats fetched successfully", success: true, data: flats });
    } catch (error) {
        console.error("Get Flats Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate({
                path: 'resident_id',
                select: 'name email phone flat_id',
                populate: { path: 'flat_id', select: 'block_name flat_number' }
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ message: "Complaints fetched successfully", success: true, data: complaints });
    } catch (error) {
        console.error("Get Complaints Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find().populate({ path: 'flat_id', populate: { path: 'resident_id', select: 'name' } }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'Bills fetched successfully', success: true, data: bills });
    } catch (error) {
        console.error('Get Bills Error:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};
