//mock
var url = "https://platformawsparciaapi.azurewebsites.net";

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
    insertListItem('in-need-chronic-illnesses', 'Chronic illnesses', lsc.chronicIllnesses);
    insertListItem('in-need-dependence', 'Dependence', lsc.dependece);
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

let loadMatches = () => {
    let table = document.getElementById('matches-list');
    const getmatch = new XMLHttpRequest();
    const endpoint = '/api/Matches'
    getmatch.open("GET", url + endpoint, true);
    getmatch.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    getmatch.onreadystatechange = function () {
        if (getmatch.readyState === XMLHttpRequest.DONE) {
            var status = getmatch.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                allMatches = JSON.parse(getmatch.responseText);
                let i;

                for (i = 0; i < allMatches.length; i++) {
                    let helper = allMatches[i].donor;
                    let personInNeed = allMatches[i].personInNeed;

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

                while (i < 0) {
                    let emptyRow = document.createElement('tr');
                    emptyRow.className = 'interactive-row';
                    table.appendChild(emptyRow);
                    i++;
                }

            } else {

            }
        }
    };
    getmatch.send();
};

let matchesMainFunction = () => {
    loadMatches();
};
