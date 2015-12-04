var ministers = [{
    "PM": "John A. Macdonald",
    "Party": "Conservative",
    "From": "1867",
    "To": "1873"
}, {
    "PM": "Alexander Mackenzie",
    "Party": "Liberal",
    "From": "1873",
    "To": "1878"
}, {
    "PM": "John A. Macdonald",
    "Party": "Conservative",
    "From": "1878",
    "To": "1891"
}, {
    "PM": "John Abbott",
    "Party": "Conservative",
    "From": "1891",
    "To": "1892"
}, {
    "PM": "John Sparrow David Thompson",
    "Party": "Conservative",
    "From": "1892",
    "To": "1894"
}, {
    "PM": "Mackenzie Bowell",
    "Party": "Conservative",
    "From": "1894",
    "To": "1896"
}, {
    "PM": "Charles Tupper",
    "Party": "Conservative",
    "From": "1896"
}, {
    "PM": "Wilfred Laurier",
    "Party": "Liberal",
    "From": "1896",
    "To": "1911"
}, {
    "PM": "Robert L. Borden",
    "Party": "Conservative/Unionist",
    "From": "1911",
    "To": "1920"
}, {
    "PM": "Arthur Meighen",
    "Party": "Conservative",
    "From": "1920",
    "To": "1921"
}, {
    "PM": "William Lyon Mackenzie King",
    "Party": "Liberal",
    "From": "1921",
    "To": "1926"
}, {
    "PM": "Arthur Meighen",
    "Party": "Conservative",
    "From": "1926"
}, {
    "PM": "William Lyon Mackenzie King",
    "Party": "Liberal",
    "From": "1926",
    "To": "1930"
}, {
    "PM": "Richard B. Bennett",
    "Party": "Conservative",
    "From": "1930",
    "To": "1935"
}, {
    "PM": "William Lyon Mackenzie King",
    "Party": "Liberal",
    "From": "1935",
    "To": "1948"
}, {
    "PM": "Louis St. Laurent",
    "Party": "Liberal",
    "From": "1948",
    "To": "1957"
}, {
    "PM": "John G. Diefenbaker",
    "Party": "Progressive Conservative",
    "From": "1957",
    "To": "1963"
}, {
    "PM": "Lester B. Pearson",
    "Party": "Liberal",
    "From": "1963",
    "To": "1968"
}, {
    "PM": "Pierre Elliott Trudeau",
    "Party": "Liberal",
    "From": "1968",
    "To": "1979"
}, {
    "PM": "Joseph Clark",
    "Party": "Progressive Conservative",
    "From": "1979",
    "To": "1980"
}, {
    "PM": "Pierre Elliott Trudeau",
    "Party": "Liberal",
    "From": "1980",
    "To": "1984"
}, {
    "PM": "John Turner",
    "Party": "Liberal",
    "From": "1984"
}, {
    "PM": "Brian Mulroney",
    "Party": "Progressive Conservative",
    "From": "1984",
    "To": "1993"
}, {
    "PM": "Kim Campbell",
    "Party": "Progressive Conservative",
    "From": "1993"
}, {
    "PM": "Jean Chrétien",
    "Party": "Liberal",
    "From": "1993",
    "To": "2003"
}, {
    "PM": "Paul Martin",
    "Party": "Liberal",
    "From": "2003",
    "To": "2006"
}, {
    "PM": "Stephen Harper",
    "Party": "Conservative",
    "From": "2006",
    "To": "2015"
}];

function buildTable(data) {
    var table = document.createElement("table");

    var fields = Object.keys(data[0]);
    var headRow = document.createElement("tr");
    fields.forEach(function(field) {
        var headCell = document.createElement("th");
        headCell.textContent = field;
        headRow.appendChild(headCell);
    });
    table.appendChild(headRow);

    data.forEach(function(object) {
        var row = document.createElement("tr");
        fields.forEach(function(field) {
            var cell = document.createElement("td");
            cell.className = field;
            cell.textContent = object[field];
            if (typeof object[field] == "number")
                cell.style.textAlign = "right";
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

document.body.appendChild(buildTable(ministers));
/* -----------------------*/

