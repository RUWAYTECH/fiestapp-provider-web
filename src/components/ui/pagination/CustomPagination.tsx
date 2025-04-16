import React, { useState } from "react";
import { Box, Grid, Stack, Pagination, SelectChangeEvent, InputLabel, Select, MenuItem } from "@mui/material";
import useStyles from "./Pagination.styles";
import localize from "@/utils/localizer";
import paginationValues  from "@/core/constants/pagination";


type PaginationTypes = {
  meta?: {
    pagination?: {
      pageCount?: number;
    };
  };
  handleChangeValue:any;
  quantityPageSize?:number[];
};

const CustomPagination: React.FC<PaginationTypes> = ({meta, handleChangeValue, quantityPageSize=[10,15,25]}) => {

  const paginationStyle = useStyles();
  const [paginationValue, setPaginationValue] = useState(paginationValues);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value:number) => {
    setPaginationValue({...paginationValue,page: value})
    handleChangeValue({...paginationValue,page: value})
  };

  const handleChangePageSize = (event: SelectChangeEvent) => {
    setPaginationValue({...paginationValue, pageSize: event.target.value as string});
    handleChangeValue({...paginationValue, pageSize: event.target.value as string})
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={0} sm={4}></Grid>
        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              variant="outlined"
              shape="rounded"
              className={paginationStyle.classes.paginationPosition}
              count={meta?.pagination?.pageCount}
              page={paginationValue.page}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={3}>
          <InputLabel
            htmlFor="input-with-icon-adornment"
            className={paginationStyle.classes.inputPosition}
          >
            {localize("common.paginationNumberOfRows")}
          </InputLabel>
        </Grid>
        <Grid item xs={6} sm={1}>
          <Select
            className={paginationStyle.classes.selectPosition}
            id="demo-simple-select"
            value={paginationValue.pageSize}
            onChange={handleChangePageSize}
          >
            {quantityPageSize?.map((option: any) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomPagination;
