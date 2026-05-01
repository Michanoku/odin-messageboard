const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const getIndex = (req, res) => {
  res.render("index", { title: "Express Template", messages: messages });
}

const getNewMessage = (req, res) => {
  //TODO
}

module.exports = {
    getIndex,
    getNewMessage,
}