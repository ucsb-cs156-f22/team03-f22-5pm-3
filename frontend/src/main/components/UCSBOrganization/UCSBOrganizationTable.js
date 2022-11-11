import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/UCSBOrganization",
        method: "DELETE",
        params: {
            id: cell.row.values.orgCode
        }
    }
}

export default function UCSBOrganizationTable({ ucsborganization, currentUser }) {

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBOrganization/all"],
    )
    // Stryker enable all

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => {
        deleteMutation.mutate(cell);
    }

    const columns = [
        {
            Header: 'UCSB Organization Code',
            accessor: 'orgCode',
        },
        {
            Header: 'UCSB Organization Short Translation',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'UCSB Organization Translation',
            accessor: 'orgTranslation',
        },
        {
            Header: 'UCSB Organization is Inactive',
            accessor: 'inactive',
        }
    ];

    const testId = "UCSBOrganizationTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, testId)
    ];

    const display = hasRole(currentUser, "ROLE_USER") ? columnsIfAdmin : columns;

    return <OurTable
        data={ucsborganization}
        columns={display}
        testid={testId}
    />;
};