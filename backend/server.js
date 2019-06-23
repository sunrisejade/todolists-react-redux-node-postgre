// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const routes = require('./routes/api');
// const PORT = 4000;

// // set up express app
// const app = express();

// // connect to mongodb
// mongoose.connect('mongodb://127.0.0.1:27017/ninjago', { useNewUrlParser: true });
// const connection = mongoose.connection;

// app.use(bodyParser.json())

// app.use('api',routes);





// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully");
// })

// mongoose.Promise= global.Promise;

// app.post('/api', function(req,res) {
//     res.send({
//         todo_description: {
//             type: String
//         },
//         todo_responsible: {
//             type: String
//         },
//         todo_priority: {
//             type: String
//         },
//         todo_completed: {
//             type: Boolean
//         }
//     });
// });

// app.use(bodyParser.json());




// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
// });