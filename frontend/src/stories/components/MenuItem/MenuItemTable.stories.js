import React from 'react';

import MenuItemTable from "main/components/MenuItem/MenuItemTable";
import { menuItemFixtures } from 'fixtures/menuItemFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/MenuItem/MenuItemTable',
    component: MenuItemTable
};

const Template = (args) => {
    return (
        <MenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItem: []
};

export const ThreeMenuItems = Template.bind({});

ThreeMenuItems.args = {
    menuItem: menuItemFixtures.threeMenuItems
};

export const ThreeMenuItemsAsAdmin = Template.bind({});

ThreeMenuItemsAsAdmin.args = {
    menuItem: menuItemFixtures.threeMenuItems,
    currentUser: currentUserFixtures.adminUser
};

