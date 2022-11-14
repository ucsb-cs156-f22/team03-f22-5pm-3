import OurTable, {ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/menuitemreviews",
        method: "DELETE",
        params: {
            id: cell.row.values.id
        }
    }
}

export default function ReviewsTable({ reviews, currentUser }) {


    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/menuitemreviews/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Id',
            accessor: 'id', // accessor is the "key" in the data
        },

        {
            Header: 'Item Id',
            accessor: 'itemId', // accessor is the "key" in the data
        },
        {
            Header: 'Reviewer Email',
            accessor: 'reviewerEmail',
        },
        {
            Header: 'Stars',
            accessor: 'stars',
        },
        {
            Header: 'Date Reviewed',
            accessor: 'dateReviewed',
        },
        {
            Header: 'Comments',
            accessor: 'comments',
        }
    ];
    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, "ReviewsTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={reviews}
        columns={columnsToDisplay}
        testid={"ReviewsTable"}
    />;
};