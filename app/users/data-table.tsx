"use client"

import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    FilterFn,
    RowData,
    Row,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import { useUsers } from "../hooks/userHook"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]

}


export function DataTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const router = useRouter()
    const [globalFilter, setGlobalFilter] = useState([])
    const searchParams = useSearchParams();

    const [page, setPage] = useState(0)
    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || '1', 10))
    }, [searchParams])

    const { data, isLoading, error } = useUsers(page);
    const handlePageChange = (newPage: number) => {
        router.push(`/users?page=${newPage}`);
    };
    const fuzzyFilter: FilterFn<RowData> = (rows, columnId, filterValue) => {
        const cellValue = rows.getValue(columnId);
        return (
            typeof cellValue === "string" &&
            cellValue.toLowerCase().includes(filterValue.toLowerCase())
        );
    }

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        globalFilterFn: 'auto',
        state: {
            sorting,
            columnFilters,
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter
    })

    return (
        <div>
            {error && <div className="flex  mx-auto">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{`${error}`}</AlertDescription>
                </Alert>
            </div>}
            {
                isLoading && !error ? (
                    <div className="flex flex-col justify-center space-y-2 items-center">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>

                    </div>
                )
                    :
                    <>
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Search ..."
                                value={globalFilter}
                                onChange={(event) =>
                                    table.setGlobalFilter(event.target.value)
                                }
                                className="max-w-sm"
                            />
                        </div>
                        <div className="rounded-md border">

                            <Table>
                                <TableHeader className="">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow className="" key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {

                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        {header.getContext().column.id === "email" &&
                                                            <Input
                                                                placeholder="Search Email..."
                                                                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                                                                onChange={(event) =>
                                                                    table.getColumn("email")?.setFilterValue(event.target.value)
                                                                }
                                                                className="max-w-sm"
                                                            />
                                                        }
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table?.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page <= 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={!data?.length}
                            >
                                Next
                            </Button>
                        </div>
                    </>
            }

        </div >
    )
}
