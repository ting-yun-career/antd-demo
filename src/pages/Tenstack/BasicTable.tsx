import { useContext, useReducer, useState } from 'react'
import { GlobalContext } from '../../global/globalProvider'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import {
  createColumnHelper,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'Tom',
    lastName: 'Hanks',
    age: 65,
    visits: 120,
    status: 'Married',
    progress: 90,
  },
  {
    firstName: 'Meryl',
    lastName: 'Streep',
    age: 72,
    visits: 80,
    status: 'Married',
    progress: 95,
  },
  {
    firstName: 'Denzel',
    lastName: 'Washington',
    age: 67,
    visits: 100,
    status: 'Married',
    progress: 80,
  },
  {
    firstName: 'Julia',
    lastName: 'Roberts',
    age: 54,
    visits: 90,
    status: 'Married',
    progress: 85,
  },
  {
    firstName: 'Brad',
    lastName: 'Pitt',
    age: 58,
    visits: 110,
    status: 'Single',
    progress: 70,
  },
  {
    firstName: 'Angelina',
    lastName: 'Jolie',
    age: 46,
    visits: 90,
    status: 'Single',
    progress: 75,
  },
  {
    firstName: 'Will',
    lastName: 'Smith',
    age: 53,
    visits: 80,
    status: 'Married',
    progress: 88,
  },
  {
    firstName: 'Jennifer',
    lastName: 'Lawrence',
    age: 32,
    visits: 70,
    status: 'Single',
    progress: 60,
  },
  {
    firstName: 'Leonardo',
    lastName: 'DiCaprio',
    age: 47,
    visits: 95,
    status: 'Single',
    progress: 78,
  },
  {
    firstName: 'Emma',
    lastName: 'Watson',
    age: 31,
    visits: 60,
    status: 'Single',
    progress: 70,
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
  columnHelper.accessor('visits', {
    header: () => `Visits`,
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
  const [sorting, setSorting] = useState<SortingState>([])

  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                        asc: <span className="material-symbols-outlined filled">arrow_upward</span>,
                        desc: <span className="material-symbols-outlined filled">arrow_downward</span>,
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
    </>
  )
}
