var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var auth = jwt({
  secret: process.env.SECRET,
  userProperty: "payload"
});

var apiHandlers = require("./handlers");
var auth = require("../auth/authentication").apiauth;

const modelPaths = {
  contacts: "../models/contacts",
  orders: "../models/orders"
};

// The router is applied on top of te /api route, so only relative paths needed here
const endPoints = {
  contacts: {raw: "/contacts", byid: "/contacts/:id"},
  orders: {raw: "/orders", byid: "/orders/:id"},
};

// Require authentication for all API routes
router.use(auth);

// Data handling
//  - GET: finds all contacts
//  - POST: creates a new contact
router.get(endPoints.contacts.raw, (req, res) => apiHandlers.getAll(modelPaths.contacts, req, res));
router.post(endPoints.contacts.raw, (req, res) => apiHandlers.createItem(modelPaths.contacts, req, res, "name"));

//  - GET: find contact by id
//  - PUT: update contact by id
//  - DELETE: deletes contact by id
router.get(endPoints.contacts.byid, (req, res) => apiHandlers.getItem(modelPaths.contacts, req, res));
router.put(endPoints.contacts.byid, (req, res) => apiHandlers.updateItem(modelPaths.contacts, req, res));
router.delete(endPoints.contacts.byid, (req, res) => apiHandlers.deleteItem(modelPaths.contacts, req, res));


//  - GET: finds all orders
//  - POST: creates a new order
router.get(endPoints.orders.raw, (req, res) => apiHandlers.getAll(modelPaths.orders, req, res));
router.post(endPoints.orders.raw, (req, res) => apiHandlers.createItem(modelPaths.orders, req, res, "name"));

//  - GET: find order by id
//  - PUT: update order by id
//  - DELETE: deletes order by id
router.get(endPoints.orders.byid, (req, res) => apiHandlers.getItem(modelPaths.orders, req, res));
router.put(endPoints.orders.byid, (req, res) => apiHandlers.updateItem(modelPaths.orders, req, res));
router.delete(endPoints.orders.byid, (req, res) => apiHandlers.deleteItem(modelPaths.orders, req, res));

console.log("API end points ready");

module.exports = router;
