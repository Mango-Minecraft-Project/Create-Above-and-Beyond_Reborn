StartupEvents.registry("item", (event) => {
  // Crystal Seeds
  const crystal_seeds = ["nether", "certus", "fluix"];
  const crystal_register = (type) => {
    const name = Utils.toTitleCase(type);

    event
      .create(`growing_${type}_seed`, "create:sequenced_assembly")
      .texture(`ae2:item/crystal_seed_${type}`)
      .displayName(`${name} Quartz Seed`);
    event
      .create(`tiny_${type}_crystal`)
      .texture(`ae2:item/crystal_seed_${type}2`)
      .displayName(`Tiny ${name} Quartz Crystal`);
    event
      .create(`growing_tiny_${type}_crystal`, "create:sequenced_assembly")
      .texture(`ae2:item/crystal_seed_${type}2`)
      .displayName(`Tiny ${name} Quartz Crystal`);
    event
      .create(`small_${type}_crystal`)
      .texture(`ae2:item/crystal_seed_${type}3`)
      .displayName(`Small ${name} Quartz Crystal`);
    event
      .create(`growing_small_${type}_crystal`, "create:sequenced_assembly")
      .texture(`ae2:item/crystal_seed_${type}3`)
      .displayName(`Small ${name} Quartz Crystal`);
  };
  crystal_seeds.forEach(crystal_register);

  // Processors
  const processor_types = ["calculation", "logic", "engineering"];
  const processor_register = (type) => event.create(`incomplete_${type}_processor`, "create:sequenced_assembly");
  processor_types.forEach(processor_register);

  // Numbers
  const number_types = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "plus",
    "minus",
    "multiply",
    "divide",
  ];
  const number_register = (type) => event.create(type).glow(true);
  number_types.forEach(number_register);

  // Mechanisms
  const mechanism_types = [
    ["kinetic", null],
    ["sealed", null],
    ["infernal", "uncommon"],
    ["inductive", "uncommon"],
    ["abstruse", "rare"],
    ["calculation", "rare"],
  ];
  const mechanism_register = ([type, rarity]) => {
    event.create(`${type}_mechanism`).rarity(rarity || "common");
    event.create(`incomplete_${type}_mechanism`, "create:sequenced_assembly").rarity(rarity || "common");
  };
  mechanism_types.forEach(mechanism_register);

  // Slimes
  const slime_types = [
    ["earth", 0x8fdb84],
    ["sky", 0x00f9de],
    ["ender", 0xac2efc],
  ];
  const slime_register = ([type, color]) => {
    event
      .create(`${type}_slimy_fern_leaf`)
      .color(0, color)
      .texture("kubejs:item/slimy_fern_leaf")
      .displayName(`Slimy Fern Leaf`);
    event
      .create(`${type}_slime_fern_paste`)
      .color(0, color)
      .texture("kubejs:item/ground_slimy_fern")
      .displayName(`Slimy Fern Blend`);
  };
  slime_types.forEach(slime_register);

  // Others
  event.create("radiant_coil").glow(true).displayName("Radiant Induction Coil");
  event.create("radiant_sheet").glow(true);

  event.create("pipe_module_utility").displayName("Utility Pipe Module");
  event.create("pipe_module_tier_1").displayName("Brass Pipe Module");
  event.create("pipe_module_tier_2").displayName("Invar Pipe Module");
  event.create("pipe_module_tier_3").displayName("Enderium Pipe Module");

  event.create("circuit_scrap");
  event.create("charged_calculator").displayName("Calculator").maxDamage(64);
  event.create("missingno").displayName("∄");
  event.create("zinc_dust");
  event.create("zinc_sheet");
  event.create("creosote_pellet");
  event.create("sand_ball").unstackable();
  event.create("sand_chunk");
  event.create("purified_sand");
  event.create("silicon_compound");
  event.create("smoke_mote").displayName("Tiny Smoke Cloud");
  event.create("incomplete_coke_chunk", "create:sequenced_assembly");
  event.create("coke_chunk");

  event.create("matter_plastics");
  event.create("nickel_compound");
  event.create("invar_compound", "create:sequenced_assembly").displayName("Unprocessed Invar Ingot");
  event.create("dye_entangled_singularity").unstackable().displayName("Chromatic Singularity");
  event.create("chromatic_resonator").maxDamage(512);
  event.create("flash_drive").maxDamage(512);

  event
    .create("alchemical_laser")
    .parentModel("kubejs:block/ponder_laser_lamp_on")
    .unstackable()
    .displayName("Alchemical Laser (Ponder Entry)");
  event.create("thermal_cast").unstackable();
  event.create("three_cast").unstackable().displayName("Integer Cast (3)");
  event.create("eight_cast").unstackable().displayName("Integer Cast (8)");
  event.create("plus_cast").unstackable().displayName("Operator Cast (+)");
  event.create("minus_cast").unstackable().displayName("Operator Cast (-)");
  event.create("multiply_cast").unstackable().displayName("Operator Cast (x)");
  event.create("divide_cast").unstackable().displayName("Operator Cast (/)");
  event
    .create("computation_matrix")
    .parentModel("kubejs:item/computation_matrix")

    .rarity(RARITY_UNCOMMON)
    .unstackable();
});
