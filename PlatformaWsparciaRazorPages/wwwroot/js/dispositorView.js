//mock
let listOfPeopleInNeed = [
    { 'name': 'Janusz', 'surname': 'Januszewski', 'streetname': 'Szkolna', 'town': 'Wrocław', 'buildingID': '44', 'flatID': '', 'zipCode': '00-234' },
    { 'name': 'Mirek', 'surname': 'Mirkowski', 'streetname': 'Słoneczna', 'town': 'Białystok', 'buildingID': '1', 'flatID': '55', 'zipCode': '04-234' },
    { 'name': 'Zenon', 'surname': 'Zenoniuk', 'streetname': 'Einstrasse', 'town': 'Berlin', 'buildingID': '12', 'flatID': '56', 'zipCode': '00-234' },
];

let formatAddressOfPersonInNeed = (person) => {
    let result = person.streetname + ' ' + person.buildingID;

    if (person.flatID !== '') {
        result += ' ' + person.flatID;
    }

    result += ' ' + person.zipCode + ' ' + person.town;
    return result;
}

let loadPeopleInNeed = (peopleInNeed) => {
    let observableList = document.getElementById('people-in-need');

    for (let i = 0; i < peopleInNeed.length; i++) {
        let personInNeed = peopleInNeed[i];

        let row = document.createElement('tr');
        row.className = 'data-row';

        let nameCell = document.createElement('td');
        nameCell.className = 'namecell';
        nameCell.innerHTML = personInNeed.name;
        row.appendChild(nameCell);

        //to refactor (repeated code)
        let surnameCell = document.createElement('td');
        surnameCell.className = 'namecell';
        surnameCell.innerHTML = personInNeed.surname;
        row.appendChild(surnameCell);

        let addressCell = document.createElement('td');
        addressCell.className = 'addresscell';
        addressCell.innerHTML = formatAddressOfPersonInNeed(personInNeed);
        row.appendChild(addressCell);

        let button = document.createElement('button');
        button.innerHTML = 'Add';
        button.onclick = () => alert(personInNeed.surname);

        let buttonCell = document.createElement('td');
        buttonCell.className = 'buttoncell';
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);

        observableList.appendChild(row);
    }
};

let main = () => {

    //mock
    for (let i = 0; i < 100; i++) {
        listOfPeopleInNeed.push(listOfPeopleInNeed[i % 3]);
    }


    loadPeopleInNeed(listOfPeopleInNeed);
};
