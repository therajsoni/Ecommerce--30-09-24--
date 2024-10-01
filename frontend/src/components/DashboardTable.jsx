import TableHOC from "./TableHOC";

const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

export default function DashboardTable({ data }) {
  return (
    <TableHOC
      columns={columns}
      data={data}
      containerClassname="transaction-box"
      heading="Top Transaction"
    />
  );
}
