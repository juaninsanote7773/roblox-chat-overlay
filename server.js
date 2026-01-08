const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

let chat_queue = {}; //queue handling for multiple jobIDs

app.use(cors());
app.use(express.json());

//get last player to update remote
app.get("/get_queue", (req, res) => {
  res.json(chat_queue);
  chat_queue = {}
});

//get input
app.post("/send_queue", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  if (!chat_queue[req.body.jobID])
  {
    chat_queue[req.body.jobID] = []
  }
  
  chat_queue[req.body.jobID].push({plr : req.body.plr, msg : req.body.msg, time : req.body.time});
  
  res.json({ success: true, message: "Data received!" });
});

app.get("/debug", (req, res) => {
  console.log("debug");
  res.send("debug");
});

app.get("/", (req, res) => {
  res.send("");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
