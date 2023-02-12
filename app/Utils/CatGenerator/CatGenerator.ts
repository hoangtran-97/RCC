export interface FakeCat {
  imageUrl: string;
  id: string;
}

export const generateFakeCatArray = (numberOfCats = 17, resolution = 800) => {
  const catArray: FakeCat[] = [];
  //since the cat pics are only available from 1 to 16
  for (let i = 1; i < numberOfCats; i++) {
    catArray.push({
      imageUrl: `https://placekitten.com/${resolution}/${resolution}?image=${i}`,
      id: `${i}`,
    });
  }
  return catArray;
};
