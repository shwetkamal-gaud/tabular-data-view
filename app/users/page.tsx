

import { User, columns } from "./columns"
import { DataTable } from "./data-table"





export default async function UserPage() {

    return (
        <div className="container  p-10">
            <DataTable columns={columns} />
        </div>
    )
}
