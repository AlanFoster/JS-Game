module.exports = {
    "bail": true,
    "output": {
        "filename": "main.js"
    },
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
            "app/assets/third_party",
            "app/assets/js"
        ]
    }
};