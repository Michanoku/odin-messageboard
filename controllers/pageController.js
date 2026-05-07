const { ResultWithContextImpl } = require("express-validator/lib/chain");
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const validateMessage = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .bail()
    .matches(/^[a-zA-Z0-9 _-]+$/)
    .withMessage("Name contains invalid characters. Allowed characters: Letters, numbers, spaces, _ and -.")
    .isLength({ min: 2, max: 255 })
    .withMessage(`Name must be between 2 and 255 characters.`),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .bail()
    .isLength({ max: 1000 })
    .withMessage(`Message must be between 1 and 1000 characters.`),
];

const getIndex = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Michanoku Message Board", messages: messages });
};

const getNewMessage = (req, res) => {
  res.render("form", { title: "Add New Message" });
};

const postNewMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Add New Message",
        errors: errors.array(),
      });
    }
    const { username, message } = matchedData(req);
    await db.addMessage({ username, message });
    res.redirect("/");
  },
];

const getViewMessage = async (req, res, next) => {
  const message = await db.getMessage(req.params.id);

  if (!message) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }

  res.render("view", { title: "Message Details", message: message });
};

module.exports = {
  getIndex,
  getNewMessage,
  postNewMessage,
  getViewMessage,
};
