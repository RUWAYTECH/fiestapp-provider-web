import { forwardRef, useEffect, useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface SelectMultipleProps {
  id?: string;
  name?: string;
  fullWidth?: boolean;
  size?: any;
  label?: string;
  value?: any;
  onChange?: any;
  loading?: boolean;
  disabled?: boolean;
  options?: any[];
  noneOption?: boolean;
  noneOptionLabel?: string;
  noneOptionValue?: string;
  onSelectItem?: any;
  InputProps?: any;
  error?: boolean;
  helperText?: string;
}
const SelectMultiple = forwardRef<HTMLDivElement, SelectMultipleProps>(
  (
    {
      id,
      loading,
      disabled,
      options,
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
      ...props
    },
    ref
  ) => {

    const isMediumScreen = useMediaQuery("(min-width: 960px)");
    const isMobileLScreen = useMediaQuery("(min-width: 425px)");
    const isMobileMScreen = useMediaQuery("(min-width: 375px)");
    const [personName, setPersonName] = useState<string[]>([]);

    useEffect(() => {
      let selectedValues = [];

      if (Array.isArray(value)) {
        selectedValues = value;
      } else if (typeof value === 'string') {
        if (value.includes(',')) {
          selectedValues = value.split(",");
        } else {
          selectedValues = [value];
        }
      }

      if (JSON.stringify(selectedValues) !== JSON.stringify(personName)) {
        handleChange(selectedValues);
      }

      if ((!value || value.length === 0) && JSON.stringify(personName) !== "[]") {
        handleChange([]);
      }
    }, [value]);

     const handleChange = (data: string | string[]) => {
      if (Array.isArray(data) && data?.length === 1 && Number(data[0]) === 0) {
        return;
      }
      setPersonName(Array.isArray(data) ? data : [data]);
      onChange(data);
      onSelectItem(data);
    };

    return (
      <>
        <FormControl
          sx={{
            m: 0,
            width: isMediumScreen
              ? 340
              : isMobileLScreen
              ? 360
              : isMobileMScreen
              ? 310
              : 255,
          }}
          ref={ref}
        >
          <InputLabel
            style={{ marginTop: personName.length > 0 ? "0px" : "-5px" }}
          >
            {label}
          </InputLabel>
          <Select
            ref={ref}
            labelId={id}
            id={id}
            multiple
            size={size}
            value={personName}
            onChange={(event: SelectChangeEvent<typeof personName>) =>
              handleChange(event.target.value)
            }
            input={<OutlinedInput label={label} />}
            renderValue={(selected) =>
              (selected as string[])
                .map(
                  (selectedValue) =>
                    options?.find((option) => option?.value === selectedValue)
                      ?.label || ""
                )
                .join(", ")
            }
            MenuProps={MenuProps}
            {...props}
          >
            {noneOption && (
              <MenuItem value={noneOptionValue}>
                <Checkbox checked={value?.includes(noneOptionValue)} />
                <ListItemText primary={noneOptionLabel} />
              </MenuItem>
            )}
            {options?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <Checkbox
                  checked={personName?.indexOf(item.value) > -1}
                />
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
          {helperText && (
            <FormHelperText error={error}>{helperText}</FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);
export default SelectMultiple;
