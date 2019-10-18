function countResources(resources) {
  return resources.reduce(
    (countedResources, resource) => {
      countedResources[`${resource}Amount`]++;
      return countedResources;
    },
    {
      brickAmount: 0,
      woolAmount: 0,
      grainAmount: 0,
      lumberAmount: 0,
      oreAmount: 0
    }
  );
}

export default countResources;
