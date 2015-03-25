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


BindCircularMenu(document.querySelector(".gamepad#ingame-menu .cn-button"),
                 document.querySelector(".gamepad#ingame-menu .cn-wrapper"));