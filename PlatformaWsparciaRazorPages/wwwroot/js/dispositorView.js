//mock
let listOfPeopleInNeed = [
    {
        'id': 1,
        'firstName': 'Janusz',
        'lastName': 'Januszewski',
        'address': 'Szkolna',
        'town': 'Wrocław',
        'zipCode': '00-234',
        'phoneNumber': '2134234',
        'email': 'adwa@dwa',
        'age': 44,
        'townPopulation': 123,
        'householdSize': 40,
        'financialSituation': 3,
        'healthSituation': 3,
        'standardOfLiving': 3,
        'familySituation': 3,
        'chronicIlnesses': false,
        'dependence': true,
        'products': [
            ['catA', 'product1'],
            ['catA', 'product2'],
            ['catB', 'product3']
        ],
        'priority': 3
    },
    {
        'id': 9,
        'firstName': 'Zenon',
        'lastName': 'Zenoniuk',
        'address': 'Słoneczna 44',
        'town': 'Białystok',
        'zipCode': '00-23123',
        'phoneNumber': '000000000',
        'email': 'adwa@dwawdawdwad',
        'age': 32,
        'townPopulation': 1233,
        'householdSize': 40,
        'financialSituation': 4,
        'healthSituation': 5,
        'standardOfLiving': 4,
        'familySituation': 3,
        'chronicIlnesses': true,
        'dependence': true,
        'products': [
            ['catC', 'productD'],
            ['catA', 'productE'],
            ['catD', 'productF']
        ],
        'priority': 2
    },
    {
        'id': 3,
        'firstName': 'Mirek',
        'lastName': 'Januszewski',
        'address': 'Einstrasse',
        'town': 'Berlin',
        'zipCode': '05-551',
        'phoneNumber': '277234',
        'email': 'miro@dwa.hehe',
        'age': 44,
        'townPopulation': 123,
        'householdSize': 40,
        'financialSituation': 1,
        'healthSituation': 2,
        'standardOfLiving': 1,
        'familySituation': 2,
        'chronicIlnesses': false,
        'dependence': false,
        'products': [['catA', 'product1']],
        'priority': 5
    }
];

//mock
let listOfHelpers = [
    {
        'id': 1,
        'firstName': 'Jan',
        'lastName': 'Pomocnik',
        'phoneNumber': '234234',
        'email': 'hehe@haha.com',
        'town': 'Berlin',
        'zipCode': '08-200',
        'products': [
            ['catC', 'productD'],
            ['catA', 'productE'],
            ['catD', 'productF']
        ]
    },
    {
        'id': 5,
        'firstName': 'Andrzej',
        'lastName': 'Nazwiskowski',
        'phoneNumber': '2348674',
        'email': 'andy@haha.com',
        'town': 'Warsaw',
        'zipCode': '00-200',
        'products': [
            ['catC', 'productD'],
            ['catZ', 'product56']
        ]
    },
    {
        'id': 7,
        'firstName': 'Jędrzej',
        'lastName': 'Pomocny',
        'phoneNumber': '234242434',
        'email': 'jendrek@o2.pl',
        'town': 'Poznań',
        'zipCode': '90-907',
        'products': [
            ['catT', 'productZ'],
            ['catD', 'productY'],
            ['catD', 'productX']
        ]
    },
];

let chosenPersonInNeed, chosenHelper;

let createTableCell = (className, innerHTML) => {
    let tableCell = document.createElement('td');
    tableCell.className = className;
    tableCell.innerHTML = innerHTML;
    return tableCell;
}

let loadPeopleInNeed = (peopleInNeed) => {
    let observableList = document.getElementById('people-in-need');

    for (let i = 0; i < peopleInNeed.length; i++) {
        let personInNeed = peopleInNeed[i];

        let row = document.createElement('tr');
        row.className = 'data-row';

        let idCell = createTableCell(
            'id-cell',
            personInNeed.id
        );

        let locationCell = createTableCell(
            'location-cell',
            personInNeed.zipCode + ' ' + personInNeed.town
        );

        let priorityCell = createTableCell(
            'priority-cell',
            personInNeed.priority
        );

        let buttonsCell = createTableCell(
            'button-cell',
            ''
        );

        let addButton = document.createElement('button');
        addButton.innerHTML = 'Add';
        addButton.onclick = () => {
            chosenPersonInNeed = personInNeed;

            document.getElementsByClassName('matcher-person-in-need')[1]
                .innerHTML = personInNeed.firstName + ' ' + personInNeed.lastName + ' ' + personInNeed.id;
        };

        buttonsCell.appendChild(addButton);

        let showButton = document.createElement('button');
        showButton.innerHTML = 'Show';
        showButton.onclick = () => alert(personInNeed.products);
        buttonsCell.appendChild(showButton);

        row.appendChild(idCell);
        row.appendChild(locationCell);
        row.appendChild(priorityCell);
        row.appendChild(buttonsCell);

        observableList.appendChild(row);
    }
};

let loadHelpers = (helpers) => {
    let helpersTable = document.getElementById('helpers');

    for (let i = 0; i < helpers.length; i++) {
        let helper = helpers[i];

        let row = document.createElement('tr');
        row.className = 'data-row';

        let idCell = createTableCell(
            'helper-id-cell',
            helper.id
        );

        let locationCell = createTableCell(
            'helper-location-cell',
            helper.zipCode + ' ' + helper.town
        );

        let productsCell = createTableCell(
            'helper-products-cell',
            helper.products[0]
        );

        let actionCell = createTableCell(
            'helper-button-cell',
            ''
        );

        let addButton = document.createElement('button');
        addButton.innerHTML = 'Add';
        addButton.onclick = () => {
            chosenHelper = helper;

            document.getElementsByClassName('matcher-helper')[1]
                .innerHTML = helper.firstName + ' ' + helper.lastName + ' ' + helper.id;
        };

        let showButton = document.createElement('button');
        showButton.innerHTML = 'Show';
        showButton.onclick = () => alert(helper);

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
    alert(chosenPersonInNeed.lastName + ' ' + chosenHelper.lastName);
};

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
