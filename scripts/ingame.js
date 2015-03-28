var data = {
    ingameMenu: [
        "Resume",
        "Map",
        "Inventory",
        "Settings",
        "Quit"
    ]
};

ko.applyBindings(data);


BindCircularMenu(document.querySelector(".gamepad.ingame-menu .cn-button"),
                 document.querySelector(".gamepad.ingame-menu .cn-wrapper"));

// keyboard opener
document.querySelector(".keyboard.ingame-menu button")
.addEventListener("click", function () {
    document.querySelector(".keyboard.ingame-menu .wrapper")
    .classList.toggle("opened");
});

// platform selecter
document.querySelector("#platform-select").addEventListener("change", function (event) {
    var nodes = document.querySelectorAll(".ingame-menu");
    for (var i = 0; i < nodes.length; i++) {
        nodes.item(i).classList.add("hidden");
    }
    document.querySelector("." + event.target.value.toLowerCase())
    .classList.remove("hidden");
});