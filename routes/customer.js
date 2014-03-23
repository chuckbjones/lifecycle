/* GET customers listing for the specified service. */
exports.list = function list(req, res, next){  
  if (!req.params.service) return next(new Error('No service provided.'));
  req.db.get('customers').find(
    { service : req.params.service },
    { limit : 10, skip : 0, sort : [['name',1]] }, // FIXME: make them params
    function(err, results) {
      if (err) return next(err);
      res.send(results);
    }
  );
};

/* GET a single customer document by its id */
exports.show = function show(req, res, next) {
  if (!req.params.id) return next(new Error('No customer id provided.'));
  req.db.get('customers').findById(req.params.id, 
    function(err, result) {
      if (err) return next(err);
      if(!result) {
        err = new Error('customer not found.');
        err.status = 404;
        return next(err);
      }

      res.send(result);
    }
  );
};

/* POST a new customer document */
exports.create = function create(req, res, next) {
  if (!req.body.customer) return next(new Error('No customer payload provided.'));
  var customer = req.body.customer;
  // FIXME: customer.created_at = ???;
  req.db.get('customers').insert(customer, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
};

/* PUT a replacement customer document by id */
exports.update = function update(req, res, next) {
  if (!req.params.id) return next(new Error('No customer id provided.'));
  if (!req.body.customer) return next(new Error('No customer payload provided.'));
  // FIXME: customer.updated_at = ???;
  req.db.get('customers').updateById(req.params.id, 
    {$set: req.body.customer}, 
    function(err, count) {
      if (err) return next(err);
      res.send({ affectedCount : count });
    }
  );
};

/* DELETE a single customer document by its id */
exports.destroy = function destroy(req, res, next) {
  if (!req.params.id) return next(new Error('No customer id provided.'));
  req.db.get('customers').remove({ _id: req.params.id }, function(err, count) {
    if (err) return next(err);
    res.send({ affectedCount : count });
  });
};
