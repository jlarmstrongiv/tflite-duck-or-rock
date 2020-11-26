import Jimp from "jimp";
import { ImageConverter } from "./image-converter";

export default class JimpConverter implements ImageConverter {
  async getImageInput(size: number, image: Buffer) {
    let jimp = await Jimp.read(image);
    jimp = await jimp.cover(size, size);

    const inputData = new Float32Array(size * size * 3); // Use Float32Array instead of Uint8Array

    for (let i = 0; i < size * size; ++i) {
      // loop over every pixel (x, y)
      const remainder = i % size;
      const x = remainder;
      const y = (i - remainder) / size;

      // get pixel color
      const hex = jimp.getPixelColor(x, y);
      const color = Jimp.intToRGBA(hex);

      // save to input data
      inputData[i * 3] = color.r / 255;
      inputData[i * 3 + 1] = color.g / 255;
      inputData[i * 3 + 2] = color.b / 255;
    }

    return inputData;
  }
}
