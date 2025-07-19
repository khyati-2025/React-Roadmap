const express = require('express');
const mongoose = require('mongoose');
const model = require('./model');
const controller = require('./controller');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

console.log("Environment 🖥️ : ", process.env.NODE_ENV);
const port = process.env.PORT;

const dataBase = process.env.DATABASE.replace('<DB_NAME>', process.env.DB_NAME);
mongoose.connect(dataBase)
.then( () => {
    console.log("Successfully connected with the mongoDB!!");
})
.catch( (error) => {
    console.log("Failed to connect with the mongoDB!!");
    console.error(error.message);
})


router.route('/allTask').get(controller.getApproach.getAllTasks);
router.route('/newTask').post(controller.postApproach.addTask)
router.route('/:id').get(controller.getApproach.getTask)
                    .patch(controller.patchApproach.updateTask)
                    .delete(controller.deleteApproach.deleteTask);


app.use('/api/v1', router);

//Checking the connection with the frontend
app.get('/connection', (req, res) => {
    res.send("Connected!!");
})


app.listen(port, '127.0.0.1', () => {
    console.log(`Server is running on port ${port} 🚀`);
})