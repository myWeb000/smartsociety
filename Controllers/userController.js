const user = require('../Models/userModel.js')
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudnary.js");


exports.users = async (req, res) => {

    try {
        const users = await user.find().select('name email role phone flat_id createdAt')
        res.json(users)
    } catch (error) {
        res.status(500).send('user Not Found')
    }
}

exports.adduser = async (req, res) => {

    try {
        const { name, age, email } = req.body
        console.log(req.file);

        let imageUrl = "";
        if (req.file) {

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "users"
            });

            // console.log(result);

            imageUrl = result.secure_url;
        }


        const newuser = await user.create({
            name: name,
            age: age,
            email: email,
            image: imageUrl
        })
        res.json({ message: "User Added", status: true, data: newuser })

    } catch (error) {
        res.status(500).send(`User Not Added! error = ${error.message} `)
    }
}

exports.deleteuser = async (req, res) => {
    try {

        const deleteduser = await user.findByIdAndDelete(req.params.id)
        if (!deleteduser) {
            return res.send("User not found")
        }
        res.json({ message: "User Deleted", status: true, data: deleteduser })

    } catch (error) {
        res.status(500).send(`User Not deleted! error = ${error.message} `)
    }
}

exports.updateuser = async (req, res) => {
    try {
        const { name, age, email } = req.body
        const updateduser = await user.findById(req.params.id)
        if (!updateduser) {
            return res.send("User not found")
        }
        if (name) updateduser.name = name
        if (age) updateduser.age = age
        if (email) updateduser.email = email

        updateduser.save()
        res.json({ message: "User Updated", status: true, data: updateduser })
    } catch (error) {
        res.status(500).send(`User Not deleted! error = ${error.message} `)
    }
}
