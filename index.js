import express from "express"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import winston from "winston";
import jsonwebtoken from "jsonwebtoken";

import CustomerDetailsRoutes from "./routes/CustomerDetails.js";
import cartRoutes from "./routes/cart.js";
import gunCollectionRoutes from "./routes/gunCollection.js";
import PaymentDetailsRoutes from "./routes/PaymentDetails.js";
import cors from "cors";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Node js api project for mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://192.168.1.108:5000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

import swaggerjSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 5000;
const swaggerSpec = swaggerjSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
mongoose
  .connect("mongodb+srv://sharan:Augusta12@cluster0.k2otw1p.mongodb.net/gunprojectvenkat", {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose*/
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit(1);
  });

app.use("/CustomerDetails", CustomerDetailsRoutes);
app.use("/cart", cartRoutes);
app.use("/gunCollection", gunCollectionRoutes);
app.use("/PaymentDetails", PaymentDetailsRoutes);

app.get("/token/login", async (req, res) => {
  let token = await jsonwebtoken.sign(
    {
      date: new Date(),
    },
    "gunRentalSystem321PrivateKey",
    {
      expiresIn: 60,
    }
  );
  console.log(token);
  res.json({
    message: "Successs",
    token: token,
  });
});

app.get("/check/:token", async (req, res) => {
  console.log(req.params.token);
  let token = req.params.token;
  try {
    let tokenResult = await jsonwebtoken.verify(
      token,
      "gunRentalSystem321PrivateKey"
    );
    console.log(tokenResult);
    if (tokenResult) {
      res.json({
        message: "Success",
        date: new Date(tokenResult.date),
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log("ERRRRoRR", error);
    console.log("_____");
    if (error == "TokenExpiredError: jwt expired") {
      res.json({
        message: "Token Expires",
      });
    } else {
      console.log(error);
      res.status(401).json({
        message: " Invalid Tokens",
      });
    }
  }
});

app.get("/", (req, res) => res.send("Welcome to the gun Rental API!"));
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://192.168.1.108:${PORT}`)
);
