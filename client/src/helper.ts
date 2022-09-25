import _ from "lodash";
import { ILabels } from "./types";

export const getSum = (transaction: ILabels[], type?: string) => {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount");

      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();

  return sum;
};

export const getLabels = (transaction: ILabels[]) => {
  let amountSum = getSum(transaction, "type");
  let total = _.sum(getSum(transaction));

  //   for some reason typescript think percentage is a boolean[], but pretty sure its
  //   returning an array of object
  const percentage: ILabels[] | any = _(amountSum)
    .map((objs: { type: string; color: string; total: number }) =>
      _.assign(objs, { percentage: (100 * objs.total) / total })
    )
    .value();

  return percentage;
};

export const chartData = (transaction: ILabels[]) => {
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);

  let dataValue = getSum(transaction);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      cutout: 115,
      borderRadius: 30,
      spacing: 5,
    },
  };

  return config;
};

export const getTotal = (transaction: ILabels[]) => {
  return _.sum(getSum(transaction));
};
