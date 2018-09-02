const path = require("path");

const objWebPackConfig = {
	entry: "./src/ResponseAgent.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundleContentScript.js"
	}
};

module.exports = objWebPackConfig;
