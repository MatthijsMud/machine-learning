// Mostly following the instructions in the documentation of webpack.
// https://webpack.js.org/guides/typescript/#src/components/Sidebar/Sidebar.jsx

var path = require("path");

module.exports = {
	// Specify all different entry points that should get compiled to a separate
	// output file.
	entry: {
		learn: "./src/learn.ts"
	},

	output: {
		// Unlike input, output path needs to be absolute... for some reason.
		path: path.resolve(__dirname, "built"),
		// The "[name]" part gets substituted by each of the entry points.
		filename:"[name].js",
		// Makes it so the output can be used
		libraryTarget: "umd"
		// The option "name" is deliberately not used to make the resulting amd
		// module anonymous.
	},

	// Enables certain features that make it easier to debug the code, while also
	// disabling optimizations that would make it harder to debug.
	mode: "development",
	// Maps symbols in the output file to the source files, so runtime errors show
	// the correct line.
	devtool: "source-map",

	// Certain dependencies of the project don't need to be included in the build.
	// This typically applies for libraries that are already built, and might be
	// shared (or cached). This keeps the output file smaller.
	externals: [ // Array to allow different methods to specify externals.
		{
			// Tensorflow is
			"@tensorflow/tfjs": {
				// commonjs(2) use the node dependencies.
				commonjs: "@tensorflow/tfjs",
				commonjs2: "@tensorflow/tfjs",
				// AMD uses the filename, and can be mapped.
				amd: "tensorflow",
				// Name under which dependency is available on the global object.
				root: "tf"
			}
		}
	],
	module: {
		rules: [
			{
				// If a file is provided with either [.ts] or [.tsx] as extension,
				// use the [ts-loader] to parse the contents of the file.
				test: /\.tsx?/,
				use: "ts-loader",
				// Contents of any of the [node_modules] should remain there; the entire
				// point is that code doesn't get duplicated.
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		// Webpack only looks at JavaScript files by default. This tells it to
		// look for other file extensions as well. There needs to be a [module]
		// that can handle the given extension.
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [
	]
}
