export type ICategory = {
  type: string;
  color: string;
};

export type ITransaction = {
  _id?: string;
  name: string;
  type: string;
  amount?: number;
  percentage?: number;
  date?: Date;
};

export type ILabels = ICategory & ITransaction;
