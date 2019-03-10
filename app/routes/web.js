const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");
const TodoController = require("../controllers/TodoController");

router.get("/", TodoController.Index);
router.post(
  "/addTodo",
  [
    check("todo")
      .not()
      .isEmpty()
      .withMessage("Todo Field Is Required")
      .isLength({ max: 500 })
      .withMessage("Todo List Maximum Length is 500 Char")
  ],
  TodoController.addTodo
);
router.post(
  "/deleteTodo",
  [
    check("id")
      .not()
      .isEmpty()
      .withMessage("ID Fields Is Required")
      .isNumeric()
      .withMessage("An Error Ocurred Please Try Again Later")
  ],
  TodoController.DeleteTodo
);
module.exports = router;
