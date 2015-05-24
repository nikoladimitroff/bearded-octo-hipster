var militaryRanks = [
    "Cpt.",
    "Lt.",
    "Colonel",
    "General",
    "Major"
];

var playerNames = [
    "Maxwell Iavarone",
    "Wyatt Reade",
    "Vixis",
    "Parmak Daro",
    "Thavil ch'Kerro",
    "Aarar Benia",
    "Garret Warwick",
    "Lindsy Gammon",
    "Natalya Rostislavovna",
    "Igor Vladimirovich"
];

var spaceshipNames = [
    "USS Lio",
    "Trailblazer",
    "CS Gladius",
    "LWSS Lifebringer",
    "LWSS Loki",
    "BGS Infinity",
    "BGS Tangra",
    "BGS Presian",
    "Nebuchadnezzar"
];

var planetNames = [
    "Skaro",
    "Nuflaytov",
    "Alderaan",
    "Iaynus",
    "Pandora",
    "Naboo",
    "Hoth",
    "Aswaoter"
];

var planetDescriptions = [
    "The planet #NAME#, which is a temporary placeholder name, is an ice giant planet in a fairly small solar system with nine other planets. Skaro is about 19.9 times bigger than Earth and its gravity is about 4.85 times that of Earth.",
    "The planet #NAME#, named so after its discoverer, is a carbon planet in a densely populated solar system with twenty-one other planets. A single day lasts 43.78 hours and a year lasts 426 days. The planet is made up of 6 continents, which make up 20% of the planet's landmass.",
    "The planet #NAME#, named so for its similarities to the fictional version, is a gas giant planet in a small solar system with five other planets. #NAME# is about 0.3 times bigger than Earth and its gravity is about 2.60 times that of Earth. 2 moons orbit the planet and #NAME# itself orbits a blue sun in a fairly circular orbit.",
    "The planet #NAME#, which is a temporary placeholder name, is an ice planet in a vast solar system with fifteen other planets. 2 moons orbit the planet and #NAME# itself orbits a red sun in an elliptic orbit. You will not find any intelligent life forms on this planet, but that doesn't take anything away from the astonishing beauty of the life forms it does have. Insects, reptiles, amphibians, fish and even the first baby steps to mammals can be found on this planet.",
    "The planet #NAME#, which is a name which is still disputed, is a rogue planet in a densely populated solar system with seventeen other planets. #NAME# is about 11.8 times bigger than Earth and its gravity is about 5.59 times that of Earth. A single day lasts 46.12 hours and a year lasts 111 days. The planet is made up of 9 continents, which make up 88% of the planet's landmass. Unfortunately the conditions on this planet make it impossible to sustain life, which is a shame as it's in a good enough position to do so. Perhaps in a few million years the conditions will have bettered, but in the mean time we can only appreciate it's violent beauty.",
    "The planet #NAME#, as it's called by most of the natives, is an ice planet in a huge solar system filled with thirteen other planets. #NAME# is about 3.5 times bigger than Earth and its gravity is about 2.67 times that of Earth.The underwater world of this planet is truly a feast for the eyes. Thousands of different soft and hard coral species cover the ocean floors, most of which have a form of bioluminescence, which makes the night even more magical than the day.",
    "The planet #NAME#, which is a name which is still disputed, is a desert planet in a vast solar system with twenty-one other planets. A single day lasts 21.97 hours and a year lasts 123 days. There are several intelligent species. The higher intelligence of these sentient species has unfortunately lead to almost nothing but war. Fortunately they aren't as technologically advanced as humans yet, they're in a stage comparable to that of the middle ages, so while they are destructive, their planet isn't at risk of being completely destroyed.",
    "The planet #NAME#, named so for the planet's properties, is an ocean planet in a fairly small solar system with five other planets. #NAME# is about 4.7 times bigger than Earth and its gravity is about 4.31 times that of Earth.Basic life forms are also the only thing you'll find in this planet's underwater world. Seaweeds, algae and a few dozen soft corals are scattered in very specific areas of this world, while everything else is eerily empty. But these vast areas of emptyness make the overgrown fields of soft corals and weeds all the more gorgeous.These organisms may seem impressive based on their aesthetics, but they're far from impressive based on their development, as most, if not all, have yet to develop beyond their very basic forms."
];

var spaceshipIconsCount = 12,
    planetIconsCount = 9;

var viewmodel = {
    iconWidth: "64px",
    iconHeight: "64px",
    scores: []
};

var randomFromArray = function (array) {
    return array[~~(Math.random() * array.length)];
};

var randomScore = function () {
    return ~~(Math.random() * 30);
}

var playersCount = 8;
for (var i = 0; i < playersCount; i++) {
    var homeplanet = randomFromArray(planetNames);
    var shipIconIndex = ~~(Math.random() * spaceshipIconsCount);
    var planetIconIndex = ~~(Math.random() * planetIconsCount);
    viewmodel.scores.push({
        playerName: randomFromArray(militaryRanks) + " " + randomFromArray(playerNames),
        spaceshipName: randomFromArray(spaceshipNames),
        homeplanetName: homeplanet,
        homeplanetDescription: randomFromArray(planetDescriptions).replace(/#NAME#/g, homeplanet),
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