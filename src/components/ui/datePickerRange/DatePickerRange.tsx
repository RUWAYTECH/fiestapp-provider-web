import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

interface RangePickerDateProps {
  valueDateStart?: string;
  valueDateEnd?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  size?: string;
  labelDateStart?: string;
  labelDateEnd?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  minDate?: Date | string;
  maxDate?: Date | string;
}

const RangePickerDate: React.FC<RangePickerDateProps> = (props) => {
  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onStartDateChange(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onEndDateChange(event.target.value);
  };

  return (
    <Grid
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        id={props.valueDateStart}
        name={props.valueDateStart}
        style={{width: '300px',}}
        type="date"
        label={props.labelDateStart}
        value={props.startDate}
        onChange={handleStartDateChange}
        size={props.size as any}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: props.maxDate,
        }}
      />
      <span style={{ margin: 4 }}>-</span>
      <TextField
        style={{width: '300px',}}
        id={props.valueDateEnd}
        name={props.valueDateEnd}
        label={props.labelDateEnd}
        type="date"
        value={props.endDate}
        size={props.size as any}
        onChange={handleEndDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: props.minDate,
        }}
      />
    </Grid>
  );
};

export default RangePickerDate;