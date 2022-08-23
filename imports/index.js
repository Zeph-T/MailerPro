const app = require("./app");
const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
