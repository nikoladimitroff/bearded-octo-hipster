var viewmodel = {
    health: ko.observable(Math.random()),
    ammo: ko.observable(Math.random()),
    experience: ko.observable(Math.random()),
    abilities: [],
    detectedEnemies: [],
    crosshairX: ko.observable(0.5),
    crosshairY: ko.observable(0.5),
    firing: ko.observable(false)
};

viewmodel.healthTooltip = ko.computed(function () {
    return "Health: " + (viewmodel.health() * 100).toFixed(0) + "%";
});
viewmodel.ammoTooltip = ko.computed(function () {
    return "Ammo: " + (viewmodel.ammo() * 100).toFixed(0) + "%";
});
viewmodel.experienceTooltip = ko.computed(function () {
    return "Experience: " + (viewmodel.experience() * 100).toFixed(0) + "%";
});

var abilityNames = ["Ion Canon", "Plasma Canon", "Laser Canon", "Shields"];
var nameToIcon = function (name) {
    return "../images/abilities/" + name.toLowerCase().split(" ").join("-") + ".jpg"
}

var abilities = viewmodel.abilities;
for (var i = 0; i < abilityNames.length; i++) {
    abilities.push({
        icon: nameToIcon(abilityNames[i]),
        key: String.fromCharCode("1".charCodeAt(0) + i),
        description: abilityNames[i]
    });
}

var enemiesCount = 4;
var enemyMaxCoordinate = 0.5;
var spaceshipIconsCount = config.spaceshipIconsCount;
for (var i = 0; i < enemiesCount; i++) {
    viewmodel.detectedEnemies.push({
        x: ko.observable((Math.random() * enemyMaxCoordinate * 100).toFixed(0) + "%"),
        y: ko.observable((Math.random() * enemyMaxCoordinate * 100).toFixed(0) + "%"),
        shipIcon: "../images/spaceships/" + ~~(Math.random() * spaceshipIconsCount) + ".png",
        shipName: randomFromArray(config.spaceshipNames)
    });
}


ko.applyBindings(viewmodel);

// Animate bars
var maxStep = 5 * 1e-3;
var hpStep = Math.random() * maxStep,
    ammoStep = Math.random() * maxStep,
    xpStep = Math.random() * maxStep;

var barAnimation = function () {
    viewmodel.health(viewmodel.health() + hpStep);
    if (viewmodel.health() >= 1 || viewmodel.health() <= 0) {
        hpStep = -hpStep;
    }

    viewmodel.ammo(viewmodel.ammo() + ammoStep);
    if (viewmodel.ammo() >= 1 || viewmodel.ammo() <= 0) {
        ammoStep = -ammoStep;
    }

    viewmodel.experience(viewmodel.experience() + xpStep);
    if (viewmodel.experience() >= 1 || viewmodel.experience() <= 0) {
        xpStep = -xpStep;
    }

    requestAnimationFrame(barAnimation);
};
barAnimation();

// Animate radar
var directions = [];
for (var i = 0; i < enemiesCount; i++) {
    directions.push({x: Math.random() * maxStep, y: Math.random() * maxStep});
}
var enemiesAnimation = function () {
    var enemies = viewmodel.detectedEnemies;
    for (var i = 0; i < enemies.length; i++) {
        var newX = parseFloat(enemies[i].x()) / 100 + directions[i].x;
        var newY = parseFloat(enemies[i].y()) / 100 + directions[i].y;
        if (newX >= enemyMaxCoordinate || newX <= 0) {
            directions[i].x = -directions[i].x;
        }
        if (newY >= enemyMaxCoordinate || newY <= 0) {
            directions[i].y = -directions[i].y;
        }
        enemies[i].x((newX * 100) + "%");
        enemies[i].y((newY * 100) + "%");
    };
    requestAnimationFrame(enemiesAnimation);
};
enemiesAnimation();

var moveCamera = function (x, y) {
    
};

window.onmousemove = function (event) {
    moveCamera(event.clientX, event.clientY);
}
