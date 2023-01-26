import React, { useState, useEffect, useContext } from "react";
import { IUser } from "./IUser";
import Loader from "../Loader";

import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";

import { TableContext } from "../../pages/users";


const UsersTable = ({ users }: { users: IUser[] }) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },

    {
      field: "firstname",
      headerName: "First name",
      width: 130,
    },

    {
      field: "lastname",
      headerName: "Last name",
      width: 130,
    },

    {
      field: "email",
      headerName: "Email",
      width: 200,
    },

    {
      field: "created_at",
      headerName: "Date of registration",
      width: 200,
      valueGetter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },

    {
      field: "last_login",
      headerName: "Date of last visit",
      width: 200,
      valueGetter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => (params.value === 1 ? "Active" : "Block"),
    },
  ];

  const tableContext = useContext(TableContext);

  const rows = users;

  const [selectedRows, setSelectedRows] = useState<GridSelectionModel | null>(
    null
  );

  return (
      <div>
      {users.length ? (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={(itm) => tableContext?.setSelectedRows(itm)}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
    
  );
};

export default UsersTable;

function moment() {
  throw new Error("Function not implemented.");
}
