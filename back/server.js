const mongoose = require("mongoose");
const app = require("./app");


const DB =
  "mongodb+srv://root:root@cluster0.i1siz.mongodb.net/TeachersDB?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
