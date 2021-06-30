import React, { useEffect, useState } from "react";
import TableComponent from "./commonComponent/tableComponent";
import OutsideAuthApi from "./services/outsideAuth";

function App() {
  const [data, setData] = useState([]);
  const [toogle, setToogle] = useState(0);

  useEffect(() => {
    OutsideAuthApi()
      .fetchData()
      .then((res) => {
        let dataValue = [];
        if (res) {
          res.map((x, index) =>
            dataValue.push({
              id: index,
              name: x.firstname + "" + x.lastname,
              email: x.email,
              img: x.avatarUrl,
              premum: x.hasPremium,
              phone: x.phone,
              allBids: x.bids,
              maxBid: Math.max.apply(Math, x.bids.map(function(o) { return o.amount; })),
              minBid: Math.min.apply(Math, x.bids.map(function(o) { return o.amount; }))
            })
          );
        }
        console.log(dataValue)
        setData(dataValue);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  // componentDidUpdate() {

  // }

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
      headerName: "Premum",
      sortable: false,
      width: 150,
    },
    {
      field: "bid",
      headerName: "Max/Min Bid",
      sortable: true,
      description: 'please cleack for show max and min bid',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            {toogle?params.row.maxBid:params.row.minBid}
          </div>
        );
      },
    },
  ];

  return <TableComponent rows={data} columns={columns} loading={false} />;
}

export default App;
