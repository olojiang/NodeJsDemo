/**
 * Created by Hunter on 3/27/2015.
 */
// Construct directly.
var buf = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
console.info(buf);

// Access by index
console.info(buf[1]);
console.info(buf[1].toString());

// Length
console.info("length:", buf.length);

// Change by index
buf[1] = 0x6f;

// To String
console.info("Changed buf:", buf.toString('utf-8'));

// Construct from String
var buf2 = new Buffer('Hello World', 'utf-8');
console.info("buf2:", buf2.toString());

// slice will return a new index
var sliceBuf = buf2.slice(2);
console.info("sliceBuf:", sliceBuf.toString());

// slice is just use pointer, so change it will change original buffer.
sliceBuf[0] = 0x6f;
console.info("Changed buf2:", buf2.toString());
console.info("Changed sliceBuf:", sliceBuf.toString());

// copy need to be down by create a new buffer
var buf3 = new Buffer(buf2.length);
buf2.copy(buf3);  // source => target
buf3[2] = 0x6c;

console.info("buf2:", buf2);
console.info("buf3 copied from buf2:", buf3);