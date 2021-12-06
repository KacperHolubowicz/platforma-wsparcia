//mock
var url = "https://platformawsparciaapi.azurewebsites.net";
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

let loadPeopleInNeed = () => {
    const getpeople = new XMLHttpRequest();
    const endpoint = '/api/people-in-need/public'
    getpeople.open("GET", url + endpoint, true);
    getpeople.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    getpeople.onreadystatechange = function () {
        if (getpeople.readyState === XMLHttpRequest.DONE) {
            var status = getpeople.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                allpeople = JSON.parse(getpeople.responseText);
                for (let i = 0; i < allpeople.length; i++) {
                    let table = document.getElementById('public-list');
                    let person = allpeople[i];
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
            } else {

            }
        }
    };
    getpeople.send();
};

let publicListMainFunction = () => {

    //mock
    for (let i = 0; i < 200; i++) {
        listOfPeopleInNeed.push(listOfPeopleInNeed[i % 2]);
    }

    loadPeopleInNeed();
};
