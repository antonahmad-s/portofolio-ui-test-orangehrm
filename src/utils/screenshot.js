const fs=require("fs");
const path=require("path");

async function captureScreenshot(driver,name){
  const dir=path.resolve("reports/screenshots");
  fs.mkdirSync(dir,{recursive:true});
  const file=path.join(dir,name.replace(/[^a-z0-9-_]/gi,"_")+".png");
  fs.writeFileSync(file,await driver.takeScreenshot(),"base64");
  return file;
}

module.exports={captureScreenshot};