import routes from "./routes/routes";
import express, {
  ErrorRequestHandler,
  Response,
  Request,
  NextFunction,
} from "express";

const app = express();

app.use(express.json());
app.use(routes);
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).send(err);
  }
);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
