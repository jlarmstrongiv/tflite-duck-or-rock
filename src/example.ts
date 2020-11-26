// https://github.com/seanchas116/node-tflite/issues/6

import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import { Interpreter } from "node-tflite";

const modelPath = path.resolve(
  __dirname,
  "../demo-classification-tflite/saved_model.tflite"
);
//const imagePath = path.resolve(__dirname, "../rock/optimized-3.4s-1-1.2RiverRock-1.jpg");
const imagePath = path.resolve(
  __dirname,
  "../rubber-duck/optimized-01-rubberduck-hongkong.jpg"
);

function createInterpreter() {
  const modelData = fs.readFileSync(modelPath);
  return new Interpreter(modelData);
}

async function getImageInput(size: number) {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext("2d");
  const image = await loadImage(imagePath);
  context.drawImage(image, 0, 0, size, size);
  const data = context.getImageData(0, 0, size, size);

  const inputData = new Float32Array(size * size * 3); // Use Float32Array instead of Uint8Array

  for (let i = 0; i < size * size; ++i) {
    inputData[i * 3] = data.data[i * 4] / 255; // Convert 0...255 int to 0...1 float
    inputData[i * 3 + 1] = data.data[i * 4 + 1] / 255;
    inputData[i * 3 + 2] = data.data[i * 4 + 2] / 255;
  }

  return inputData;
}

async function invoke() {
  const interpreter = createInterpreter();
  interpreter.allocateTensors();

  const inputData = await getImageInput(224);
  interpreter.inputs[0].copyFrom(inputData);

  interpreter.invoke();

  // get string output
  const outputData = Buffer.alloc(interpreter.outputs[0].byteSize);
  interpreter.outputs[0].copyTo(outputData);
  console.log(outputData.toString());
}

invoke();
