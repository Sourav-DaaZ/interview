import React, { useEffect, useState } from "react";
import TableComponent from "./commonComponent/tableComponent";

function App() {


  const columns = [
    {
      field: "name",
      headerName: "Customer Name",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            {params.row.img ? <img src={params.row.img} alt="BigCo Inc. logo" style={{ height: "40px", width: "40px" }} /> : null} {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", sortable: false, width: 150 },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      sortable: false,
      width: 150,
    },
    {
      field: "premum",
      headerName: "Full name",
      sortable: false,
      width: 150,
    },
    {
      field: "bid",
      headerName: "Max/Min Bid",
      sortable: true,
      width: 250,
    },
  ];

  const rows = [{ id: 1, name: "Snow", age: 35, img: "http://i.imgur.com/BCbxVui.png" }];
  return <TableComponent rows={rows} columns={columns} loading={false} />;
}

export default App;
