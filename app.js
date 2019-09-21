const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 1337;

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

const index = require('./routes/index');
const hello = require('./routes/hello');


app.use('/', index);
app.use('/hello', hello);


///vet ej var detta ska VARCHAR
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
    if (err) {
        // returnera error
    }

    // returnera korrekt svar
});

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));

// // Add a route
// app.get("/", (req, res) => {
//     const data = {
//         data: {
//             msg: "Hello World"
//         }
//     };
//
//     res.json(data);
// });
//
// // Testing routes with method
// app.get("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a GET request"
//         }
//     });
// });
//
// app.post("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a POST request"
//         }
//     });
// });
//
// app.put("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a PUT request"
//         }
//     });
// });
//
// app.delete("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a DELETE request"
//         }
//     });
// });

// Testing routes with method
// app.get("/user", (req, res) => {
//     res.json({
//         data: {
//             msg: "Got a GET request, sending back default 200"
//         }
//     });
// });
//
// app.post("/user", (req, res) => {
//     res.status(201).json({
//         data: {
//             msg: "Got a POST request, sending back 201 Created"
//         }
//     });
// });
//
// app.put("/user", (req, res) => {
//     // PUT requests should return 204 No Content
//     res.status(204).send();
// });
//
// app.delete("/user", (req, res) => {
//     // DELETE requests should return 204 No Content
//     res.status(204).send();
// });
//
// // Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));
