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

export default class Model extends tf.Sequential
{
	constructor(shape:[number,number,number])
	{
		super()
		this.add(tf.layers.conv2d({
			// Our tensor is a list of different images. Its first dimesion is the
			// number of images stored in it, which should be ignored here.
			inputShape: shape,
			// Kernels are typically odd (1, 3, 5, ...) since this works better for
			// centering on the "pixel" to which they apply.
			kernelSize: 3,
			filters: 16,
			activation:"relu"
		}));
	}
};
