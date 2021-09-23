const express = require('express');
const customerRoute = require('./routes/customerRoute');

const app = express();

// parse request body to object and store in req.body
app.use(express.json());

// config where to store static file
app.use(express.static('/public'));

// config routing
// Customer CRUD routes
app.use('/customers', customerRoute);
// Branch CRUD routes
// app.use('/branches', branchRoute);

// handle path and method not found (path and method not specified in the server)
app.use((req, res, next) => {
  res.status(404).json({ message: 'this resource is not found' });
});

// handle all error in application
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8002, () => console.log('server running on port 8002'));

// Account CRUD
// Get Account By Customer
// Get Account By Branch
// Get Account By Branch And Customer
// Get Total balance on each branch
// Get Total balance on each customer
