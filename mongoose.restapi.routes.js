"use strict";

var mongoose = require('mongoose');
var router  = require('express').Router();

module.exports = function(app) {

    router.param('collectionName', function(req, res, next, collectionName){
        req.collection = mongoose.model(collectionName);
        return next();
    });

    router.get('/', function(req, res, next) {
        res.send('please select a collection, e.g., /collections/Event')
    });

    router.get('/:collectionName', function(req, res, next) {
        req.collection.find(function(e, results){
            if (e) return next(e);
            res.send(results)
        });
    });

    router.post('/:collectionName', function(req, res, next) {
        req.collection.create(req.body, function(e, results){
            if (e) return next(e);
            res.send(results)
        });
    });

    router.get('/:collectionName/:id', function(req, res, next) {
        req.collection.findById(req.params.id, function(e, result){
            if (e) return next(e);
            res.send(result)
        });
    });

    router.put('/:collectionName/:id', function(req, res, next) {
        req.collection.update({_id: req.params.id}, {$set: req.body}, {safe: true, multi: false}, function(e, result){
            if (e) return next(e);
            res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
        });
    });

    router.delete('/:collectionName/:id', function(req, res, next) {
        req.collection.remove({_id: req.params.id } , function(e, result){
            if (e) return next(e)
            res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
        })
    });
    app.use('/api/collections', router);
};