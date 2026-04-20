export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type BasicAuthCredentials = {
  username: string;
  password: string;
};

export type SignupResponse = {
  message: string;
  nextStep: string;
  basicAuthCredentials: BasicAuthCredentials;
};

export type Transaction = {
  name: string;
  bank: string;
  time: string;
  amount: number;
};

export type AccountResponse = {
  accountNumber: string;
  accountType: string;
  availableBalance: number;
  currency: string;
  dateAdded: string;
  transactions: Transaction[];
};
