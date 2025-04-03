import React from 'react'
import { useTable } from "react-table"
import './table.css'
import { Event } from '../events/events.type'




interface BasicTableProps {
  data: Event[];
  column: any;
}
const BasicTable = (props: BasicTableProps) => {
  const { data, column } = props
  const tableInstance = useTable({
    columns: column,
    data: data,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance
  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))
            }
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default BasicTable