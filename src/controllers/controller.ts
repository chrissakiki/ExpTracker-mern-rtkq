import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import Category from "../models/Category";
import Transaction from "../models/Transaction";

const createCategory = async (req: Request, res: Response) => {
  const newCategory = new Category({
    type: "Investment",
    color: "#FCBE44",
  });

  await newCategory.save();

  if (!newCategory) {
    throw new BadRequestError("Error while creating a new category");
  }

  res.status(StatusCodes.CREATED).json(newCategory);
};

const getCategories = async (req: Request, res: Response) => {
  let data = await Category.find();

  if (!data.length) {
    throw new BadRequestError("No Records have been found");
  }

  let filter = data.map((value) =>
    Object.assign({}, { type: value.type, color: value.color })
  );
  res.status(StatusCodes.OK).json(filter);
};

const createTransaction = async (req: Request, res: Response) => {
  let { name, type, amount } = req.body;

  if (!name || !type || !amount) {
    throw new BadRequestError("Please provide a name, type and amount");
  }

  const newTransaction = await Transaction.create({
    name,
    type,
    amount,
    date: new Date(),
  });

  if (!newTransaction) {
    throw new BadRequestError("Error while creating a new transaction");
  }

  res.status(StatusCodes.CREATED).json(newTransaction);
};

const getTransactions = async (req: Request, res: Response) => {
  let data = await Transaction.find();
  res.status(StatusCodes.OK).json(data);
};

const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("ID was not specified");
  }

  await Transaction.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json("Transaction has been deleted!");
};

const getLabels = async (req: Request, res: Response) => {
  Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((value) =>
        Object.assign(
          {},
          {
            _id: value._id,
            name: value.name,
            type: value.type,
            amount: value.amount,
            color: value.categories_info["color"],
          }
        )
      );
      res.status(StatusCodes.OK).json(data);
    })
    .catch((error) => {
      throw new BadRequestError("Lookup collection error");
    });
};

export {
  createCategory,
  getCategories,
  createTransaction,
  getTransactions,
  deleteTransaction,
  getLabels,
};
