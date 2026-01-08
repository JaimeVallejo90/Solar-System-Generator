"use strict";

const bandInfo = {
  Hot: { key: "Hot", label: "Hot", code: "H", className: "hot" },
  Temperate: {
    key: "Temperate",
    label: "Temperate",
    code: "T",
    className: "temperate",
  },
  Cold: { key: "Cold", label: "Cold", code: "C", className: "cold" },
};
const bandOrder = ["Hot", "Temperate", "Cold"];
const TAU = Math.PI * 2;
const MAP_VIEWBOX_SIZE = 1000;
const MAP_CENTER = MAP_VIEWBOX_SIZE / 2;
const MAP_FOCUS_ZOOM = 1.5;
const SEED_MAX_LENGTH = 16;
const SEED_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

const starTypes = [
  {
    type: "O/B",
    color: "Blue",
    light: "Very bright",
    flora: "Silver/blue",
    skyColor: "White-blue",
    size: "Huge",
    sizeRank: 6,
    hex: "#7fd3ff",
  },
  {
    type: "A",
    color: "White",
    light: "Intense",
    flora: "Pale",
    skyColor: "Pale blue",
    size: "Large",
    sizeRank: 5,
    hex: "#f4f7ff",
  },
  {
    type: "F",
    color: "White-yellow",
    light: "Bright",
    flora: "Light green",
    skyColor: "Vibrant blue",
    size: "Bigger Sun",
    sizeRank: 4,
    hex: "#ffe9b3",
  },
  {
    type: "G",
    color: "Yellow",
    light: "Normal",
    flora: "Green",
    skyColor: "Normal blue",
    size: "Normal Sun",
    sizeRank: 3,
    hex: "#ffd36a",
  },
  {
    type: "K",
    color: "Orange",
    light: "Soft",
    flora: "Red/brown",
    skyColor: "Blue-orange tint",
    size: "Smaller Sun",
    sizeRank: 2,
    hex: "#ff9a4a",
  },
  {
    type: "M",
    color: "Red",
    light: "Dim",
    flora: "Dark/black",
    skyColor: "Red-violet tint",
    size: "Small",
    sizeRank: 1,
    hex: "#ff6a5a",
  },
];

const rockyTables = {
  Hot: [
    {
      planetType: "Venus-like Greenhouse",
      description: "Runaway greenhouse, crushing air, resurfaced crust",
      appearance: "Pale yellow/white, solid cloud deck, no visible surface",
      tectonics: "Dead / None",
      atmosphere: "Thick",
      water: "None",
      references: "Venus",
    },
    {
      planetType: "Hot Volcanic World",
      description: "Extreme geothermal activity, unstable terrain",
      appearance: "Dark red/black, glowing lava scars, heavy haze",
      tectonics: "Active",
      atmosphere: "Thick / Thin",
      water: "None",
      references: "Io (scaled), Mustafar (hard take)",
    },
    {
      planetType: "Hot Desert World",
      description: "Dry, eroded world; thin air, high irradiation",
      appearance: "Tan/ochre with rust tones, bright deserts",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "None",
      references: "Hot Mars analogs",
    },
    {
      planetType: "Hot Ocean World",
      description: "Global ocean, intense storms; little/no land",
      appearance: "Deep blue with bright spiral storms",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Ocean exoplanet archetype",
    },
    {
      planetType: "Dry Tectonic World",
      description: "Active crust but water-starved; harsh hydrology",
      appearance: "Brown continents, pale dust veils",
      tectonics: "Active",
      atmosphere: "Thin",
      water: "Partial",
      references: "Arrakis (realistic interpretation)",
    },
    {
      planetType: "Steamy Jungle World",
      description: "Hot, wet, biologically rich; heavy rainfall",
      appearance: "Deep green under white cloud belts",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Partial",
      references: "Pandora (Avatar)",
    },
  ],
  Temperate: [
    {
      planetType: "Temperate Airless World",
      description: "Rocky body with no air; surface locked in geology",
      appearance: "Grey/black, heavily cratered, sharp contrast",
      tectonics: "None",
      atmosphere: "None",
      water: "None",
      references: "Moon (if in temperate orbit)",
    },
    {
      planetType: "Mars-like World",
      description: "Cold, dry fossil continents; thin air",
      appearance: "Rust red with pale caps; dust storms",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "None",
      references: "Mars, The Expanse (hard habitat)",
    },
    {
      planetType: "Highland Fossil World",
      description: "Old continents, thick air; limited water cycles",
      appearance: "Brown-grey highlands, scattered pale seas",
      tectonics: "Dead",
      atmosphere: "Thick",
      water: "Partial",
      references: "Speculative old Earth worlds",
    },
    {
      planetType: "Ocean World",
      description: "Deep global ocean; stable hydrosphere",
      appearance: "Dark blue, few/no continents",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Ocean exoplanet archetype",
    },
    {
      planetType: "Dry Earth Analog",
      description: "Earth-like but water-poor; strong regional extremes",
      appearance: "Green-brown continents, bright deserts",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Partial",
      references: "Semi-arid Earth variants",
    },
    {
      planetType: "Earth-like World",
      description: "Active geology, stable oceans; broad habitability",
      appearance: "Blue oceans, green land, white clouds",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Earth",
    },
  ],
  Cold: [
    {
      planetType: "Frozen Airless World",
      description: "Icy rock with no air; static surface",
      appearance: "White-grey ice with dark rock patches",
      tectonics: "None",
      atmosphere: "None",
      water: "None",
      references: "Pluto / outer moons",
    },
    {
      planetType: "Frozen Fossil World",
      description: "Dead geology; thin air; water locked away",
      appearance: "Pale rust/brown with white caps",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "None",
      references: "Mars-like (farther out)",
    },
    {
      planetType: "Cold Desert World",
      description: "Thin air; ice limited; dry, harsh terrain",
      appearance: "Pale tan/grey with bright poles",
      tectonics: "Dead",
      atmosphere: "Thin",
      water: "Partial",
      references: "Antarctic Mars analogs",
    },
    {
      planetType: "Titan-like World",
      description: "Thick haze; surface liquids are hydrocarbons",
      appearance: "Orange/gold haze; dark seas",
      tectonics: "None",
      atmosphere: "Thick",
      water: "Partial",
      references: "Titan",
    },
    {
      planetType: "Ice World",
      description: "Frozen shell with internal ocean; active cracking",
      appearance: "White with blue fracture networks",
      tectonics: "Active",
      atmosphere: "Thin",
      water: "Partial",
      references: "Europa",
    },
    {
      planetType: "Cold Ocean World",
      description: "Global ocean under thick ice; strong circulation",
      appearance: "White-blue ice shell, subtle clouding",
      tectonics: "Active",
      atmosphere: "Thick",
      water: "Ocean",
      references: "Enceladus/Europa (scaled)",
    },
  ],
};

const expandD6Table = (entries) => [
  entries[0],
  entries[0],
  entries[1],
  entries[1],
  entries[2],
  entries[2],
];

const smallMoonTables = {
  Hot: expandD6Table([
    {
      archetype: "Overheated Rocky Moon",
      description: "Strong solar + tidal stress, fractured crust",
      atmosphere: "Exosphere",
      water: "None",
      geology: "Fractured / stressed",
      appearance: "Dark grey with glowing fissures",
      references: "Inner Jovian moons",
    },
    {
      archetype: "Extreme Volcanic Moon",
      description: "Massive tidal heating, constant resurfacing",
      atmosphere: "None",
      water: "None",
      geology: "Extremely active",
      appearance: "Bright yellow/orange",
      references: "Io (inner-orbit case)",
    },
    {
      archetype: "Transient Atmosphere Moon",
      description: "Volcanic outgassing creates unstable air",
      atmosphere: "Unstable / trace",
      water: "Vapor only",
      geology: "Active",
      appearance: "Brown-grey with hazy plumes",
      references: "Titan (borderline case)",
    },
  ]),
  Temperate: expandD6Table([
    {
      archetype: "Dry Rocky Moon",
      description: "Small rocky body, little internal energy",
      atmosphere: "None",
      water: "None",
      geology: "Weak or dead",
      appearance: "Grey / brown, eroded",
      references: "Phobos, Deimos",
    },
    {
      archetype: "Tidally Active Volcanic Moon",
      description: "Strong tidal heating, extreme volcanism",
      atmosphere: "None",
      water: "None",
      geology: "Extremely active",
      appearance: "Yellow-orange with dark lava regions",
      references: "Io",
    },
    {
      archetype: "Seasonal Ice-Water Moon",
      description: "Mixed ice and liquid water, variable cycles",
      atmosphere: "Very thin",
      water: "Seasonal / subsurface",
      geology: "Moderate (tidal + solar)",
      appearance: "Grey-white with dark patches",
      references: "Triton (analogue)",
    },
  ]),
  Cold: expandD6Table([
    {
      archetype: "Inactive Ice Moon",
      description: "Small, frozen body with no internal heat",
      atmosphere: "None",
      water: "Solid ice",
      geology: "Geologically dead",
      appearance: "Pale white / grey, heavily cratered",
      references: "Callisto",
    },
    {
      archetype: "Subsurface Ocean Moon",
      description: "Thick ice shell with liquid ocean below",
      atmosphere: "None",
      water: "Subsurface ocean",
      geology: "Internally active (tidal)",
      appearance: "White with dark cracks or streaks",
      references: "Europa, Enceladus",
    },
    {
      archetype: "Cold Rocky Moon",
      description: "Rock-ice mix, minimal activity",
      atmosphere: "None",
      water: "Frost / traces",
      geology: "Fossil",
      appearance: "Grey-blue with ice patches",
      references: "Outer system moons",
    },
  ]),
};

const gasGiantTypes = {
  Hot: {
    type: "Hot Gas Giant",
    description: "Strongly irradiated giant close to its star",
    appearance: "Bright yellows and whites, distorted cloud bands",
  },
  Temperate: {
    type: "Temperate Gas Giant",
    description: "Stable giant in mid-system orbit",
    appearance: "Brown and white banding, classic appearance",
  },
  Cold: {
    type: "Cold Gas Giant",
    description: "Distant, cold giant rich in volatiles",
    appearance: "Pale blues and whites, diffuse clouds",
  },
};

