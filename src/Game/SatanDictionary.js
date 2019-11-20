const resourceNames = {
  brick: "Incienso",
  wool: "Vino",
  grain: "Oro",
  ore: "Vírgenes",
  lumber: "Ternero"
};

const devCardNames = {
  knight: "Llamada de Valefar",
  road_building: "Conjuro de Malphas",
  year_of_plenty: "Regalo de Seire",
  monopoly: "Justicia de Andromalius",
  victory_points: "Beleth"
};

const satanicColors = ["#3c5e66", "#727232", "#fedf89", "#991a19"];

const satanicColorCache = Object.create(null);

const getSatanicColor = nonSatanicColor => {
  if (nonSatanicColor in satanicColorCache)
    return satanicColorCache[nonSatanicColor];

  if (satanicColors.length <= 0) return nonSatanicColor;

  const newColor = satanicColors.shift();
  return (satanicColorCache[nonSatanicColor] = newColor);
};

export { resourceNames, devCardNames, getSatanicColor };
