import React from 'react';

import ReviewsTable from "main/components/Reviews/ReviewsTable";
import { reviewsFixtures } from 'fixtures/reviewsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Reviews/ReviewsTable',
    component: ReviewsTable
};

const Template = (args) => {
    return (
        <ReviewsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    reviews: []
};

export const ThreeReviews = Template.bind({});

ThreeReviews.args = {
    reviews: reviewsFixtures.threeReviews
};

export const ThreeReviewsAsAdmin = Template.bind({});

ThreeReviewsAsAdmin.args = {
    reviews: reviewsFixtures.threeReviews,
    currentUser: currentUserFixtures.adminUser
};

