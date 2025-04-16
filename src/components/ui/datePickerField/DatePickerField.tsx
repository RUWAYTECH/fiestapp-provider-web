import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import React from 'react';

interface DatePickerFieldProps {
    id: string;
    name?: string;
    label: string;
    value?: Date | any |null;
    onChange?: (date: Dayjs | null) => void;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    views?: Array<'year' | 'month' | 'day'>;
    minDate?: Date | null;
    maxDate?: Date | null;
}
const DatePickerField: React.ForwardRefRenderFunction<any, DatePickerFieldProps> = (props, ref) => {
    const getFormat = (views: Array<'year' | 'month' | 'day'> | undefined) => {
        if (!views) return "DD/MM/YYYY";
        if (views.includes('day')) return 'DD/MM/YYYY';
        if (views.includes('month')) return 'MMMM-YYYY';
        if (views.includes('year')) return 'YYYY';
        return "DD/MM/YYYY";
    };
    return (
        <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
            <DatePicker
                {...props}
                minDate={props.minDate ? dayjs(props.minDate) : null}
                maxDate={props.maxDate ? dayjs(props.maxDate) : null}
                format={getFormat(props.views)}
                sx={{ width: props.fullWidth ? '100%' : 'auto' }}
                views={props.views ?? ['year', 'month', 'day']}
                onChange={(date) => props.onChange && props.onChange(date)}
                slotProps={{ textField: { error: props.error, helperText: props.helperText } }}
                disabled={props.disabled}
                value={props.value ? dayjs(props.value) : null}
            />
        </LocalizationProvider>
    );
}

export default React.forwardRef(DatePickerField);