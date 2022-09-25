import React from "react";
import { getLabels } from "../helper";
import { useAppSelector } from "../redux/app/hooks";
import { useGetLabelsQuery } from "../redux/features/expenseApiSlice";
import { ILabels } from "../types";

const Labels = () => {
  const { Labels } = useAppSelector((state) => state.expense);

  let transactions;

  if (Labels) {
    transactions =
      Labels &&
      getLabels(Labels).map((value: ILabels, i: number) => {
        return <LabelComponent key={i} data={value} />;
      });
  } else {
    transactions = <p>Fetching..</p>;
  }

  return <>{transactions}</>;
};

export default Labels;

interface Props {
  data: ILabels;
}
const LabelComponent: React.FC<Props> = ({ data }) => {
  if (!data) return <></>;
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ backgroundColor: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">
        {(data.percentage && Math.round(data.percentage)) ?? 0}%
      </h3>
    </div>
  );
};