const asteroidTables = {
  Hot: [
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
    {
      composition: "Metallic / rocky",
      surface: "Fractured, irradiated",
      appearance: "Dark grey, metallic shine",
    },
  ],
  Temperate: [
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
    {
      composition: "Rocky with minor volatiles",
      surface: "Stable, eroded",
      appearance: "Brown-grey, dusty",
    },
  ],
  Cold: [
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
    {
      composition: "Icy-rocky mix",
      surface: "Frozen",
      appearance: "Pale grey / bluish",
    },
  ],
};

let rng = Math.random;
let currentSeed = "";
let currentSeedIsRandom = true;
let rollCount = 0;
let focusLookup = new Map();
let currentSystem = null;

const xmur3 = (input) => {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i += 1) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
};

const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), 1 | t);
  t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const makeSeed = () => {
  let seed = "";
  for (let i = 0; i < SEED_MAX_LENGTH; i += 1) {
    seed += SEED_CHARS[Math.floor(Math.random() * SEED_CHARS.length)];
  }
  return seed;
};

const setSeed = (seedInput) => {
  const trimmed = seedInput ? seedInput.trim() : "";
  const isRandom = trimmed.length === 0;
  const normalized = isRandom
    ? makeSeed()
    : trimmed.slice(0, SEED_MAX_LENGTH);
  const seedGen = xmur3(normalized);
  rng = mulberry32(seedGen());
  currentSeed = normalized;
  currentSeedIsRandom = isRandom;
  rollCount = 0;
  return normalized;
};

const rand = () => rng();

const rollD6 = () => {
  rollCount += 1;
  return Math.floor(rand() * 6) + 1;
};

const rollStarCount = () => {
  const roll = rollD6();
  if (roll <= 4) {
    return 1;
  }
  if (roll === 5) {
    return 2;
  }
  return 3;
};

const rollMajorBodyCount = () => rollD6() + 2;
const rollSmallMoonCount = () => Math.floor((rollD6() - 1) / 2);
const rollGasGiantElementCount = () => rollD6() + 2;
const rollMajorAsteroidCount = () => rollD6() - 1;

const bandKeyFromRoll = (roll) => {
  if (roll <= 2) {
    return "Hot";
  }
  if (roll <= 4) {
    return "Temperate";
  }
  return "Cold";
};

