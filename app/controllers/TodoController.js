const TodoModel = require("../models/Todo");
const { validationResult } = require("express-validator/check");
exports.Index = (req, res, next) => {
  let PostResults = req.flash("errors");
  if (PostResults.length > 0) {
    PostResults = PostResults;
  } else {
    PostResults = null;
  }
  TodoModel.find({})
    .then(todos => {
      res.render("index", {
        PageTitle: "Home Page TODO LIST",
        csrfToken: req.csrfToken(),
        todos: todos,
        Results: PostResults
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addTodo = (req, res, next) => {
  const Todo = req.body.todo;
  const validateErrors = validationResult(req);
  if (!validateErrors.isEmpty()) {
    req.flash("errors", validateErrors.array()[0].msg);
    return res.redirect("/");
  }
  TodoModel.create({
    todo: Todo
  })
    .then(results => {
      if (results) {
        req.flash("errors", "Added Successfully !");
        return res.redirect("/");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.DeleteTodo = (req, res, next) => {
  const id = req.body.id;
  TodoModel.findOneAndDelete({
    _id: id
  })
    .then(results => {
      if (results) {
        req.flash("errors", "Deleted Successfully !...");
        return res.redirect("/");
      }
    })
    .catch(err => {
      console.log(err);
    });
};
