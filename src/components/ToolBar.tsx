import React, {useState, useContext} from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Stack from "@mui/material/Stack";

import {GridSelectionModel } from "@mui/x-data-grid";
import { TableContext } from '../pages/users';
import https from "../https";
import Cookies from "js-cookie";
import {UserContext} from "../App";
import { useNavigate } from "react-router-dom";



const ToolBar = () => {

  const tableContext = useContext(TableContext);
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const blockAction = async () => {

    try{
      const res = await https.post<GridSelectionModel>('/block-user', tableContext?.selectedRows, {withCredentials: true});
    }
    catch (err){
      console.log(err);
    }

    const initToken = Cookies.get('token');
    context?.setToken(initToken ? initToken : '');

      navigate('/'); 
  };

  const activateAction = async () => {

    try{
      const res = await https.post<GridSelectionModel>('/activate-user', tableContext?.selectedRows, {withCredentials: true});
    }
    catch (err){
      console.log(err);
    }

    const initToken = Cookies.get('token');
    context?.setToken(initToken ? initToken : '');

    navigate('/'); 
  };

  const deleteAction = async () => {

    try{
      const res = await https.post<GridSelectionModel>('/delete-user', tableContext?.selectedRows, {withCredentials: true});
    }
    catch (err){
      console.log(err);
    }

    const initToken = Cookies.get('token');
    context?.setToken(initToken ? initToken : '');

    navigate('/'); 
  };


  return (
    <Stack direction="row" spacing={2}>
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={deleteAction}
      disabled={!tableContext?.selectedRows || tableContext?.selectedRows.length == 0}
    >
      Delete
    </Button>



    <Button 
    variant="contained" 
    startIcon={<LockPersonIcon />}
    onClick={blockAction}
    disabled={!tableContext?.selectedRows || tableContext?.selectedRows.length == 0}
    >
      Block
    </Button>
    


    <Button 
    variant="outlined" 
    startIcon={<LockOpenIcon />}
    onClick={activateAction}
    disabled={!tableContext?.selectedRows || tableContext?.selectedRows.length == 0}>
      Unblock
    </Button>
  </Stack>
  );
};

export default ToolBar;
