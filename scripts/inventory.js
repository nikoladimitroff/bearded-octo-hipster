var Item = function (name) {
    this.name = name;
    var iconName = name.toLowerCase().split(" ").join("_") + ".png";
    this.icon = "../images/items/" + iconName;
};

var allItems = config.items;
var inventory = [];
var rows = 4;
var cols = 4;
for (var i = 0; i < rows; i++) {
    inventory[i] = [];
    for (var j = 0; j < cols; j++) {
        var itemName = randomFromArray(allItems);
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

var updatePosition = function (change, selectionFinalized) {
    var current = getTdFromPosition(position);
    console.log(position);
    position.row = (position.row + change.row + rows) % rows;
    position.col = (position.col + change.col + cols) % cols;
    console.log(change,position);
    var next = getTdFromPosition(position);
    if (next != current) {
        current.classList.toggle("focused");
        next.classList.toggle("focused");
    }
    if (selectionFinalized) {
        onselection(next);
    }
};

var onkeydown = function (event) {
    var change = {row: 0, col: 0};
    switch (event.keyCode) {
        case 37: // left
            change.col = -1;
        break;
        case 38: // up
            change.row = -1;
        break;
        case 39: // right
            change.col = 1;
        break;
        case 40: // down
            change.row = 1;
        break;
    };
    var selectionFinalized = false;
    if (event.keyCode === 13 /* enter */) {
        selectionFinalized = true;
    }
    updatePosition(change, selectionFinalized);
};

document.addEventListener("keydown", onkeydown, false);

var sign = function (n) {
    if (n === 0) { return 0; }
    return Math.abs(n) / n;
};

var frameCounter = 0;
Gamepad.listen(function (gamepad) {
    if (!gamepad || frameCounter-- !== 0) return;

    var leftRight = gamepad.axes[0];
    var upDown = gamepad.axes[1];
    var change = {row: 0, col: 0};
    if (Math.abs(leftRight) >= 0.5) {
        // Left
        change.col = sign(leftRight);
    }
    if (Math.abs(upDown) >= 0.5) {
        change.row = sign(upDown);
    }
    var selectionFinalized = gamepad.buttons[0].pressed;
    updatePosition(change, selectionFinalized);
    frameCounter = 5;
});

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