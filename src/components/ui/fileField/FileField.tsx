import React, { useRef, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

interface FileFieldProps {
    id: string;
    label: string;
    name?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    onChange?: (file: File | null) => void;
    value?: string | null;
    loading?: boolean;
}

function FileField(props: FileFieldProps, ref: any) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (props.onChange) {
            props.onChange(file);
            setFile(file);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Button
                color={props.error ? 'error' : 'primary'}
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                disabled={props.disabled}
            >
                {props.label}
                <input
                    type="file"
                    name={props.name}
                    hidden
                    onChange={handleInputChange}
                    ref={inputRef}
                    accept="image/*,video/*"
                />
            </Button>
            {props.error && (
                <Typography variant="caption" color="error" sx={{ textAlign: 'left', paddingLeft: 2 }}>
                    {props.helperText}
                </Typography>
            )}
            {props.onChange && props.value && (
                <Typography variant="caption" color="textSecondary">
                    {file?.name}
                </Typography>
            )}
        </div>
    );
}

export default React.forwardRef(FileField);