const elementTypeFromRoll = (roll) => {
  if (roll <= 2) {
    return { key: "belt", label: "Asteroid Belt" };
  }
  if (roll <= 4) {
    return { key: "gas", label: "Gas Giant" };
  }
  return { key: "rocky", label: "Rocky Planet" };
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const randomBetween = (min, max) => min + rand() * (max - min);
const orderBodies = (bodies) =>
  [...bodies].sort((a, b) => {
    const bandDelta = bandOrder.indexOf(a.bandKey) - bandOrder.indexOf(b.bandKey);
    if (bandDelta !== 0) {
      return bandDelta;
    }
    return a.bandIndex - b.bandIndex;
  });

const generateSmallMoon = (bandKey) => {
  const roll = rollD6();
  return {
    roll,
    orbitAngle: rand() * TAU,
    ...smallMoonTables[bandKey][roll - 1],
  };
};

const generateRockyWorld = (bandKey, withMoons) => {
  const roll = rollD6();
  const entry = rockyTables[bandKey][roll - 1];
  const world = { roll, ...entry, smallMoons: [] };
  if (withMoons) {
    const moonCount = rollSmallMoonCount();
    for (let i = 0; i < moonCount; i += 1) {
      world.smallMoons.push(generateSmallMoon(bandKey));
    }
  }
  return world;
};

const generateAsteroidBelt = (bandKey) => {
  const majorCount = rollMajorAsteroidCount();
  const asteroids = [];
  for (let i = 0; i < majorCount; i += 1) {
    const roll = rollD6();
    const entry = asteroidTables[bandKey][roll - 1];
    asteroids.push({
      id: `A${i + 1}`,
      roll,
      orbitAngle: rand() * TAU,
      ...entry,
    });
  }
  return { majorCount, asteroids };
};

const generateGasGiant = (bandKey) => {
  const profile = gasGiantTypes[bandKey];
  const elementCount = rollGasGiantElementCount();
  const rings = [];
  const smallMoons = [];
  const majorMoons = [];

  for (let i = 0; i < elementCount; i += 1) {
    const roll = rollD6();
    if (roll <= 2) {
      rings.push({ empty: bandKey === "Hot" });
    } else if (roll <= 4) {
      smallMoons.push(generateSmallMoon(bandKey));
    } else {
      majorMoons.push(generateRockyWorld(bandKey, false));
    }
  }

  rings.forEach((ring, index) => {
    ring.id = `R${index + 1}`;
  });
  smallMoons.forEach((moon, index) => {
    moon.id = `SM${index + 1}`;
  });
  majorMoons.forEach((moon, index) => {
    moon.id = `MM${index + 1}`;
    if (moon.orbitAngle === undefined) {
      moon.orbitAngle = rand() * TAU;
    }
  });

  return {
    ...profile,
    elementCount,
    rings,
    smallMoons,
    majorMoons,
  };
};

const assignOrbitRadii = (bodies) => {
  const grouped = { Hot: [], Temperate: [], Cold: [] };
  bodies.forEach((body) => grouped[body.bandKey].push(body));
  Object.values(grouped).forEach((list) =>
    list.sort((a, b) => a.bandIndex - b.bandIndex)
  );

  const totalBodies = bodies.length;
  const innerRadius = 120;
  const maxRadius = 460;
  const bandGap = 55;
  const available = maxRadius - innerRadius - bandGap * 2;
  const orbitStep = clamp(available / totalBodies, 32, 85);
  let radius = innerRadius;

  bandOrder.forEach((bandKey) => {
    const bandBodies = grouped[bandKey];
    const bandCount = bandBodies.length;
    const baseAngle = rand() * TAU;
    const stepAngle = bandCount > 0 ? TAU / bandCount : TAU;
    const jitter = stepAngle * 0.25;

    bandBodies.forEach((body, index) => {
      body.orbitRadius = radius;
      body.orbitAngle = baseAngle + stepAngle * index + randomBetween(-jitter, jitter);
      radius += orbitStep;
    });
    radius += bandGap;
  });
};

const buildBeltScatter = (body) => {
  if (!body.belt) {
    return;
  }
  const baseRadius = body.orbitRadius;
  const spread = 12;
  const density = {
    Hot: { base: 70, range: 30 },
    Temperate: { base: 75, range: 30 },
    Cold: { base: 70, range: 30 },
  };
  const bandDensity = density[body.bandKey] || density.Temperate;
  const minorCount = bandDensity.base + Math.floor(rand() * bandDensity.range);
  const scatterPoints = [];

  for (let i = 0; i < minorCount; i += 1) {
    const angle = rand() * TAU;
    const radius = baseRadius + randomBetween(-spread, spread);
    const size = randomBetween(0.9, 2.1);
    scatterPoints.push({ angle, radius, size });
  }

  const majorPoints = body.belt.asteroids.map((asteroid) => {
    const angle = asteroid.orbitAngle ?? rand() * TAU;
    const radius = baseRadius + randomBetween(-spread * 0.6, spread * 0.6);
    return { angle, radius, size: randomBetween(3.4, 4.6) };
  });

  body.belt.scatterPoints = scatterPoints;
  body.belt.majorPoints = majorPoints;
};

const generateSystem = () => {
  const starCount = rollStarCount();
  const stars = [];
  for (let i = 0; i < starCount; i += 1) {
    const roll = rollD6();
    stars.push({ roll, ...starTypes[roll - 1] });
  }

  let primaryIndex = 0;
  stars.forEach((star, index) => {
    if (star.sizeRank > stars[primaryIndex].sizeRank) {
      primaryIndex = index;
    }
  });
  stars.forEach((star, index) => {
    star.isPrimary = index === primaryIndex;
  });

  const starsOrdered = [
    stars[primaryIndex],
    ...stars.filter((_, index) => index !== primaryIndex),
  ];

  const bodyCount = rollMajorBodyCount();
  const bodies = [];
  const bandCounters = { Hot: 0, Temperate: 0, Cold: 0 };

  for (let i = 0; i < bodyCount; i += 1) {
    const bandRoll = rollD6();
    const bandKey = bandKeyFromRoll(bandRoll);
    const typeRoll = rollD6();
    const type = elementTypeFromRoll(typeRoll);
    bandCounters[bandKey] += 1;

    const body = {
      bandKey,
      band: bandInfo[bandKey],
      bandIndex: bandCounters[bandKey],
      id: `${bandInfo[bandKey].code}${bandCounters[bandKey]}`,
      typeKey: type.key,
      typeLabel: type.label,
      rolls: { band: bandRoll, type: typeRoll },
    };

    if (type.key === "rocky") {
      body.rocky = generateRockyWorld(bandKey, true);
    } else if (type.key === "gas") {
      body.gas = generateGasGiant(bandKey);
    } else {
      body.belt = generateAsteroidBelt(bandKey);
    }

    bodies.push(body);
  }

  assignOrbitRadii(bodies);
  bodies.forEach((body) => {
    if (body.typeKey === "belt") {
      buildBeltScatter(body);
    }
  });
  const bodiesOrdered = orderBodies(bodies);

  return {
    stars,
    starsOrdered,
    bodyCount,
    bodies,
    bodiesOrdered,
  };
};

const starRadius = (sizeRank) => 14 + sizeRank * 4;
const bodyRadiusFor = (body) => (body.typeKey === "gas" ? 20 : 11);
const starFocusId = (index) => `STAR-${index + 1}`;

const starOffsets = (count) => {
  if (count === 1) {
    return [[0, 0]];
  }
  if (count === 2) {
    return [
      [0, 0],
      [48, -28],
    ];
  }
  return [
    [0, 0],
    [52, -32],
    [-40, 36],
  ];
};

const buildMinorLightingDefs = (lightId, shadeId, x, y, radius, nx, ny) => {
  const lightFx = x + nx * radius * 0.5;
  const lightFy = y + ny * radius * 0.5;
  const lightR = radius * 1.6;
  const shadeStartX = x + nx * radius * 0.9;
  const shadeStartY = y + ny * radius * 0.9;
  const shadeEndX = x - nx * radius * 0.9;
  const shadeEndY = y - ny * radius * 0.9;

  return `
    <radialGradient id="${lightId}" gradientUnits="userSpaceOnUse" cx="${x.toFixed(
      1
    )}" cy="${y.toFixed(1)}" fx="${lightFx.toFixed(1)}" fy="${lightFy.toFixed(
      1
    )}" r="${lightR.toFixed(1)}">
      <stop offset="0%" stop-color="rgb(255, 255, 255)" stop-opacity="0.5" />
      <stop offset="45%" stop-color="rgb(255, 255, 255)" stop-opacity="0.15" />
      <stop offset="100%" stop-color="rgb(255, 255, 255)" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="${shadeId}" gradientUnits="userSpaceOnUse" x1="${shadeStartX.toFixed(
      1
    )}" y1="${shadeStartY.toFixed(1)}" x2="${shadeEndX.toFixed(
      1
    )}" y2="${shadeEndY.toFixed(1)}">
      <stop offset="0%" stop-color="rgb(0, 0, 0)" stop-opacity="0" />
      <stop offset="60%" stop-color="rgb(0, 0, 0)" stop-opacity="0.16" />
      <stop offset="100%" stop-color="rgb(0, 0, 0)" stop-opacity="0.45" />
    </linearGradient>
  `;
};

const buildSatelliteLayout = (body, x, y) => {
  if (body.typeKey === "rocky") {
    const moons = body.rocky?.smallMoons || [];
    if (moons.length === 0) {
      return null;
    }
    const baseRadius = 16;
    const maxRadius = 36;
    const step =
      moons.length > 1
        ? clamp((maxRadius - baseRadius) / (moons.length - 1), 6, 10)
        : 0;
    const items = moons.map((moon, index) => {
      const orbitRadius = baseRadius + index * step;
      const angle =
        moon.orbitAngle ?? (moon.orbitAngle = rand() * TAU);
      const mx = x + Math.cos(angle) * orbitRadius;
      const my = y + Math.sin(angle) * orbitRadius;
      return {
        kind: "small",
        orbitRadius,
        orbitClass: "satellite-orbit",
        x: mx,
        y: my,
        radius: 2.4,
        moonClass: "satellite-body satellite-body--small",
      };
    });
    return { items };
  }

  if (body.typeKey === "gas") {
    const elements = [];
    body.gas.rings.forEach((ring) =>
      elements.push({ kind: "ring", empty: ring.empty })
    );
    body.gas.smallMoons.forEach((moon) =>
      elements.push({ kind: "small", moon })
    );
    body.gas.majorMoons.forEach((moon) =>
      elements.push({ kind: "major", moon })
    );

    if (elements.length === 0) {
      return null;
    }

    const baseRadius = 26;
    const maxRadius = 78;
    const step =
      elements.length > 1
        ? clamp((maxRadius - baseRadius) / (elements.length - 1), 6, 12)
        : 0;

    const items = elements.map((element, index) => {
      const orbitRadius = baseRadius + index * step;
      const orbitClass =
        element.kind === "ring"
          ? `satellite-orbit satellite-orbit--ring${
              element.empty ? " satellite-orbit--empty" : ""
            }`
          : "satellite-orbit";

      if (element.kind === "ring") {
        return {
          kind: "ring",
          orbitRadius,
          orbitClass,
          empty: element.empty,
        };
      }

      const moon = element.moon;
      const angle =
        moon.orbitAngle ?? (moon.orbitAngle = rand() * TAU);
      const mx = x + Math.cos(angle) * orbitRadius;
      const my = y + Math.sin(angle) * orbitRadius;
      const moonRadius = element.kind === "major" ? 3.4 : 2.6;
      const moonClass =
        element.kind === "major"
          ? "satellite-body satellite-body--major"
          : "satellite-body satellite-body--small";

      return {
        kind: element.kind,
        orbitRadius,
        orbitClass,
        x: mx,
        y: my,
        radius: moonRadius,
        moonClass,
      };
    });

    return { items };
  }

  return null;
};

const renderBeltCloud = (body, center) => {
  if (!body.belt) {
    return "";
  }
  if (!body.belt.scatterPoints) {
    buildBeltScatter(body);
  }

  const bandClass = body.bandKey.toLowerCase();
  const scatter = body.belt.scatterPoints || [];
  const majors = body.belt.majorPoints || [];

  const scatterMarkup = scatter
    .map((point) => {
      const x = center + Math.cos(point.angle) * point.radius;
      const y = center + Math.sin(point.angle) * point.radius;
      return `<circle class="asteroid-point" cx="${x.toFixed(
        1
      )}" cy="${y.toFixed(1)}" r="${point.size.toFixed(2)}" />`;
    })
    .join("");

  const majorDefs = [];
  const majorMarkup = majors
    .map((point, index) => {
      const x = center + Math.cos(point.angle) * point.radius;
      const y = center + Math.sin(point.angle) * point.radius;
      const radius = point.size;
      const dx = center - x;
      const dy = center - y;
      const distance = Math.hypot(dx, dy) || 1;
      const nx = dx / distance;
      const ny = dy / distance;
      const lightId = `asteroid-light-${body.id}-${index + 1}`;
      const shadeId = `asteroid-shade-${body.id}-${index + 1}`;
      majorDefs.push(
        buildMinorLightingDefs(lightId, shadeId, x, y, radius, nx, ny)
      );
      return `
        <g class="asteroid-major">
          <circle class="asteroid-point asteroid-point--major" cx="${x.toFixed(
            1
          )}" cy="${y.toFixed(1)}" r="${radius.toFixed(2)}" />
          <circle class="asteroid-shade" cx="${x.toFixed(
            1
          )}" cy="${y.toFixed(1)}" r="${radius.toFixed(
            2
          )}" fill="url(#${shadeId})" />
          <circle class="asteroid-highlight" cx="${x.toFixed(
            1
          )}" cy="${y.toFixed(1)}" r="${radius.toFixed(
            2
          )}" fill="url(#${lightId})" />
        </g>
      `;
    })
    .join("");

  const majorDefsMarkup =
    majorDefs.length > 0 ? `<defs>${majorDefs.join("")}</defs>` : "";

  return `<g class="belt-cloud belt-cloud--${bandClass} focus-dim" data-focus-id="${body.id}">${majorDefsMarkup}${scatterMarkup}${majorMarkup}</g>`;
};

const renderSatellites = (body, x, y, center) => {
  const layout = buildSatelliteLayout(body, x, y);
  if (!layout) {
    return "";
  }

  const moonDefs = [];
  const markup = layout.items
    .map((item, index) => {
      const orbitMarkup = `<circle class="${item.orbitClass}" cx="${x.toFixed(
        1
      )}" cy="${y.toFixed(1)}" r="${item.orbitRadius.toFixed(1)}" />`;

      if (item.kind === "ring") {
        return orbitMarkup;
      }

      const dx = center - item.x;
      const dy = center - item.y;
      const distance = Math.hypot(dx, dy) || 1;
      const nx = dx / distance;
      const ny = dy / distance;
      const moonKey = `${body.id}-${item.kind}-${index + 1}`;
      const lightId = `moon-light-${moonKey}`;
      const shadeId = `moon-shade-${moonKey}`;
      moonDefs.push(
        buildMinorLightingDefs(
          lightId,
          shadeId,
          item.x,
          item.y,
          item.radius,
          nx,
          ny
        )
      );
      const sizeClass = item.kind === "major" ? "major" : "small";
      return `
        ${orbitMarkup}
        <g class="satellite satellite--${sizeClass}">
          <circle class="${item.moonClass}" cx="${item.x.toFixed(
            1
          )}" cy="${item.y.toFixed(1)}" r="${item.radius}" />
          <circle class="satellite-shade" cx="${item.x.toFixed(
            1
          )}" cy="${item.y.toFixed(
            1
          )}" r="${item.radius}" fill="url(#${shadeId})" />
          <circle class="satellite-highlight" cx="${item.x.toFixed(
            1
          )}" cy="${item.y.toFixed(
            1
          )}" r="${item.radius}" fill="url(#${lightId})" />
        </g>
      `;
    })
    .join("");

  const defsMarkup =
    moonDefs.length > 0 ? `<defs>${moonDefs.join("")}</defs>` : "";
  return `<g class="satellites">${defsMarkup}${markup}</g>`;
};

const renderShadows = (bodies, center) => {
  let defsMarkup = "";
  let linesMarkup = "";

  const appendShadow = (id, x1, y1, x2, y2, width, strength = 1) => {
    const startOpacity = (0.55 * strength).toFixed(2);
    const midOpacity = (0.18 * strength).toFixed(2);
    defsMarkup += `
      <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1.toFixed(
        1
      )}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(
        1
      )}" y2="${y2.toFixed(1)}">
        <stop offset="0%" stop-color="rgb(4, 8, 16)" stop-opacity="${startOpacity}" />
        <stop offset="60%" stop-color="rgb(4, 8, 16)" stop-opacity="${midOpacity}" />
        <stop offset="100%" stop-color="rgb(4, 8, 16)" stop-opacity="0" />
      </linearGradient>
    `;

    linesMarkup += `<line class="shadow-line" x1="${x1.toFixed(
      1
    )}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(
      1
    )}" stroke="url(#${id})" stroke-width="${width.toFixed(1)}" />`;
  };

  bodies.forEach((body) => {
    if (body.typeKey === "rocky" || body.typeKey === "gas") {
      const angle = body.orbitAngle;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const bodyRadius = bodyRadiusFor(body);
      const length = body.typeKey === "gas" ? 110 : 80;
      const x = center + dirX * body.orbitRadius;
      const y = center + dirY * body.orbitRadius;
      const gradId = `shadow-${body.id}`;

      appendShadow(
        gradId,
        x,
        y,
        x + dirX * length,
        y + dirY * length,
        bodyRadius * 2,
        1
      );

      const layout = buildSatelliteLayout(body, x, y);
      if (layout) {
        layout.items.forEach((item, index) => {
          if (item.kind === "ring") {
            return;
          }
          const dx = item.x - center;
          const dy = item.y - center;
          const distance = Math.hypot(dx, dy) || 1;
          const sx = dx / distance;
          const sy = dy / distance;
          const moonLength = item.radius * 6 + 4;
          const moonShadowId = `shadow-${body.id}-sat-${index + 1}`;
          appendShadow(
            moonShadowId,
            item.x,
            item.y,
            item.x + sx * moonLength,
            item.y + sy * moonLength,
            item.radius * 2,
            0.6
          );
        });
      }
    }

    if (body.typeKey === "belt") {
      if (!body.belt?.majorPoints) {
        buildBeltScatter(body);
      }
      const majors = body.belt?.majorPoints || [];
      majors.forEach((point, index) => {
        const x = center + Math.cos(point.angle) * point.radius;
        const y = center + Math.sin(point.angle) * point.radius;
        const dx = x - center;
        const dy = y - center;
        const distance = Math.hypot(dx, dy) || 1;
        const dirX = dx / distance;
        const dirY = dy / distance;
        const length = point.size * 6 + 4;
        const shadowId = `shadow-${body.id}-asteroid-${index + 1}`;
        appendShadow(
          shadowId,
          x,
          y,
          x + dirX * length,
          y + dirY * length,
          point.size * 2,
          0.5
        );
      });
    }
  });

  return {
    defsMarkup,
    linesMarkup,
  };
};

const renderBodyLighting = (bodies, center) => {
  let defsMarkup = "";

  bodies.forEach((body) => {
    if (body.typeKey !== "rocky" && body.typeKey !== "gas") {
      return;
    }

    const angle = body.orbitAngle;
    const x = center + Math.cos(angle) * body.orbitRadius;
    const y = center + Math.sin(angle) * body.orbitRadius;
    const radius = bodyRadiusFor(body);
    const dx = center - x;
    const dy = center - y;
    const distance = Math.hypot(dx, dy) || 1;
    const nx = dx / distance;
    const ny = dy / distance;
    const lightId = `light-${body.id}`;
    const shadeId = `shade-${body.id}`;

    const lightCx = x;
    const lightCy = y;
    const lightFx = x + nx * radius * 0.45;
    const lightFy = y + ny * radius * 0.45;
    const lightR = radius * 1.15;
    const shadeStartX = x + nx * radius * 0.9;
    const shadeStartY = y + ny * radius * 0.9;
    const shadeEndX = x - nx * radius * 0.9;
    const shadeEndY = y - ny * radius * 0.9;

    defsMarkup += `
      <radialGradient id="${lightId}" gradientUnits="userSpaceOnUse" cx="${lightCx.toFixed(
        1
      )}" cy="${lightCy.toFixed(1)}" fx="${lightFx.toFixed(
        1
      )}" fy="${lightFy.toFixed(1)}" r="${lightR.toFixed(1)}">
        <stop offset="0%" stop-color="rgb(255, 255, 255)" stop-opacity="0.55" />
        <stop offset="40%" stop-color="rgb(255, 255, 255)" stop-opacity="0.18" />
        <stop offset="100%" stop-color="rgb(255, 255, 255)" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="${shadeId}" gradientUnits="userSpaceOnUse" x1="${shadeStartX.toFixed(
        1
      )}" y1="${shadeStartY.toFixed(1)}" x2="${shadeEndX.toFixed(
        1
      )}" y2="${shadeEndY.toFixed(1)}">
        <stop offset="0%" stop-color="rgb(0, 0, 0)" stop-opacity="0" />
        <stop offset="60%" stop-color="rgb(0, 0, 0)" stop-opacity="0.2" />
        <stop offset="100%" stop-color="rgb(0, 0, 0)" stop-opacity="0.5" />
      </linearGradient>
    `;
  });

  return defsMarkup;
};

const buildStarLayer = (randSeed, size, count, minR, maxR, minO, maxO) => {
  let circles = "";
  for (let i = 0; i < count; i += 1) {
    const x = randSeed() * size;
    const y = randSeed() * size;
    const r = minR + randSeed() * (maxR - minR);
    const o = minO + randSeed() * (maxO - minO);
    circles += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(
      1
    )}" r="${r.toFixed(2)}" fill="white" opacity="${o.toFixed(2)}" />`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${circles}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const applyStarfield = () => {
  const seedGen = xmur3(`${currentSeed}-sky`);
  const skyRand = mulberry32(seedGen());
  const layer1 = buildStarLayer(skyRand, 900, 150, 0.4, 1.6, 0.15, 0.5);
  const layer2 = buildStarLayer(skyRand, 1400, 90, 0.6, 2.2, 0.2, 0.6);
  const offset1 = `${Math.floor(skyRand() * 200)}px ${Math.floor(
    skyRand() * 200
  )}px`;
  const offset2 = `${Math.floor(skyRand() * 320)}px ${Math.floor(
    skyRand() * 320
  )}px`;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--sky-layer-1", `url("${layer1}")`);
  rootStyle.setProperty("--sky-layer-2", `url("${layer2}")`);
  rootStyle.setProperty("--sky-pos-1", offset1);
  rootStyle.setProperty("--sky-pos-2", offset2);
};

const renderMap = (system) => {
  const svg = document.getElementById("system-map");
  const center = MAP_CENTER;
  const offsets = starOffsets(system.starsOrdered.length);
  const bodies = system.bodiesOrdered ?? system.bodies;
  bodyPositions = new Map();
  bodies.forEach((body) => {
    const angle = body.orbitAngle ?? 0;
    const x = center + Math.cos(angle) * body.orbitRadius;
    const y = center + Math.sin(angle) * body.orbitRadius;
    bodyPositions.set(body.id, { x, y });
  });

  const orbitMarkup = bodies
    .map((body) => {
      if (body.typeKey === "belt") {
        return "";
      }
      const bandClass = body.bandKey.toLowerCase();
      return `<circle class="orbit orbit--${bandClass} focus-dim" data-focus-id="${body.id}" cx="${center}" cy="${center}" r="${body.orbitRadius.toFixed(
        2
      )}" />`;
    })
    .join("");

  const beltMarkup = bodies
    .filter((body) => body.typeKey === "belt")
    .map((body) => renderBeltCloud(body, center))
    .join("");

  const shadowMarkup = renderShadows(bodies, center);
  const lightingDefs = renderBodyLighting(bodies, center);

  const starMarkup = system.starsOrdered
    .map((star, index) => {
      const [dx, dy] = offsets[index] || [0, 0];
      const radius = starRadius(star.sizeRank);
      const x = center + dx;
      const y = center + dy;
      const starId = starFocusId(index);
      bodyPositions.set(starId, { x, y });
      return `
        <g class="star focus-dim" data-focus-id="${starId}" transform="translate(${x} ${y})">
          <circle class="star-core" r="${radius}" fill="${star.hex}" />
        </g>
      `;
    })
    .join("");

  const bodyMarkup = bodies
    .map((body) => {
      const angle = body.orbitAngle;
      const x = center + Math.cos(angle) * body.orbitRadius;
      const y = center + Math.sin(angle) * body.orbitRadius;
      const labelX = x;
      const labelY = y;
      const bandClass = body.bandKey.toLowerCase();
      const satellites = renderSatellites(body, x, y, center);
      const bodyRadius = bodyRadiusFor(body);

      if (body.typeKey === "rocky") {
        return `
          <g class="body body--rocky body--${bandClass} focus-dim" data-focus-id="${body.id}">
            ${satellites}
            <circle class="planet-core" cx="${x.toFixed(
              1
            )}" cy="${y.toFixed(1)}" r="${bodyRadius}" />
            <circle class="planet-shade" cx="${x.toFixed(
              1
            )}" cy="${y.toFixed(1)}" r="${bodyRadius}" fill="url(#shade-${body.id})" />
            <circle class="planet-highlight" cx="${x.toFixed(
              1
            )}" cy="${y.toFixed(1)}" r="${bodyRadius}" fill="url(#light-${body.id})" />
            <text class="body-label" x="${labelX.toFixed(
              1
            )}" y="${labelY.toFixed(1)}">${body.id}</text>
          </g>
        `;
      }

      if (body.typeKey === "gas") {
        return `
          <g class="body body--gas body--${bandClass} focus-dim" data-focus-id="${body.id}">
            ${satellites}
            <circle class="gas-core" cx="${x.toFixed(1)}" cy="${y.toFixed(
          1
        )}" r="${bodyRadius}" />
            <circle class="planet-shade" cx="${x.toFixed(
              1
            )}" cy="${y.toFixed(1)}" r="${bodyRadius}" fill="url(#shade-${body.id})" />
            <circle class="planet-highlight" cx="${x.toFixed(
              1
            )}" cy="${y.toFixed(1)}" r="${bodyRadius}" fill="url(#light-${body.id})" />
            <text class="body-label" x="${labelX.toFixed(
              1
            )}" y="${labelY.toFixed(1)}">${body.id}</text>
          </g>
        `;
      }

      return "";
    })
    .join("");

  svg.innerHTML = `
    <defs>
      ${shadowMarkup.defsMarkup}
      ${lightingDefs}
    </defs>
    ${orbitMarkup}
    ${beltMarkup}
    ${shadowMarkup.linesMarkup}
    ${starMarkup}
    ${bodyMarkup}
  `;
};

const infoLine = (label, value, extraClass = "") =>
  `<div class="info-line ${extraClass}"><span class="info-label">${label}</span><span class="info-value">${value}</span></div>`;

const renderTooltip = (title, lines) => {
  const rows = lines
    .map(
      (line) =>
        `<div class="tooltip-row"><span class="tooltip-label">${line.label}</span><span class="tooltip-value">${line.value}</span></div>`
    )
    .join("");
  return `<div class="tooltip"><div class="tooltip-title">${title}</div>${rows}</div>`;
};

const renderItemChip = (label, tooltipTitle, lines) =>
  `<div class="item-chip" tabindex="0">${label}${renderTooltip(
    tooltipTitle,
    lines
  )}</div>`;

const renderItemSection = (title, itemsHtml) =>
  `<div class="sub-section"><div class="sub-title">${title}</div><div class="item-list">${itemsHtml}</div></div>`;

const renderStripDot = (label, className, tooltipTitle, lines) =>
  `<div class="strip-dot ${className}" tabindex="0" aria-label="${label}">${renderTooltip(
    tooltipTitle,
    lines
  )}</div>`;

const buildStripBeltPoints = (body) => {
  const seedGen = xmur3(`${currentSeed}-strip-belt-${body.id}`);
  const randLocal = mulberry32(seedGen());
  const count = 12 + Math.floor(randLocal() * 6);
  const points = [];
  for (let i = 0; i < count; i += 1) {
    points.push({
      x: 18 + randLocal() * 64,
      y: 18 + randLocal() * 64,
      r: 1 + randLocal() * 1.6,
    });
  }
  return points;
};

const renderStripBeltDot = (label, className, tooltipTitle, lines, points) => {
  const pointMarkup = points
    .map(
      (point) =>
        `<span class="strip-belt-point" style="--bx:${point.x.toFixed(
          1
        )}%; --by:${point.y.toFixed(1)}%; --br:${point.r.toFixed(
          2
        )}px;"></span>`
    )
    .join("");
  return `<div class="strip-dot ${className} strip-dot--belt-cluster" tabindex="0" aria-label="${label}">${pointMarkup}${renderTooltip(
    tooltipTitle,
    lines
  )}</div>`;
};

const renderStripBody = (body) => {
  const bandClass = body.band.className;
  const typeClass =
    body.typeKey === "gas"
      ? "strip-dot--gas"
      : body.typeKey === "belt"
      ? "strip-dot--belt"
      : "strip-dot--rocky";
  const bodyClass = `strip-body--${body.typeKey}`;

  let mainLines = [];
  if (body.typeKey === "rocky") {
    mainLines = [
      { label: "Type", value: body.rocky.planetType },
      { label: "Description", value: body.rocky.description },
      { label: "Tectonics", value: body.rocky.tectonics },
      { label: "Atmosphere", value: body.rocky.atmosphere },
      { label: "Water", value: body.rocky.water },
    ];
  } else if (body.typeKey === "gas") {
    mainLines = [
      { label: "Type", value: body.gas.type },
      { label: "Description", value: body.gas.description },
      { label: "Appearance", value: body.gas.appearance },
      { label: "Rings", value: body.gas.rings.length.toString() },
      { label: "Small moons", value: body.gas.smallMoons.length.toString() },
      { label: "Major moons", value: body.gas.majorMoons.length.toString() },
    ];
  } else {
    mainLines = [
      { label: "Major asteroids", value: body.belt.majorCount.toString() },
    ];
  }

  const mainDotClasses = `strip-dot--main strip-dot--${bandClass} ${typeClass}`;
  const mainDot =
    body.typeKey === "belt"
      ? renderStripBeltDot(
          body.id,
          mainDotClasses,
          `${body.id} ${body.typeLabel}`,
          mainLines,
          buildStripBeltPoints(body)
        )
      : renderStripDot(
          body.id,
          mainDotClasses,
          `${body.id} ${body.typeLabel}`,
          mainLines
        );
  const ringCount =
    body.typeKey === "gas"
      ? body.gas.rings.filter((ring) => !ring.empty).length
      : 0;
  const ringMarkup =
    ringCount > 0
      ? `<span class="strip-ring strip-ring--back" aria-hidden="true"></span><span class="strip-ring strip-ring--front" aria-hidden="true"></span>`
      : "";
  const mainMarkup = `<div class="strip-main">${ringMarkup}${mainDot}<div class="strip-dot-label">${body.id}</div></div>`;

  const subDots = [];
  if (body.typeKey === "rocky") {
    body.rocky.smallMoons.forEach((moon, index) => {
      const lines = [
        { label: "Archetype", value: moon.archetype },
        { label: "Description", value: moon.description },
        { label: "Geology", value: moon.geology },
        { label: "Atmosphere", value: moon.atmosphere },
        { label: "Water", value: moon.water },
      ];
      subDots.push(
        renderStripDot(
          `SM${index + 1}`,
          `strip-dot--sub strip-dot--${bandClass}`,
          `SM${index + 1}`,
          lines
        )
      );
    });
  } else if (body.typeKey === "gas") {
    body.gas.rings.forEach((ring, index) => {
      const lines = [
        {
          label: "Status",
          value: ring.empty ? "Empty slot" : "Ring system",
        },
      ];
      subDots.push(
        renderStripDot(
          `R${index + 1}`,
          `strip-dot--sub strip-dot--ring strip-dot--${bandClass}`,
          `R${index + 1}`,
          lines
        )
      );
    });
    body.gas.smallMoons.forEach((moon, index) => {
      const lines = [
        { label: "Archetype", value: moon.archetype },
        { label: "Description", value: moon.description },
        { label: "Geology", value: moon.geology },
        { label: "Atmosphere", value: moon.atmosphere },
        { label: "Water", value: moon.water },
      ];
      subDots.push(
        renderStripDot(
          `SM${index + 1}`,
          `strip-dot--sub strip-dot--${bandClass}`,
          `SM${index + 1}`,
          lines
        )
      );
    });
    body.gas.majorMoons.forEach((moon, index) => {
      const lines = [
        { label: "Planet type", value: moon.planetType },
        { label: "Description", value: moon.description },
        { label: "Tectonics", value: moon.tectonics },
        { label: "Atmosphere", value: moon.atmosphere },
        { label: "Water", value: moon.water },
      ];
      subDots.push(
        renderStripDot(
          `MM${index + 1}`,
          `strip-dot--sub strip-dot--${bandClass}`,
          `MM${index + 1}`,
          lines
        )
      );
    });
  } else if (body.typeKey === "belt") {
    body.belt.asteroids.forEach((asteroid, index) => {
      const lines = [
        { label: "Composition", value: asteroid.composition },
        { label: "Surface", value: asteroid.surface },
        { label: "Appearance", value: asteroid.appearance },
      ];
      subDots.push(
        renderStripDot(
          `A${index + 1}`,
          `strip-dot--sub strip-dot--asteroid strip-dot--${bandClass}`,
          `A${index + 1}`,
          lines
        )
      );
    });
  }

  const hasSubs = subDots.length > 0;
  const stemClass = body.typeKey === "belt" ? "strip-stem strip-stem--belt" : "strip-stem";
  const subClass =
    body.typeKey === "belt" ? "strip-subdots strip-subdots--belt" : "strip-subdots";
  const subHtml = hasSubs
    ? `<div class="${stemClass}"></div><div class="${subClass}">${subDots.join(
        ""
      )}</div>`
    : "";

  return `<div class="strip-body ${bodyClass} strip-band--${bandClass} focus-dim${
    hasSubs ? " strip-body--subs" : ""
  }" data-focus-id="${body.id}">${mainMarkup}${subHtml}</div>`;
};

const updateStripConnector = () => {
  const line = document.querySelector(".strip-line");
  if (!line) {
    return;
  }
  const connector = line.querySelector(".strip-connector");
  if (!connector) {
    return;
  }
  const dots = line.querySelectorAll(".strip-body");
  if (dots.length === 0) {
    connector.style.right = "";
    return;
  }
  const lastBody = dots[dots.length - 1];
  const mainDot = lastBody.querySelector(".strip-dot--main");
  if (!mainDot) {
    connector.style.right = "";
    return;
  }
  const lineRect = line.getBoundingClientRect();
  const dotRect = mainDot.getBoundingClientRect();
  const right = Math.max(8, lineRect.right - (dotRect.left + dotRect.width / 2));
  connector.style.right = `${right.toFixed(1)}px`;
};

const renderStrip = (system) => {
  const container = document.getElementById("system-strip");
  if (!container) {
    return;
  }
  const bodies = system.bodiesOrdered ?? system.bodies;
  container.innerHTML = bodies.map((body) => renderStripBody(body)).join("");

  const sun = document.getElementById("strip-sun");
  if (sun) {
    const primary = system.starsOrdered[0];
    const starLines = [
      { label: "Type", value: primary.type },
      { label: "Size", value: primary.size },
      { label: "Color", value: primary.color },
      { label: "Light", value: primary.light },
    ];
    sun.style.setProperty("--sun-color", primary.hex);
    sun.title = `Primary ${primary.type} star`;
    sun.setAttribute("tabindex", "0");
    sun.setAttribute("aria-label", `Primary ${primary.type} star`);
    sun.setAttribute("data-focus-id", starFocusId(0));
    sun.classList.add("focus-dim");
    sun.innerHTML = renderTooltip("Primary star", starLines);
  }

  const secondaryWrap = document.getElementById("strip-secondary");
  if (secondaryWrap) {
    const secondaryStars = system.starsOrdered.slice(1);
    secondaryWrap.classList.toggle(
      "has-secondary",
      secondaryStars.length > 0
    );
    secondaryWrap.innerHTML = secondaryStars
      .map((star, index) => {
        const starLines = [
          { label: "Type", value: star.type },
          { label: "Size", value: star.size },
          { label: "Color", value: star.color },
          { label: "Light", value: star.light },
        ];
        const starId = starFocusId(index + 1);
        return `<div class="strip-secondary-dot focus-dim" data-focus-id="${starId}" style="--sun-color: ${star.hex}" tabindex="0" aria-label="Secondary star">${renderTooltip(
          "Secondary star",
          starLines
        )}</div>`;
      })
      .join("");
  }
  requestAnimationFrame(updateStripConnector);
};

const groupAsteroids = (asteroids) => {
  const groups = new Map();
  asteroids.forEach((asteroid) => {
    const key = `${asteroid.composition}__${asteroid.surface}__${asteroid.appearance}`;
    if (!groups.has(key)) {
      groups.set(key, {
        composition: asteroid.composition,
        surface: asteroid.surface,
        appearance: asteroid.appearance,
        count: 0,
      });
    }
    groups.get(key).count += 1;
  });
  return Array.from(groups.values());
};

const renderRockyDetails = (world) => {
  let html = "";
  html += infoLine("Planet type", world.planetType);
  html += infoLine("Description", world.description);
  html += infoLine("Appearance", world.appearance);
  html += infoLine("Tectonics", world.tectonics);
  html += infoLine("Atmosphere", world.atmosphere);
  html += infoLine("Water", world.water);

  if (world.smallMoons.length > 0) {
    const items = world.smallMoons
      .map((moon, index) => {
        const label = `SM${index + 1}`;
        const lines = [
          { label: "Description", value: moon.description },
          { label: "Geology", value: moon.geology },
          { label: "Atmosphere", value: moon.atmosphere },
          { label: "Water", value: moon.water },
          { label: "Appearance", value: moon.appearance },
        ];
        return renderItemChip(label, moon.archetype, lines);
      })
      .join("");
    html += renderItemSection(
      `Small moons (${world.smallMoons.length})`,
      items
    );
  } else {
    html += infoLine("Small moons", "0");
  }

  return html;
};

const renderGasDetails = (giant) => {
  let html = "";
  html += infoLine("Giant type", giant.type);
  html += infoLine("Description", giant.description);
  html += infoLine("Appearance", giant.appearance);

  if (giant.rings.length > 0) {
    const items = giant.rings
      .map((ring, index) => {
        const label = `R${index + 1}`;
        const title = ring.empty ? "Empty slot" : "Ring system";
        const lines = [
          {
            label: "Status",
            value: ring.empty ? "Hot giant ring slot is empty" : "Active ring system",
          },
        ];
        return renderItemChip(label, title, lines);
      })
      .join("");
    html += renderItemSection(`Ring slots (${giant.rings.length})`, items);
  }

  if (giant.smallMoons.length > 0) {
    const items = giant.smallMoons
      .map((moon, index) => {
        const label = `SM${index + 1}`;
        const lines = [
          { label: "Description", value: moon.description },
          { label: "Geology", value: moon.geology },
          { label: "Atmosphere", value: moon.atmosphere },
          { label: "Water", value: moon.water },
          { label: "Appearance", value: moon.appearance },
        ];
        return renderItemChip(label, moon.archetype, lines);
      })
      .join("");
    html += renderItemSection(
      `Small moons (${giant.smallMoons.length})`,
      items
    );
  }

  if (giant.majorMoons.length > 0) {
    const items = giant.majorMoons
      .map((moon, index) => {
        const label = `MM${index + 1}`;
        const lines = [
          { label: "Description", value: moon.description },
          { label: "Tectonics", value: moon.tectonics },
          { label: "Atmosphere", value: moon.atmosphere },
          { label: "Water", value: moon.water },
          { label: "Appearance", value: moon.appearance },
        ];
        return renderItemChip(label, moon.planetType, lines);
      })
      .join("");
    html += renderItemSection(
      `Major moons (${giant.majorMoons.length})`,
      items
    );
  }

  return html;
};

const renderBeltDetails = (belt) => {
  let html = "";
  if (belt.asteroids.length === 0) {
    html += infoLine("Asteroids", "None");
    return html;
  }

  const items = groupAsteroids(belt.asteroids)
    .map((group) => {
      const lines = [
        { label: "Surface", value: group.surface },
        { label: "Appearance", value: group.appearance },
      ];
      return renderItemChip(`A x${group.count}`, group.composition, lines);
    })
    .join("");
  html += renderItemSection(`Asteroids (${belt.asteroids.length})`, items);
  return html;
};

const buildSystemText = (system) => {
  if (!system) {
    return "";
  }
  const lines = [];
  lines.push(`Seed: ${currentSeed}`);
  lines.push(`Stars: ${system.stars.length}`);
  lines.push(`Bodies: ${system.bodyCount}`);
  lines.push(`Rolls: ${rollCount}`);
  lines.push("");
  lines.push("Stars");

  system.starsOrdered.forEach((star) => {
    const role = star.isPrimary ? "Primary" : "Secondary";
    lines.push(`${role} star`);
    lines.push(`- Type: ${star.type}`);
    lines.push(`- Size: ${star.size}`);
    lines.push(`- Color: ${star.color}`);
    lines.push(`- Light: ${star.light}`);
    lines.push(`- Sky color: ${star.skyColor}`);
    lines.push(`- Flora tint: ${star.flora}`);
    lines.push("");
  });

  lines.push("Bodies");
  const bodies = system.bodiesOrdered ?? system.bodies;
  bodies.forEach((body) => {
    lines.push(`${body.id} ${body.typeLabel} (${body.band.label} band)`);
    if (body.typeKey === "rocky") {
      lines.push(`- Planet type: ${body.rocky.planetType}`);
      lines.push(`- Description: ${body.rocky.description}`);
      lines.push(`- Appearance: ${body.rocky.appearance}`);
      lines.push(`- Tectonics: ${body.rocky.tectonics}`);
      lines.push(`- Atmosphere: ${body.rocky.atmosphere}`);
      lines.push(`- Water: ${body.rocky.water}`);
      lines.push(`- Small moons: ${body.rocky.smallMoons.length}`);
      body.rocky.smallMoons.forEach((moon, index) => {
        lines.push(`  - SM${index + 1}: ${moon.archetype}`);
        lines.push(`    - Description: ${moon.description}`);
        lines.push(`    - Geology: ${moon.geology}`);
        lines.push(`    - Atmosphere: ${moon.atmosphere}`);
        lines.push(`    - Water: ${moon.water}`);
        lines.push(`    - Appearance: ${moon.appearance}`);
      });
    } else if (body.typeKey === "gas") {
      lines.push(`- Giant type: ${body.gas.type}`);
      lines.push(`- Description: ${body.gas.description}`);
      lines.push(`- Appearance: ${body.gas.appearance}`);
      lines.push(`- Rings: ${body.gas.rings.length}`);
      body.gas.rings.forEach((ring, index) => {
        lines.push(
          `  - R${index + 1}: ${ring.empty ? "Empty slot" : "Ring system"}`
        );
      });
      lines.push(`- Small moons: ${body.gas.smallMoons.length}`);
      body.gas.smallMoons.forEach((moon, index) => {
        lines.push(`  - SM${index + 1}: ${moon.archetype}`);
        lines.push(`    - Description: ${moon.description}`);
        lines.push(`    - Geology: ${moon.geology}`);
        lines.push(`    - Atmosphere: ${moon.atmosphere}`);
        lines.push(`    - Water: ${moon.water}`);
        lines.push(`    - Appearance: ${moon.appearance}`);
      });
      lines.push(`- Major moons: ${body.gas.majorMoons.length}`);
      body.gas.majorMoons.forEach((moon, index) => {
        lines.push(`  - MM${index + 1}: ${moon.planetType}`);
        lines.push(`    - Description: ${moon.description}`);
        lines.push(`    - Tectonics: ${moon.tectonics}`);
        lines.push(`    - Atmosphere: ${moon.atmosphere}`);
        lines.push(`    - Water: ${moon.water}`);
        lines.push(`    - Appearance: ${moon.appearance}`);
      });
    } else if (body.typeKey === "belt") {
      lines.push(`- Major asteroids: ${body.belt.majorCount}`);
      body.belt.asteroids.forEach((asteroid, index) => {
        lines.push(
          `  - A${index + 1}: ${asteroid.composition}, ${asteroid.surface}, ${asteroid.appearance}`
        );
      });
    }
    lines.push("");
  });

  return lines.join("\n").trim();
};

const renderDetails = (system) => {
  const container = document.getElementById("details");
  let html = "";

  const starLines = system.starsOrdered
    .map((star, index) => {
      const role = star.isPrimary
        ? "Primary"
        : "Secondary";
      return `
        <div class="sub-section star-section" data-focus-id="${starFocusId(
          index
        )}">
          <div class="sub-title">${role} star</div>
          ${infoLine("Type", star.type)}
          ${infoLine("Size", star.size)}
          ${infoLine("Color", star.color)}
          ${infoLine("Light", star.light)}
          ${infoLine("Sky color", star.skyColor)}
          ${infoLine("Flora tint", star.flora)}
        </div>
      `;
    })
    .join("");

  html += `
    <div class="detail-card">
      <div class="card-header">
        <span class="card-title">Stars</span>
        <span class="chip">${system.stars.length} total</span>
      </div>
      <div class="detail-body">
        ${starLines}
      </div>
    </div>
  `;

  const bodies = system.bodiesOrdered ?? system.bodies;
  bodies.forEach((body) => {
    const bandClass = body.band.className;
    let bodyDetails = "";
    if (body.typeKey === "rocky") {
      bodyDetails = renderRockyDetails(body.rocky);
    } else if (body.typeKey === "gas") {
      bodyDetails = renderGasDetails(body.gas);
    } else {
      bodyDetails = renderBeltDetails(body.belt);
    }

    html += `
      <div class="detail-card" data-focus-id="${body.id}">
        <div class="card-header">
          <span class="card-title">${body.id} ${body.typeLabel}</span>
          <span class="chip ${bandClass}">${body.band.label}</span>
        </div>
        <div class="detail-body">
          ${bodyDetails}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const cards = Array.from(container.querySelectorAll(".detail-card"));
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
  });
};

let activeFocusId = "";
let hoverFocusId = "";
let selectedFocusId = "";
let focusOrder = [];
let bodyPositions = new Map();
let mapViewBox = {
  x: 0,
  y: 0,
  width: MAP_VIEWBOX_SIZE,
  height: MAP_VIEWBOX_SIZE,
};
let mapViewBoxAnimation = 0;
let lastFocusId = "";
let lastSelectedFocusId = "";
let scrollTopButton = null;
let mapShellElement = null;
let copyStatusTimer = 0;
let stripNav = null;
let stripPanelElement = null;
let autoScrollEnabled = false;

const setCopyStatus = (message = "", status = "success") => {
  const statusEl = document.getElementById("copy-status");
  if (!statusEl) {
    return;
  }
  if (copyStatusTimer) {
    clearTimeout(copyStatusTimer);
    copyStatusTimer = 0;
  }
  statusEl.textContent = message;
  statusEl.classList.remove("is-visible", "is-success", "is-error");
  if (!message) {
    return;
  }
  statusEl.classList.add("is-visible");
  if (status === "success") {
    statusEl.classList.add("is-success");
  } else if (status === "error") {
    statusEl.classList.add("is-error");
  }
  const duration = status === "success" ? 2200 : 2800;
  copyStatusTimer = window.setTimeout(() => {
    statusEl.classList.remove("is-visible", "is-success", "is-error");
    statusEl.textContent = "";
    copyStatusTimer = 0;
  }, duration);
};

const getCurrentFocusId = () => selectedFocusId || hoverFocusId;

const viewBoxToString = (box) =>
  `${box.x.toFixed(2)} ${box.y.toFixed(2)} ${box.width.toFixed(
    2
  )} ${box.height.toFixed(2)}`;

const setMapViewBox = (target, animate = true) => {
  const svg = document.getElementById("system-map");
  if (!svg || !target) {
    return;
  }
  const next = {
    x: target.x,
    y: target.y,
    width: target.width,
    height: target.height,
  };
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (mapViewBoxAnimation) {
    cancelAnimationFrame(mapViewBoxAnimation);
    mapViewBoxAnimation = 0;
  }

  if (!animate || reduceMotion) {
    mapViewBox = next;
    svg.setAttribute("viewBox", viewBoxToString(next));
    return;
  }

  const start = { ...mapViewBox };
  const startTime = performance.now();
  const duration = 420;
  const ease = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now) => {
    const t = clamp((now - startTime) / duration, 0, 1);
    const eased = ease(t);
    const current = {
      x: start.x + (next.x - start.x) * eased,
      y: start.y + (next.y - start.y) * eased,
      width: start.width + (next.width - start.width) * eased,
      height: start.height + (next.height - start.height) * eased,
    };
    svg.setAttribute("viewBox", viewBoxToString(current));
    if (t < 1) {
      mapViewBoxAnimation = requestAnimationFrame(step);
      return;
    }
    mapViewBox = next;
    mapViewBoxAnimation = 0;
  };

  mapViewBoxAnimation = requestAnimationFrame(step);
};

const resetMapView = (animate = true) => {
  setMapViewBox(
    {
      x: 0,
      y: 0,
      width: MAP_VIEWBOX_SIZE,
      height: MAP_VIEWBOX_SIZE,
    },
    animate
  );
};

const zoomToFocus = (focusId, animate = true) => {
  const position = bodyPositions.get(focusId);
  if (!position) {
    return;
  }
  const size = MAP_VIEWBOX_SIZE / MAP_FOCUS_ZOOM;
  const half = size / 2;
  const next = {
    x: clamp(position.x - half, 0, MAP_VIEWBOX_SIZE - size),
    y: clamp(position.y - half, 0, MAP_VIEWBOX_SIZE - size),
    width: size,
    height: size,
  };
  setMapViewBox(next, animate);
};

const updateDetailsSelection = () => {
  const cards = document.querySelectorAll(".detail-card[data-focus-id]");
  cards.forEach((card) => {
    const isSelected =
      selectedFocusId !== "" && card.dataset.focusId === selectedFocusId;
    card.classList.toggle("is-selected", isSelected);
  });
  const starSections = document.querySelectorAll(".star-section[data-focus-id]");
  starSections.forEach((section) => {
    const isSelected =
      selectedFocusId !== "" && section.dataset.focusId === selectedFocusId;
    section.classList.toggle("is-selected", isSelected);
  });
};

const pushHudLine = (lines, text, className = "") => {
  lines.push({ text, className });
};

const pushHudDivider = (lines) => {
  lines.push({ isDivider: true });
};

const renderHudLines = (lines) =>
  lines
    .map((line) => {
      if (line.isDivider) {
        return '<div class="map-hud-divider"></div>';
      }
      const className = line.className ? ` ${line.className}` : "";
      return `<div class="map-hud-line${className}">${line.text}</div>`;
    })
    .join("");

const listTypeCounts = (items, getter) => {
  if (!items || items.length === 0) {
    return { shown: [], remaining: 0 };
  }
  const counts = new Map();
  const order = [];
  items.forEach((item) => {
    const name = typeof getter === "function" ? getter(item) : item[getter];
    if (typeof name !== "string" || name.trim() === "") {
      return;
    }
    if (!counts.has(name)) {
      counts.set(name, 0);
      order.push(name);
    }
    counts.set(name, counts.get(name) + 1);
  });
  const shown = order.map((name) => ({
    name,
    count: counts.get(name) || 0,
  }));
  return { shown, remaining: 0 };
};

const appendTypeBullets = (lines, items, getter) => {
  if (!items || items.length === 0) {
    pushHudLine(lines, "None", "map-hud-line--bullet");
    return;
  }
  const { shown } = listTypeCounts(items, getter);
  shown.forEach((entry) => {
    const label =
      entry.count > 1 ? `${entry.name} x${entry.count}` : entry.name;
    pushHudLine(lines, label, "map-hud-line--bullet");
  });
};

const updateMapHud = (body, isSelected = false) => {
  const hud = document.getElementById("map-hud");
  if (!hud) {
    return;
  }

  if (!body) {
    hud.classList.add("is-empty");
    hud.innerHTML =
      '<div class="map-hud-title">Hover a body</div><div class="map-hud-line">Click a body to lock selection</div><div class="map-hud-tip">Left/Right arrows to browse, Esc to clear</div>';
    return;
  }

  if (body.typeKey === "star") {
    const star = body.star;
    const lines = [];
    pushHudLine(lines, `Type: ${star.type}`);
    pushHudLine(lines, `Size: ${star.size}`);
    pushHudLine(lines, `Color: ${star.color}`);
    if (isSelected) {
      pushHudDivider(lines);
      pushHudLine(lines, `Light: ${star.light}`);
      pushHudLine(lines, `Sky color: ${star.skyColor}`);
      pushHudLine(lines, `Flora tint: ${star.flora}`);
    }
    hud.classList.remove("is-empty");
    const tip = isSelected
      ? "Left/Right arrows to browse, Esc to clear"
      : "Click to lock selection";
    hud.innerHTML = `<div class="map-hud-title">${body.role}</div>${
      isSelected ? '<div class="map-hud-tag">Locked</div>' : ""
    }${renderHudLines(lines)}<div class="map-hud-tip">${tip}</div>`;
    return;
  }

  const lines = [];
  const showBandLine = !isSelected || body.typeKey !== "gas";
  if (showBandLine) {
    pushHudLine(lines, `${body.band.label} band`);
  }
  if (body.typeKey === "rocky") {
    pushHudLine(lines, body.rocky?.planetType || "Rocky world");
    if (isSelected) {
      const moons = body.rocky?.smallMoons || [];
      const appearance = body.rocky?.appearance || "Unknown";
      const atmosphere = body.rocky?.atmosphere || "Unknown";
      const water = body.rocky?.water || "Unknown";
      pushHudLine(lines, `Appearance: ${appearance}`);
      pushHudLine(lines, `Atmosphere: ${atmosphere}`);
      pushHudLine(lines, `Water: ${water}`);
      pushHudDivider(lines);
      pushHudLine(lines, `Small moons: ${moons.length}`);
      appendTypeBullets(lines, moons, "archetype");
    }
  } else if (body.typeKey === "gas") {
    if (!isSelected) {
      pushHudLine(lines, body.gas?.type || "Gas giant");
    }
    const rings = body.gas?.rings?.filter((ring) => !ring.empty).length || 0;
    const smallMoons = body.gas?.smallMoons || [];
    const majorMoons = body.gas?.majorMoons || [];
    const moons = smallMoons.length + majorMoons.length;
    if (isSelected) {
      const appearance = body.gas?.appearance || "Unknown";
      pushHudLine(lines, `Appearance: ${appearance}`);
      pushHudDivider(lines);
      pushHudLine(lines, `Rings: ${rings}`);
      pushHudDivider(lines);
      pushHudLine(lines, `Small moons: ${smallMoons.length}`);
      appendTypeBullets(lines, smallMoons, "archetype");
      pushHudDivider(lines);
      pushHudLine(lines, `Major moons: ${majorMoons.length}`);
      appendTypeBullets(lines, majorMoons, "planetType");
    } else {
      pushHudLine(lines, `Rings: ${rings}, Moons: ${moons}`);
    }
  } else if (body.typeKey === "belt") {
    const majorCount = body.belt?.majorCount ?? 0;
    pushHudLine(lines, `Major asteroids: ${majorCount}`);
  }

  hud.classList.remove("is-empty");
  const tip = isSelected
    ? "Left/Right arrows to browse, Esc to clear"
    : "Click to lock selection";
  hud.innerHTML = `<div class="map-hud-title">${body.id} ${
    body.typeLabel
  }</div>${isSelected ? '<div class="map-hud-tag">Locked</div>' : ""}${renderHudLines(
    lines
  )}<div class="map-hud-tip">${tip}</div>`;
};

const updateScrollTopVisibility = () => {
  if (!mapShellElement) {
    return;
  }
  const rect = mapShellElement.getBoundingClientRect();
  const visible =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  const visibleHeight = Math.max(0, visible);
  const shouldShow = rect.height > 0 && visibleHeight < rect.height / 2;
  autoScrollEnabled = shouldShow;
  if (scrollTopButton) {
    scrollTopButton.classList.toggle("is-visible", shouldShow);
  }
  if (stripPanelElement) {
    stripPanelElement.classList.toggle("is-tooltip-muted", shouldShow);
  }
};

const updateStripNavVisibility = () => {
  if (!stripNav || !stripPanelElement) {
    return;
  }
  stripNav.classList.add("is-visible");
};

const isElementMostlyVisible = (element, margin = 80) => {
  if (!element) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top >= margin && rect.bottom <= viewHeight - margin;
};

const scrollFocusIntoView = (focusId) => {
  if (!focusId) {
    return;
  }
  const target =
    document.querySelector(`.detail-card[data-focus-id="${focusId}"]`) ||
    document.querySelector(`.star-section[data-focus-id="${focusId}"]`);
  if (!target || isElementMostlyVisible(target)) {
    return;
  }
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "center",
  });
};

const updateFocusState = () => {
  const focusId = getCurrentFocusId();
  if (focusId === lastFocusId && selectedFocusId === lastSelectedFocusId) {
    return;
  }
  lastFocusId = focusId;
  lastSelectedFocusId = selectedFocusId;
  activeFocusId = focusId || "";
  const focusables = document.querySelectorAll("[data-focus-id]");
  focusables.forEach((el) => {
    const isMatch = activeFocusId !== "" && el.dataset.focusId === activeFocusId;
    const isSelected =
      selectedFocusId !== "" && el.dataset.focusId === selectedFocusId;
    el.classList.toggle("is-focused", isMatch);
    el.classList.toggle("is-dimmed", activeFocusId !== "" && !isMatch);
    el.classList.toggle("is-selected", isSelected);
  });
  updateMapHud(focusLookup.get(activeFocusId) || null, selectedFocusId !== "");
  updateDetailsSelection();
};

const selectFocusId = (focusId, options = {}) => {
  if (!focusId || !focusLookup.has(focusId)) {
    return;
  }
  const { autoScroll = false } = options;
  selectedFocusId = focusId;
  hoverFocusId = "";
  updateFocusState();
  zoomToFocus(focusId, true);
  if (autoScroll) {
    scrollFocusIntoView(focusId);
  }
};

const clearSelection = (options = {}) => {
  const { animate = true } = options;
  if (!selectedFocusId) {
    return;
  }
  selectedFocusId = "";
  updateFocusState();
  resetMapView(animate);
};

const cycleFocus = (direction, options = {}) => {
  if (!focusOrder.length) {
    return;
  }
  const currentId = selectedFocusId || hoverFocusId;
  let index = focusOrder.indexOf(currentId);
  if (index === -1) {
    index = direction > 0 ? -1 : 0;
  }
  const nextIndex = (index + direction + focusOrder.length) % focusOrder.length;
  selectFocusId(focusOrder[nextIndex], options);
};

const setupHoverFocus = () => {
  document.addEventListener("pointerover", (event) => {
    if (selectedFocusId) {
      return;
    }
    const target = event.target.closest("[data-focus-id]");
    if (target) {
      hoverFocusId = target.dataset.focusId;
      updateFocusState();
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (selectedFocusId) {
      return;
    }
    const from = event.target.closest("[data-focus-id]");
    if (!from) {
      return;
    }
    const to = event.relatedTarget?.closest?.("[data-focus-id]");
    if (to && to.dataset.focusId === from.dataset.focusId) {
      return;
    }
    hoverFocusId = to ? to.dataset.focusId : "";
    updateFocusState();
  });
};

const setupClickFocus = () => {
  const map = document.getElementById("system-map");
  const strip = document.querySelector(".strip");
  const details = document.getElementById("details");

  if (map) {
    map.addEventListener("click", (event) => {
      const target = event.target.closest("[data-focus-id]");
      if (target) {
        selectFocusId(target.dataset.focusId);
        return;
      }
      clearSelection({ animate: true });
    });
  }

  if (strip) {
    strip.addEventListener("click", (event) => {
      const target = event.target.closest("[data-focus-id]");
      if (target) {
        selectFocusId(target.dataset.focusId, { autoScroll: true });
      }
    });
  }

  if (details) {
    details.addEventListener("click", (event) => {
      const header = event.target.closest(".card-header");
      if (!header) {
        return;
      }
      const card = header.closest(".detail-card[data-focus-id]");
      if (!card) {
        return;
      }
      selectFocusId(card.dataset.focusId);
    });
  }
};

const setupKeyboardNavigation = () => {
  document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const isTyping =
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable);

    if (isTyping) {
      return;
    }

    if (event.key === "Escape") {
      clearSelection({ animate: true });
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      cycleFocus(1, { autoScroll: autoScrollEnabled });
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      cycleFocus(-1, { autoScroll: autoScrollEnabled });
    }
  });
};

const buildShareLink = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("seed", currentSeed);
  return url.toString();
};

const renderSystem = (system) => {
  currentSystem = system;
  const bodies = system.bodiesOrdered ?? system.bodies;
  const starItems = system.starsOrdered.map((star, index) => ({
    id: starFocusId(index),
    typeKey: "star",
    role: index === 0 ? "Primary star" : "Secondary star",
    star,
  }));
  focusLookup = new Map(
    [...bodies, ...starItems].map((item) => [item.id, item])
  );
  focusOrder = [
    ...starItems.map((item) => item.id),
    ...bodies.map((body) => body.id),
  ];
  activeFocusId = "";
  hoverFocusId = "";
  selectedFocusId = "";
  lastFocusId = "";
  lastSelectedFocusId = "";
  resetMapView(false);

  const primary = system.starsOrdered[0];
  const starLabel = `${system.stars.length} star${
    system.stars.length === 1 ? "" : "s"
  }, primary ${primary.type}`;

  const seedDisplay = document.getElementById("seed-display");
  if (seedDisplay) {
    seedDisplay.textContent = `Seed: ${currentSeed}`;
    seedDisplay.classList.toggle("seed-random", currentSeedIsRandom);
  }

  const shareOutput = document.getElementById("share-output");
  if (shareOutput) {
    shareOutput.textContent = "Link: -";
    shareOutput.classList.remove("is-visible");
  }

  const rollDisplay = document.getElementById("roll-count");
  if (rollDisplay) {
    rollDisplay.textContent = rollCount.toString();
  }

  document.getElementById("star-summary").textContent = starLabel;
  document.getElementById("body-count").textContent = `${system.bodyCount} total`;

  renderMap(system);
  renderDetails(system);
  renderStrip(system);
  updateFocusState();
  setCopyStatus("");
  applyStarfield();
  updateScrollTopVisibility();
  updateStripNavVisibility();
};

const init = () => {
  const button = document.getElementById("generate");
  const seedInput = document.getElementById("seed-input");
  const shareButton = document.getElementById("share-link");
  const shareOutput = document.getElementById("share-output");
  const copyButton = document.getElementById("copy-system");
  const hudPrev = document.getElementById("hud-prev");
  const hudNext = document.getElementById("hud-next");
  const stripPrev = document.getElementById("strip-prev");
  const stripNext = document.getElementById("strip-next");
  scrollTopButton = document.getElementById("scroll-top");
  mapShellElement = document.querySelector(".map-shell");
  stripNav = document.getElementById("strip-nav");
  stripPanelElement = document.querySelector(".strip-panel");

  const params = new URLSearchParams(window.location.search);
  const seedFromUrl = params.get("seed");
  if (seedInput && seedFromUrl) {
    seedInput.value = seedFromUrl;
  }

  const generateFromInput = () => {
    const seedValue = seedInput ? seedInput.value : "";
    const seed = setSeed(seedValue || "");
    if (seedInput) {
      seedInput.value = currentSeedIsRandom ? "" : seed;
    }
    const system = generateSystem();
    renderSystem(system);
  };

  generateFromInput();
  setupHoverFocus();
  setupClickFocus();
  setupKeyboardNavigation();
  updateScrollTopVisibility();
  updateStripNavVisibility();
  window.addEventListener("scroll", updateScrollTopVisibility, {
    passive: true,
  });
  window.addEventListener("resize", updateScrollTopVisibility);
  window.addEventListener("scroll", updateStripNavVisibility, { passive: true });
  window.addEventListener("resize", updateStripNavVisibility);
  window.addEventListener("resize", updateStripConnector);

  button.addEventListener("click", generateFromInput);
  if (hudPrev) {
    hudPrev.addEventListener("click", () => cycleFocus(-1));
  }
  if (hudNext) {
    hudNext.addEventListener("click", () => cycleFocus(1));
  }
  if (stripPrev) {
    stripPrev.addEventListener("click", () => cycleFocus(-1, { autoScroll: true }));
  }
  if (stripNext) {
    stripNext.addEventListener("click", () => cycleFocus(1, { autoScroll: true }));
  }
  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      const reduceMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const url = buildShareLink();
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(url);
          copied = true;
        } catch (error) {
          copied = false;
        }
      }
      if (shareOutput) {
        shareOutput.classList.add("is-visible");
        shareOutput.innerHTML = `${copied ? "Copied" : "Link"}: <a href="${url}" target="_blank" rel="noreferrer">${url}</a>`;
      }
    });
  }
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      if (!currentSystem) {
        setCopyStatus("Nothing to copy", "error");
        return;
      }
      const text = buildSystemText(currentSystem);
      if (!text) {
        setCopyStatus("Nothing to copy", "error");
        return;
      }
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch (error) {
          copied = false;
        }
      }
      if (!copied) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          copied = document.execCommand("copy");
        } catch (error) {
          copied = false;
        }
        document.body.removeChild(textarea);
      }
      setCopyStatus(copied ? "Copied" : "Copy failed", copied ? "success" : "error");
    });
  }
  if (seedInput) {
    seedInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        generateFromInput();
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", init);
