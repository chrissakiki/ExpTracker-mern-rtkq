import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import {
  useGetLabelsQuery,
  useDeleteTransactionMutation,
} from "../redux/features/expenseApiSlice";
import { ILabels } from "../types";

const List = () => {
  const {
    data: labels,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLabelsQuery();

  const [deleteTransaction] = useDeleteTransactionMutation();
  const handleDelete = (id: string) => {
    if (id !== "") {
      deleteTransaction(id);
    }
  };

  let transactions;

  if (isLoading) {
    transactions = <div> Fetching .. </div>;
  } else if (isSuccess) {
    transactions = labels.map((value, i) => {
      return (
        <Transaction key={i} category={value} handleDelete={handleDelete} />
      );
    });
  } else if (isError) {
    transactions = <div>error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>

      {transactions}
    </div>
  );
};

export default List;

interface Props {
  category: ILabels;
  handleDelete: (id: string) => void;
}
const Transaction: React.FC<Props> = ({ category, handleDelete }) => {
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button
        className="px-3"
        onClick={() => category._id && handleDelete(category._id)}
      >
        <BsFillTrashFill color={category.color ?? "#e5e5e5"} />{" "}
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
};
