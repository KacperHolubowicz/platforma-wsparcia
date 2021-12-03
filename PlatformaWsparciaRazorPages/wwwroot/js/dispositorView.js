//mock
let listOfPeopleInNeed = [
    {
        'personInNeedID': 1,
        'firstName': 'Janusz',
        'lastName': 'Januszewski',
        'contactDetails': {
            'phoneNumber': '2134234',
            'email': 'adwa@dwa',
        },
        'personalDetails': {
            'town': 'Wrocław',
            'address': 'Szkolna',
            'postcode': '00-234'
        },
        'products': [
            {
                'productType': 'food',
                'productName': 'boorgir'
            },
            {
                'productType': 'other',
                'productName': 'toothpaste'
            }
        ],
        'lifeSituation': {
            'description': 'ribfuabduwavbfueawyvfyweavfywaevf',
            'priority': 3
        },
        'lifeSituationClassification': {
            'age': 44,
            'townPopulation': 123,
            'householdSize': 40,
            'financialSituation': 3,
            'healthSituation': 3,
            'standardOfLiving': 3,
            'familySituation': 3,
            'chronicIlnesses': false,
            'dependence': true
        }
    },
    {
        'personInNeedID': 5,
        'firstName': 'Zenon',
        'lastName': 'Zenoniuk',
        'contactDetails': {
            'phoneNumber': '0123798',
            'email': 'zenus@ayaya',
        },
        'personalDetails': {
            'town': 'Warsaw',
            'address': 'Emilii Plater 9999',
            'postcode': '00-204'
        },
        'products': [
            {
                'productType': 'food',
                'productName': 'pizzah'
            },
            {
                'productType': 'food',
                'productName': 'tea'
            }
        ],
        'lifeSituation': {
            'description': 'ribfuabiiiiiiiiiiiiiiiiiiiwaevf',
            'priority': 1
        },
        'lifeSituationClassification': {
            'age': 29,
            'townPopulation': 2000000,
            'householdSize': 40,
            'financialSituation': 4,
            'healthSituation': 4,
            'standardOfLiving': 3,
            'familySituation': 2,
            'chronicIlnesses': false,
            'dependence': false
        }
    },
    {
        'personInNeedID': 11,
        'firstName': 'Mirek',
        'lastName': 'Mirkowski',
        'contactDetails': {
            'phoneNumber': '78634765',
            'email': 'miro@ehehe.z',
        },
        'personalDetails': {
            'town': 'Berlin',
            'address': 'Einstrasse 42',
            'postcode': '07-001'
        },
        'products': [
            {
                'productType': 'other',
                'productName': 'tissues'
            }
        ],
        'lifeSituation': {
            'description': 'ribfuabduwavbfueawyvfyweavfywaevf',
            'priority': 3
        },
        'lifeSituationClassification': {
            'age': 48,
            'townPopulation': 9876543,
            'householdSize': 50,
            'financialSituation': 4,
            'healthSituation': 2,
            'standardOfLiving': 4,
            'familySituation': 5,
            'chronicIlnesses': true,
            'dependence': false
        }
    }
];

//mock
let listOfHelpers = [
    {
        'donorID': 15,
        'firstName': 'Adam',
        'lastName': 'Pomagier',
        'contactDetails': {
            'phoneNumber': '241234234',
            'email': 'xd@quantum.q'
        },
        'personalDetails': {
            'town': 'Vladivoshtock',
            'address': 'Vladimirova 67',
            'postcode': '30-921'
        },
        'products': [
            {
                'productType': 'food',
                'productName': 'meat'
            }
        ]
    },
    {
        'donorID': 23,
        'firstName': 'Joanna',
        'lastName': 'Asiowska',
        'contactDetails': {
            'phoneNumber': '44444555',
            'email': 'coo@haha.com'
        },
        'personalDetails': {
            'town': 'Talin',
            'address': 'street 234',
            'postcode': '11-279'
        },
        'products': [
            {
                'productType': 'medicine',
                'productName': 'ABC'
            },
            {
                'productType': 'food',
                'productName': 'spaghetti code'
            }
        ]
    },
    {
        'donorID': 44,
        'firstName': 'Adam',
        'lastName': 'Mickiewicz',
        'contactDetails': {
            'phoneNumber': '4014',
            'email': 'konrad@dziady.lt'
        },
        'personalDetails': {
            'town': 'Wilno',
            'address': 'Soplicowska 44',
            'postcode': '44-404'
        },
        'products': [
            {
                'productType': 'books',
                'productName': 'Dziady cz. 3'
            },
            {
                'productType': 'books',
                'productName': 'Pan Tadeusz'
            }
        ]
    }
];

