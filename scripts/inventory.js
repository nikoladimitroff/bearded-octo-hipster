var Item = function (name) {
    this.name = name;
    var iconName = name.toLowerCase().split(" ").join("_") + ".png";
    this.icon = "../images/items/" + iconName;
};

var allItems = ["", "Ion Turret", "Ion Engine", "Plasma Engine", "Laser Engine"];
var inventory = [];
var rows = 4;
var cols = 4;
for (var i = 0; i < rows; i++) {
    inventory[i] = [];
    for (var j = 0; j < cols; j++) {
        var itemName = allItems[~~(Math.random() * allItems.length)];
        inventory[i].push(ko.observable(new Item(itemName)));
    }
}

var swapItems = function (row1, col1, row2, col2) {
    var from = inventory[row1][col1]();
    var to = inventory[row2][col2]();
    inventory[row1][col1](to);
    inventory[row2][col2](from);
};

var swapElements = function (el1, el2) {
    var parse = function (x) { return ~~x; }
    var source = el1.split("-").map(parse);
    var target = el2.split("-").map(parse);

    swapItems(source[0], source[1], target[0], target[1]);
};

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function( event ) {

}, false);

var getCellInParents = function (node) {
    while (!node.dataset.index && node !== document.body) {
        node = node.parentElement;
    }
    if (!node.dataset.index)
        return undefined;
    return node;
};

var ondragstart = function(event) {
    var node = getCellInParents(event.target);

    event.dataTransfer.setData("text/plain", node.dataset.index);
    event.dataTransfer.effectAllowed = "move";
};

var ondrop = function(event) {
    var node = getCellInParents(event.target);

    var data = event.dataTransfer.getData("text/plain");
    swapElements(node.dataset.index, data);
    event.preventDefault();
};
document.addEventListener("dragover", function( event ) {
    event.preventDefault();
}, false);

var selected = null;
var onselection = function (target) {
    var node = getCellInParents(target);
    if (selected) {
        swapElements(node.dataset.index, selected.dataset.index);
        selected.classList.remove("selected");
        selected = null;
    }
    else {
        selected = node;
        selected.classList.add("selected");
    }
};

var position = {row: 0, col: 0};

var getTdFromPosition = function (position) {
    var query = "table.inventory " +
                "tr:nth-child(" + (position.row + 1) + ") " +
                "td:nth-child(" + (position.col + 1) + ")";
    return document.querySelector(query);
};

var onkeydown = function (event) {
    var current = getTdFromPosition(position);
    switch (event.keyCode) {
        case 37: // left
            position.col = (position.col - 1 + cols) % cols;
        break;
        case 38: // up
            position.row = (position.row - 1 + rows) % rows;
        break;
        case 39: // right
            position.col = (position.col + 1) % cols;
        break;
        case 40: // down
            position.row = (position.row + 1) % rows;
        break;
    };
    var next = getTdFromPosition(position);
    if (next != current) {
        current.classList.toggle("focused");
        next.classList.toggle("focused");
    }
    if (event.keyCode === 13 /* enter */) {
        onselection(next);
    }
};

document.addEventListener("keydown", onkeydown, false);

var viewmodel = {
    inventory: inventory,
    iconWidth: (100 / rows) + "%",
    iconHeight: (100 / cols) + "%",

    dragStart: ondragstart,
    drop: ondrop
};

ko.applyBindings(viewmodel);
// focus item (0, 0)
getTdFromPosition(position).classList.toggle("focused");