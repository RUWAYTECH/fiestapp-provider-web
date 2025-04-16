import React, { useState, useEffect } from "react";
import { Grid, TextField, Container } from "@mui/material";
import Button from "@mui/material/Button";
import localize from "@/utils/localizer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GenericModal from "@/components/ui/genericModal/GenericModal";
import CreateRegisterUser from "../../createRegisterUser/CreateRegisterUser";
import DatePickerRange from "@/components/ui/datePickerRange/DatePickerRange";
import { formatDateYYYYMMDD } from "@/utils/format/formatDates";
import SearchIcon from "@mui/icons-material/Search";

const SearchUser: React.FC<any> = ({ onSearch }) => {
  const handleInputChangeTenant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    onSearch(newSearchTerm);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };

  // menejo de fechas
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const finDate = currentDate.toISOString().split("T")[0];
    const iniDate = formatDateYYYYMMDD(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    setStartDate(iniDate);
    setEndDate(finDate);
  }, []);

  const handleStartDateChange = (event: any) => {
    setStartDate(event);
  };
  const handleEndDateChange = (event: any) => {
    setEndDate(event);
  };
  //hasta aqui

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid style={{ marginTop: "50px", marginBottom: "40px" }}>
          <form noValidate onSubmit={() => {}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3} md={3}>
                <DatePickerRange
                  startDate={startDate}
                  endDate={endDate}                  
                  labelDateStart="Fecha inicio"
                  labelDateEnd="Fecha fin"
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  placeholder={"Nombre"}
                  onChange={handleInputChangeTenant}                  
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"                  
                  onClick={handleOpen}
                  startIcon={<SearchIcon />}
                >
                  {localize("common.search")}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}  justifyContent="flex-end">             
                  <Button                    
                    variant="contained"
                    color="primary"               
                    onClick={handleOpen}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    {localize("common.new")}
                  </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
      <GenericModal
        open={openModal}
        children={
          <CreateRegisterUser
            isEditing={false}
            handleClose={handleClose}
            isLoading={false}
          />
        }
      />
    </>
  );
};
export default SearchUser;
