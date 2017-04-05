var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// Define collection names
var CONTACTS_COLLECTION = "contacts";
var ORDER_COLLECTION = "orders";

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
});

router.get('/hello', function(req, res){
    res.send("Hello world!");
});

router.get('/bye', function(req, res){
    res.send("Bye bye world!");
});

/*  CONTACTS API ROUTES BELOW
 *  "/api/contacts"
 *  - GET: finds all contacts
 *  - POST: creates a new contact
 */
router.get("/api/contacts", (req, res) => getAll(CONTACTS_COLLECTION, req, res));
router.post("/api/contacts", (req, res) => createItem(CONTACTS_COLLECTION, req, res, "name"));

/*  "/api/contacts/:id"
 *  - GET: find contact by id
 *  - PUT: update contact by id
 *  - DELETE: deletes contact by id
 */
router.get("/api/contacts/:id", (req, res) => getItem(CONTACTS_COLLECTION, req, res));
router.put("/api/contacts/:id", (req, res) => updateItem(CONTACTS_COLLECTION, req, res));
router.delete("/api/contacts/:id", (req, res) => deleteItem(CONTACTS_COLLECTION, req, res));



/*  ORDERS API ROUTES BELOW 
 *  "/api/orders"
 *  - GET: finds all orders
 *  - POST: creates a new order
 */
router.get("/api/orders", (req, res) => getAll(ORDER_COLLECTION, req, res));
router.post("/api/orders", (req, res) => createItem(ORDER_COLLECTION, req, res, "name"));

/*  "/api/orders/:id"
 *  - GET: find order by id
 *  - PUT: update order by id
 *  - DELETE: deletes order by id
 */
router.get("/api/orders/:id", (req, res) => getItem(ORDER_COLLECTION, req, res));
router.put("/api/orders/:id", (req, res) => updateItem(ORDER_COLLECTION, req, res));
router.delete("/api/orders/:id", (req, res) => deleteItem(ORDER_COLLECTION, req, res));


/*  HELPERS FOR API
 *  - They live here to make use the db object, which is opened when starting the web routerlication
 *    Thus the direct reference to db: mongodb.MongoClient
 */

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

function getAll(collection, request, response) {
  db.collection(collection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(response, err.message, "Failed to get " + collection + ".");
    } else {
      response.status(200).json(docs);
    }
  });
};

function createItem(collection, request, response, mandatoryAttr) {
  var newItem = request.body;
  newItem.createDate = new Date();

  if (!request.body[mandatoryAttr]) {
    handleError(response, "Invalid user input", "Must provide a " + mandatoryAttr + ".", 400);
  }

  db.collection(collection).insertOne(newItem, function(err, doc) {
    if (err) {
      handleError(response, err.message, "Failed to create new " + collection + ".");
    } else {
      response.status(201).json(doc.ops[0]);
    }
  });
};

function getItem (collection, request, response) {
  db.collection(collection).findOne({ _id: new ObjectID(request.params.id) }, function(err, doc) {
    if (err) {
      handleError(response, err.message, "Failed to get contact");
    } else {
      response.status(200).json(doc);
    }
  });
}

function updateItem(collection, request, response) {
  var updateDoc = request.body;
  delete updateDoc._id;

  db.collection(collection).updateOne({_id: new ObjectID(request.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(response, err.message, "Failed to update " + collection + ".");
    } else {
      updateDoc._id = request.params.id;
      response.status(200).json(updateDoc);
    }
  });
};

function deleteItem(collection, request, response) {
  db.collection(collection).deleteOne({_id: new ObjectID(request.params.id)}, function(err, result) {
    if (err) {
      handleError(response, err.message, "Failed to delete contact");
    } else {
      response.status(200).json(request.params.id);
    }
  });
};

module.exports = router;
