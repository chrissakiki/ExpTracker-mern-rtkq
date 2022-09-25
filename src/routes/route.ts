import express from "express";
import {
  createCategory,
  getCategories,
  createTransaction,
  getTransactions,
  deleteTransaction,
  getLabels,
} from "../controllers/controller";

const router = express.Router();

router.route("/categories").get(getCategories).post(createCategory);

router.route("/transaction").get(getTransactions).post(createTransaction);

router.route("/transaction/:id").delete(deleteTransaction);

router.route("/labels").get(getLabels);

export default router;
