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

import tf = require("@tensorflow/tfjs");

interface DataPoint
{
	name:string;
	labels:Array<string>;
	image:HTMLImageElement;
};

export default class DataSet
{
	private _labels:Array<string>;
	private _dataPoints:Array<DataPoint>;
	
	private _tensor:tf.Tensor | null;
	private _tensorLabels:tf.Tensor | null;

	public constructor()
	{
		this._labels = [];
		this._dataPoints = [];
		this._tensor = null;
		this._tensorLabels = null;
	}

	public async load(folder:string):Promise<DataSet>
	{
		let _this = this;
		return this.loadIndex(folder).then(async function(dataPoints:Array<DataPoint>):Promise<DataSet>
		{
			console.log("Dataset description has been loaded. Start loading the data.");
			console.groupCollapsed("Started loading files");
			let loadingDataPoints:Array<Promise<DataPoint>> = [];
			for (let dataPoint of dataPoints)
			{
				 loadingDataPoints[loadingDataPoints.length] = _this.loadDataPoint(folder, dataPoint);
			}
			console.groupEnd();
			return Promise.all(loadingDataPoints).then(function()
			{
				console.log("Finished loading dataset", folder);
				_this.asTensor();
				return _this;
			});
		});
	}

	public get labels():Array<string>
	{
		return this._labels.slice();
	}
	
	public get tensor():tf.Tensor
	{
		if (this._tensor !== null)
		{
			return this._tensor;
		}
		throw new TypeError("Cannot access tensor before it has loaded.");
	}
	
	public get tensorLabels():tf.Tensor
	{
		if (this._tensorLabels !== null)
		{
			return this._tensor;
		}
		throw new TypeError("Cannot access labels before they have been loaded.");
	}

	private asTensor():tf.Tensor
	{
		// This operation expects all images to be the same size.
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const images = [];
		// For each image the application saves whether it belongs to class, or not.
		const labels:Array<Array<number>> = [];
		let width = 0;
		let height = 0;

		for(let dataPoint of this._dataPoints)
		{
			width = dataPoint.image.width;
			height = dataPoint.image.height;
			canvas.width = width;
			canvas.height = height;
			ctx.clearRect(0,0,width, height);
			ctx.drawImage(dataPoint.image, 0, 0);
			let data = ctx.getImageData(0, 0, width, height).data;
			// Create a grayscale image with the same dimensions.
			let image = new Array<Array<Array<number>>>(height);
			for(let x=0; x<width; ++x)
			{
				image[x] = new Array<Array<number>>(height);
				for(let y=0; y<height; ++y)
				{
					let index = y*width + x;
					// RGBA image to grayscale image. Since the input images should
					// already be grayscale images, each channel (aside from transparity)
					// should be the same value. Pick red.
					image[x][y] = [data[index*4]];
				}
			}
			images.push(image);
			let imageLabels:Array<number> = Array<number>(this._labels.length);
			for (let label of dataPoint.labels)
			{
				imageLabels[this._labels.indexOf(label)] = 1;
			}
			labels.push(imageLabels);
		}
		this._tensor = tf.tensor(images);
		this._tensorLabels = tf.tensor(labels);
		return this._tensor;
	}

	private loadIndex(folder:string):Promise<Array<DataPoint>>
	{
		return new Promise(function(resolve, reject)
		{
			let loader = new XMLHttpRequest();
			loader.addEventListener("load", function()
			{
				try
				{
					console.log(loader.response);
					resolve(loader.response as Array<DataPoint>);
				}
				catch(e)
				{
					reject(e);
				}
			});
			loader.addEventListener("error", function()
			{
				reject();
			});
			loader.responseType = "json";
			loader.open("GET", [folder, "index.json"].join("/"));
			loader.send();
		});
	}

	private loadDataPoint(folder:string, dataPoint:DataPoint):Promise<DataPoint>
	{
		let _this = this;

		console.log("Start loading", dataPoint.name);
		return new Promise(function(resolve, reject)
		{
			let image = new Image();
			image.addEventListener("load", function()
			{
				dataPoint.image = image;
				for(let label of dataPoint.labels)
				{
					if (_this._labels.indexOf(label) === -1)
					{
						_this._labels.push(label);
					}
				}
				_this._dataPoints.push(dataPoint);
				resolve(dataPoint);
			});
			image.addEventListener("error", function(e)
			{
				reject("Failed to load " + image.src);
			});
			image.src = [folder, dataPoint.name].join("/");
		});
	}
};
