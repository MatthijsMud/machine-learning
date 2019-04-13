(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@tensorflow/tfjs"));
	else if(typeof define === 'function' && define.amd)
		define(["tensorflow"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@tensorflow/tfjs")) : factory(root["tf"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__tensorflow_tfjs__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/learn.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dataset.ts":
/*!************************!*\
  !*** ./src/dataset.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2019 Matthijs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
;
var DataSet = /** @class */ (function () {
    function DataSet() {
        this._labels = [];
        this._dataPoints = [];
        this._tensor = null;
        this._tensorLabels = null;
    }
    DataSet.prototype.load = function (folder) {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                _this = this;
                return [2 /*return*/, this.loadIndex(folder).then(function (dataPoints) {
                        return __awaiter(this, void 0, void 0, function () {
                            var loadingDataPoints, _i, dataPoints_1, dataPoint;
                            return __generator(this, function (_a) {
                                console.log("Dataset description has been loaded. Start loading the data.");
                                console.groupCollapsed("Started loading files");
                                loadingDataPoints = [];
                                for (_i = 0, dataPoints_1 = dataPoints; _i < dataPoints_1.length; _i++) {
                                    dataPoint = dataPoints_1[_i];
                                    loadingDataPoints[loadingDataPoints.length] = _this.loadDataPoint(folder, dataPoint);
                                }
                                console.groupEnd();
                                return [2 /*return*/, Promise.all(loadingDataPoints).then(function () {
                                        console.log("Finished loading dataset", folder);
                                        _this.asTensor();
                                        return _this;
                                    })];
                            });
                        });
                    })];
            });
        });
    };
    Object.defineProperty(DataSet.prototype, "labels", {
        get: function () {
            return this._labels.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSet.prototype, "tensor", {
        get: function () {
            if (this._tensor !== null) {
                return this._tensor;
            }
            throw new TypeError("Cannot access tensor before it has loaded.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSet.prototype, "tensorLabels", {
        get: function () {
            if (this._tensorLabels !== null) {
                return this._tensorLabels;
            }
            throw new TypeError("Cannot access labels before they have been loaded.");
        },
        enumerable: true,
        configurable: true
    });
    DataSet.prototype.asTensor = function () {
        // This operation expects all images to be the same size.
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var images = [];
        // For each image the application saves whether it belongs to class, or not.
        var labels = [];
        var width = 0;
        var height = 0;
        var _loop_1 = function (dataPoint) {
            width = dataPoint.image.width;
            height = dataPoint.image.height;
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(dataPoint.image, 0, 0);
            var data = ctx.getImageData(0, 0, width, height).data;
            // Create a grayscale image with the same dimensions.
            var image = new Array(height);
            for (var x = 0; x < width; ++x) {
                image[x] = new Array(height);
                for (var y = 0; y < height; ++y) {
                    var index = y * width + x;
                    // RGBA image to grayscale image. Since the input images should
                    // already be grayscale images, each channel (aside from transparity)
                    // should be the same value. Pick red.
                    image[x][y] = [data[index * 4]];
                }
            }
            images.push(image);
            labels.push(this_1._labels.map(function (label) {
                return dataPoint.labels.indexOf(label) !== -1 ? 1 : 0;
            }));
        };
        var this_1 = this;
        for (var _i = 0, _a = this._dataPoints; _i < _a.length; _i++) {
            var dataPoint = _a[_i];
            _loop_1(dataPoint);
        }
        this._tensor = tf.tensor(images);
        this._tensorLabels = tf.tensor(labels);
        return this._tensor;
    };
    DataSet.prototype.loadIndex = function (folder) {
        return new Promise(function (resolve, reject) {
            var loader = new XMLHttpRequest();
            loader.addEventListener("load", function () {
                try {
                    console.log(loader.response);
                    resolve(loader.response);
                }
                catch (e) {
                    reject(e);
                }
            });
            loader.addEventListener("error", function () {
                reject();
            });
            loader.responseType = "json";
            loader.open("GET", [folder, "index.json"].join("/"));
            loader.send();
        });
    };
    DataSet.prototype.loadDataPoint = function (folder, dataPoint) {
        var _this = this;
        console.log("Start loading", dataPoint.name);
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.addEventListener("load", function () {
                dataPoint.image = image;
                for (var _i = 0, _a = dataPoint.labels; _i < _a.length; _i++) {
                    var label = _a[_i];
                    if (_this._labels.indexOf(label) === -1) {
                        _this._labels.push(label);
                    }
                }
                _this._dataPoints.push(dataPoint);
                resolve(dataPoint);
            });
            image.addEventListener("error", function (e) {
                reject("Failed to load " + image.src);
            });
            image.src = [folder, dataPoint.name].join("/");
        });
    };
    return DataSet;
}());
exports.default = DataSet;
;


/***/ }),

/***/ "./src/learn.ts":
/*!**********************!*\
  !*** ./src/learn.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2019 Matthijs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var dataset_1 = __webpack_require__(/*! ./dataset */ "./src/dataset.ts");
var model_1 = __webpack_require__(/*! ./model */ "./src/model.ts");
/**
 * @brief Shuffles the provided array (in place).
 */
