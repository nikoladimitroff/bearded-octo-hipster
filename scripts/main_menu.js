var data = {
    heading: "Bearded Octo Hipster",
    menu: [{
        name: "Play",
        icon: "gamepad",
        children: [
            {name: "Single Player", icon: "user"},
            {name: "Versus", icon: "gavel"},
            {name: "Co-op", icon: "shield"},
            {name: "Online", icon: "users"}
        ]}, {
        name: "Settings",
        icon: "cogs",
        children: [{
            name: "Video",
            icon: "video-camera",
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
            icon: "headphones",
            children: [
                {name: "Master", icon: "volume-up"},
                {name: "Voice", icon: "users"},
                {name: "SFX", icon: "bullhorn"},
                {name: "Music", icon: "music"},
                {name: "Mic", icon: "microphone"},
                {name: "Subtitles?", icon: "font"},
            ]}, {
            name: "Gameplay",
            icon: "space-shuttle",
            }]
        }, {
        name: "Achievements",
        icon: "trophy",
        },{
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