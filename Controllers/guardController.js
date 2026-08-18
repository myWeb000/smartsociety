const Visitor = require('../Models/Visitor');

exports.verifyPass = async (req, res) => {
    try {
        const { gate_pass_code } = req.body;

        const visitor = await Visitor.findOne({ gate_pass_code, status: 'Pending' }).populate('flat_id');
        
        if (!visitor) {
            return res.status(404).json({ message: "Invalid or already used pass code", success: false });
        }

        visitor.status = 'Entered';
        await visitor.save();

        res.status(200).json({ 
            message: `Pass Verified, Allow Entry to Flat ${visitor.flat_id.flat_number}`, 
            success: true, 
            data: visitor 
        });
    } catch (error) {
        console.error("Verify Pass Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.walkInEntry = async (req, res) => {
    try {
        const { flat_id, visitor_name, phone, vehicle_number } = req.body;

        const visitor = await Visitor.create({
            flat_id,
            visitor_name,
            phone,
            vehicle_number,
            type: 'Walk-In',
            status: 'Entered' // Guard immediately lets them in
        });

        res.status(201).json({ message: "Walk-in entry recorded successfully", success: true, data: visitor });
    } catch (error) {
        console.error("Walk-In Entry Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.markExit = async (req, res) => {
    try {
        const { id } = req.params; // Visitor ID

        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found", success: false });
        }

        if (visitor.status !== 'Entered') {
            return res.status(400).json({ message: "Visitor hasn't entered or has already exited", success: false });
        }

        visitor.status = 'Exited';
        await visitor.save();

        res.status(200).json({ message: "Exit marked successfully", success: true, data: visitor });
    } catch (error) {
        console.error("Mark Exit Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.getActiveVisitors = async (req, res) => {
    try {
        const activeVisitors = await Visitor.find({ status: 'Entered' }).populate('flat_id', 'block_name flat_number');
        res.status(200).json({ message: "Active visitors fetched successfully", success: true, data: activeVisitors });
    } catch (error) {
        console.error("Get Active Visitors Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

