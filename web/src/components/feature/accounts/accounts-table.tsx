type AccountType = {
  id: string;
  name: string;
  amount: number;
  updatedAt: Date;
};

export const AccountsTable = () => {
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
    <table className="table-auto bg-neutral-900 text-neutral-100 rounded-2xl p-10">
      <thead className="p-10">
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Last Update</th>
          <th className="text-left">Amount</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="">
        {accounts.map((acc) => (
          <AccountRow {...acc} />
        ))}
      </tbody>
    </table>
  );
};

const AccountRow = (account: AccountType) => {
  return (
    <tr key={account.id} className="">
      <td>{account.name}</td>
      <td>{account.updatedAt.toDateString()}</td>
      <td>{account.amount}</td>
      <td className="flex gap-1">
        <button>Edit</button>
        <button>Remove</button>
      </td>
    </tr>
  );
};
