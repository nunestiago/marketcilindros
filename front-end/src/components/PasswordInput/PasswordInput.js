import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';

import useStyles from './styles';

const PasswordField = (props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      error={props.error}
    >
      <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
      <Input
        id={props.label}
        type={showPassword ? 'text' : 'password'}
        name={props.name}
        label={props.label}
        onChange={props.onChange}
        {...props.register()}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordField;
