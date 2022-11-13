import {render } from "@testing-library/react";
import {reviewsFixtures } from "fixtures/reviewsFixtures";
import DiningCommonsTable from "main/components/Reviews/ReviewsTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import ReviewsTable from "main/components/Reviews/ReviewsTable";


describe("ReviewsTable tests", () => {
  const queryClient = new QueryClient();
  const testId = "ReviewsTable";
  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ReviewsTable reviews={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ReviewsTable reviews={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ReviewsTable reviews={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <DiningCommonsTable reviews={reviewsFixtures.threeReviews} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );


    const expectedHeaders = ['Id',  'Item Id','Reviewer Email', 'Stars','Date Reviewed','Comments'];
    const expectedFields = ['id', 'itemId','reviewerEmail', 'stars','dateReviewed','comments',];


    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1);
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(2);
    expect(getByTestId(`${testId}-cell-row-0-col-stars`)).toHaveTextContent(4);
    expect(getByTestId(`${testId}-cell-row-1-col-stars`)).toHaveTextContent(3);
    
    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

});

