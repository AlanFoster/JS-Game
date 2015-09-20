module.exports = {
    bail: true,
    output: {
        filename: 'index.js'
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
            ".",
            "app/assets/third_party",
            "app/assets/js",
            "node_modules"
        ]
    }
};
