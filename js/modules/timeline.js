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
    id: "snare-drum",
    instrument: "Snare Drum",
    title: "Rhythmic Ostinato",
    time: 0,
    featuredStems: [STEMS.PERCUSSION],
    description: "The persistent C-major two-bar rhythm on snare drum that continues across all 15 minutes."
  },
  {
    id: "solo-flute",
    instrument: "Solo Flute",
    title: "Theme A — Entrance 1",
    time: 14,
    featuredStems: [STEMS.FLUTES_PICCOLOS],
    description: "The main theme introduced softly in C major in the low register of a solo flute."
  },
  {
    id: "solo-clarinet",
    instrument: "Solo Clarinet",
    title: "Theme A — Entrance 2",
    time: 50,
    featuredStems: [STEMS.CLARINETS],
    description: "Clarinet takes over Theme A with the same quiet dynamics over the snare drum."
  },
  {
    id: "bassoon",
    instrument: "Bassoon",
    title: "Theme B — Entrance 3",
    time: 86,
    featuredStems: [STEMS.BASSOONS],
    description: "Bassoon introduces Theme B, introducing subtle jazzy syncopation and chromatic motion."
  },
  {
    id: "eb-clarinet",
    instrument: "E♭ Clarinet",
    title: "Theme B — Entrance 4",
    time: 122,
    featuredStems: [STEMS.CLARINETS],
    description: "High E♭ clarinet plays Theme B in a bright, piercing register."
  },
  {
    id: "oboe-damore",
    instrument: "Oboe d'Amore",
    title: "Theme A — Entrance 5",
    time: 158,
    featuredStems: [STEMS.OBOES],
    description: "Theme A returns played on the rare Oboe d'Amore, giving a dark, warm tone."
  },
  {
    id: "trumpet-flute",
    instrument: "Trumpet & Flute",
    title: "Theme A — Entrance 6",
    time: 194,
    featuredStems: [STEMS.TRUMPETS, STEMS.FLUTES_PICCOLOS],
    description: "Muted trumpet and flute combine in octaves to recreate a unique organ-like timbre."
  },
  {
    id: "tenor-sax",
    instrument: "Tenor Saxophone",
    title: "Theme B — Entrance 7",
    time: 230,
    featuredStems: [STEMS.SAXOPHONE],
    description: "Tenor saxophone introduces orchestral saxophones to French classical music."
  },
  {
    id: "soprano-sax",
    instrument: "Soprano Saxophone",
    title: "Theme B — Entrance 8",
    time: 266,
    featuredStems: [STEMS.SAXOPHONE],
    description: "Soprano saxophone takes over Theme B in a soaring upper register."
  },
  {
    id: "horn-celesta",
    instrument: "Horn, Celesta & Harp",
    title: "Theme A — Entrance 9",
    time: 302,
    featuredStems: [STEMS.HORNS, STEMS.CELESTA_HARP, STEMS.FLUTES_PICCOLOS],
    description: "French Horn paired with Celesta, Harp, and Flutes creating overtone harmonics."
  },
  {
    id: "oboes-clarinets",
    instrument: "Oboes & Clarinets",
    title: "Theme A — Entrance 10",
    time: 338,
    featuredStems: [STEMS.OBOES, STEMS.CLARINETS],
    description: "Combined woodwind section building density and harmonic complexity."
  },
  {
    id: "trombone",
    instrument: "Trombone",
    title: "Theme B — Entrance 11",
    time: 374,
    featuredStems: [STEMS.TROMBONES_TUBA],
    description: "Famous glissando trombone solo delivering a bold, dramatic presentation of Theme B."
  },
  {
    id: "woodwinds-sax",
    instrument: "Woodwinds & Sax",
    title: "Theme B — Entrance 12",
    time: 410,
    featuredStems: [STEMS.FLUTES_PICCOLOS, STEMS.OBOES, STEMS.CLARINETS, STEMS.BASSOONS, STEMS.SAXOPHONE],
    description: "Full woodwind section combined with saxophones as volume continues to rise."
  },
  {
    id: "violins-flute",
    instrument: "Violins & Flute",
    title: "Theme A — Entrance 13",
    time: 446,
    featuredStems: [STEMS.VIOLINS, STEMS.FLUTES_PICCOLOS],
    description: "First violins join the theme melody, bringing bowing dynamics into the mix."
  },
  {
    id: "full-strings",
    instrument: "Full Strings",
    title: "Theme A — Entrance 14",
    time: 482,
    featuredStems: [STEMS.VIOLINS, STEMS.VIOLAS, STEMS.CELLOS_BASSES],
    description: "Entire string section plays Theme A in rich unison and octave harmonies."
  },
  {
    id: "full-brass",
    instrument: "Full Brass",
    title: "Theme B — Entrance 15",
    time: 518,
    featuredStems: [STEMS.TRUMPETS, STEMS.HORNS, STEMS.TROMBONES_TUBA],
    description: "Trumpets, horns, and trombones take full command of Theme B."
  },
  {
    id: "tutti",
    instrument: "Full Orchestra",
    title: "Tutti & Key Modulation",
    time: 554,
    featuredStems: Object.values(STEMS), // All 13 stems featured at climax
    description: "The dramatic modulation from C major to E major leading into the roaring climax."
  }
];