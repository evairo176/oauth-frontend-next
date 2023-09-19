import DataTable from "react-data-table-component";

type DatatableType = {
  columns: any[];
  data: any[];
  loading: boolean;
  totalRows: number;
  handlePerRowsChange: (newPerPage: number, page: number) => void;
  setPage: (page: number) => void;
  title: string;
};

function Datatable({
  columns,
  data,
  loading,
  totalRows,
  handlePerRowsChange,
  setPage,
  title,
}: DatatableType) {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={setPage}
    />
  );
}

export default Datatable;
