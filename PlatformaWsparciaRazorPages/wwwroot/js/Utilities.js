let createTableCell = (className, innerHTML) => {
    let tableCell = document.createElement('td');
    tableCell.className = className;
    tableCell.innerHTML = innerHTML;
    return tableCell;
};

let closeModalWindow = (className) => document.getElementsByClassName(className)[0].style.display = 'none';

let insertListItem = (elementID, tag, content) => {
    document.getElementById(elementID).innerHTML = tag + ': ' + content;
};