let chosenPersonInNeed, chosenHelper;

let createTableCell = (className, innerHTML) => {
    let tableCell = document.createElement('td');
    tableCell.className = className;
    tableCell.innerHTML = innerHTML;
    return tableCell;
}

let insertListItem = (elementID, tag, content) => {
    document.getElementById(elementID).innerHTML = tag + ': ' + content;
};

let addPersonInNeedToMatch = (personInNeed) => () => {
    chosenPersonInNeed = personInNeed;

    document.getElementsByClassName('matcher-person-in-need')[1].innerHTML = personInNeed.firstName + ' '
        + personInNeed.lastName + ' (ID: ' + personInNeed.personInNeedID
        + '), priority: ' + personInNeed.lifeSituation.priority;
};

//arrow func that returns arrow func
let showPersonInNeed = (personInNeed) => () => {
    let peopleInNeedModalWindow = document.getElementsByClassName('modal-window')[0];
    peopleInNeedModalWindow.style.display = 'block';

    insertListItem('in-need-id', 'ID', personInNeed.personInNeedID);
    insertListItem('in-need-first-name', 'First name', personInNeed.firstName);
    insertListItem('in-need-last-name', 'Last name', personInNeed.lastName);
    insertListItem('in-need-address', 'Address', personInNeed.personalDetails.address);
    insertListItem('in-need-town', 'Town', personInNeed.personalDetails.town);
    insertListItem('in-need-zip-code', 'Zip code', personInNeed.personalDetails.postcode);
    insertListItem('in-need-phone-number', 'Phone number', personInNeed.contactDetails.phoneNumber);
    insertListItem('in-need-email', 'E-mail', personInNeed.contactDetails.email);
    insertListItem('in-need-age', 'Age', personInNeed.lifeSituationClassification.age);

    let lsc = personInNeed.lifeSituationClassification;
    insertListItem('in-need-town-population', 'Town population (0-4)', lsc.townPopulation);
    insertListItem('in-need-household-size', 'Size of household', lsc.householdSize);
    insertListItem('in-need-financial-situation', 'Financial situation', lsc.financialSituation);
    insertListItem('in-need-health-situation', 'Health situation (0-4)', lsc.healthSituation);
    insertListItem('in-need-standard-of-living', 'Standard of living (0-4)', lsc.standardOfLiving);
    insertListItem('in-need-family-situation', 'Family situation (0-4)', lsc.familySituation);
    insertListItem('in-need-chronic-illnesses', 'Chronic illnesses', lsc.chronicIlnesses);
    insertListItem('in-need-dependence', 'Dependence', lsc.dependence);
    insertListItem('in-need-priority', 'Suggested priority', personInNeed.lifeSituation.priority);
    insertListItem('in-need-description', 'Description', personInNeed.lifeSituation.description);

    let inNeedProductList = document.getElementById('in-need-product-list');
    inNeedProductList.innerHTML = '';

    for (let i = 0; i < personInNeed.products.length; i++) {
        let item = document.createElement('li');
        item.innerHTML = personInNeed.products[i].productName + ' (' + personInNeed.products[i].productType + ')';
        inNeedProductList.appendChild(item);
    }

    document.getElementById('add-person-in-need-from-modal').onclick = addPersonInNeedToMatch(personInNeed);
};

let loadPeopleInNeed = (peopleInNeed) => {
    let observableList = document.getElementById('people-in-need');

    for (let i = 0; i < peopleInNeed.length; i++) {
        let personInNeed = peopleInNeed[i];

        let row = document.createElement('tr');
        row.className = 'data-row';

        let idCell = createTableCell('id-cell', personInNeed.personInNeedID);

        let locationCell = createTableCell(
            'location-cell',
            personInNeed.personalDetails.postcode + ' ' + personInNeed.personalDetails.town
        );

        let priorityCell = createTableCell('priority-cell', personInNeed.lifeSituation.priority);
        let buttonsCell = createTableCell('button-cell', '');

        let addButton = document.createElement('button');
        addButton.classList = 'app-button';
        addButton.innerHTML = 'Add';
        addButton.onclick = addPersonInNeedToMatch(personInNeed);

        let showButton = document.createElement('button');
        showButton.classList = 'app-button';
        showButton.innerHTML = 'Show';
        showButton.onclick = showPersonInNeed(personInNeed);

        buttonsCell.appendChild(addButton);
        buttonsCell.appendChild(showButton);

        row.appendChild(idCell);
        row.appendChild(locationCell);
        row.appendChild(priorityCell);
        row.appendChild(buttonsCell);

        observableList.appendChild(row);
    }
};

