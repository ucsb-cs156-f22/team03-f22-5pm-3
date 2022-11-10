import OurTable from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";

export default function HelpRequestsTable({ helpRequests, currentUser }) {

    const columns = [
        {
            Header: 'Id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Team Id',
            accessor: 'teamId',
        },
        {
            Header: 'Table or Breakout Room',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'Request Time',
            accessor: 'requestTime',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Solved?',
            id: 'solved',
            accessor: (row, _rowIndex) => String(row.solved)
        }
    ];

    // const columnsIfAdmin = [
    //     ...columns,
    //     // ButtonColumn("Edit", "primary", editCallback, "HelpRequestsTable"),
    //     // ButtonColumn("Delete", "danger", deleteCallback, "HelpRequestsTable")
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={"HelpRequestsTable"}
    />;
};