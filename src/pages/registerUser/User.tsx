import { Card, Grid } from "@mui/material";
import { useState } from "react";
import paginationValues from "@/core/constants/pagination";
import CustomPagination from "@/components/ui/pagination/CustomPagination";
import TableUser from "./components/tableUser/TableUser";
import SearchUser from "./components/searchUser/SearchUser";
const User: React.FC = () => {
  //const [condominiumDelete] = useDeleteCondominiumMutation();
  const [filterValue, setFilterValue] = useState({ ...paginationValues });
  const [pageOld, setPageOld] = useState(paginationValues.page);
  //   const { data: dataCondominium = { data: [], meta: null }, isLoading, refetch } = useAllSearchCondominiumQuery({
  //     params: filterValue.params,
  //     page: filterValue.page,
  //     pageSize: filterValue.pageSize
  //   });
  const onSearchFilter = (params: any) => {
    setFilterValue({
      ...filterValue,
      params,
      page: params?.length === 0 ? pageOld : paginationValues.page,
    });
  };

  const handleUpdatePagination = (params: {
    params: string;
    page: number;
    pageSize: string;
  }) => {
    setPageOld(params.page);
    setFilterValue(params);
  };

  return (
    <>
        <Card>
          <Grid xs={12} item>
            <SearchUser onSearch={onSearchFilter} />
          </Grid>
          <Grid xs={12} item>
            <TableUser data={[]} onDelete={null} loading={false} />
            <br />
            <CustomPagination
              meta={/*dataDepartment?.meta*/ undefined}
              handleChangeValue={handleUpdatePagination}
            />
            <br />
          </Grid>
        </Card>
    </>
  );
};

export default User;
