import OurTable from "main/components/OurTable";

export default function UCSBOrganizationTable({ ucsborganization, _currentUser }) {

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

    return <OurTable
        data={ucsborganization}
        columns={columns}
        testid={"UCSBOrganizationTable"}
    />;
};