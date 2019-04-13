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
	let temp = tf.tidy(function()
	{
		const size = set.tensor.shape[0];
		let indices = Array.from(new Array(size), (_,i)=>i);
		shuffle(indices);
		console.log("Shuffled the indices", indices);
		
		const images:Array<tf.Tensor> = [];
		const labels:Array<tf.Tensor> = [];
		const textLabels:Array<string> = [];
		indices.forEach(function(index, i)
		{
			images[i] = tf.gather(set.tensor, [index]);
			labels[i] = tf.gather(set.tensorLabels, [index]);
			textLabels[i] = set.labels[index];
		});
		return { data: tf.concat(images), sparseLabels:tf.concat(labels), textLabels: textLabels};
	});
	console.log("Shuflfed labels", temp.textLabels);
	console.log("", tf.memory());
	
	let numberOfTrainings = 0;
	
	const data = temp.data.split(1,0);
	const sparseLabels = temp.sparseLabels.split(1,0);
	const labels = [temp.textLabels.slice(0,data[0].shape[0]), temp.textLabels.slice(data[0].shape[0])];
	
	
	const model = new Model(data[0].shape.slice(1,4) as [number,number,number], set.labels.length);
	model.compile({
		optimizer: "rmsprop",
		loss: "categoricalCrossentropy",
		metrics: ["accuracy"]
	});
	await model.fit(data[0], sparseLabels[0], {
		shuffle: true,
		epochs: 100,
		batchSize: 32,
		validationSplit: 0.3,
		callbacks: {
			onBatchEnd: async function(batch, logs)
			{
				numberOfTrainings++;
				console.log("Trained", numberOfTrainings, "times");
				
				
				console.groupCollapsed("Predictions");
				labels[0].forEach(function(label, index)
				{
					tf.tidy(function()
					{
						(model.predict(data[1].gather([index])) as tf.Tensor).data().then(function(predictions:Float32Array)
						{
							const interleaved:{likelyhood:number, label:string}[] = [];
							for (let i=0; i<predictions.length;++i)
							{
								interleaved[i] = {likelyhood: predictions[i], label: temp.textLabels[i]}
							}
							interleaved.sort((a, b)=>{return (a.likelyhood - b.likelyhood) * -1});
							
							
							console.groupCollapsed("Predictions for", label);
							interleaved.forEach(function(a)
							{
								
								console.log(a.label, (a.likelyhood * 100).toFixed(2) + "%" );
							});
							console.groupEnd();
							//console.log(data);
						});
					});
					console.groupEnd();
				});
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
