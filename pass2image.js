import process from "process";
import mosaic from "./mosaicVisualHash.js"
import jsSHA from "jssha";
import minimist from "minimist";
import { createCanvas } from "canvas";
import fs from "fs";

function redrawCanvas(password, canvas, params) {
    var shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update(password);
    var hash = shaObj.getHash("BYTES");
    mosaic.display(hash, canvas, params)
}

var argv = minimist(process.argv.slice(2), {
    default: { 'password': '', 'jitter': 3, 'output': './images/test.png' }
});
console.log(argv)

const canvas = createCanvas(256, 256)

redrawCanvas(argv.password, canvas, { jitter: argv.jitter })

const out = fs.createWriteStream(argv.output);
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('The PNG file was created.'))