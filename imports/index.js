const app = require("./app");
const port = process.env.PORT || 4040;
const mongoose = require("mongoose");
const env = require("./env");

mongoose.connect(env.DB_STRING , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
