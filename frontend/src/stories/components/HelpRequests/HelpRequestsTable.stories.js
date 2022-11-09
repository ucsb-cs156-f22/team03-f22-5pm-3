import React from 'react';

import HelpRequestsTable from "main/components/HelpRequests/HelpRequestsTable";
import { helpRequestsFixtures } from 'fixtures/helpRequestsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/HelpRequests/HelpRequestsTable',
    component: HelpRequestsTable
};

const Template = (args) => {
    return (
        <HelpRequestsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    helpRequests: []
};

export const ThreeHelpRequests = Template.bind({});

ThreeHelpRequests.args = {
    helpRequests: helpRequestsFixtures.threeHelpRequests
};

export const ThreeHelpRequestsAsAdmin = Template.bind({});

ThreeHelpRequestsAsAdmin.args = {
    helpRequests: helpRequestsFixtures.threeHelpRequests,
    currentUser: currentUserFixtures.adminUser
};
