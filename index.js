const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const moment = require('moment');

const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const issueRoutes = require('./routes/issues');

const app = express();




// MongoDB connection



const { MongoClient, ServerApiVersion } = require('mongodb');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://keerthiraja228:dhfAWNW7QBx3S8b8@library.cblol5i.mongodb.net/?retryWrites=true&w=majority&appName=library";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const uri = "mongodb+srv://keerthiraja228:MfmDkBO42DV1zql2@people-club.sol6thw.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Handlebars setup
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  helpers: {
    formatDate: (date, format) => moment(date).format(format),
    ifEqual: (a, b, options) => (a.toString() === b.toString() ? options.fn(this) : options.inverse(this)),
  }
}));
app.set('view engine', 'hbs');

// Routes
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/issues', issueRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/books');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});
