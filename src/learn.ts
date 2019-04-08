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

import DataSet from "./dataset"
import Model from "./model"

/**
 * @brief Shuffles the provided array (in place).
 */
function shuffle(array:any[])
{
	const size = array.length;
	for(let i=0; i<size; ++i)
	{
		let temp = array[i];
		const other = Math.floor(Math.random() * size);
		array[i] = array[other];
		array[other] = temp;
	}
}

new DataSet().load("data/bolt_sideways").then(async function(set)
{
	console.log(set.labels);
	var tensor = set.tensor;
	let images = tensor.split(tensor.shape[0], 0);
	tensor = tf.tidy(function()
	{
		let images = tensor.split(tensor.shape[0], 0);
		shuffle(images);
		return tf.concat(images);
	});
	
	console.log(tf.memory());
	
	let numberOfTrainings = 0;
	
	const model = new Model(tensor.shape.slice(1,4) as [number,number,number], set.labels.length);
	model.compile({
		optimizer: "rmsprop",
		loss: "categoricalCrossentropy",
		metrics: ["accuracy"]
	});
	await model.fit(tensor, tf.tensor([[],[],[]]), {
		callbacks: {
			onBatchEnd: async function(batch, logs)
			{
				numberOfTrainings++;
				console.log("Trained", numberOfTrainings, "times");
				await tf.nextFrame();
			}
		}
	});
	
}).catch(function(reason:any)
{
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
function PathGenerator(folder:string, count:number):Array<string>
{
	return Array.apply(null, {length:count}).map(function(_:any, index:number)
	{
		return folder + "/"+ (Array(5).join("0") + (1 + index)).slice(-4) + ".png";
	});
}
