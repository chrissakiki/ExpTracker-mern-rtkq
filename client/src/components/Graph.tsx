import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { chartData, getTotal } from "../helper";
import { useAppSelector } from "../redux/app/hooks";

Chart.register(ArcElement);

const Graph = () => {
  const Lab = useAppSelector((state) => state.expense.Labels);
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          <Doughnut {...chartData(Lab)}></Doughnut>
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              ${getTotal(Lab) ?? 0}
            </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          <Labels />
        </div>
      </div>
    </div>
  );
};

export default Graph;