let addHelperToMatch = (helper) => () => {
    chosenHelper = helper;
    document.getElementsByClassName('matcher-helper')[1]
        .innerHTML = helper.firstName + ' ' + helper.lastName + ' (ID: ' + helper.donorID + ')';
};

//arrow func that returns arrow func
let showHelper = (helper) => () => {
    document.getElementsByClassName('right-modal-window')[0].style.display = 'block';

    insertListItem('helper-id', 'ID', helper.donorID);
    insertListItem('helper-first-name', 'First name', helper.firstName);
    insertListItem('helper-last-name', 'Last name', helper.lastName);
    insertListItem('helper-phone-number', 'Phone number', helper.contactDetails.phoneNumber);
    insertListItem('helper-email', 'E-mail', helper.contactDetails.email);
    insertListItem('helper-town', 'Town', helper.personalDetails.town);
    insertListItem('helper-zip-code', 'Zip code', helper.personalDetails.postcode);

    let helperProductList = document.getElementById('helper-product-list');
    helperProductList.innerHTML = '';

    for (let i = 0; i < helper.products.length; i++) {
        let item = document.createElement('li');
        item.innerHTML = helper.products[i].productName + ' (' + helper.products[i].productType + ')';
        helperProductList.appendChild(item);
    }

    document.getElementById('add-helper-from-modal').onclick = addHelperToMatch(helper);
};

let isIn = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return true;
        }
    }

    return false;
};

let loadHelpers = (helpers) => {
    let helpersTable = document.getElementById('helpers');

    for (let i = 0; i < helpers.length; i++) {
        let helper = helpers[i];

        let row = document.createElement('tr');
        row.className = 'data-row';

        let idCell = createTableCell('helper-id-cell', helper.donorID);

        let locationCell = createTableCell(
            'helper-location-cell',
            helper.personalDetails.postcode + ' ' + helper.personalDetails.town
        );

        let oldProductTypes = [];
        let offeredProductTypes = '';

        for (let i = 0; i < helper.products.length; i++) {
            let prodType = helper.products[i].productType;

            if (!isIn(oldProductTypes, prodType)) {
                if (i !== 0) {
                    offeredProductTypes += ', ';
                }

                offeredProductTypes += prodType;
                oldProductTypes.push(prodType);
            }
        }

        let productsCell = createTableCell('helper-products-cell', offeredProductTypes);
        let actionCell = createTableCell('helper-button-cell', '');

        let addButton = document.createElement('button');
        addButton.classList = 'app-button';
        addButton.innerHTML = 'Add';
        addButton.onclick = addHelperToMatch(helper);

        let showButton = document.createElement('button');
        showButton.classList = 'app-button';
        showButton.innerHTML = 'Show';
        showButton.onclick = showHelper(helper);

        actionCell.appendChild(addButton);
        actionCell.appendChild(showButton);

        row.appendChild(idCell);
        row.appendChild(locationCell);
        row.appendChild(productsCell);
        row.appendChild(actionCell);

        helpersTable.appendChild(row);
    }
};

//TODO
let match = () => {
    if (chosenHelper == null || chosenPersonInNeed == null) {
        return;
    }

    alert(chosenPersonInNeed.lastName + ' ' + chosenHelper.lastName);
};

let closeModalWindow = (className) => document.getElementsByClassName(className)[0].style.display = 'none';

let main = () => {

    //mock
    for (let i = 0; i < 100; i++) {
        listOfPeopleInNeed.push(listOfPeopleInNeed[i % 3]);
    }

    //mock
    for (let i = 0; i < 20; i++) {
        listOfHelpers.push(listOfHelpers[i % 3]);
    }

    loadPeopleInNeed(listOfPeopleInNeed);
    loadHelpers(listOfHelpers);
};
