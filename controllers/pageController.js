const db = require("../db/queries");


const getIndex = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Express Template", messages: messages });
};

const getNewMessage = (req, res) => {
  res.render("form", { title: "Add New Message" });
};

const postNewMessage = async (req, res) => {
  const message = req.body;
  await db.addMessage(message);
  res.redirect("/");
};

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
