!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.EmberPouch=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var Adapter = _dereq_("./pouchdb-adapter")["default"] || _dereq_("./pouchdb-adapter");
var Serializer = _dereq_("./pouchdb-serializer")["default"] || _dereq_("./pouchdb-serializer");

exports.Adapter = Adapter;
exports.Serializer = Serializer;
},{"./pouchdb-adapter":2,"./pouchdb-serializer":3}],2:[function(_dereq_,module,exports){
"use strict";
exports["default"] = DS.RESTAdapter.extend({

  //db: new PouchDB('http://localhost:5984/ember-todo'),

  _init: function (type) {
    if (!this.db || typeof this.db !== 'object') {
      throw new Error('Please set the `db` property on the adapter.');
    }
    var camelized = Ember.String.camelize(type.typeKey);
    this.db.setSchema([{
      singular: camelized,
      plural: Ember.String.pluralize(camelized)
    }]);
  },

  _recordToData: function (store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, { includeId: true });

    data = data[type.typeKey];
    return data;
  },

  findAll: function(store, type, sinceToken) {
    this._init(type);
    return this.db.rel.find(type.typeKey);
  },

  findMany: function(store, type, ids) {
    this._init(type);
    return this.db.rel.find(type.typeKey, ids);
  },

  find: function (store, type, id) {
    this._init(type);
    return this.db.rel.find(type.typeKey, id);
  },

  createRecord: function(store, type, record) {
    this._init(type);
    var data = this._recordToData(store, type, record);
    return this.db.rel.save(type.typeKey, data);
  },

  updateRecord: function (store, type, record) {
    this._init(type);
    var data = this._recordToData(store, type, record);
    return this.db.rel.save(type.typeKey, data);
  },

  deleteRecord: function (store, type, record) {
    this._init(type);
    var data = this._recordToData(store, type, record);
    return this.db.rel.del(type.typeKey, data).then(function () {
      return ''; // ember doesn't like getting a json response of {deleted: true}
    });
  }
});
},{}],3:[function(_dereq_,module,exports){
"use strict";
exports["default"] = DS.RESTSerializer.extend({
});
},{}]},{},[1])
(1)
});