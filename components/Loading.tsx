
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    const tableBody = Array(10).fill(0).map((item: number) => {
        return (
            <TableRow>
                <TableCell>
                    <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell className="text-right">
                    <Skeleton className="h-4 w-full" />
                </TableCell>
            </TableRow>
        )
    })
    return (

        <>
            <div className="py-4">

                <Skeleton className="h-8 max-w-md" />

            </div>
            <div className="border rounded-lg w-full">
                <div className="relative w-full overflow-auto">
                    <Table >
                        <TableHeader >
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    <Skeleton className="h-4 w-full" />
                                </TableHead>
                                <TableHead>
                                    <Skeleton className="h-4 w-full" />
                                </TableHead>
                                <TableHead className="text-right">
                                    <Skeleton className="h-4 w-full" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableBody}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </>

    )
}