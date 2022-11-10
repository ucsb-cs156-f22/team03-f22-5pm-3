import OurTable from "main/components/OurTable";

export default function UCSBOrganizationTable({ dates, currentUser }) {

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
        data={dates}
        columns={columnsToDisplay}
        testid={"UCSBOrganizationTable"}
    />;
};