import React, {useContext} from "react";
import "./auth-form.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import https from '../../../https';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState
} from "react-hook-form";
import { loginValidation, passwordValidation } from "./validation";
import Cookies from "js-cookie";
import {UserContext} from "../../../App";

interface ISignInForm {
  login: string;
  password: string;
}

interface AuthFormProps{
  toggleForm: () => any;
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { handleSubmit, control, setValue } = useForm<ISignInForm>({
    mode: "onChange"
  });
  const context = useContext(UserContext);
  const { errors, isValid } = useFormState({
    control, 
  });
  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    try {
      const res = await https.post<SomeTestData>('/login', data, {withCredentials: true});
      console.log(res);
    }
    catch (err: any){
      console.log(err);
      if(err.response.status == 404) {
        alert('Пароль или логин введены неверно')
      }
    }
      
      const initToken = Cookies.get('token');
      context?.setToken(initToken ? initToken : '');
  };

  type SomeTestData = {
      data: string
    }

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
      Authorization
      </Typography>

      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="auth-form_subtitle"
      >
        To get access
      </Typography>
      <form className="auth-form_form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Login"
              size="small"
              margin="normal"
              className="auth-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Password"
              type="password"
              size="small"
              margin="normal"
              className="auth-form_input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          disabled={!isValid}
          sx={{
            marginTop: 2,
          }}
        >
          Login
        </Button>

      </form>

      <div className="auth-form_registration">
        <Typography
          variant="subtitle1"
          component="div"
          gutterBottom={true}
          className="auth-form_subtitle2"
        >
          Do not have an account?
        </Typography>

        <Button 
        variant="text"
        onClick={function(){
          props.toggleForm();
        }
        }
        >
          Registration
        </Button>
      </div>
    </div>
  );
};
