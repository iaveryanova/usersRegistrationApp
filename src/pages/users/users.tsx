import "./users.css";
import UsersTable from "../../components/Users/UsersTable";
import { IUser } from "../../components/Users/IUser";
import React, { FC, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ToolBar from "../../components/ToolBar";
import https from "../../https"
import PropTypes from 'prop-types';

import { GridSelectionModel } from "@mui/x-data-grid";

interface TableContextType {
  selectedRows: GridSelectionModel|null;
  setSelectedRows: (selectedRows: GridSelectionModel|null) => void;
}

export const TableContext = React.createContext<TableContextType | null>(null);

export const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<GridSelectionModel|null>(null);

  useEffect(() => {
    const initToken = Cookies.get("token");
    context?.setToken(initToken ? initToken : "");

    if (context?.token) {
      getUsers();
    } else {
      navigate("/");
    }
  }, []);

  const getUsers = async () => {
    try {
      const users = await https.get("/users");
      setUsers(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TableContext.Provider value={ {selectedRows:selectedRows, setSelectedRows:setSelectedRows} }>

      <div className="users_container">
      <div className="toolbar_container">
        <ToolBar/>
      </div>
      <UsersTable users={users} />
    </div>
    </TableContext.Provider>
    
  
  );
};
