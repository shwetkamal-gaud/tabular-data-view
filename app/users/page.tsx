import { Suspense } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function UserPage() {

    return (
        <div className="container  p-10">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} />
            </Suspense>

        </div>
    )
}
