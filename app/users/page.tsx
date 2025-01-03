import { Suspense } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Loading from "@/components/Loading"

export default async function UserPage() {

    return (
        <div className="container  p-10">
            <Suspense fallback={<Loading />}>
                <DataTable columns={columns} />
            </Suspense>

        </div>
    )
}
