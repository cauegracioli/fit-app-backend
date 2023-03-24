import routes from "./routes/routes";
import express from "express";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
