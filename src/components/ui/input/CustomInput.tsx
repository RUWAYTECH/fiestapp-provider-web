import { TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type Props = React.ComponentProps<typeof TextField> & {
  id: string;
  error?: boolean;
  errorText?: string | undefined;
  label?: string | undefined;
  placeHolder?: string | undefined;
  value?: string | undefined;
  control?: Control<any, FieldValues>;
  isLoading?: boolean;
  isReadOnly?: boolean;
};

const CustomInput = React.forwardRef(
  (
    {
      id,
      error,
      errorText,
      label,
      placeHolder,
      isReadOnly = false,
      isLoading = false,
      value,   
      control,
      ...props
    }: Props,
    _ref: any
  ) => (
    <Controller
      control={control}
      name={id}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          id={id}
          label={label}
          variant="outlined"
          placeholder={placeHolder}
          error={error}
          helperText={errorText}
          margin="normal"
          fullWidth
        />
      )}
    />
  )
);

export default CustomInput;
