/*@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;

private String diningCommonsCode;
private String name;
private String station;*/



const menuItemFixtures = {
    oneMenuItem: {
        "id": 1,
        "diningCommonsCode": "Portola",
        "name": "Cheese burger",
        "station": "Grill"
    },
    threeMenuItems: [
        {
            "id": 1,
			"diningCommonsCode": "Portola",
			"name": "Cheese burger",
			"station": "Grill"
        },
        {
            "id": 2,
			"diningCommonsCode": "De La Guerra",
			"name": "Bean and cheese burrito",
			"station": "Burrito bar"
        },
        {
            "id": 3,
			"diningCommonsCode": "Carrillo",
			"name": "Chicken vegetable stir fry",
			"station": "station2"
        }
    ]
};


export { menuItemFixtures };