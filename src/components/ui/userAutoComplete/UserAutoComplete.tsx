import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLazyGetUserByeRoleQuery } from '@/stateManagement/apiSlices/userApi';

interface UserAutoCompleteProps {
  id: string;
  label: string;
  value: any;
  onChange: (value: any) => void;  
  isDisable:boolean;
  error?: boolean;
  helperText?: string;
  noOptionsText?: string;
  placeholder?: string;
  rolType?:string;
  onInputChange?: (event: React.ChangeEvent<{}>, newInputValue: string) => void;
}

const UserAutoComplete: React.FC<UserAutoCompleteProps> = ({
  id,
  label,
  value,
  onChange,
  error = false,
  helperText,
  noOptionsText,
  isDisable=false,
  placeholder,
  rolType='residente',
  onInputChange,
}) => {
  const [search,{data,isLoading}]=useLazyGetUserByeRoleQuery();
  const formaterData = (data: any) => {
    const newData = data?.data.map((item: any) => {
        return {
            label: item?.attributes?.name,
            value: item?.attributes?.lastName,
            name: item?.attributes?.name,
        }           
    })
    return newData;
}

  return (
    <Autocomplete
      id={id}
      loading={isLoading}
      options={formaterData(data) || []}
      disabled={isDisable}
      filterOptions={(options) => options}
      noOptionsText={noOptionsText}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}
      onInputChange={(value)=>{
       // search({filter:value,rolType});
      }}
      value={value}
      onChange={(event, newValue: any) => {
        if (newValue != null) {
          onChange(newValue.value);
          //search({filter:newValue.value,rolType});
        }
      }}
    />
  );
};

export default UserAutoComplete;