import OurTable from "main/components/OurTable";

export default function MenuItemTable({ menuItems, _currentUser }) {

    const columns = [
        {
            Header: 'id',
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
