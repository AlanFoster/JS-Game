module.exports = {
    "bail": true,
    module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    },
    "resolve": {
        "extensions": [
            "",
            ".js",
            ".coffee"
        ],
        "modulesDirectories": [
            ".",
            "app/assets/third_party",
            "app/assets/js",
            "node_modules"
        ]
    }
};
