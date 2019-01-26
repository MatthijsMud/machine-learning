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
 * @summary Model that will distinguish objects and their orientation.
 * @description This neural network is intended to make a distinction between
 * certain objects and their orientation. Its output is thus unlikely to affect
 * its input in a next iteration. A sequential model should thus suffice.
*/
const model = tf.sequential();

const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;

/**
 * @summary Number of color channels in the provided images.
 * @description The images
 */
const NUMBER_OF_COLOR_CHANNELS = 1;

// Mostly setting up the first layer.
model.add(tf.layers.conv2d({
	// The application works with grayscale images of size 28×28. So only one
	// color layer is used.
	inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, NUMBER_OF_COLOR_CHANNELS],
	kernelSize: 3,
	filters: 16,
	// Clips any values lower than 0.
	activation: "relu"
}));

// Output layer. The result is the likelyhood for the input image to be part of
// each classification. It is assumed that said image is actually part of at
// least one of those classes.
model.add(tf.layers.dense({

	// The application is intended to distinguish between two objects.
	units: 2,
	// Softmax makes it so the totals add up to exactly one. The sets are mutually
	// exclusive after all.
	activation: "softmax"
}));

model.compile({
	optimizer: "rmsprop",
	loss: "categoricalCrossentropy",
  metrics: ["accuracy"]
});

function train(model:tf.Model)
{

}

train(model);
