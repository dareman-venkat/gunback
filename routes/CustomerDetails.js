import express from "express";
import swaggerjSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js api project for mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["../index.js"],
};

const swaggerDocument = swaggerjSDoc(options);
import {
  getUsers,
  login,
  activeUsers,
  geterror,
  noactiveUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/CustomerDetails/CustomerDetails.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *      schema:
 *         CustomerDetails:
 *                       type: object
 *                       properties:
 *                           firstName:
 *                                type: string
 *                           lastName:
 *                                type: string
 *                           email:
 *                                type: string
 *                           password:
 *                                type: string
 *                           adharNo:
 *                                type: string
 *                           panNo:
 *                                type: string
 *                           address:
 *                                type: string
 *                           contactNo:
 *                                type: number
 *                           isActive:
 *                               type: string
 *                           isDeleted:
 *                               type: string
 *
 */

/**
 * @swagger
 * components:
 *      schema:
 *         loginemail:
 *                       type: object
 *                       properties:
 *                           email:
 *                                type: string
 *                           password:
 *                                type: string
 */

/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /CustomerDetails/getData:
 *  get:
 *      tags: [MainData]
 *
 *      responses:
 *          default:
 *              description: This is the default response for it
 *
 */
/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /CustomerDetails/active:
 *  get:
 *      tags: [MainData]
 *
 *      responses:
 *          default:
 *              description: This is the default response for it
 *
 */
/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /CustomerDetails/post:
 *  post:
 *      tags: [MainData]
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                    $ref: '#components/schema/CustomerDetails'
 *
 *      responses:
 *          200:
 *              description: Added Sucessfully
 *
 */

/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /CustomerDetails/checkid/{id}:
 *  get:
 *      tags: [MainData]
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Numeric ID required
 *              schema:
 *                type: string
 *      responses:
 *          200:
 *              description: This is the default response for it
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/CustomerDetails'
 *
 */

/**
 * @swagger
 * tags:
 *  name: MainData
 *  description: This is for the main data
 * /CustomerDetails/login:
 *  post:
 *      tags: [MainData]
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                    $ref: '#components0/schema/loginemail'
 *
 *      responses:
 *          200:
 *              description: Added Sucessfully
 *
 */

router.get("/getData", getUsers);

router.get("/404", geterror);

router.get("/active", activeUsers);

router.get("/noactive", noactiveUsers);

router.post("/post", createUser);

router.post("/login", login);

router.get("/checkid/:id", getUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
export default router;
