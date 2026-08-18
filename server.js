const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect_db.js');

const authRoutes = require('./Routes/authRoutes.js');
const adminRoutes = require('./Routes/adminRoutes.js');
const residentRoutes = require('./Routes/residentRoutes.js');
const guardRoutes = require('./Routes/guardRoutes.js');
const userRoutes = require('./Routes/userRoutes.js');

const app = express();
connectDB()
app.use(cors());
app.use(express.json());

// Mount the routes
app.use('/', authRoutes); // Auth routes already have /api/auth inside them
app.use('/api/admin', adminRoutes);
app.use('/api/resident', residentRoutes);
app.use('/api/guard', guardRoutes);
app.use('/api', userRoutes);

// connectDB().then(() => {
//     app.listen(3000, () => {
//         console.log('Server is running on port 3000');
//     });
// });
module.exports = app;
