const helpRequestsFixtures = {
    oneHelpRequest: {
        "id": 1,
        "requesterEmail": "cgaucho@ucsb.edu",
        "teamId": "7",
        "tableOrBreakoutRoom": "3",
        "requestTime": "2022-01-02T12:00:00",
        "explanation": "Need help with lab03",
        "solved": false,
    },
    threeHelpRequests: [
        {
            "id": 1,
            "requesterEmail": "cgaucho@ucsb.edu",
            "teamId": "7",
            "tableOrBreakoutRoom": "3",
            "requestTime": "2022-01-02T12:00:00",
            "explanation": "Need help with lab03",
            "solved": false,
        },
        {
            "id": 2,
            "requesterEmail": "bgaucho@ucsb.edu",
            "teamId": "14",
            "tableOrBreakoutRoom": "8",
            "requestTime": "2022-01-02T15:00:00",
            "explanation": "Need help with github repo",
            "solved": true,
        },
        {
            "id": 3,
            "requesterEmail": "agaucho@ucsb.edu",
            "teamId": "22",
            "tableOrBreakoutRoom": "1",
            "requestTime": "2020-05-02T15:00:00",
            "explanation": "how to cs?",
            "solved": true,
        }
    ]
};


export { helpRequestsFixtures };