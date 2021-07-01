import React, { useEffect, useState } from "react";
import TableComponent from "../../commonComponent/tableComponent";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useHistory } from "react-router-dom";
import { mystyle, imgDivStyle } from "./style";

import OutsideAuthApi from "../../services/outsideAuth";

function HomePage() {
  const history = useHistory();
  const [data, setData] = useState([]);

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
              toogle: true,
              maxBid: Math.max.apply(
                Math,
                x.bids.map(function (o) {
                  return o.amount;
                })
              ),
              minBid: Math.min.apply(
                Math,
                x.bids.map(function (o) {
                  return o.amount;
                })
              ),
            })
          );
        }
        setData(dataValue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFormat = (id) => {
    let varData = data;
    varData.map((x) => (x.id === id) ? (x.toogle = !x.toogle) : null);
    setData(varData);
  };

  function compare(a, b, shot) {
    if (shot === "asc") {
      return (a.toogle ? a.maxBid : a.minBid) - (b.toogle ? b.maxBid : b.minBid);
    } else {
      return (b.toogle ? b.maxBid : b.minBid) - (a.toogle ? a.maxBid : a.minBid);
    }
  }

  const onSortModelChange = (params) => {
    let varData = data;
    varData = varData.slice().sort((a, b) => compare(a, b, params.sortModel.length ? params.sortModel[0].sort : "asc"));
    setData(varData);
  };

  const onCellCleck = (val, col) => {
    console.log(col);
    if (!(col.includes("MuiToggleButton-label") || col.includes("MuiButtonBase-root") || col.includes("MuiTouchRipple-root"))) {
      history.push({
        pathname: "/about", //for single rout, i'm doing hardcode
        state: {
          name: val.row.name,
          data: val.row.allBids,
        },
      });
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Customer Name",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <div style={imgDivStyle}>
            {params.row.img ? <img src={params.row.img} alt="BigCo Inc. logo" style={{ height: "40px", width: "40px" }} /> : null}{" "}
            <p style={{ marginLeft: "15px" }}>{params.row.name}</p>
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
      description: "please click for short",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
            <ToggleButtonGroup onChange={() => handleFormat(params.row.id)} aria-label="text formatting">
              <ToggleButton value="bold" aria-label="bold">
                {params.row.toogle ? "max value" : "min value"}
              </ToggleButton>
            </ToggleButtonGroup>
            Rs.
            {params.row.toogle
              ? params.row.maxBid == "-Infinity"
                ? 0
                : params.row.maxBid
              : params.row.minBid === "Infinity"
              ? 0
              : params.row.minBid}
          </div>
        );
      },
    },
  ];

  return (
    <div style={mystyle}>
      <h3>Customer List</h3>
      <TableComponent rows={data} columns={columns} loading={data.length <= 0} onSortModelChange={onSortModelChange} onCellCleck={onCellCleck} />
    </div>
  );
}

export default HomePage;
