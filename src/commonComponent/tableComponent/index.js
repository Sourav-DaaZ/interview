import React from "react";
import { DataGrid } from "@material-ui/data-grid";

function TableComponent(props) {
  return (
    <div style={{ height: 400, maxWidth: 1000 }}>
      <DataGrid
        loading={props.loading}
        onCellClick={(row, column, evt) => {
          console.log(row, column);
        }}
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
      />
    </div>
  );
}

export default TableComponent;
