//mock
var url = "https://platformawsparciaapi.azurewebsites.net";
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
    insertListItem('in-need-chronic-illnesses', 'Chronic illnesses', lsc.chronicIllnesses);
    insertListItem('in-need-dependence', 'Dependence', lsc.dependece);
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

let loadPeopleInNeed = () => {
    let observableList = document.getElementById('people-in-need');
    const getPeopleInNeed = new XMLHttpRequest();
    const endpoint = '/api/people-in-need';
    getPeopleInNeed.open("GET", url + endpoint, true);
    getPeopleInNeed.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    getPeopleInNeed.onreadystatechange = function () {
        if (getPeopleInNeed.readyState === XMLHttpRequest.DONE) {
            var status = getPeopleInNeed.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                allPeopleInNeed = JSON.parse(getPeopleInNeed.responseText);
                let i;

                for (i = 0; i < allPeopleInNeed.length; i++) {
                    let personInNeed = allPeopleInNeed[i];

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

                    while (i < 0) {
                        let emptyRow = document.createElement('tr');
                        emptyRow.className = 'data-row';
                        observableList.appendChild(emptyRow);
                        i++;
                    }
                }

            } else {
                alert("WHAT");
            }
        }
    };

    getPeopleInNeed.send();
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
    const getHelpers = new XMLHttpRequest();
    const endpoint = '/api/donors';
    getHelpers.open("GET", url + endpoint, true);
    getHelpers.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    getHelpers.onreadystatechange = function () {
        if (getHelpers.readyState === XMLHttpRequest.DONE) {
            var status = getHelpers.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                allHelpers = JSON.parse(getHelpers.responseText);
                let i;

                for (i = 0; i < allHelpers.length; i++) {
                    let helper = allHelpers[i];

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

                while (i < 0) {
                    let emptyRow = document.createElement('tr');
                    emptyRow.className = 'data-row';
                    helpersTable.appendChild(emptyRow);
                    i++;
                }

            } else {
                // Oh no! There has been an error with the request!
            }
        }
    };
    getHelpers.send();
};

let match = () => {
    if (chosenHelper == null || chosenPersonInNeed == null) {
        return;
    }
    const postmatch = new XMLHttpRequest();
    const endpoint = '/api/Matches'
    postmatch.open("POST", url + endpoint, true);
    postmatch.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    var data = JSON.stringify({
        "donorID": chosenHelper.donorID,
        "personInNeedID": chosenPersonInNeed.personInNeedID
    });
    postmatch.onreadystatechange = function () {
        if (postmatch.readyState === XMLHttpRequest.DONE) {
            var status = postmatch.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                alert(chosenPersonInNeed.lastName + ' ' + chosenHelper.lastName);
            } else {

            }
        }
    };
    postmatch.send(data);
};

let closeModalWindow = (className) => document.getElementsByClassName(className)[0].style.display = 'none';

let main = () => {
    loadPeopleInNeed();
    loadHelpers();
};
