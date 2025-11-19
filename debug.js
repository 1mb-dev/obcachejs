'use strict';

var hostname = require('os').hostname();
var caches = {};
var index = 0;

var debug = {
  register: function(cache, name) {
    var cname = name || ('anon_' + index++);
    caches[cname] = cache;
    return cache;
  },

  view: function(req, res, _next) {
    var data = [];
    var cnames = Object.keys(caches);

    cnames.forEach(function(cname) {
      var cache = caches[cname];
      var cachestats = cache.stats;
      var total = cachestats.hit + cachestats.miss;
      var stats = {
        name: cname,
        size: cache.store.size(),
        keycount: cache.store.keycount(),
        hitrate: ((cachestats.hit * 100) / (total || 1)) | 0,
        resets: cachestats.reset,
        pending: cachestats.pending
      };

      if (req.query) {
        if (req.query.detail === cname && cache.store.values) {
          stats.values = cache.store.values();
        } else if (req.method === 'POST' && req.query.flush === cname) {
          cache.store.reset();
          stats.resets++;
          cache.stats.reset++;
        }
      }

      data.push(stats);
    });

    res.json({
      pid: process.pid,
      uptime: process.uptime(),
      host: hostname,
      data: data
    });
  },

  log: function(cb) {
    debug.view({ query: {} }, { json: cb || console.log }, function() {});
  }
};

module.exports = debug;
