const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRouter = require("./routers/authentication");
const proposalsRouter = require("./routers/proposals");
const complaintsRouter = require("./routers/complaints");
const EngineeringAuthorityRouter = require("./routers/EngineeringAuthority");
const RoadAuthorityRouter = require("./routers/RoadsandBridgesAuthority");
const SewerageAuthorityRouter = require("./routers/Sewerageauthority");
const TrafficAuthorityRouter = require("./routers/TrafficAuthority");

dotenv.config();
app.use(express.json());

// Routes
app.use('/api/authentication', authRouter);
app.use('/api/proposals', proposalsRouter);
app.use('/api/complaints', complaintsRouter);
app.use('/api/engineeringauthority', EngineeringAuthorityRouter);
app.use('/api/roadsandbridgesauthority', RoadAuthorityRouter);
app.use('/api/sewerageauthority', SewerageAuthorityRouter);
app.use('/api/trafficauthority', TrafficAuthorityRouter);

// Connect to DB
app.listen(3000, () => {
        console.log('Server is listening on port 3000');
      });
      
mongoose.set("strictQuery", false);
        
mongoose.connect('mongodb://127.0.0.1:27017/safetyCitizen')
        .then(db => console.log('DB is connected'))
        .catch(err => console.log(err));