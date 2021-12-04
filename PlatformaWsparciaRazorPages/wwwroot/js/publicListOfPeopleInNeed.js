//mock
let listOfPeopleInNeed = [
    {
        'personInNeedID': 20,
        'firstName': 'Mirek',
        'matched': false,
        'town': 'Vladivoshtock',
        'postcode': '05-100',
        'products': [
            {
                'productType': 'food',
                'productName': 'botteled water'
            },
            {
                'productType': 'food',
                'productName': 'vodka'
            },
            {
                'productType': 'food',
                'productName': 'cucumbers'
            },
            {
                'productType': 'medicine',
                'productName': 'penicilin'
            }
        ]
    },
    {
        'personInNeedID': 55,
        'firstName': 'Adrian',
        'matched': true,
        'town': 'Suwałki',
        'postcode': '67-202',
        'products': [
            {
                'productType': 'food',
                'productName': 'butter'
            },
            {
                'productType': 'yes',
                'productName': 'toothpaste'
            }
        ]
    }
];

let getProductList = (person) => {
    let products = person.products;
    let result = '';


    for (let i = 0; i < products.length; i++) {
        result += products[i].productName;

        if (i !== products.length - 1) {
            result += ', ';
        }
    }

    return result;
};

let loadPeopleInNeed = (listOfPeople) => {
    for (let i = 0; i < listOfPeople.length; i++) {
        let table = document.getElementById('public-list');
        let person = listOfPeople[i];
        let tableRow = document.createElement('tr');

        let idCell = createTableCell('people-in-need-id-cell', person.personInNeedID);
        let firstNameCell = createTableCell('people-in-need-first-name-cell', person.firstName);
        let locationCell = createTableCell('people-in-need-location-cell', person.postcode + ' ' + person.town);
        let productsCell = createTableCell('people-in-need-products-cell', getProductList(person));
        let matchedCell = createTableCell('people-in-need-found-help-cell', person.matched ? '&check;' : '');

        tableRow.appendChild(idCell);
        tableRow.appendChild(firstNameCell);
        tableRow.appendChild(locationCell);
        tableRow.appendChild(productsCell);
        tableRow.appendChild(matchedCell);

        table.appendChild(tableRow);
    }
};

let publicListMainFunction = () => {

    //mock
    for (let i = 0; i < 200; i++) {
        listOfPeopleInNeed.push(listOfPeopleInNeed[i % 2]);
    }

    loadPeopleInNeed(listOfPeopleInNeed);
};