function shuffle(array) {
    var size = array.length;
    for (var i = 0; i < size; ++i) {
        var temp = array[i];
        var other = Math.floor(Math.random() * size);
        array[i] = array[other];
        array[other] = temp;
    }
}
new dataset_1.default().load("data/bolt_sideways").then(function (set) {
    return __awaiter(this, void 0, void 0, function () {
        var temp, numberOfTrainings, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(set.labels);
                    temp = tf.tidy(function () {
                        var size = set.tensor.shape[0];
                        var indices = Array.from(new Array(size), function (_, i) { return i; });
                        shuffle(indices);
                        console.log("Shuffled the indices", indices);
                        var images = [];
                        var labels = [];
                        var textLabels = [];
                        indices.forEach(function (index, i) {
                            images[i] = tf.gather(set.tensor, [index]);
                            labels[i] = tf.gather(set.tensorLabels, [index]);
                            textLabels[i] = set.labels[index];
                        });
                        return { data: tf.concat(images), sparseLabels: tf.concat(labels), textLabels: textLabels };
                    });
                    console.log("Shuflfed labels", temp.textLabels);
                    console.log("", tf.memory());
                    numberOfTrainings = 0;
                    model = new model_1.default(temp.data.shape.slice(1, 4), set.labels.length);
                    model.compile({
                        optimizer: "rmsprop",
                        loss: "categoricalCrossentropy",
                        metrics: ["accuracy"]
                    });
                    return [4 /*yield*/, model.fit(temp.data, temp.sparseLabels, {
                            shuffle: true,
                            epochs: 100,
                            batchSize: 32,
                            validationSplit: 0.3,
                            callbacks: {
                                onBatchEnd: function (batch, logs) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    numberOfTrainings++;
                                                    console.log("Trained", numberOfTrainings, "times");
                                                    tf.tidy(function () {
                                                        model.predict(set.tensor.gather([0])).data().then(function (predictions) {
                                                            console.groupCollapsed("Predictions for", temp.textLabels[0]);
                                                            predictions.forEach(function (prediction, index) {
                                                                console.log(temp.textLabels[index], (prediction * 100).toFixed(2) + "%");
                                                            });
                                                            console.groupEnd();
                                                            //console.log(data);
                                                        });
                                                    });
                                                    return [4 /*yield*/, tf.nextFrame()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}).catch(function (reason) {
    console.error("Failed to load dataset.", reason);
});
/*
new DataSet(IMAGE_WIDTH, IMAGE_HEIGHT)
.add("nut", PathGenerator("data/nut_sideways", FULL_CIRCLE / STEP_SIZE))
.add("nut", PathGenerator("data/nut_top", FULL_CIRCLE / STEP_SIZE))
.add("nut", PathGenerator("data/nut_bottom", FULL_CIRCLE / STEP_SIZE))
.add("bolt", PathGenerator("data/bolt_sideways", FULL_CIRCLE / STEP_SIZE))
.add("bolt", PathGenerator("data/bolt_top", FULL_CIRCLE / STEP_SIZE))
.add("bolt", PathGenerator("data/bolt_bottom", FULL_CIRCLE / STEP_SIZE))
.load().then(function(dataset:DataSet)
{
    console.log(dataset);
    let finished = document.createElement("div");
    finished.innerHTML = "Finished";
    document.body.appendChild(finished);
})
.catch(function(reason:any)
{
    console.error(reason);
});
*/
/**
 * @summary Generates a number of urls based on the parameters.
 * @description The path is generated by appending numbers (padded with `0`) to
 * the folder location. In addition to a `".png"` extension.
 *
 * The number that is appended starts at 1, and is incremented up to (including)
 * the specified count. For example`"0001.png"`, `"0002.png"`, ..., `"NNNN.png"`.
 * @param folder Path to the folder that contains the images.
 * @param count Number of different paths to generate.
 */
function PathGenerator(folder, count) {
    return Array.apply(null, { length: count }).map(function (_, index) {
        return folder + "/" + (Array(5).join("0") + (1 + index)).slice(-4) + ".png";
    });
}


/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2019 Matthijs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(shape, numberOfLabels) {
        var _this = _super.call(this) || this;
        _this.add(tf.layers.conv2d({
            // Our tensor is a list of different images. Its first dimesion is the
            // number of images stored in it, which should be ignored here.
            inputShape: shape,
            // Kernels are typically odd (1, 3, 5, ...) since this works better for
            // centering on the "pixel" to which they apply.
            kernelSize: 3,
            filters: 16,
            activation: "relu"
        }));
        _this.add(tf.layers.maxPool2d({ poolSize: 2, strides: 2 }));
        _this.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: "relu" }));
        _this.add(tf.layers.maxPool2d({ poolSize: 2, strides: 2 }));
        _this.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: "relu" }));
        _this.add(tf.layers.flatten({}));
        _this.add(tf.layers.dense({ units: 64, activation: "relu" }));
        _this.add(tf.layers.dense({ units: numberOfLabels, activation: "softmax" }));
        return _this;
    }
    return Model;
}(tf.Sequential));
exports.default = Model;
;


/***/ }),

/***/ "@tensorflow/tfjs":
/*!**************************************************************************************************************!*\
  !*** external {"commonjs":"@tensorflow/tfjs","commonjs2":"@tensorflow/tfjs","amd":"tensorflow","root":"tf"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__tensorflow_tfjs__;

/***/ })

/******/ });
});
//# sourceMappingURL=learn.js.map