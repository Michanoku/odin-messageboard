const messages = [
  {
    id: crypto.randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: crypto.randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const getIndex = (req, res) => {
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
