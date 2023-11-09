import { useContext, useReducer, useState } from 'react'
import { GlobalContext } from '../../global/globalProvider'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { Button } from 'antd'

type Person = {
  firstName: string
  lastName: string
  age: number
  popularity: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'Tom',
    lastName: 'Hanks',
    age: 65,
    popularity: 120,
    status: 'Married',
    progress: 90,
  },
  {
    firstName: 'Meryl',
    lastName: 'Streep',
    age: 72,
    popularity: 80,
    status: 'Married',
    progress: 95,
  },
  {
    firstName: 'Denzel',
    lastName: 'Washington',
    age: 67,
    popularity: 100,
    status: 'Married',
    progress: 80,
  },
  {
    firstName: 'Julia',
    lastName: 'Roberts',
    age: 54,
    popularity: 90,
    status: 'Married',
    progress: 85,
  },
  {
    firstName: 'Brad',
    lastName: 'Pitt',
    age: 58,
    popularity: 110,
    status: 'Single',
    progress: 70,
  },
  {
    firstName: 'Angelina',
    lastName: 'Jolie',
    age: 46,
    popularity: 90,
    status: 'Single',
    progress: 75,
  },
  {
    firstName: 'Will',
    lastName: 'Smith',
    age: 53,
    popularity: 80,
    status: 'Married',
    progress: 88,
  },
  {
    firstName: 'Jennifer',
    lastName: 'Lawrence',
    age: 32,
    popularity: 70,
    status: 'Single',
    progress: 60,
  },
  {
    firstName: 'Leonardo',
    lastName: 'DiCaprio',
    age: 47,
    popularity: 95,
    status: 'Single',
    progress: 78,
  },
  {
    firstName: 'Emma',
    lastName: 'Watson',
    age: 31,
    popularity: 60,
    status: 'Single',
    progress: 70,
  },
  {
    firstName: 'Johnny',
    lastName: 'Depp',
    age: 58,
    popularity: 105,
    status: 'Complicated',
    progress: 75,
  },
  {
    firstName: 'Nicole',
    lastName: 'Kidman',
    age: 54,
    popularity: 85,
    status: 'Married',
    progress: 88,
  },
  {
    firstName: 'Robert',
    lastName: 'Downey Jr.',
    age: 56,
    popularity: 95,
    status: 'Single',
    progress: 82,
  },
  {
    firstName: 'Scarlett',
    lastName: 'Johansson',
    age: 37,
    popularity: 110,
    status: 'Single',
    progress: 79,
  },
  {
    firstName: 'Chris',
    lastName: 'Hemsworth',
    age: 38,
    popularity: 92,
    status: 'Married',
    progress: 90,
  },
  {
    firstName: 'Angel',
    lastName: 'ina',
    age: 29,
    popularity: 55,
    status: 'Single',
    progress: 65,
  },
  {
    firstName: 'Michael',
    lastName: 'Jordan',
    age: 59,
    popularity: 150,
    status: 'Married',
    progress: 95,
  },
  {
    firstName: 'Emma',
    lastName: 'Stone',
    age: 33,
    popularity: 75,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'Ryan',
    lastName: 'Reynolds',
    age: 45,
    popularity: 105,
    status: 'Married',
    progress: 88,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', {
    header: () => `First Name`,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: () => `Last Name`,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: () => `Age`,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('popularity', {
    header: () => `Popularity`,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Progress',
    cell: (info) => info.getValue(),
  }),
]

export const BasicTable = () => {
  const { locale, colors } = useContext(GlobalContext)

  const [data, setData] = useState(() => [...defaultData])

  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <PageTitle>{locale === 'en_US' ? 'TenStack Table (Basic)' : '基本表格 (TenStack)'}</PageTitle>
      <table
        style={{
          borderSpacing: 0,
          borderCollapse: 'collapse',
          width: '90%',
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    borderBottom: '1px solid gray',
                    textAlign: 'left',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 15px' }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <span className="material-symbols-outlined filled">arrow_downward</span>,
                        desc: <span className="material-symbols-outlined filled">arrow_upward</span>,
                      }[header.column.getIsSorted() as string] ?? (
                        <span className="material-symbols-outlined filled">swap_vert</span>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowI) => (
            <tr
              color={`${colors.table.body.row}`}
              key={rowI}
              style={{
                backgroundColor: rowI % 2 === 1 ? colors.table.body.row : 'none',
                color: rowI % 2 === 1 ? colors.table.body.text : 'none',
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: '10px 15px',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '30px' }}>
        <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </Button>
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </Button>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </Button>
        <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          {'>>'}
        </Button>
        <span style={{ marginLeft: '10px' }}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </>
  )
}
