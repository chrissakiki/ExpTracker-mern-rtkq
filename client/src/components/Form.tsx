import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddTransactionMutation } from "../redux/features/expenseApiSlice";
import List from "./List";

type FormValues = {
  amount: string;
  name: string;
  type: string;
};
const Form = () => {
  const { register, handleSubmit, resetField } = useForm<FormValues>();

  const [addTransaction] = useAddTransactionMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.name || !data.amount || !data.type) {
      return alert("please provide all necessary fields");
    }
    await addTransaction({ ...data, amount: Number(data.amount) }).unwrap();
    resetField("name");
    resetField("amount");
  };
  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              placeholder="Salary, Rent, etc.."
              className="form-input"
              {...register("name")}
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Investment">Investment</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              placeholder="amount"
              className="form-input"
              {...register("amount")}
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-indigo-500 w-full">
              Make Transaction
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
};

export default Form;
