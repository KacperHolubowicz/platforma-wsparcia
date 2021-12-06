var url = "https://platformawsparciaapi.azurewebsites.net";

let addPerson = () => {
    const Http = new XMLHttpRequest();
    const endpoint = '/api/people-in-need'
    Http.open("POST", url + endpoint, true);
    Http.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    var ci = document.querySelector('input[name="cronicIllness"]:checked').value == 'true' ? true : false;
    var d = document.querySelector('input[name="dependence"]:checked').value == 'true' ? true : false;
    var data = JSON.stringify({

        "firstName": document.getElementById("fname").value,
        "lastName": document.getElementById("lname").value,
        "contactDetails": {
            "phoneNumber": document.getElementById("pnumber").value,
            "email": document.getElementById("email").value
        },
        "personalDetails": {
            "town": document.getElementById("town").value,
            "address": document.getElementById("address").value,
            "postcode": document.getElementById("postcode").value
        },
        "products": [

        ],
        "description": document.getElementById("desc").value,
        "lifeSituationClassification": {
            "age": document.getElementById("age").value,
            "townPopulation": document.getElementsByClassName('population')[0].value,
            "householdSize": document.getElementById("household").value,
            "financialSituation": document.getElementById("income").value,
            "healthSituation": document.querySelector('input[name="healthsituation"]:checked').value,
            "standardOfLiving": document.querySelector('input[name="standardOfLiving"]:checked').value,
            "familySituation": document.querySelector('input[name="familySituation"]:checked').value,
            "chronicIllnesses": ci,
            "dependece": d
        }

    });
    var obj = JSON.parse(data);
    var types = document.getElementsByClassName('productType');
    var names = document.getElementsByClassName('productName');
    for (var i = 0; i < types.length; i++) {
        obj['products'].push({ "productType": types[i].value, "productName": names[i].value });
    }
    data = JSON.stringify(obj);
    Http.onreadystatechange = function () {
        if (Http.readyState === XMLHttpRequest.DONE) {
            var status = Http.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                window.location.replace('https://platformawsparciawww.azurewebsites.net/');
            } else {
                // Oh no! There has been an error with the request!
            }
        }
    };
    Http.send(data);
};


let publicListMainFunction = () => {

};