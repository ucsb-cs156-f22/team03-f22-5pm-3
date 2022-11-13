import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { hasRole } from "main/utils/currentUser"

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsbdiningcommonsmenuitem",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function MenuItemTable({ menuItems, currentUser }) {

	// Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsbdiningcommonsmenuitem/all"]
    );
    // Stryker enable all 

	// Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Dining commons',
            accessor: 'diningCommonsCode',
        },
        {
            Header: 'Meal name',
            accessor: 'name',
        },
        {
            Header: 'Serving station',
            accessor: 'station',
        }
    ];
	
	const testid = "MenuItemTable";

	const columnsIfAdmin = [
        ...columns,
    	ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
	

    return <OurTable
        data={menuItems}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
