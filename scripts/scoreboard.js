var viewmodel = {
    iconWidth: "64px",
    iconHeight: "64px",
    scores: []
};

var playersCount = 8;
for (var i = 0; i < playersCount; i++) {
    var homeplanet = randomFromArray(config.planetNames);
    var shipIconIndex = ~~(Math.random() * config.spaceshipIconsCount);
    var planetIconIndex = ~~(Math.random() * config.planetIconsCount);
    viewmodel.scores.push({
        playerName: randomFromArray(config.militaryRanks) + " " + randomFromArray(config.playerNames),
        spaceshipName: randomFromArray(config.spaceshipNames),
        homeplanetName: homeplanet,
        homeplanetDescription: randomFromArray(config.planetDescriptions).replace(/#NAME#/g, homeplanet),
        spaceshipIcon: "../images/spaceships/" + shipIconIndex + ".png",
        homeplanetIcon: "../images/planets/" + planetIconIndex + ".png",
        kills: randomScore(),
        deaths: randomScore(),
        assists: randomScore()
    });
};

var computeScore = function (player) {
    var score = (player.kills * 2 + player.assists * 1) / (0.75 * player.deaths || 1);
    return score;
}

var comparator = function (p1, p2) {
    return computeScore(p2) - computeScore(p1);
}

viewmodel.scores.sort(comparator);

ko.applyBindings(viewmodel);