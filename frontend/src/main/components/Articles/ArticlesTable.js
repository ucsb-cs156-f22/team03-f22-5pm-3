import OurTable from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";

export default function ArticlesTable({ articles, currentUser }) {

    const columns = [
        {
            Header: 'Id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Url',
            accessor: 'url',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Date Added',
            accessor: 'dateAdded',
        }
    ];

    const testid = "ArticlesTable";

    const columnsIfAdmin = [
        ...columns
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={articles}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
