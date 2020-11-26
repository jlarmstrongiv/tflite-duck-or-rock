# [Lobe.ai](https://lobe.ai/) with `node-tflite`

This repository contains two implementations of [Lobe.ai](https://lobe.ai/) with `node-tflite`.

The demo model is trained to tell the difference between a rubber duck and a bunch of rocks. All images of rubber ducks and rocks are for educational purposes under Fair Use. If you would like an image changed or removed, please create a github issue.

The `demo-classification-tflite` folder is the export from the Lobe app.

Special thanks to [@seanchas116](https://github.com/seanchas116) for the [first example](https://github.com/seanchas116/node-tflite/issues/6#issuecomment-734071389). See `src/example.ts` and try it out with `npm run example`.

I just refactored the example to show usage with `canvas`, `jimp`, and `sharp`. See `src/index.ts`, `src/model.ts`, and `src/image-converters`. Try it out with `npm run example`.
