const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  create: function(req, res) {
    const { firstName, lastName, username, email } = req.body;
    const newUser = { firstName, lastName, username, email };
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    db.User.create(newUser)
      .then((user) => {
        req.session.save (() => {
        req.session.logged_in = true
        res.json({
          status: "success",
          name: `${user.firstName} ${user.lastName}`,
          username: user.username,
          email: user.email,
          id: user._id,
          logged_in: req.session.logged_in
        });})
        console.log(req.session.logged_in)
        })
      .catch((err) => res.status(503).json(err));
  },

  find: function (req, res) {
    db.User.findAll({ username: req.body.username })
      .then((user) => {
        return user;
      })
    },

  login: function (req, res) {
    db.User.findOne({ username: req.body.username })
      .then((user) => {
       
        const hashed = user.password;
        bcrypt.compare(req.body.password, hashed, function (err, match) {
          if (err) {
            console.log(err);
            res.status(503).send("Server error occurred");
          }
          if (match) {
            req.session.save (() => {
            req.session.logged_in = true;
            res.json({
              status: "success",
              name: `${user.firstName} ${user.lastName}`,
              username: user.username,
              email: user.email,
              id: user._id,
              logged_in: req.session.logged_in
            });
            })
         
          } else if (!match) {
           res.send(console.log('user not found'))
         } else {
            res.status(401).send("Unauthorized");
          }
        });
      })
      .catch((err) => res.status(503).json(err));
  },


  logout: function (req, res) {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(400).end();
    }
  }
};




