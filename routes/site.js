/* GET sites listing for the specified service. */
exports.list = function list(req, res, next){  
  if (!req.params.service) return next(new Error('No service provided.'));
  req.db.get('sites').find(
    { service : req.params.service },
    { limit : 10, skip : 0, sort : [['name',1]] }, // FIXME: make them params
    function(err, results) {
      if (err) return next(err);
      res.send(results);
    }
  );
};

/* GET a single site document by its id */
exports.show = function show(req, res, next) {
  if (!req.params.id) return next(new Error('No site id provided.'));
  req.db.get('sites').findById(req.params.id, 
    function(err, result) {
      if (err) return next(err);
      if(!result) {
        err = new Error('Site not found.');
        err.status = 404;
        return next(err);
      }

      res.send(result);
    }
  );
}

/* POST a new site document */
exports.create = function create(req, res, next) {
  if (!req.body.site) return next(new Error('No site payload provided.'));
  var site = req.body.site;
  // FIXME: site.created_at = ???;
  req.db.get('sites').insert(site, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
};

/* PUT a replacement site document by id */
exports.update = function update(req, res, next) {
  if (!req.params.id) return next(new Error('No site id provided.'));
  if (!req.body.site) return next(new Error('No site payload provided.'));
  // FIXME: site.updated_at = ???;
  req.db.get('sites').updateById(req.params.id, 
    {$set: req.body.site}, 
    function(err, count) {
      if (err) return next(err);
      res.send({ affectedCount : count });
    }
  );
};

/* DELETE a single site document by its id */
exports.destroy = function destroy(req, res, next) {
  if (!req.params.id) return next(new Error('No site id provided.'));
  req.db.get('sites').remove({ _id: req.params.id }, function(err, count) {
    if (err) return next(err);
    res.send({ affectedCount : count });
  });
};
