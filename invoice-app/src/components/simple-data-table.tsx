import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Download, Plus } from "lucide-react"
import { Link } from "react-router"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

// Definición genérica para ColumnDef
type ColumnDef<TData, TValue> = {
  key: keyof TData; // Clave del objeto que representa esta columna
  header: string; // Encabezado de la columna
  render?: (value: TValue, row: TData) => React.ReactNode; // Función personalizada de render
  colClass?: string; // className adicional para la celda,
  rowClass?: string; // className adicional para la celda,
  hidden?: boolean; // Indica si la columna debe ser visible
};

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // searchKey: keyof TData; // Campo en el que se basa la búsqueda,
  currentPage?: number;
  total?: number;
  pageSize?: number;
  pages?: number;
  firstPage?: () => void;
  nextPage?: () => void;
  previousPage?: () => void;
  lastPage?: () => void;
}

export const SimpleDataTable = <TData, TValue>({
  columns,
  data,
  currentPage,
  total,
  pages,
  firstPage,
  nextPage,
  previousPage,
  lastPage,
}: Props<TData, TValue>) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Invoices`}
          description="Manage invoices for your clients or projects"
        />
        <div className="flex gap-2">
          <Link to="/invoices/new">
            <Button>
              <Plus className="h-4 w-4" /> New Invoice
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export as a .CSV
          </Button>
        </div>
      </div>

      <Separator />

      <Table>
        <TableHeader>
          <TableRow>
            {columns
              .filter((col) => !col.hidden)
              .map((col) => (
              <TableHead key={String(col.key)} className={col.colClass  }>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="h-16">
                {columns
                  .filter((col) => !col.hidden)
                  .map((col) => (
                  <TableCell key={String(col.key)} className={col.rowClass}>
                    {col.render
                      ? col.render(row[col.key] as TValue, row)
                      : row[col.key] !== undefined && row[col.key] !== null ? String(row[col.key]) : ""
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-96 text-center font-extralight text-xl">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex gap-3 justify-center items-center">
        <Button variant="outline" size="sm" onClick={firstPage} disabled={currentPage === 1}>
          <ChevronFirst className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={previousPage} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-extralight">
          Page {currentPage} to {pages} of {total} results. Page
        </span>
        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === pages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={lastPage} disabled={currentPage === pages}>
          <ChevronLast className="h-4 w-4" />
        </Button>
      </div>

      {/* <DataTable columns={columns} data={data} searchKey="name" /> */}
    </>
  )
}
