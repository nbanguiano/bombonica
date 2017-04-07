var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database connection ready");

  var API_HANDLERS = require("./handlers");
  
  const MODEL_PATHS = {
    contacts: "../models/contacts",
    orders: "../models/orders"
  };

  const END_POINTS = {
    contacts: {raw: "/api/contacts", byid: "/api/contacts/:id"},
    orders: {raw: "/api/orders", byid: "/api/orders/:id"},
  };

  //  - GET: finds all contacts
  //  - POST: creates a new contact
  router.get(END_POINTS.contacts.raw, (req, res) => API_HANDLERS.getAll(MODEL_PATHS.contacts, req, res));
  router.post(END_POINTS.contacts.raw, (req, res) => API_HANDLERS.createItem(MODEL_PATHS.contacts, req, res, "name"));

  //  - GET: find contact by id
  //  - PUT: update contact by id
  //  - DELETE: deletes contact by id
  router.get(END_POINTS.contacts.byid, (req, res) => API_HANDLERS.getItem(MODEL_PATHS.contacts, req, res));
  router.put(END_POINTS.contacts.byid, (req, res) => API_HANDLERS.updateItem(MODEL_PATHS.contacts, req, res));
  router.delete(END_POINTS.contacts.byid, (req, res) => API_HANDLERS.deleteItem(MODEL_PATHS.contacts, req, res));


  //  - GET: finds all orders
  //  - POST: creates a new order
  router.get(END_POINTS.orders.raw, (req, res) => API_HANDLERS.getAll(MODEL_PATHS.orders, req, res));
  router.post(END_POINTS.orders.raw, (req, res) => API_HANDLERS.createItem(MODEL_PATHS.orders, req, res, "name"));

  //  - GET: find order by id
  //  - PUT: update order by id
  //  - DELETE: deletes order by id
  router.get(END_POINTS.orders.byid, (req, res) => API_HANDLERS.getItem(MODEL_PATHS.orders, req, res));
  router.put(END_POINTS.orders.byid, (req, res) => API_HANDLERS.updateItem(MODEL_PATHS.orders, req, res));
  router.delete(END_POINTS.orders.byid, (req, res) => API_HANDLERS.deleteItem(MODEL_PATHS.orders, req, res));


  console.log("API end points ready");
});


module.exports = router;
