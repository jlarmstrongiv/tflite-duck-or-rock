import { ImageConverter } from "./image-converter";
import { createCanvas, loadImage } from "canvas";

export default class CanvasConverter implements ImageConverter {
  async getImageInput(size: number, image: Buffer) {
    const canvas = createCanvas(size, size);
    const context = canvas.getContext("2d");
    const canvasImage = await loadImage(image);
    context.drawImage(canvasImage, 0, 0, size, size);
    const data = context.getImageData(0, 0, size, size);

    const inputData = new Float32Array(size * size * 3); // Use Float32Array instead of Uint8Array

    for (let i = 0; i < size * size; ++i) {
      inputData[i * 3] = data.data[i * 4] / 255; // Convert 0...255 int to 0...1 float
      inputData[i * 3 + 1] = data.data[i * 4 + 1] / 255;
      inputData[i * 3 + 2] = data.data[i * 4 + 2] / 255;
    }

    return inputData;
  }
}
