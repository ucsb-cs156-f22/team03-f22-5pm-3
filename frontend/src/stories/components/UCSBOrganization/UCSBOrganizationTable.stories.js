import React from 'react';

import UCSBOrganizationTable from "main/components/UCSBOrganization/UCSBOrganizationTable";
import { ucsbOrganizationFixtures } from 'fixtures/ucsbOrganizationFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/UCSBOrganization/UCSBOrganizationTable',
    component: UCSBOrganizationTable
};

const Template = (args) => {
    return (
        <UCSBOrganizationTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    articles: []
};

export const ThreeUCSBOrganization = Template.bind({});

ThreeUCSBOrganization.args = {
    ucsbOrganization: ucsbOrganizationFixtures.threeUCSBOrganization
};

export const ThreeUCSBOrganizationAsAdmin = Template.bind({});

ThreeUCSBOrganizationAsAdmin.args = {
    ucsbOrganization: ucsbOrganizationFixtures.threeUCSBOrganization,
    currentUser: currentUserFixtures.adminUser
};
