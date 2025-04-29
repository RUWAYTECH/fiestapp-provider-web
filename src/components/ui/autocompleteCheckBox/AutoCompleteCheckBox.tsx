import { forwardRef, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useMediaQuery } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface AutoCompleteProps {
  id?: string;
  name?: string;
  fullWidth?: boolean;
  size?: any;
  label?: string;
  value?: any;
  onChange?: any;
  loading?: boolean;
  disabled?: boolean;
  dataOptions: any[];
  noneOption?: boolean;
  noneOptionLabel?: string;
  noneOptionValue?: string;
  onSelectItem?: any;
  InputProps?: any;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  onAll?: boolean;
}

const AutoCompleteCheckBox = forwardRef<HTMLDivElement, AutoCompleteProps>(
  (
    {
      id,
      loading,
      disabled,
      dataOptions,
      noneOption,
      noneOptionLabel,
      noneOptionValue,
      onSelectItem,
      InputProps,
      error,
      helperText,
      label,
      value,
      onChange,
      size,
      placeholder,
      onAll,
      ...props
    },
    ref
  ) => {
    const [allValue, setAllValue] = useState<any[]>([]);


    useEffect(() => {
			if ((!value || value.length === 0) && JSON.stringify(allValue) !== "[]") {
        setAllValue([]);
      } else {
				setAllValue(value || []);
			}
    }, [value]);

    const noneItem = {
      value: noneOptionValue,
      label: noneOptionLabel,
      all: true,
    };

    return (
      <>
        <FormControl
          ref={ref}
          fullWidth
        >
          <Autocomplete
            {...props}
            multiple
            id={id}
            fullWidth
            size="small"
            value={allValue}
            options={dataOptions}
            loading={loading}
            disableCloseOnSelect
            limitTags={2}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            getOptionLabel={(option) => option.label}
            filterOptions={(opts, params) => {
              const filter = createFilterOptions();
              const filtered = filter(opts, params);
              return [noneItem, ...filtered];
            }}
            onChange={(_event, newValue: any) => {
              if (newValue.find((option: any) => option.all)) {
                const dataSelect =
                  allValue?.length === dataOptions?.length ? [] : dataOptions;
                onSelectItem(dataSelect);
                return setAllValue(dataSelect);
              }
              setAllValue(newValue);
              onSelectItem(newValue);
            }}
            renderOption={(props, option, { selected }) => {
              const key = `${option.value}${Math.random()}`;

              return (
                <li {...props} key={key}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={
                      option.all
                        ? !!(value?.length === dataOptions?.length)
                        : selected
                    }
                  />
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={error}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: allValue.length > 0 ? "#6c6c6c" : "",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: allValue.length > 0 ? "#bcbcbc" : "red",
                    },
                    "&.Mui-error input::placeholder": {
                      color: allValue.length > 0 ? "#bcbcbc" : "red",
                    },
                  },
                }}
              />
            )}
          />
          {helperText && allValue?.length == 0 && (
            <FormHelperText error={error}>{helperText}</FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);
export default AutoCompleteCheckBox;
