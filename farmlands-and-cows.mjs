const cusAbilities = [{ label: "Gathering", abbreviation: "gat", type: "physical" }, { label: "Crafting", abbreviation: "crt", type: "mental" }];
const cusSkills = ['tec', 'mys'];

// Gracefully stolen from midi-qol
function setupDaeFields() {
  let daeflags = [];
  cusAbilities.forEach(ab => {
    daeflags.push(`system.abilities.${ab.abbreviation}.value`);
    daeflags.push(`system.abilities.${ab.abbreviation}.proficient`);
    daeflags.push(`system.abilities.${ab.abbreviation}.bonuses.check`);
    daeflags.push(`system.abilities.${ab.abbreviation}.bonuses.save`);
  });

  cusSkills.forEach(sk => {
    daeflags.push(`system.skills.${sk}.value`);
    daeflags.push(`system.skills.${sk}.ability`);
    daeflags.push(`system.skills.${sk}.bonuses.check`);
    daeflags.push(`system.skills.${sk}.bonuses.passive`);
  });

  if (game.modules.get("dae")?.active) {
    const initDAE = async () => {
      for (let i = 0; i < 100; i++) {
        if (globalThis.DAE) {
          globalThis.DAE.addAutoFields(daeflags);
          return true;
        }
        else {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      return false;
    };
    initDAE().then(value => {
      if (!value)
        console.error(`farmlands-and-cows | initDae settings failed`);
    });

  }
}

function SetupTools() {
  const toolId = CONFIG.DND5E.toolIds;

  delete CONFIG.DND5E.toolTypes.art;
  delete CONFIG.DND5E.toolProficiencies.art;

  CONFIG.DND5E.toolTypes['gather'] = "Gathering Tools";
  CONFIG.DND5E.toolProficiencies['gather'] = "Gathering Tools";
  CONFIG.DND5E.toolTypes['craft'] = "Crafting Tools";
  CONFIG.DND5E.toolProficiencies['craft'] = "Crafting Tools";

  let toDelete = ['alchemist', 'brewer', 'calligrapher', 'carpenter', 'cartographer', 'cobbler',
    'cook', 'glassblower', 'herb', 'jeweler', 'leatherworker', 'mason',
    'painter', 'potter', 'smith', 'tinker', 'weaver', 'woodcarver', 'pois'
  ];
  toDelete.forEach(name => {
    delete toolId[name];
  });

  let toAdd = [
    { name: "botanist", id: "WZn0cw43rrKDKsqj" },
    { name: "fishing", id: "LdSDyMZndD3maggU" },
    { name: "mining", id: "EsXR8Qt22jFXWFwM" },
    { name: "skinner", id: "4b3pmjuUycPSUOSD" },
    { name: "alchemist", id: "fwBkOqVKUQoS1PK9" },
    { name: "blacksmith", id: "o2bmv1sXjvHRaHnd" },
    { name: "carpentry", id: "NWEZUrY5mPb9L7vl" },
    { name: "culinarian", id: "suXBKyq8Z1BmyCl3" },
    { name: "jeweler", id: "5Na0UZKelixJEM9p" },
    { name: "leatherworker", id: "lBXWBxNYSBmLBNTL" },
    { name: "painter", id: "OioqAheK2BIW2orT" },
    { name: "scribal", id: "J0qLBFojEX9Q4Z2c" },
    { name: "tinker", id: "WjCNSDPksWGRkpIX" },
    { name: "weaver", id: "T1g0Pt1MAI1oKDkp" },
  ];
  toAdd.forEach(tool => {
    toolId[tool.name] = `farmlands-and-cows.tools.${tool.id}`;
  });
}

function SetupLootTypes() {
  let toDelete = ['art', 'gear', 'gem', 'junk', 'material', 'resource', 'treasure'];

  toDelete.forEach(name => {
    delete CONFIG.DND5E.lootTypes[name];
  });

  CONFIG.DND5E.lootTypes['crafting'] = {
    label: "Crafting Ingridient",
    subtypes: {
      calchemist: "Alchemy Ingridient",
      cblacksmith: "Blacksmithing Ingridient",
      ccarpentry: "Carpentry Ingridient",
      cculinarian: "Culinary Ingridient",
      cjeweler: "Jewelery Ingridient",
      cleatherworker: "Leatherworking Ingridient",
      cpainter: "Painting Ingridient",
      cscribal: "Scribal Ingridient",
      ctinker: "Tinkering Ingridient",
      cweaver: "Weaving Ingridient"
    }
  };

  CONFIG.DND5E.lootTypes['shared'] = {
    label: "Shared Ingridient",
    subtypes: {
      ingot: "Ingot"
    }
  }

  CONFIG.DND5E.lootTypes['mining'] = {
    label: "Mining Ingridient",
    subtypes: {
      stone: "Stone",
      ore: "Ore",
      gem: "Gem",
      dust: "Dust",
      misc: "Miscellaneous",
    }
  };

  CONFIG.DND5E.lootTypes['botany'] = {
    label: "Botany Ingridient",
    subtypes: {
      wood: "Wood",
      food: "Fruit and Vegetable",
      plant: "Plant",
      shroom: "Mushrooms",
      misc: "Miscellaneous",
    }
  };

  CONFIG.DND5E.lootTypes['loot'] = {
    label: "Loot",
    subtypes: {
      art: "Art Object",
      gear: "Adventuring Gear",
      gem: "Gemstone",
      junk: "Junk",
      treasure: "Treasure",
    }
  }
}

function SetupEquipmentTypes() {
  CONFIG.DND5E.miscEquipmentTypes["building"] = "Building";
  CONFIG.DND5E.miscEquipmentTypes["buildprot"] = "Building Protection";
}

Hooks.once("init", () => {
  CONFIG.DND5E.abilities[cusAbilities[0].abbreviation] = cusAbilities[0];
  CONFIG.DND5E.abilities[cusAbilities[1].abbreviation] = cusAbilities[1];

  SetupTools();
  SetupLootTypes();
  SetupEquipmentTypes();
  CONFIG.DND5E.consumableTypes["building"] = "Building";
});

Hooks.once('setup', function () {
  setupDaeFields();
});


