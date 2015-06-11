$(window).load(function () {
    var body = $("body"),
        universe = $("#universe"),
        solarsys = $("#solar-system");

    // view model
    var viewmodel = {
        planets: [],
        selected: ko.observable(),
        infoText: ko.observable(),
    };

    var init = function() {
    body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
            $(this).removeClass('hide-UI').addClass("set-speed");
            $(this).dequeue();
        });
    };

    var setView = function(view) {
        universe.removeClass().addClass(view);
        if (view.indexOf("scale-s") !== -1 && viewmodel.scale() != "scale-s") {
            viewmodel.scale("scale-s")
        }
        else {
            viewmodel.scale("scale-d");
        }
    };

    $("#toggle-data").click(function(e) {
        body.toggleClass("data-open data-close");
        e.preventDefault();
    });

    $("#toggle-controls").click(function(e) {
        body.toggleClass("controls-open controls-close");
        e.preventDefault();
    });

    $("#data a").click(function(e) {
        var ref = $(this).attr("class");
        solarsys.removeClass().addClass(ref);
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
    $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
    $(".set-speed").click(function() { setView("scale-stretched set-speed"); });

    init();

    var getPlanetInfo = function (index) {
        index++;
        var planet = viewmodel.planets[index];
        var owner = randomFromArray(config.militaryRanks) + " " + randomFromArray(config.playerNames);
        var archetype = randomFromArray(config.planetArchetypes);
        return ko.computed(function () {
            return ".set-speed .orbit:nth-child(" + index + ") dl.infos dd:after {" +
                   "content: '" + owner + "';}\n" +
                   ".set-speed .orbit:nth-child(" + index + ") dl.infos dd span:after {" +
                   "content: '" + archetype + "';}\n";
        });
    };
    var createPlanetInfo = function () {
        var planetInfos = [];
        for (var i = 0; i < planetCount; i++) {
            planetInfos.push(getPlanetInfo(i));
        }
        return ko.computed(function () {
            var planetInfo = planetInfos.reduce(function (old, x) {
                return old + x();
            }, "");
            return planetInfo;
        });
    };
    
    var onselected = function (i) {
        return function () {
            var previousTarget = $("#planet" + viewmodel.selected());
            var newTarget = $("#planet" + i);
            previousTarget.toggleClass("selected");
            if (i === viewmodel.selected()) {
                return;
            }
            newTarget.toggleClass("selected");
            viewmodel.selected(i);
        }
    };

    // fill up the viewmodel
    var planetNames = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]
    var planetCount = 8;
    var maxOrbitalSize = 400;
    var currentOrbitalCounter = 10;
    for (var i = 0; i < planetCount; i++) {
        var planetIconIndex = ~~(Math.random() * config.planetIconsCount);
        var size = 80 + Math.random() * 30 + Math.random() * i * i * 5;
        viewmodel.planets.push({
            name: randomFromArray(config.planetNames),
            icon: "../images/planets/" + planetIconIndex + ".png",
            orbitalDuration: (20 + Math.random() * 20 - Math.random() * (planetCount - i) * 1.5) + "s",
            planetSize: size,
            orbitSize: currentOrbitalCounter + Math.random() * (maxOrbitalSize - currentOrbitalCounter) * (1 / planetCount),
            offsetX: (Math.random() * 100) + "%",
            offsetY: (Math.random() * 100) + "%",
            onselected: onselected(i),
        });
        currentOrbitalCounter = viewmodel.planets[i].orbitSize;
    }
    var last = planetCount - 1;
    viewmodel.planets[last].orbitSize = maxOrbitalSize - viewmodel.planets[last - 1].orbitSize;
    viewmodel.infoText = createPlanetInfo();

    ko.applyBindings(viewmodel);
});
