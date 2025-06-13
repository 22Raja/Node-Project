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

const uri = "mongodb+srv://keerthiraja228:MfmDkBO42DV1zql2@people-club.sol6thw.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB via Mongoose!");
})
.catch(err => {
  console.error("Mongoose connection error:", err);
});



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
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
