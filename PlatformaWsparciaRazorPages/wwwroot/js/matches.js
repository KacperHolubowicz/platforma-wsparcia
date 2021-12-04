//mock
let matches = [
    {
        "donor": {
            "donorID": 12,
            "firstName": "Kazimierz",
            "lastName": "Pomocny",
            "contactDetails": {
                "phoneNumber": "212593847",
                "email": "kazik@hehe.xd"
            },
            "personalDetails": {
                "town": "Wrocław",
                "address": "Fajna 203",
                "postcode": "12-516"
            },
            "products": [
                {
                    "productType": "nieAlkohol",
                    "productName": "beer"
                }
            ]
        },
        "personInNeed": {
            "personInNeedID": 2,
            "firstName": "Ferdynand",
            "lastName": "Świetny",
            "contactDetails": {
                "phoneNumber": "293847",
                "email": "ferdek@hehe.xd"
            },
            "personalDetails": {
                "town": "Wrocław",
                "address": "Ćwiartki 3/4",
                "postcode": "12-515"
            },
            "products": [
                {
                    "productType": "nieAlkohol",
                    "productName": "beer"
                },
                {
                    "productType": "other",
                    "productName": "TV"
                }
            ],
            "lifeSituation": {
                "description": "W tym kraju nie ma pracy dla ludzi z moim wykształceniem :(",
                "priority": 3
            },
            "lifeSituationClassification": {
                "age": 55,
                "townPopulation": 4,
                "householdSize": 3,
                "financialSituation": 2,
                "healthSituation": 1,
                "standardOfLiving": 0,
                "familySituation": 1,
                "chronicIllnesses": false,
                "dependece": true
            }
        }
    },
    {
        "donor": {
            "donorID": 79,
            "firstName": "Jan",
            "lastName": "Pomocan",
            "contactDetails": {
                "phoneNumber": "997",
                "email": "wawdawf@jwfaj"
            },
            "personalDetails": {
                "town": "Suwałki",
                "address": "Asfaltowa 1",
                "postcode": "55-331"
            },
            "products": [
                {
                    "productType": "medicine",
                    "productName": "APAP"
                },
                {
                    "productType": "medicine",
                    "productName": "Vitamins"
                }
            ]
        },
        "personInNeed": {
            "personInNeedID": 12,
            "firstName": "Andrzeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeej",
            "lastName": "Inneed",
            "contactDetails": {
                "phoneNumber": "012434",
                "email": ""
            },
            "personalDetails": {
                "town": "Białystok",
                "address": "Edukacyjna 12",
                "postcode": "42-710"
            },
            "products": [
                {
                    "productType": "medicine",
                    "productName": "vitamins"
                }
            ],
            "lifeSituation": {
                "description": "Ich brauche Vitaminen!!!",
                "priority": 2
            },
            "lifeSituationClassification": {
                "age": 49,
                "townPopulation": 3,
                "householdSize": 3,
                "financialSituation": 2,
                "healthSituation": 3,
                "standardOfLiving": 3,
                "familySituation": 4,
                "chronicIllnesses": false,
                "dependece": false
            }
        }
    }
];

let showModalWindow = (helper, needy) => () => {
    document.getElementsByClassName('matches-modal-window')[0].style.display = 'block';

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

    insertListItem('in-need-id', 'ID', needy.personInNeedID);
    insertListItem('in-need-first-name', 'First name', needy.firstName);
    insertListItem('in-need-last-name', 'Last name', needy.lastName);
    insertListItem('in-need-address', 'Address', needy.personalDetails.address);
    insertListItem('in-need-town', 'Town', needy.personalDetails.town);
    insertListItem('in-need-zip-code', 'Zip code', needy.personalDetails.postcode);
    insertListItem('in-need-phone-number', 'Phone number', needy.contactDetails.phoneNumber);
    insertListItem('in-need-email', 'E-mail', needy.contactDetails.email);
    insertListItem('in-need-age', 'Age', needy.lifeSituationClassification.age);

    let lsc = needy.lifeSituationClassification;
    insertListItem('in-need-town-population', 'Town population (0-4)', lsc.townPopulation);
    insertListItem('in-need-household-size', 'Size of household', lsc.householdSize);
    insertListItem('in-need-financial-situation', 'Financial situation', lsc.financialSituation);
    insertListItem('in-need-health-situation', 'Health situation (0-4)', lsc.healthSituation);
    insertListItem('in-need-standard-of-living', 'Standard of living (0-4)', lsc.standardOfLiving);
    insertListItem('in-need-family-situation', 'Family situation (0-4)', lsc.familySituation);
    insertListItem('in-need-chronic-illnesses', 'Chronic illnesses', lsc.chronicIlnesses);
    insertListItem('in-need-dependence', 'Dependence', lsc.dependence);
    insertListItem('in-need-priority', 'Suggested priority', needy.lifeSituation.priority);
    insertListItem('in-need-description', 'Description', needy.lifeSituation.description);

    let inNeedProductList = document.getElementById('in-need-product-list');
    inNeedProductList.innerHTML = '';

    for (let i = 0; i < needy.products.length; i++) {
        let item = document.createElement('li');
        item.innerHTML = needy.products[i].productName + ' (' + needy.products[i].productType + ')';
        inNeedProductList.appendChild(item);
    }
};

let loadMatches = (listOfMatches) => {
    let table = document.getElementById('matches-list');

    for (let i = 0; i < listOfMatches.length; i++) {
        let helper = listOfMatches[i].donor;
        let personInNeed = listOfMatches[i].personInNeed;

        let row = document.createElement('tr');
        row.className = 'interactive-row';
        row.onclick = showModalWindow(helper, personInNeed);

        let helperIdCell = createTableCell('matches-id-cell', helper.donorID);
        let helperFirstNameCell = createTableCell('matches-first-name-cell', helper.firstName);
        let helperLastNameCell = createTableCell('matches-last-name-cell', helper.lastName);
        let helperLocationCell = createTableCell(
            'matches-location-cell',
            helper.personalDetails.postcode + ' ' + helper.personalDetails.town
        );

        let needyIdCell = createTableCell('matches-id-cell', personInNeed.personInNeedID);
        let needyFirstNameCell = createTableCell('matches-first-name-cell', personInNeed.firstName);
        let needyLastNameCell = createTableCell('matches-last-name-cell', personInNeed.lastName);
        let needyLocationCell = createTableCell(
            'matches-location-cell',
            personInNeed.personalDetails.postcode + ' ' + personInNeed.personalDetails.town
        );

        row.appendChild(helperIdCell);
        row.appendChild(helperFirstNameCell);
        row.appendChild(helperLastNameCell);
        row.appendChild(helperLocationCell);
        row.appendChild(needyIdCell);
        row.appendChild(needyFirstNameCell);
        row.appendChild(needyLastNameCell);
        row.appendChild(needyLocationCell);

        table.appendChild(row);
    }
};

let matchesMainFunction = () => {

    //mock
    for (let i = 0; i < 37; i++) {
        matches.push(matches[i % 2]);
    }

    loadMatches(matches);
};
