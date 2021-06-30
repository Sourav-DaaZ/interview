import React, { useEffect, useState } from "react";
import TableComponent from "../../commonComponent/tableComponent";

import { mystyle } from "./style";

function DetailsPage(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let dataValue = [];
    props.location.state.data.map((x) => {
      dataValue.push({
        id: x.id,
        title: x.carTitle,
        amount: x.amount,
        date: x.created,
      });
    });
    setData(dataValue);
  }, []);

  const columns = [
    { field: "title", headerName: "Car Title", sortable: false, width: 150 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      sortable: false,
      width: 250,
    },
  ];

  return (
    <div style={mystyle}>
        <h3>{props.location.state.name}</h3>
      <TableComponent rows={data} columns={columns} loading={false} />
    </div>
  );
}

export default DetailsPage;
