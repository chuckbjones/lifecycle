/* GET users listing for the specified service. */
exports.list = function list(req, res, next){  
  req.db.get('users').find(
    { },
    { limit : 10, skip : 0, sort : [['name',1]] }, // FIXME: make them params
    function(err, results) {
      if (err) return next(err);
      res.send(results);
    }
  );
};

/* GET a single user document by its id */
exports.show = function show(req, res, next) {
  if (!req.params.id) return next(new Error('No user id provided.'));
  req.db.get('users').findById(req.params.id, 
    function(err, result) {
      if (err) return next(err);
      if(!result) {
        err = new Error('user not found.');
        err.status = 404;
        return next(err);
      }

      res.send(result);
    }
  );
};

/* POST a new user document */
exports.create = function create(req, res, next) {
  if (!req.body.user) return next(new Error('No user payload provided.'));
  var user = req.body.user;
  // FIXME: user.created_at = ???;
  req.db.get('users').insert(user, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
};

/* PUT a replacement user document by id */
exports.update = function update(req, res, next) {
  if (!req.params.id) return next(new Error('No user id provided.'));
  if (!req.body.user) return next(new Error('No user payload provided.'));
  // FIXME: user.updated_at = ???;
  req.db.get('users').updateById(req.params.id, 
    {$set: req.body.user}, 
    function(err, count) {
      if (err) return next(err);
      res.send({ affectedCount : count });
    }
  );
};

/* DELETE a single user document by its id */
exports.destroy = function destroy(req, res, next) {
  if (!req.params.id) return next(new Error('No user id provided.'));
  req.db.get('users').remove({ _id: req.params.id }, function(err, count) {
    if (err) return next(err);
    res.send({ affectedCount : count });
  });
};
