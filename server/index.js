const express = require("express");
const cors = require("cors");
const app = express();

const accountList = {
  data: {
    accounts: [
      {
        id: "1",
        name: "Nubank",
        amount: 12000,
        updatedAt: new Date("2023-12-08"),
      },
      {
        id: "2",
        name: "Itau",
        amount: 4000,
        updatedAt: new Date("2023-12-15"),
      },
      {
        id: "3",
        name: "Inter",
        amount: 2000,
        updatedAt: new Date("2023-12-15"),
      },
    ],
    totalAmount: 18000,
  },
  metadata: {
    page: 1,
    items: 3,
    totalPages: 1,
    totalItems: 3,
  },
};

app.use(express.json());
app.use(cors());

app.get("/accounts", (req, res) => {
  console.log("GET - /accounts");
  setTimeout(() => {
    res.send(accountList);
  }, 500);
});

app.get("/accounts/:id", (req, res) => {
  const { id } = req.params;
  console.log(`GET - /accounts/${id}`);

  const account = accountList.data.accounts.find(
    (account) => account.id === id
  );

  if (!account) {
    return res.status(404).send({ message: "account not found" });
  }

  return res.send(account);
});

app.post("/accounts", (req, res) => {
  console.log("POST - /accounts");
  const { name, amount } = req.body;
  accountList.data.accounts.push({
    id: accountList.data.accounts.length + 1,
    name,
    amount,
    updatedAt: new Date(),
  });
  res.send(accountList);
});

app.delete("/accounts/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE - /accounts/${id}`);

  const accountIndex = accountList.data.accounts.findIndex(
    (acc) => acc.id === id
  );

  if (accountIndex) {
    accountList.data.accounts.splice(accountIndex, 1);
  }

  res.send(accountList);
});

app.listen(8080, console.log("Server running..."));
