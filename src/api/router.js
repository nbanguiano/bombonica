var express = require("express");
var router = express.Router();

var jwt = require("express-jwt");
var auth = jwt({
  secret: process.env.SECRET,
  userProperty: "payload"
});

const fs = require('fs');

var crypto = require("crypto");
var mime = require("mime");
var multer  = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./portfolio/images")
  },
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      callback(null, raw.toString("hex") + Date.now() + "." + mime.extension(file.mimetype));
    });
  }
});
var multerUpload = multer({ storage: storage }).array("portfolio", 10);

var apiHandlers = require("./handlers");
var auth = require("../auth/authentication").apiauth;

var modelPaths = {
  contacts: "../models/contacts",
  orders: "../models/orders",
  ingredients: "../models/ingredients",
  recipes: "../models/recipes",
  images: "../models/images"
};

// The router is applied on top of te /api route, so only relative paths needed here
var endPoints = {
  contacts: {raw: "/contacts", byid: "/contacts/:id"},
  orders: {raw: "/orders", byid: "/orders/:id", byContactId: "/orders/byContact/:contactId"},
  ingredients: {raw: "/ingredients", byid: "/ingredients/:id"},
  recipes: {raw: "/recipes", byid: "/recipes/:id"},
  images: {raw: "/images", byid: "/images/:id", byOrderId: "/images/byOrder/:orderId"}
};

// Require authentication for all API routes
router.use(auth);

// Data handling
//  - GET: finds all contacts
//  - POST: creates a new contact
router.get(endPoints.contacts.raw, (req, res) => apiHandlers.getAll(modelPaths.contacts, req, res, {sort:{createDate: 1}}));
router.post(endPoints.contacts.raw, (req, res) => apiHandlers.createItem(modelPaths.contacts, req, res, "name"));
//  - GET: find contact by id
//  - PUT: update contact by id
//  - DELETE: deletes contact by id
router.get(endPoints.contacts.byid, (req, res) => apiHandlers.getItem(modelPaths.contacts, req, res));
router.put(endPoints.contacts.byid, (req, res) => apiHandlers.updateItem(modelPaths.contacts, req, res));
router.delete(endPoints.contacts.byid, (req, res) => apiHandlers.deleteItem(modelPaths.contacts, req, res));


//  - GET: finds all orders
//  - GET: get all orders by contactId
//  - POST: creates a new order
router.get(endPoints.orders.raw, (req, res) => apiHandlers.getAll(modelPaths.orders, req, res, {sort:{date: 1}}));
router.get(endPoints.orders.byContactId, (req, res) => apiHandlers.getItemsByAttr(modelPaths.orders, req, res, "contactId"));
router.post(endPoints.orders.raw, (req, res) => apiHandlers.createItem(modelPaths.orders, req, res, "name"));
//  - GET: find order by id
//  - PUT: update order by id
//  - DELETE: deletes order by id
router.get(endPoints.orders.byid, (req, res) => apiHandlers.getItem(modelPaths.orders, req, res));
router.put(endPoints.orders.byid, (req, res) => apiHandlers.updateItem(modelPaths.orders, req, res));
router.delete(endPoints.orders.byid, (req, res) => apiHandlers.deleteItem(modelPaths.orders, req, res));


//  - GET: finds all ingredients
//  - POST: creates a new ingredient
router.get(endPoints.ingredients.raw, (req, res) => apiHandlers.getAll(modelPaths.ingredients, req, res, {sort:{cost: -1}}));
router.post(endPoints.ingredients.raw, (req, res) => apiHandlers.createItem(modelPaths.ingredients, req, res, "name"));
//  - GET: find ingredient by id
//  - PUT: update ingredient by id
//  - DELETE: deletes ingredient by id
router.get(endPoints.ingredients.byid, (req, res) => apiHandlers.getItem(modelPaths.ingredients, req, res));
router.put(endPoints.ingredients.byid, (req, res) => apiHandlers.updateItem(modelPaths.ingredients, req, res));
router.delete(endPoints.ingredients.byid, (req, res) => apiHandlers.deleteItem(modelPaths.ingredients, req, res));


//  - GET: finds all recipes
//  - POST: creates a new recipe
router.get(endPoints.recipes.raw, (req, res) => apiHandlers.getAll(modelPaths.recipes, req, res, {sort:{createDate: 1}}));
router.post(endPoints.recipes.raw, (req, res) => apiHandlers.createItem(modelPaths.recipes, req, res, "name"));
//  - GET: find recipe by id
//  - PUT: update recipe by id
//  - DELETE: deletes recipe by id
router.get(endPoints.recipes.byid, (req, res) => apiHandlers.getItem(modelPaths.recipes, req, res));
router.put(endPoints.recipes.byid, (req, res) => apiHandlers.updateItem(modelPaths.recipes, req, res));
router.delete(endPoints.recipes.byid, (req, res) => apiHandlers.deleteItem(modelPaths.recipes, req, res));


//  - GET: finds all images
//  - POST: creates new images and uploads them to the specified directory in multer settings
router.get(endPoints.images.raw, (req, res) => apiHandlers.getAll(modelPaths.images, req, res, {sort:{createDate: 1}}));
router.post(endPoints.images.raw, (req, res) => {
  multerUpload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }  
    // No error occured.
    req.files.forEach(function(file) {
      if (!file.filename) {
        this._handleError(res, "Invalid input", "Attribute 'filename' not provided.", 400);
      };

      var ImageModel = require(modelPaths.images);
      var newImage = new ImageModel(file);
      newImage.orderId = req.body.orderId;
      newImage.createDate = new Date();
      newImage.save(function(error, doc) {
        if (error) {
          this._handleError(res, error.message, "Failed to create new image.");
        }
        // else, everything went fine
      });
    }, this);
    res.status(201).json({files: req.files});
  });     
});
//  - GET: find images by orderId
//  - DELETE: deletes image by id
router.get(endPoints.images.byOrderId, (req, res) => apiHandlers.getItemsByAttr(modelPaths.images, req, res, "orderId"));
router.delete(endPoints.images.byid, (req, res) => {

  var ImageModel = require(modelPaths.images);

  ImageModel.findOne({_id: req.params.id}, (error, doc) => {
    if (error) {
      apiHandlers._handleError(res, error.message, "Failed to get " + Model.name + ".");
    }
    else {
      fs.unlink(doc.path, (err) => {
        if (err) {
          throw err;
        }
        // No errors occurred, and the image was deleted from the server
        console.log('Successfully deleted from the server: ' + doc.path);
        // Now remove reference from DB
        ImageModel.remove({_id: req.params.id}, function(error, doc) {
          if (error) {
            apiHandlers._handleError(res, error.message, "Failed to delete " + Model.name);
          }
          else {
            res.status(200).json(req.params.id);
          };
        });

      });
    }
  })

});

console.log("API end points ready");

module.exports = router;
