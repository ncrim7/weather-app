import {watch} from 'node:fs';

console.log('watching for file changes...');
watch("./watch.txt", (eventType, filename) => {
    console.log("------------------------------")
    console.log(`event type is: ${eventType}`);
    if (filename) {
        console.log(`filename is: ${filename}`);
    }
});