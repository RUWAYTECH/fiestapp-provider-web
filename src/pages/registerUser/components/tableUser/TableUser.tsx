import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip, IconButton, Card, Container, Chip } from "@mui/material";
import useStyles from "./TableUser.styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import localize from "@/utils/localizer";

interface ResidentRow {
  id: number;
  hasService: string;
}
const TableUser: React.FC<any> = ({ data, onDelete, loading }) => {
  const styles = useStyles();

  const columns = [
    {
      field: "key",
      headerName: localize("user.id"),
      flex: 0.1,
      minWidth: 100,
    },

    {
      field: "name",
      headerName: localize("user.name"),
      flex: 0.2,
      minWidth: 240,
    },
    {
      field: "role",
      headerName: localize("user.role"),
      flex: 0.1,
      minWidth: 100,
    },
    {
      field: "documentDNI",
      headerName: localize("user.documentDNI"),
      flex: 0.1,
      minWidth: 200,
    },
    {
      field: "phone",
      headerName: localize("user.phone"),
      flex: 0.1,
      minWidth: 100,
    },
    {
        field: "email",
        headerName: localize("user.email"),
        flex: 0.1,
        minWidth: 100,
      },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.1,
      minWidth: 150,
      renderCell: ({ row }: { row: ResidentRow }) => {
        return (
          <>
            <div>
              <Tooltip
                title={localize("resident.tenant")}
                placement="top"
                arrow
              >
                <span>
                  <IconButton color="secondary" onClick={() => {}}>
                    <Chip
                      label="+ Inquilino"
                      color="success"
                      variant="outlined"
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip
                title={
                  row.hasService + " " + localize("resident.hasServicePersonal")
                }
                placement="top"
                arrow
              >
                <span>
                  <IconButton
                    disabled={row.hasService === "No"}
                    onClick={() => {}}
                  >
                    <Chip
                      label="+ Servicio"
                      color={row.hasService === "No" ? "secondary" : "info"}
                      variant="outlined"
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={localize("common.edit")} placement="top" arrow>
                <span>
                  <IconButton
                    color="secondary"
                    aria-label="edit"
                    onClick={() => {}}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={localize("common.delete")} placement="top" arrow>
                <span>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => onDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const rowsData = Array.isArray(data?.data)
    ? data?.data
        ?.map((dataUser: any, index: number) => {
          return {
            ...dataUser,
            id: dataUser?.id,
            name: dataUser?.attributes?.name,
            role: dataUser?.attributes?.condominium?.data?.attributes?.name,
            documentDNI: dataUser?.attributes?.code,
            index: index + 1,
          };
        })
        .sort((a: any, b: any) => b.id - a.id)
    : [];

  return (
    <>
      <Container maxWidth="xl">
        <Card>
          <DataGrid
            rows={rowsData}
            columns={columns}
            className={styles.classes.dataGrid}
            disableRowSelectionOnClick={true}
            hideFooterPagination={true}
            loading={loading}
            localeText={{
              noRowsLabel: localize("common.notFound"),
            }}
          />
        </Card>
      </Container>
    </>
  );
};
export default TableUser;
