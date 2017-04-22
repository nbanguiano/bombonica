module.exports = {


  _handleError: function(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
  },

  getAll: function(modelPath, request, response, options) {
    var Model = require(modelPath);
    Model.find().sort(options.sort).exec(function(error, docs){
      if (error){ 
        this._handleError(response, error.message, "Failed to get " + Model.name + ".");
      }
      else {
        response.status(200).json(docs);
      }
    });
  },

  createItem: function(modelPath, request, response, mandatoryAttr) {
    if (mandatoryAttr) {
      if (!request.body[mandatoryAttr]) {
        this._handleError(response, "Invalid input", "Attribute '" + mandatoryAttr + "' not provided.", 400);
      }
    }
    var Model = require(modelPath);
    var item = new Model(request.body);
    item.createDate = new Date();
    item.save(function(error, doc) {
      if (error) {
        this._handleError(response, error.message, "Failed to create new " + Model.name + ".");
      }
      else {
        response.status(201).json(doc);
      }
    });
  },

  getItem: function(modelPath, request, response) {
    var Model = require(modelPath);
    Model.findOne({_id: request.params.id}, function(error, doc) {
      if (error) {
        this._handleError(response, error.message, "Failed to get " + Model.name + ".");
      }
      else {
        response.status(200).json(doc);
      }
    });
  },

  getItemsByAttr: function(modelPath, request, response, attrToQuery) {
    var Model = require(modelPath);
    Model.find().where(attrToQuery).equals(request.params[attrToQuery]).exec(function(error, doc) {
      if (error) {
        this._handleError(response, error.message, "Failed to get " + Model.name + ".");
      }
      else {
        response.status(200).json(doc);
      }
    });
  },

  updateItem: function(modelPath, request, response) {
    var Model = require(modelPath);
    Model.findOneAndUpdate({_id: request.params.id}, request.body, {}, function(error, doc) {
      if (error) {
        this._handleError(response, error.message, "Failed to get " + Model.name + ".");
      }
      else {
        response.status(200).json({ message: Model.name + " updated."});
      };
    });
  },

  deleteItem: function(modelPath, request, response) {
    var Model = require(modelPath);
    Model.remove({_id: request.params.id}, function(error, doc) {
      if (error) {
        this._handleError(response, error.message, "Failed to delete " + Model.name);
      }
      else {
        response.status(200).json(request.params.id);
      };
    });
  }

}
