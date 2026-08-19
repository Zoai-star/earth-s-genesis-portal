import hadean from "@/assets/era-hadean.jpg";
import archean from "@/assets/era-archean.jpg";
import cambrian from "@/assets/era-cambrian.jpg";
import jurassic from "@/assets/era-jurassic.jpg";
import iceage from "@/assets/era-iceage.jpg";

export type Era = {
  id: string;
  name: string;
  when: string;
  headline: string;
  body: string;
  image: string;
  facts: string[];
};

export const eras: Era[] = [
  {
    id: "hadean",
    name: "Hadean",
    when: "4,540 – 4,000 Mya",
    headline: "A world of molten rock",
    body: "Earth accretes from the debris disc of a young sun. A Mars-sized body strikes the infant planet and the moon is flung out of the wreckage. The surface is an ocean of magma under a sky of falling stone.",
    image: hadean,
    facts: ["Surface > 1,200°C", "No oxygen", "Day lasted ~6 hours"],
  },
  {
    id: "archean",
    name: "Archean",
    when: "4,000 – 2,500 Mya",
    headline: "Life learns to breathe sunlight",
    body: "The crust cools, oceans condense, and single cells appear in warm shallow water. Cyanobacteria build stromatolite mounds and begin exhaling oxygen — a slow poisoning that rewrites the atmosphere.",
    image: archean,
    facts: ["First microbial life", "Methane-orange skies", "Great Oxidation begins"],
  },
  {
    id: "cambrian",
    name: "Cambrian",
    when: "538 – 485 Mya",
    headline: "The explosion of body plans",
    body: "In a geological blink, nearly every animal phylum alive today appears. Eyes evolve, and with them the arms race of predator and prey. Shells, spines and swimming muscle fill the seas.",
    image: cambrian,
    facts: ["First eyes", "Trilobites dominate", "Land still barren"],
  },
  {
    id: "jurassic",
    name: "Jurassic",
    when: "201 – 145 Mya",
    headline: "Forests of giants",
    body: "Pangaea splits and warm shallow seas flood the continents. Conifer and fern forests feed sauropods the size of buildings, while the first feathered dinosaurs take to the air.",
    image: jurassic,
    facts: ["No polar ice", "Sauropods to 25 m", "Birds take flight"],
  },
  {
    id: "iceage",
    name: "Pleistocene",
    when: "2.6 Mya – 11,700 years ago",
    headline: "The long winters",
    body: "Ice sheets advance and retreat forty times over. Mammoths and bison roam the mammoth steppe, and a clever, cooperative primate follows the herds across land bridges into every continent.",
    image: iceage,
    facts: ["Sea level –120 m", "Megafauna peak", "Humans go global"],
  },
];
