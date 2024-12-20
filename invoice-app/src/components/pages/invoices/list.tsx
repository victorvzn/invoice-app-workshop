import { Copy, Edit, Ellipsis, Eye, Printer, Send, Trash2 } from "lucide-react";
import { SimpleDataTable } from "@/components/simple-data-table";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router";
import { formatCurrency, formatDate } from "@/utils/formatters";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { fetchInvoices } from "@/services/invoices";

interface Invoice {
  id: number;
  invoice: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
}

export const InvoicesList = () => {
  const columns = [
    {
      key: "id",
      header: "Invoice",
      colClass: "w-[120px]",
      render: (value, row) => (
        <Link to={`/invoices/${row.id}/view`} className="font-extrabold text-black underline">#{value}</Link>
      )
    },
    {
      key: "client",
      header: "Customer",
      colClass: "w-[300px]",
      rowClass: "font-normal text-base",
      render: (value, row) => (
        <span>{value.name}</span>
      )
    },
    {
      key: "total",
      header: "Amount",
      colClass: "w-[150px] text-right",
      rowClass: "text-right font-medium text-base",
      render : (value, row) => (
        <span className="capitalize">{formatCurrency(value)}</span>
      )
    },
    {
      key: "status",
      header: "Status",
      colClass: "w-[100px] text-center",
      rowClass: "text-center",
      render: (value, row) => (
        <Badge variant={value} className="capitalize">{value}</Badge>
      ),
    },
    {
      key: "date",
      header: "Date",
      colClass: "w-[120px] text-center",
      rowClass: "text-center text-base",
      render: (value, row) => (
        <span className="capitalize">{formatDate(value)}</span>
      )
    },
    { key: "empty", header: '' },
    {
      key: "actions",
      header: "Actions",
      colClass: "w-[100px] text-center",
      rowClass: "w-[100px] text-center",
      render: (value, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={`/invoices/${row.id}/view`} className="flex gap-2 items-center">
                <Eye className="h-4 w-4" /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/invoices/${row.id}/edit`} className="flex gap-2 items-center">
                <Edit className="h-4 w-4" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 /> Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <Send /> Send
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Copy /> Copy
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Printer /> Print
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )},
  ]
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pagesNum, setPagesNum] = useState(0);

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetchInvoices({ page }).then(data => {
      setInvoices(data.results)
      setTotal(data.count);
      setPagesNum(data.results.length);
    });
  }, [page]);

  const firstPage = () => setPage(1);

  const nextPage = () => setPage(page + 1);
  
  const previousPage = () => setPage(page - 1);

  const lastPage = () => setPage(pages);

  const pages = Math.ceil(total / pagesNum)

  return (
    <SimpleDataTable
      columns={columns}
      data={invoices}
      firstPage={firstPage}
      nextPage={nextPage}
      previousPage={previousPage}
      lastPage={lastPage}
      currentPage={page}
      total={total}
      pages={pages}
    />
  )
}
