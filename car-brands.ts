const carBrands = [
  {
    imageName: 'volkswagen.png',
    models: [
      'Amarok',
      'Arteon',
      'Beetle',
      'Bora',
      'Caravelle',
      'Caddy',
      'Crafter',
      'Fox',
      'Golf',
      'Jetta',
      'Kombi',
      'Lupo',
      'Passat',
      'Polo',
      'Quantum',
      'Scirocco',
      'Sharan',
      'Taigun',
      'Tiguan',
      'Touran',
      'Transporter',
      'Virtus',
      'Vento',
      'Outro modelo'
    ],
    name: 'Volkswagen'
  },
  {
    imageName: 'chevrolet.png',
    models: [
      'Aveo',
      'Blazer',
      'Camaro',
      'Captiva',
      'Celta',
      'Cobalt',
      'Colorado',
      'Corvette',
      'Equinox',
      'Tracker',
      'Onix',
      'Prisma',
      'Spin',
      'S10',
      'Trailblazer',
      'Malibu',
      'Sail',
      'Sonic',
      'Tahoe',
      'Optra',
      'Outro modelo'
    ],
    name: 'Chevrolet'
  },
  {
    imageName: 'fiat.png',
    models: [
      '500',
      '500L',
      '500X',
      'Argo',
      'Bravo',
      'Doblò',
      'Fiorino',
      'Idea',
      'Mobi',
      'Palio',
      'Punto',
      'Qubo',
      'Siena',
      'Strada',
      'Tipo',
      'Uno',
      'Panda',
      'Linea',
      'Outro modelo'
    ],
    name: 'Fiat'
  },
  {
    imageName: 'ford.png',
    models: [
      'Ecosport',
      'Edge',
      'Escape',
      'Expedition',
      'Explorer',
      'F-150',
      'F-250',
      'F-350',
      'Fiesta',
      'Focus',
      'Fusion',
      'Mustang',
      'Ranger',
      'Transit',
      'Maverick',
      'Bronco',
      'Puma',
      'Mondeo',
      'Taurus',
      'Freestyle',
      'Ka',
      'Courier',
      'Outro modelo'
    ],
    name: 'Ford'
  },
  {
    imageName: 'toyota.png',
    models: [
      'Yaris',
      'Corolla',
      'Camry',
      'Avalon',
      'Prius',
      'RAV4',
      'Highlander',
      '4Runner',
      'Land Cruiser',
      'Sequoia',
      'Tacoma',
      'Tundra',
      'Sienna',
      'Venza',
      'Supra',
      'GR86',
      'C-HR',
      'Hilux',
      'Fortuner',
      'Hiace',
      'Innova',
      'Etios',
      'Yaris Cross',
      'Prius Prime',
      'Mirai',
      'Outro modelo'
    ],
    name: 'Toyota'
  },
  {
    imageName: 'hyundai.png',
    models: [
      'Accent',
      'Elantra',
      'Sonata',
      'Ioniq',
      'Tucson',
      'Santa Fe',
      'Kona',
      'Palisade',
      'Venue',
      'Azera (Grandeur)',
      'Elantra GT',
      'Veloster',
      'Nexo (Hydrogen Fuel Cell)',
      'Genesis G70',
      'Genesis G80',
      'Genesis G90',
      'Starex (H-1)',
      'i10',
      'i20',
      'i30',
      'i40',
      'Santa Cruz',
      'Creta',
      'Outro modelo'
    ],
    name: 'Hyundai'
  },
  {
    imageName: 'honda.png',
    models: [
      'Accord',
      'Civic',
      'CR-V',
      'HR-V',
      'Pilot',
      'Odyssey',
      'Passport',
      'Ridgeline',
      'Fit (Jazz)',
      'Insight',
      'Clarity',
      'Element',
      'Prelude',
      'Crosstour',
      'Legend',
      'S2000',
      'Z600',
      'CR-Z',
      'FCX Clarity (Hydrogen Fuel Cell)',
      'NSX',
      'e:HEV',
      'Outro modelo'
    ],
    name: 'Honda'
  },
  {
    imageName: 'peugeot.png',
    models: [
      'Peugeot 208',
      'Peugeot 301',
      'Peugeot 308',
      'Peugeot 3008',
      'Peugeot 5008',
      'Peugeot 2008',
      'Peugeot 508',
      'Peugeot Partner',
      'Peugeot Rifter',
      'Peugeot Boxer',
      'Peugeot Expert',
      'Peugeot 108',
      'Peugeot 406',
      'Peugeot 607',
      'Peugeot 407',
      'Outro modelo'
    ],
    name: 'Peugeot'
  },
  {
    imageName: 'nissan.png',
    models: [
      'Altima',
      'Maxima',
      'Sentra',
      'Versa',
      '370Z',
      'GT-R',
      'Murano',
      'Rogue',
      'Pathfinder',
      'Armada',
      'Frontier',
      'Titan',
      'NV200',
      'Juke',
      'Kicks',
      'Xterra',
      'Leaf',
      'NV3500',
      'GT-R Nismo',
      'Cube',
      'Outro modelo'
    ],
    name: 'Nissan'
  },
  {
    imageName: 'renault.png',
    models: [
      'Clio',
      'Mégane',
      'Talisman',
      'Koleos',
      'Captur',
      'Kadjar',
      'Duster',
      'Logan',
      'Sandero',
      'Kwid',
      'Alpine A110',
      'Master',
      'Trafic',
      'Kangoo',
      'Scenic',
      'Espace',
      'Fluence',
      'Laguna',
      'Avantime',
      'Outro modelo'
    ],
    name: 'Renault'
  },
  {
    imageName: 'jeep.png',
    models: [
      'Compass',
      'Renegade',
      'Cherokee',
      'Grand Cherokee',
      'Wrangler',
      'Gladiator',
      'Commander',
      'Patriot',
      'Liberty',
      'Wagoneer',
      'Outro modelo'
    ],
    name: 'Jeep'
  },
  {
    carros: [
      'Bentley Bentayga',
      'Bentley Continental GT',
      'Bentley Flying Spur',
      'Bentley Mulsanne',
      'Bentley Azure',
      'Bentley Brooklands',
      'Bentley Arnage',
      'Bentley Turbo R',
      'Bentley Eight',
      'Bentley S1',
      'Bentley S2',
      'Bentley S3',
      'Bentley Mark VI',
      'Bentley R Type',
      'Bentley T1'
    ],
    imageName: 'bentley.png',
    name: 'Bentley'
  },
  {
    imageName: 'kia.png',
    models: [
      'Picanto',
      'Rio',
      'Seltos',
      'Sportage',
      'Sorento',
      'Carnival',
      'Niro',
      'Stinger',
      'K5',
      'Telluride',
      'Outro modelo'
    ],
    name: 'Kia'
  },
  {
    imageName: 'mercedes-benz.png',
    models: [
      'A-Class',
      'B-Class',
      'C-Class',
      'E-Class',
      'S-Class',
      'CLA',
      'CLS',
      'GLA',
      'GLB',
      'GLC',
      'GLE',
      'GLS',
      'G-Class',
      'EQB',
      'EQC',
      'EQS',
      'SL',
      'AMG GT',
      'SLS AMG',
      'Outro modelo'
    ],
    name: 'Mercedes-Benz'
  },
  {
    imageName: 'bmw.png',
    models: [
      '1 Series',
      '2 Series',
      '3 Series',
      '4 Series',
      '5 Series',
      '6 Series',
      '7 Series',
      '8 Series',
      'X1',
      'X2',
      'X3',
      'X4',
      'X5',
      'X6',
      'X7',
      'Z4',
      'i3',
      'i4',
      'iX',
      'M2',
      'M3',
      'M4',
      'M5',
      'M8',
      'X5 M',
      'X6 M',
      'X7 M',
      'Outro modelo'
    ],
    name: 'BMW'
  },
  {
    imageName: 'audi.png',
    models: [
      'A1',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'Q2',
      'Q3',
      'Q4 e-tron',
      'Q5',
      'Q7',
      'Q8',
      'TT',
      'R8',
      'e-tron GT',
      'RS3',
      'RS4',
      'RS5',
      'RS7',
      'RS Q3',
      'RS Q5',
      'Outro modelo'
    ],
    name: 'Audi'
  },
  {
    imageName: 'porsche.png',
    models: [
      '718 Boxster',
      '718 Cayman',
      '911 Carrera',
      '911 Turbo',
      '911 Targa',
      '911 GT3',
      '911 GT2 RS',
      'Panamera',
      'Panamera Sport Turismo',
      'Taycan',
      'Macan',
      'Macan S',
      'Macan GTS',
      'Cayenne',
      'Cayenne Coupe',
      'Cayenne S',
      'Cayenne Turbo',
      'Cayenne Turbo S E-Hybrid',
      'Cayenne E-Hybrid',
      'Outro modelo'
    ],
    name: 'Porsche'
  },
  {
    imageName: 'chrysler.png',
    models: [
      '300',
      '300C',
      'Pacifica',
      'Pacifica Hybrid',
      'Voyager',
      'Aspen',
      'Town & Country',
      'Sebring',
      'PT Cruiser',
      'Crossfire',
      'Concorde',
      'LHS',
      'Outro modelo'
    ],
    name: 'Chrysler'
  },
  {
    imageName: 'dodge.png',
    models: [
      'Charger',
      'Challenger',
      'Durango',
      'Journey',
      'Viper',
      'Grand Caravan',
      'Neon',
      'Dakota',
      'Ram 1500',
      'Ram 2500',
      'Ram 3500',
      'Stratus',
      'Caliber',
      'Magnum',
      'Dart',
      'SRT4',
      'SRT8',
      'Outro modelo'
    ],
    name: 'Dodge'
  },
  {
    imageName: 'subaru.png',
    models: [
      'Impreza',
      'Legacy',
      'Outback',
      'Forester',
      'Crosstrek',
      'Ascent',
      'BRZ',
      'WRX',
      'STI',
      'Tribeca',
      'XV',
      'Baja',
      'Alcyone SVX',
      'Justy',
      'Leone',
      'Tribeca',
      'Outro modelo'
    ],
    name: 'Subaru'
  },
  {
    imageName: 'aston-martin.png',
    models: [
      'Aston Martin DB11',
      'Aston Martin DBX',
      'Aston Martin Vantage',
      'Aston Martin DBS Superleggera',
      'Aston Martin Rapide',
      'Aston Martin DB7',
      'Aston Martin DB9',
      'Aston Martin V8 Vantage',
      'Outro modelo'
    ],
    name: 'Aston Martin'
  },
  {
    imageName: 'land-rover.png',
    models: [
      'Defender',
      'Discovery',
      'Discovery Sport',
      'Range Rover',
      'Range Rover Sport',
      'Range Rover Velar',
      'Range Rover Evoque',
      'Freelander',
      'LR4',
      'LR2',
      'Series I',
      'Series II',
      'Series III',
      'Outro modelo'
    ],
    name: 'Land Rover'
  },
  {
    imageName: 'yamaha.png',
    models: [
      'Yamaha MT-07',
      'Yamaha MT-09',
      'Yamaha MT-10',
      'Yamaha YZF-R1',
      'Yamaha YZF-R6',
      'Yamaha YZF-R3',
      'Yamaha FZ-S',
      'Yamaha FZ25',
      'Yamaha XSR700',
      'Yamaha XSR900',
      'Yamaha Tenere 700',
      'Yamaha Tracer 900',
      'Outro modelo'
    ],
    name: 'Yamaha'
  },
  {
    imageName: 'lexus.png',
    models: [
      'ES',
      'GS',
      'LS',
      'NX',
      'RX',
      'UX',
      'LC',
      'LX',
      'GX',
      'IS',
      'RC',
      'CT',
      'RX L',
      'Outro modelo'
    ],
    name: 'Lexus'
  },
  {
    imageName: 'mini.png',
    models: [
      'Mini 3-Door Hatch',
      'Mini 5-Door Hatch',
      'Mini Clubman',
      'Mini Countryman',
      'Mini Convertible',
      'Mini John Cooper Works',
      'Mini Electric',
      'Mini Paceman',
      'Mini Roadster',
      'Outro modelo'
    ],
    name: 'Mini'
  },
  {
    imageName: 'mitsubishi.png',
    models: [
      'Mitsubishi ASX',
      'Mitsubishi Outlander',
      'Mitsubishi Eclipse Cross',
      'Mitsubishi Pajero',
      'Mitsubishi Lancer',
      'Mitsubishi L200 Triton',
      'Mitsubishi Mirage',
      'Mitsubishi Montero',
      'Mitsubishi Galant',
      'Mitsubishi Pajero Sport',
      'Outro modelo'
    ],
    name: 'Mitsubishi'
  },
  {
    imageName: 'great-wall.png',
    models: [
      'Great Wall Haval H6',
      'Great Wall Haval F7',
      'Great Wall Haval F5',
      'Great Wall Haval H9',
      'Great Wall M4',
      'Great Wall M6',
      'Great Wall Wingle 7',
      'Great Wall Wingle 5',
      'Great Wall Poer',
      'Great Wall Haval H2',
      'Outro modelo'
    ],
    name: 'Great Wall'
  },
  {
    imageName: 'jaguar.png',
    models: [
      'Jaguar XE',
      'Jaguar XF',
      'Jaguar XJ',
      'Jaguar F-Type',
      'Jaguar F-Pace',
      'Jaguar E-Pace',
      'Jaguar I-Pace',
      'Jaguar X-Type',
      'Jaguar S-Type',
      'Jaguar XK',
      'Jaguar XKR',
      'Outro modelo'
    ],
    name: 'Jaguar'
  },
  {
    imageName: 'lamborghini.png',
    models: [
      'Lamborghini Aventador',
      'Lamborghini Huracán',
      'Lamborghini Urus',
      'Lamborghini Gallardo',
      'Lamborghini Murciélago',
      'Lamborghini Huracán EVO',
      'Lamborghini Centenario',
      'Lamborghini Sian',
      'Lamborghini Veneno',
      'Lamborghini Countach',
      'Outro modelo'
    ],
    name: 'Lamborghini'
  },
  {
    imageName: 'rolls-royce.png',
    models: [
      'Rolls-Royce Phantom',
      'Rolls-Royce Cullinan',
      'Rolls-Royce Ghost',
      'Rolls-Royce Wraith',
      'Rolls-Royce Dawn',
      'Rolls-Royce Spectre',
      'Rolls-Royce Silver Ghost',
      'Rolls-Royce Silver Wraith',
      'Rolls-Royce Corniche',
      'Rolls-Royce Silver Spirit',
      'Outro modelo'
    ],
    name: 'Rolls Royce'
  },
  {
    imageName: 'mclaren.png',
    models: [
      'McLaren 720S',
      'McLaren 765LT',
      'McLaren 600LT',
      'McLaren GT',
      'McLaren Artura',
      'McLaren P1',
      'McLaren 570S',
      'McLaren 540C',
      'McLaren Sabre',
      'McLaren Elva',
      'Outro modelo'
    ],
    name: 'McLaren'
  },
  {
    imageName: 'maserati.png',
    models: [
      'Maserati Alfieri',
      'Maserati Ghibli',
      'Maserati Quattroporte',
      'Maserati Levante',
      'Maserati GranTurismo',
      'Maserati GranCabrio',
      'Maserati MC20',
      'Outro modelo'
    ],
    name: 'Maserati'
  },

  {
    imageName: 'ferrari.png',
    models: [
      'Ferrari 488 GTB',
      'Ferrari 488 Spider',
      'Ferrari 812 Superfast',
      'Ferrari F8 Tributo',
      'Ferrari Roma',
      'Ferrari Portofino M',
      'Ferrari LaFerrari',
      'Ferrari GTC4Lusso',
      'Ferrari 458 Italia',
      'Ferrari 458 Spider',
      'Outro modelo'
    ],
    name: 'Ferrari'
  },
  {
    imageName: 'suzuki.png',
    models: [
      'Suzuki Alto',
      'Suzuki Baleno',
      'Suzuki Celerio',
      'Suzuki Grand Vitara',
      'Suzuki Ignis',
      'Suzuki Jimny',
      'Suzuki Kizashi',
      'Suzuki SX4',
      'Suzuki Swift',
      'Suzuki Vitara',
      'Outro modelo'
    ],
    name: 'Suzuki'
  },

  {
    imageName: 'triumph.png',
    models: [
      'Triumph Bonneville',
      'Triumph Tiger 900',
      'Triumph Street Triple',
      'Triumph Speed Triple',
      'Triumph Thruxton',
      'Triumph Rocket 3',
      'Triumph Daytona',
      'Triumph Scrambler',
      'Outro modelo'
    ],
    name: 'Triumph'
  },
  {
    imageName: 'troller.png',
    models: [
      'Troller T4',
      'Troller T4 Diesel',
      'Troller T4 Limited Edition',
      'Troller T4 Special Edition',
      'Outro modelo'
    ],
    name: 'Troller'
  },
  {
    imageName: 'volvo.png',
    models: [
      'Volvo XC40',
      'Volvo XC60',
      'Volvo XC90',
      'Volvo S60',
      'Volvo S90',
      'Volvo V60',
      'Volvo V90',
      'Volvo V40',
      'Volvo S60 Recharge',
      'Volvo XC60 Recharge',
      'Volvo XC90 Recharge',
      'Outro modelo'
    ],
    name: 'Volvo'
  },
  {
    imageName: 'jac.png',
    models: [
      'JAC T40',
      'JAC T60',
      'JAC T80',
      'JAC J5',
      'JAC J6',
      'JAC J7',
      'JAC S3',
      'JAC S5',
      'JAC S7',
      'JAC E-JS4',
      'JAC E-JS6',
      'Outro modelo'
    ],
    name: 'JAC'
  },
  {
    imageName: 'byd.png',
    models: [
      'BYD Han',
      'BYD Tang',
      'BYD Qin',
      'BYD Song',
      'BYD e6',
      'BYD e7',
      'BYD Yuan',
      'BYD F3',
      'BYD F6',
      'BYD S2',
      'BYD S6',
      'BYD T3',
      'Outro modelo'
    ],
    name: 'BYD'
  },
  {
    imageName: 'lifan.png',
    models: [
      'Lifan X60',
      'Lifan X50',
      'Lifan X70',
      'Lifan 320',
      'Lifan 620',
      'Lifan 530',
      'Lifan 820',
      'Lifan V5',
      'Outro modelo'
    ],
    name: 'Lifan'
  },
  {
    imageName: 'caoa-chery.png',
    models: [
      'Caoa Chery Tiggo 2',
      'Caoa Chery Tiggo 5',
      'Caoa Chery Tiggo 7',
      'Caoa Chery Tiggo 8',
      'Caoa Chery QQ',
      'Caoa Chery Arrizo 3',
      'Caoa Chery Arrizo 5',
      'Caoa Chery Arrizo 6',
      'Caoa Chery Arrizo 7',
      'Outro modelo'
    ],
    name: 'Caoa Chery'
  },
  {
    imageName: 'seres.png',
    models: ['Seres 3', 'Seres 5', 'Seres 7', 'Outro modelo'],
    name: 'Seres'
  },
  {
    imageName: 'smart.png',
    models: [
      'Smart ForTwo',
      'Smart ForFour',
      'Smart EQ ForTwo',
      'Smart EQ ForFour',
      'Outro modelo'
    ],
    name: 'Smart'
  },
  {
    imageName: '',
    models: ['Outro modelo'],
    name: 'Outra marca'
  }
];

console.log(carBrands.length);
