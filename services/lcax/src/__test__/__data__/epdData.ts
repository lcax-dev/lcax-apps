import type { EPD } from '@/models/types'

export const epdData = [
  {
    id: '0a758688-df9d-514a-a123-3a393d25dd08',
    name: 'Overflade, Metal maling (opløsningsmiddelbaseret) ',
    declaredUnit: 'm2',
    version: '2025',
    publishedDate: '2025-07-01',
    validUntil: '2030-07-01',
    source: {
      name: 'BR18 - Tabel 7',
      url: 'https://www.oekobaudat.de/OEKOBAU.DAT/resource/processes/b2a5f872-5e24-461c-a6e4-88ef88ad7c8c?version=20.23.050',
    },
    referenceServiceLife: null,
    standard: 'en15804a2',
    comment: '#G0990',
    location: 'dnk',
    subtype: 'generic',
    conversions: [
      {
        value: 0.21,
        to: 'kg',
        metaData: null,
      },
    ],
    impacts: {
      gwp: {
        a1a3: 2.22278902267293,
        c3: 0.144027727561326,
        c4: 0.0,
        d: -0.0312260344342671,
      },
    },
    metaData: {
      convertedAt: '2025-08-06T11:42:41.733568',
    },
  } as EPD,
  {
    id: '0e5cfef7-d391-5890-877a-4f6f421189d4',
    name: 'ETICS-limning og belægning af silikatdispersionspuds ',
    declaredUnit: 'm2',
    version: '2025',
    publishedDate: '2025-07-01',
    validUntil: '2030-07-01',
    source: {
      name: 'BR18 - Tabel 7',
      url: 'https://www.oekobaudat.de/OEKOBAU.DAT/resource/processes/2d42602d-9913-43ed-8703-d953f7854bca?version=20.23.050',
    },
    referenceServiceLife: null,
    standard: 'en15804a2',
    comment: '#G1251',
    location: 'dnk',
    subtype: 'generic',
    conversions: [
      {
        value: 12.48,
        to: 'kg',
        metaData: null,
      },
    ],
    impacts: {
      gwp: {
        c3: 0.0,
        c4: 0.200772919668603,
        d: 0.0,
        a1a3: 5.55288613540022,
      },
    },
    metaData: {
      convertedAt: '2025-08-06T11:42:41.821050',
    },
  } as EPD,
]
