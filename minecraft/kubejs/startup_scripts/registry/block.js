StartupEvents.registry("block", (event) => {
  event
    .create("enderium_casing")
    .material("metal")
    .hardness(4.0)
  event.create("zinc_casing").material("metal").hardness(3.0);
  event.create("invar_casing").material("metal").hardness(3.0);
  event.create("fluix_casing").material("metal").hardness(3.0);

  event
    .create("ponder_laser_lamp")
    .model("kubejs:block/ponder_laser_lamp")
    .notSolid()
    .renderType("translucent")
    .displayName("Laser Lamp (For Ponder)");
  event
    .create("ponder_laser_lamp_on")
    .model("kubejs:block/ponder_laser_lamp_on")
    .notSolid()
    .lightLevel(15)
    .renderType("translucent")
    .displayName("Laser Lamp (For Ponder)");

  let machine = (name, layer) => {
    let id = name.toLowerCase();
    event
      .create(id + "_machine")
      .model("kubejs:block/" + id + "_machine")
      .material("lantern")
      .hardness(3.0)
      .displayName(name + " Machine")
      .notSolid()
      .renderType(layer);
  };

  machine("Andesite", "solid");
  machine("Brass", "translucent");
  machine("Copper", "cutout");
  machine("Zinc", "cutout");
  machine("Enderium", "cutout");

  for (i = 0; i < 15; i++)
    event
      .create(`failed_alchemy_${i}`)
      .material("glass")
      .color(0, 0x394867)
      .color(1, 0x14274e)
      .hardness(0.1)
      .box(0.25, 0, 0.25, 0.75, 14.0 / 16.0, 0.75, false)
      .model("kubejs:block/mundane_substrate")
      .displayName(`Mundane Alchemic Blend`)
      .renderType("cutout");

  global.substrates = [];
  global.substrate_mapping = {};
  let current_category = [];
  let category_index = 0;
  let substrate_index = 0;

  let category = () => {
    global.substrates.push(current_category);
    current_category = [];
    category_index++;
    substrate_index = 0;
  };

  const substrate_base = (c1, c2, id, name, model, ingredient, outputItem) => {
    global.substrate_mapping[id] = {
      category: category_index,
      index: substrate_index,
      name: name.replace(" Reagent", "").replace(" Catalyst", ""),
    };
    current_category.push({
      id: `kubejs:substrate_${id}`,
      ingredient: ingredient,
      outputItem: outputItem,
    });
    event
      .create(`substrate_${id}`)
      .material("glass")
      .color(0, c1)
      .color(1, c2)
      .hardness(0.1)
      .box(0.25, 0, 0.25, 0.75, 14.0 / 16.0, 0.75, false)
      .model("kubejs:block/" + model)
      .displayName(name)
      .renderType("cutout")
      .item((e) => e.rarity(model == "catalyst" ? RARITY_UNCOMMON : RARITY_COMMON));
    substrate_index++;
  };

  const reagent = (c1, c2, id, prefix, ingredient, outputItem) =>
    substrate_base(c1, c2, id, `${prefix} Reagent`, "substrate", ingredient, outputItem);
  const catalyst = (c1, c2, id, prefix, ingredient) =>
    substrate_base(c1, c2, id, `${prefix} Catalyst`, "catalyst", ingredient);

  reagent(0x5f5f5f, 0x8e8e8e, "andesite", "Andesite", "create:andesite_cobblestone");
  reagent(0x7f7f7f, 0xd4d4d4, "diorite", "Diorite", "create:diorite_cobblestone");
  reagent(0x563a2f, 0x9a6c5b, "granite", "Granite", "create:granite_cobblestone");
  reagent(0x585858, 0x646363, "cobblestone", "Stone", "minecraft:cobblestone");
  reagent(0x32333d, 0x5c5c5c, "basalt", "Basalt", "minecraft:basalt");
  reagent(0x6b5d4f, 0x7d6b5a, "gabbro", "Gabbro", "create:gabbro_cobblestone");
  category();
  reagent(
    0xd30000,
    0xb80f0a,
    "red",
    "Crimson",
    ["minecraft:rose_bush", "minecraft:poppy", "minecraft:red_tulip"],
    "minecraft:red_dye"
  );
  reagent(
    0xfc6600,
    0xb1560f,
    "orange",
    "Orange",
    ["minecraft:orange_tulip", "biomesoplenty:burning_blossom", "minecraft:pumpkin"],
    "minecraft:orange_dye"
  );
  reagent(
    0xfff200,
    0xdba520,
    "yellow",
    "Goldenrod",
    ["biomesoplenty:goldenrod", "minecraft:sunflower", "minecraft:dandelion"],
    "minecraft:yellow_dye"
  );
  reagent(
    0x9dc183,
    0x708238,
    "green",
    "Olive",
    ["minecraft:fern", "minecraft:cactus", "biomesoplenty:watergrass"],
    "minecraft:green_dye"
  );
  reagent(
    0x57a0d2,
    0x0080fe,
    "blue",
    "Azure",
    ["biomesoplenty:blue_hydrangea", "minecraft:cornflower", "minecraft:blue_orchid"],
    "minecraft:light_blue_dye"
  );
  reagent(
    0xb200ed,
    0xff66cc,
    "magenta",
    "Fuchsia",
    ["minecraft:lilac", "minecraft:allium", "minecraft:pink_tulip"],
    "minecraft:magenta_dye"
  );
  category();
  reagent(0xac3b00, 0xd5ac26, "blaze", "Blazing", "minecraft:blaze_powder");
  reagent(0x4f7e48, 0x8ad480, "slime", "Slime", "minecraft:slime_ball");
  reagent(0x5b151a, 0xbc3e49, "nether", "Nether", "minecraft:nether_wart");
  reagent(0x05030a, 0x36234c, "obsidian", "Obsidian", "create:powdered_obsidian");
  reagent(0x535353, 0x717171, "gunpowder", "Gunpowder", "minecraft:gunpowder");
  reagent(0x529680, 0xa2cfc0, "prismarine", "Aquatic", "minecraft:prismarine_shard");
  category();
  reagent(0x9e72be, 0xb7c9d1, "arcane", "Arcane", "forbidden_arcanus:arcane_crystal_dust");
  reagent(0x27a9bb, 0x2cc7c9, "apatite", "Apatite", "thermal:apatite_dust");
  reagent(0xc7a94a, 0xeef071, "sulfur", "Sulfuric", "thermal:sulfur_dust");
  reagent(0x735a65, 0xb8afaf, "niter", "Nitric", "thermal:niter_dust");
  reagent(0x91c5fc, 0xa7cbcf, "certus", "Certus Quartz", "appliedenergistics2:certus_quartz_dust");
  reagent(0xb19e8f, 0xe7e2db, "quartz", "Nether Quartz", "appliedenergistics2:nether_quartz_dust");
  category();
  reagent(0x616a60, 0xd0d2c5, "zinc", "Zinc", "kubejs:zinc_dust");
  reagent(0xdd7e5d, 0xfcefba, "copper", "Copper", "thermal:copper_dust");
  reagent(0xa6a6a6, 0xd5d5d5, "iron", "Iron", "thermal:iron_dust");
  reagent(0x977756, 0xe4d196, "nickel", "Nickel", "thermal:nickel_dust");
  reagent(0x232456, 0x7c95a4, "lead", "Lead", "thermal:lead_dust");
  reagent(0xd99413, 0xfaf25e, "gold", "Gold", "thermal:gold_dust");
  category();
  reagent(0xfc7781, 0xfcced0, "cinnabar", "Cinnabar", "thermal:cinnabar");
  reagent(0x335dc1, 0x7395e7, "lapis", "Lapis Lazuli", "thermal:lapis_dust");
  reagent(0x246be9, 0x76c6fc, "sapphire", "Sapphire", "thermal:sapphire_dust");
  reagent(0x00a82b, 0xadfacb, "emerald", "Emerald", "thermal:emerald_dust");
  reagent(0x9d0a33, 0xfb7b71, "ruby", "Ruby", "thermal:ruby_dust");
  reagent(0x20c3b3, 0xd2fcf3, "diamond", "Diamond", "thermal:diamond_dust");
  category();
  catalyst(0x506d84, 0x889eaf, "igneous", "Igneous");
  catalyst(0xb5cda3, 0xc9e4c5, "herbal", "Herbal");
  catalyst(0x9f5f80, 0xff8474, "volatile", "Volatile");
  catalyst(0xffb037, 0xffe268, "crystal", "Crystalline");
  catalyst(0x232457, 0x7d97a6, "metal", "Metallurgic");
  catalyst(0x3edbf0, 0xc0fefc, "gem", "Gemstone");
  category();

  event
    .create(`substrate_chaos`)
    .material("glass")
    .color(0, 0xb200ed)
    .color(1, 0xff66cc)
    .hardness(0.1)
    .box(0.25, 0, 0.25, 0.75, 14.0 / 16.0, 0.75, false)
    .model("kubejs:block/chaos_catalyst")
    .displayName("Chaos Catalyst")
    .renderType("cutout")
    .item((e) => e.rarity(RARITY_RARE));

  event
    .create(`substrate_silicon`)
    .material("glass")
    .color(0, 0x474449)
    .color(1, 0x967da0)
    .hardness(0.1)
    .box(0.25, 0, 0.25, 0.75, 14.0 / 16.0, 0.75, false)
    .model("kubejs:block/substrate")
    .displayName("Silicon Reagent")
    .renderType("cutout")
    .item((e) => e.rarity(RARITY_EPIC));

  event
    .create(`substrate_silver`)
    .material("glass")
    .color(0, 0x9fadb4)
    .color(1, 0xbeccd2)
    .hardness(0.1)
    .box(0.25, 0, 0.25, 0.75, 14.0 / 16.0, 0.75, false)
    .model("kubejs:block/substrate")
    .displayName("Silver Reagent")
    .renderType("cutout");

  event
    .create(`accellerator_glowstone`)
    .material("glass")
    .color(0, 0xffbc5e)
    .hardness(0.1)
    .box(0.125, 0, 0.125, 0.875, 10.0 / 16.0, 0.875, false)
    .model("kubejs:block/accellerator")
    .displayName("Glowstone Accelerator")
    .renderType("cutout");

  event
    .create(`accellerator_redstone`)
    .material("glass")
    .color(0, 0xaa0f01)
    .hardness(0.1)
    .box(0.125, 0, 0.125, 0.875, 10.0 / 16.0, 0.875, false)
    .model("kubejs:block/accellerator")
    .displayName("Redstone Accelerator")
    .renderType("cutout");
});
