var data = {
    heading: "Our Awesome Game",
    menu: [{
        name: "New Game",
        icon: "",
        children: [
            {name: "Single Player", icon: ""},
            {name: "Versus", icon: ""},
            {name: "Co-op", icon: ""},
            {name: "Online", icon: ""}
        ]}, {
        name: "Settings",
        icon: "",
        children: [{
            name: "Video",
            icon: "",
            children: [{
                name: "Basic",
                icon: "",
                children: [
                    {name: "Resolution", icon: ""},
                    {name: "Anisotropic", icon: ""},
                    {name: "Antialiasing", icon: ""},
                ]}, {
                name: "Advanced",
                icon: "",
                children: [
                    {name: "Texture quality", icon: ""},
                    {name: "Shadow quality", icon: ""},
                    {name: "View distance", icon: ""},
                ]}
            ]}, {
            name: "Audio",
            icon: "",
            children: [
                {name: "Master volume", icon: ""},
                {name: "Voice", icon: ""},
                {name: "SFX", icon: ""},
                {name: "Music", icon: ""},
                {name: "Subtitles?", icon: ""},
            ]}, {
            name: "Gameplay",
            icon: "",
            }]
        }, {
        name: "Credits",
        icon: "",
        }, {
        name: "Quit",
        icon: "",
        }
    ]
};

ko.applyBindings(data);

var menu = CreateMultiLevelMenu(document.querySelector('.mp-menu#main-menu'),
                                document.createElement('a'));