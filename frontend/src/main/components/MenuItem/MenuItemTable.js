import OurTable from "main/components/OurTable";
import { _hasRole } from "main/utils/currentUser"

export default function MenuItemTable({ menuItems, _currentUser }) {

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

    return <OurTable
        data={menuItems}
        columns={columns}
        testid={testid}
    />;
};
