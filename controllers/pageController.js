const db = require("../db/queries");


const getIndex = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Express Template", messages: messages });
};

const getNewMessage = (req, res) => {
  res.render("form", { title: "Add New Message" });
};

const postNewMessage = (req, res) => {
  const message = req.body;
  messages.push({
    id: crypto.randomUUID(),
    text: message.text,
    user: message.user,
    added: new Date(),
  });
  res.redirect("/");
};

const getViewMessage = (req, res, next) => {
  const message = messages.find(({ id }) => id === req.params.id);

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
