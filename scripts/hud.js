var viewmodel = {
    health: ko.observable(Math.random()),
    ammo: ko.observable(Math.random()),
    experience: ko.observable(Math.random())
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


ko.applyBindings(viewmodel);

var maxStep = 1e-3;
var hpStep = Math.random() * maxStep,
    ammoStep = Math.random() * maxStep,
    xpStep = Math.random() * maxStep;

setInterval(function () {
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
}, 10);