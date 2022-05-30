import fs from "fs";
import superagent from "superagent";

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("Coulnt find file");
      }
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Couldnt write the file");
      resolve("success");
    });
  });
};
/*promises with async await syntax*/
const getDogPicture = async () => {
  const data = await readFilePromise("dog.txt");
  console.log(`${data}`);
  const result = await superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(result.body.message);
  await writeFilePromise("dog-image.txt", result.body.message);
  return "file saved";
};
getDogPicture().then((result) => {
  console.log(result);
});

/*
function with promises and .then syntax
readFilePromise("dog.txt")
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise("dog-image.txt", res.body.message);
  })
  .then(() => {
    console.log("saved file");
  });
*/
