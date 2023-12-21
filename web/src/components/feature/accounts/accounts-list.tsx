type AccountType = {
  id: string;
  name: string;
  amount: number;
  updatedAt: Date;
};

export const AccountsList = () => {
  const accounts: AccountType[] = [
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
  ];

  return (
    <div className="flex flex-col bg-neutral-900 text-neutral-100">
      {accounts.map((acc) => (
        <AccountRow {...acc} />
      ))}
    </div>
  );
};

const AccountRow = (account: AccountType) => {
  return (
    <div key={account.id} className="flex justify-between items-center gap-4">
      <div className="flex flex-col">
        <span className="text-lg">{account.name}</span>
        <span className="text-neutral-300 text-sm">
          {account.updatedAt.toDateString()}
        </span>
      </div>

      <span>R$ {account.amount}</span>
      <span className="flex gap-1">
        <button>Edit</button>
        <button>Remove</button>
      </span>
    </div>
  );
};
