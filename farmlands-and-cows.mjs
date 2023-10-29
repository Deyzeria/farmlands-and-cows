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
    console.debug(tool);
    toolId[tool.name] = `farmlands-and-cows.tools.${tool.id}`;
  });
}

Hooks.once("init", () => {
  CONFIG.DND5E.abilities[cusAbilities[0].abbreviation] = cusAbilities[0];
  CONFIG.DND5E.abilities[cusAbilities[1].abbreviation] = cusAbilities[1];

  SetupTools();
});

Hooks.once('setup', function () {
  setupDaeFields();
});


