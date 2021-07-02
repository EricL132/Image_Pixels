let Jimp = require("jimp");

async function avergeColor() {
  return new Promise((resolve) =>
    Jimp.read("a.jpg")
      .then((image) => {
        let width = image.bitmap.width;
        let height = image.bitmap.height;
        let r = {
          color: 0,
        };
        let g = {
          color: 0,
        };
        let b = {
          color: 0,
        };
        let numPixel = 0;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
            numPixel += 1;
            r.color += pixel.r;
            g.color += pixel.g;
            b.color += pixel.b;
          }
        }
        resolve([
          Math.floor(r.color / numPixel),
          Math.floor(g.color / numPixel),
          Math.floor(b.color / numPixel),
        ]);
      })
      .catch((err) => {
        throw err;
      })
  );
}
async function mostColor() {
  return new Promise((resolve) =>
    Jimp.read("a.jpg")
      .then((image) => {
        let width = image.bitmap.width;
        let height = image.bitmap.height;
        let info = {
          
        }
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
            const color = `${pixel.r},${pixel.g},${pixel.b}`
            
            const objLength = Object.keys(info).length
            if(objLength===0){
              info[`${color}`] = 1
            }
            for(let i of Object.keys(info)){
                if(compareTwoColors(i,color,5)){
                  
                  info[i] +=1
                  break;
                }
                if(i===Object.keys(info)[objLength-1]){
                  
                  info[`${color}`] = 1
                  break;
                }
            }
          }
        }
        resolve([
          info
        ]);
      })
      .catch((err) => {
        throw err;
      })
  );
}

function compareTwoColors(color1,color2,range){
  color1 = color1.split(",")
  color2 = color2.split(",")
  if(parseInt(color2[0])>=color1[0]-range && parseInt(color2[0])<=color1[0]+range && parseInt(color2[1])>=color1[1]-range && parseInt(color2[1])<=color1[1]+range && parseInt(color2[2])>=color1[2]-range && parseInt(color2[0])<=color1[2]+range){
    return true
  }else{
    return false
  }
}

async function b() {
  const a = await mostColor();
  console.log(a);
}

b();
