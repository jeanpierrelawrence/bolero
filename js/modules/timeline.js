export const STEMS = {
  PERCUSSION: "assets/audio/percussion.mp3",
  FLUTES_PICCOLOS: "assets/audio/flutes_piccolos.mp3",
  CLARINETS: "assets/audio/clarinets.mp3",
  BASSOONS: "assets/audio/bassoons.mp3",
  OBOES: "assets/audio/oboes.mp3",
  TRUMPETS: "assets/audio/trumpets.mp3",
  SAXOPHONE: "assets/audio/saxophone.mp3",
  HORNS: "assets/audio/horns.mp3",
  CELESTA_HARP: "assets/audio/celesta_harp.mp3",
  TROMBONES_TUBA: "assets/audio/trombones_tuba.mp3",
  VIOLINS: "assets/audio/violins.mp3",
  VIOLAS: "assets/audio/violas.mp3",
  CELLOS_BASSES: "assets/audio/cellos-basses.mp3"
};

export const SECTIONS = [
  {
    id: "snare-ostinato",
    instrument: "Snare Drum",
    title: "Rhythmic Ostinato",
    time: 0,
    featuredStems: [STEMS.PERCUSSION],
    description: "The persistent C-major rhythm on snare drum that continues across the entire 15-minute composition."
  },
  {
    id: "solo-flute",
    instrument: "Solo Flute",
    title: "Theme A — Entrance 1",
    time: 8, // 0:08
    featuredStems: [STEMS.FLUTES_PICCOLOS],
    description: "Theme A introduced quietly in C major in the low register of a solo flute."
  },
  {
    id: "solo-clarinet",
    instrument: "Solo Clarinet",
    title: "Theme A — Entrance 2",
    time: 58, // 0:58
    featuredStems: [STEMS.CLARINETS],
    description: "Clarinet takes over Theme A in its warm middle register over the quiet snare drum."
  },
  {
    id: "bassoon",
    instrument: "Bassoon",
    title: "Theme B — Entrance 3",
    time: 108, // 1:48
    featuredStems: [STEMS.BASSOONS],
    description: "Bassoon introduces Theme B, featuring subtle syncopation and chromatic motion."
  },
  {
    id: "eb-clarinet",
    instrument: "E♭ Clarinet",
    title: "Theme B — Entrance 4",
    time: 157, // 2:37
    featuredStems: [STEMS.CLARINETS],
    description: "The high E♭ clarinet plays Theme B in a bright, piercing upper register."
  },
  {
    id: "oboe-damore",
    instrument: "Oboe d'Amore",
    title: "Theme A — Entrance 5",
    time: 207, // 3:27
    featuredStems: [STEMS.OBOES],
    description: "Theme A returns played on the rare Oboe d'Amore, giving a dark, mellow timbre."
  },
  {
    id: "trumpet-flute",
    instrument: "Trumpet & Flute",
    title: "Theme A — Entrance 6",
    time: 257, // 4:17
    featuredStems: [STEMS.TRUMPETS, STEMS.FLUTES_PICCOLOS],
    description: "Muted trumpet paired with low flute in octaves, creating a unique organ-like tone color."
  },
  {
    id: "tenor-sax",
    instrument: "Tenor Saxophone",
    title: "Theme B — Entrance 7",
    time: 307, // 5:07
    featuredStems: [STEMS.SAXOPHONE],
    description: "Tenor saxophone introduces jazz-influenced saxophone timbres into the French orchestral tradition."
  },
  {
    id: "soprano-sax",
    instrument: "Soprano Saxophone",
    title: "Theme B — Entrance 8",
    time: 357, // 5:57
    featuredStems: [STEMS.SAXOPHONE],
    description: "Soprano saxophone takes over Theme B in a soaring, vocal upper register."
  },
  {
    id: "horn-celesta-piccolo",
    instrument: "Horn, Celesta & Piccolos",
    title: "Theme A — Entrance 9",
    time: 407, // 6:47
    featuredStems: [STEMS.HORNS, STEMS.CELESTA_HARP, STEMS.FLUTES_PICCOLOS],
    description: "Horn played with Celesta, Harp, and Piccolos in parallel fifths and thirds, synthesizing overtone harmonics."
  },
  {
    id: "woodwinds-group-1",
    instrument: "Oboes, Clarinets & English Horn",
    title: "Theme A — Entrance 10",
    time: 456, // 7:36
    featuredStems: [STEMS.OBOES, STEMS.CLARINETS],
    description: "Combined double-reed and single-reed woodwinds building harmonic density."
  },
  {
    id: "trombone-solo",
    instrument: "Trombone",
    title: "Theme B — Entrance 11",
    time: 506, // 8:26
    featuredStems: [STEMS.TROMBONES_TUBA],
    description: "The famous glissando trombone solo delivering a bold presentation of Theme B."
  },
  {
    id: "woodwinds-sax-group",
    instrument: "Woodwinds & Saxophones",
    title: "Theme B — Entrance 12",
    time: 556, // 9:16
    featuredStems: [STEMS.FLUTES_PICCOLOS, STEMS.OBOES, STEMS.CLARINETS, STEMS.SAXOPHONE],
    description: "Full woodwind section combined with saxophones as global volume continues to rise."
  },
  {
    id: "violins-woodwinds",
    instrument: "Violins & Woodwinds",
    title: "Theme A — Entrance 13",
    time: 606, // 10:06
    featuredStems: [STEMS.VIOLINS, STEMS.FLUTES_PICCOLOS, STEMS.OBOES, STEMS.CLARINETS],
    description: "First violins join the melody, bringing string bowing dynamics into the orchestration."
  },
  {
    id: "violins-woodwinds-sax",
    instrument: "Violins, Woodwinds & Sax",
    title: "Theme A — Entrance 14",
    time: 656, // 10:56
    featuredStems: [STEMS.VIOLINS, STEMS.FLUTES_PICCOLOS, STEMS.OBOES, STEMS.SAXOPHONE],
    description: "Violins, woodwinds, and saxophones play Theme A in rich unison harmonies."
  },
  {
    id: "full-strings-brass",
    instrument: "Strings, Trumpet & Woodwinds",
    title: "Theme B — Entrance 15",
    time: 706, // 11:46
    featuredStems: [STEMS.VIOLINS, STEMS.VIOLAS, STEMS.CELLOS_BASSES, STEMS.TRUMPETS, STEMS.FLUTES_PICCOLOS, STEMS.OBOES, STEMS.SAXOPHONE],
    description: "Full string section with trumpet leading Theme B as the piece nears its climax."
  },
  {
    id: "full-orchestra-building",
    instrument: "Strings, Trombones & Woodwinds",
    title: "Theme B — Entrance 16",
    time: 756, // 12:36
    featuredStems: [STEMS.VIOLINS, STEMS.VIOLAS, STEMS.CELLOS_BASSES, STEMS.FLUTES_PICCOLOS, STEMS.OBOES, STEMS.CLARINETS, STEMS.SAXOPHONE, STEMS.TROMBONES_TUBA],
    description: "Heavy low brass and strings join to drive the crescendo forward."
  },
  {
    id: "brass-ensemble-theme",
    instrument: "Full Brass, Strings & Reeds",
    title: "Theme A — Entrance 17",
    time: 805, // 13:25
    featuredStems: [STEMS.VIOLINS, STEMS.VIOLAS, STEMS.CELLOS_BASSES, STEMS.TRUMPETS, STEMS.HORNS, STEMS.SAXOPHONE, STEMS.FLUTES_PICCOLOS],
    description: "Full brass and strings in powerful unison leading directly to the key modulation."
  },
  {
    id: "tutti-climax",
    instrument: "Full Orchestra (Tutti)",
    title: "Entrance 18 — Key Modulation & Climax",
    time: 855, // 14:15
    featuredStems: Object.values(STEMS),
    description: "The modulation from C major to E major where tam-tam, cymbals, and full brass roar to the final crash."
  }
];