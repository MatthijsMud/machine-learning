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

/**
 * @summary Indicates in which state the dataset is. Certain actions are only
 * available in a given state.
 */
enum State
{
	/**
	 * @summary Indicates the dataset is being initialized.
	 * @description While initializing a dataset, labels can be added to certain
	 * images.
	 */
	initializing,
	/**
	 *
	 */
	loading,
	/**
	 *
	 */
	complete
};

/**
 *
 */
export default class DataSet
{
	private _state:State;

	/**
	 *
	 */
	private _width:number|undefined;
	private _height:number|undefined;

	private _images:{[key:string]:{labels:Set<string>, image:HTMLImageElement}}

	/**
	 * @param width
	 * @param height
	 */
	public constructor(
		width:number,
		height:number
	)
	{
		this._state = State.initializing;
		this._images = {};

		this._width = width;
		this._height = height;
	}

	/**
	 * @summary Adds the specified data to the set.
	 * @throws
	 */
	public add(label:string, urls:Array<string>):DataSet
	{
		let _this:DataSet = this;
		if (_this._state == State.initializing)
		{
			urls.forEach(function(url)
			{
				if (!(url in _this._images))
				{
					_this._images[url] = { labels: new Set<string>(), image: null };
				}
				_this._images[url].labels.add(label);
			});
			// Allow for chaining calls.
			return _this;
		}
		throw new TypeError("Data can only be added when initializing.");
	}

	/**
	 * @summary Loads a dataset
	 * @description Causes the given dataset to enter the loading state
	 * (`State.loading`). No more data can be added to the dataset at this point.
	 */
	public async load(): Promise<DataSet>
	{
		let _this = this;
		if (this._state == State.initializing)
		{
			this._state = State.loading;
			let promises:Array<Promise<HTMLImageElement>> = [];

			for (let key in this._images)
			{
				promises[promises.length] = loadImage(key).then<HTMLImageElement>(function(result)
				{
					let image = result.image;
					// TODO: Perform checks to make sure the size of the image is correct.
					if (!(image.width === _this._width && image.height === _this._height))
					{
						throw new TypeError("Image dimensions do not match the specifications.");
					}
					_this._images[result.key].image = image;
					return image;
				});
			}
			return Promise.all(promises).then<DataSet>(function()
			{
				_this._state = State.complete;
				return _this;
			});
		}
		throw 1;
	}
}

function loadImage(url:string):Promise<{image: HTMLImageElement, key:string}>
{
	return new Promise(function(resolve, reject)
	{
		let image = new Image();
		image.src = url;
		image.addEventListener("load", function()
		{
			resolve({image: image, key: url});
		});
		image.addEventListener("error", function(e)
		{
			console.error("Could not load " + url);
			reject(e.error);
		});
	});
}
