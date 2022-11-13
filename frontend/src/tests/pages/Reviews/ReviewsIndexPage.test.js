import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import DiningCommonsIndexPage from "main/pages/Reviews/ReviewsIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { reviewsFixtures } from "fixtures/reviewsFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";
import ReviewsIndexPage from "main/pages/Reviews/ReviewsIndexPage";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

// const mockedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => mockedNavigate
// }));

describe("UCSBDatesIndexPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "ReviewsTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreviews/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreviews/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three reviews without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreviews/all").reply(200, reviewsFixtures.threeReviews);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1); } );
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(2);
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent(3);
        expect(getByTestId(`${testId}-cell-row-0-col-stars`)).toHaveTextContent(4);
        expect(getByTestId(`${testId}-cell-row-1-col-stars`)).toHaveTextContent(3);
        expect(getByTestId(`${testId}-cell-row-2-col-stars`)).toHaveTextContent(5);

    });

    test("renders three reviews without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreviews/all").reply(200, reviewsFixtures.threeReviews);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1); } );
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(2);
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent(3);
        expect(getByTestId(`${testId}-cell-row-0-col-stars`)).toHaveTextContent(4);
        expect(getByTestId(`${testId}-cell-row-1-col-stars`)).toHaveTextContent(3);
        expect(getByTestId(`${testId}-cell-row-2-col-stars`)).toHaveTextContent(5);

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreviews/all").timeout();

        const { queryByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

        const expectedHeaders = ['Id',  'Item Id', 'Reviewer Email','Stars','Date Reviewed','Comments'];
    
        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });

        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    test("test what happens when you click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/menuitemreviews/all").reply(200, reviewsFixtures.threeReviews);
        axiosMock.onDelete("/api/menuitemreviews", {params: {id: 1}}).reply(200, "MenuItemReview with id 1 was deleted");


        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ReviewsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

       expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1); 


        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
       
        fireEvent.click(deleteButton);

        await waitFor(() => { expect(mockToast).toBeCalledWith("MenuItemReview with id 1 was deleted") });

    });


});


