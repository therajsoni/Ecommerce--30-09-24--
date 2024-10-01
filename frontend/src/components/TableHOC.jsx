import { useTable, useSortBy } from "react-table";
import { AiOutlineSortAscending,AiOutlineSortDescending } from "react-icons/ai";
import { usePagination } from "react-table/dist/react-table.development";



const TableHOC = ({ columns, data, containerClassname, heading , showPagination }) => {
  const options = {
    columns,
    data,
    initialState : {
        pageSize : 1,
    }
  };



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,    
    state:{pageIndex}
  } = useTable(options, useSortBy,usePagination);

  return (
    <div className={containerClassname}>
      <h2 className="heading">{heading}</h2>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {' '}
                  {
                    column.isSorted && column.isSortedDesc ? <AiOutlineSortDescending style={{fontSize : "25px" , fontWeight : "15px"}}></AiOutlineSortDescending>  : <AiOutlineSortAscending style={{fontSize : "25px" , fontWeight : "15px"}}/>
                  }
                  {/* Add sorting indicators */}
                   {/* <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽" // Descending
                        : " 🔼" // Ascending
                      : ""}
                  </span> 
                   */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        !showPagination && (
            <div className="table-pagination">
            <button onClick={previousPage} disabled={!canPreviousPage} >Prev</button>
            <span>{`${pageIndex+1} of ${pageCount}`}</span>
            <button  onClick={nextPage} disabled={!canNextPage} >Next</button>
            </div>
        )
      }
    </div>
  )
}
export default TableHOC;
