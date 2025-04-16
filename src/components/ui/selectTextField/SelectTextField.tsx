import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import localize from '@/utils/localizer'

interface SelectTextFieldProps {
  id?: string
  name?: string
  fullWidth?: boolean
  size?: any
  label?: string
  value?: any
  onChange?: any
  loading?: boolean
  disabled?: boolean
  options?: any[]
  noneOption?: boolean
  noneOptionLabel?: string
  noneOptionValue?: string
  onSelectItem?: any
  InputProps?: any
  error?: boolean
  helperText?: any
}
const SelectTextField = ({ loading, disabled, options, noneOption, value, noneOptionLabel, noneOptionValue, onSelectItem, InputProps, error, helperText, ...restProps }: SelectTextFieldProps, ref: any) => {
  const iconLoading = loading && {
    startAdornment: (
      <CircularProgress
        color="inherit"
        size={20}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          marginTop: '-10px',
        }}
      />
    ),
  }
  return (
    <TextField
      {...restProps}
      ref={ref}
      select
      variant="outlined"
      disabled={loading || disabled}
      error={error}
      value={value}
      helperText={helperText}
      InputProps={{...InputProps, ...iconLoading}}
      sx={{ textAlign: 'left'}}
    >
      {noneOption && (
        <MenuItem
          key={noneOptionValue}
          value={noneOptionValue}
          onClick={e => {
            onSelectItem(e, noneOptionValue)
          }}
        >
          {noneOptionLabel || localize('none')}
        </MenuItem>
      )}
      {(options || []).map(option => {
        return (
          <MenuItem
            onClick={e => {
              onSelectItem(e, option)
            }}
            key={`${option.label}-${option.value}`}
            value={option?.value}
          >
            {option.label}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default React.forwardRef(SelectTextField)
