import React from "react";
import { DataGrid } from "@material-ui/data-grid";

function TableComponent(props) {
  return (
    <DataGrid
      loading={props.loading}
      onCellClick={(row, column, evt) => {
        props.onCellCleck(row);
      }}
      rows={props.rows}
      columns={props.columns}
      pageSize={5}
      sortingOrder={["desc", "asc"]}
      onSortModelChange={props.onSortModelChange}
    />
  );
}

export default TableComponent;
