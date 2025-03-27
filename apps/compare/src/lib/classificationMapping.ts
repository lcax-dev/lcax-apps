import { Assembly, Project } from 'lcax'

export const mapLCABygClassification = (project: Project) => {
  // @ts-expect-error assemblies are Assembly[]
  project.assemblies = (project.assemblies as Assembly[]).map((assembly) => {
    const lcabygClass = assembly.classification?.find((classification) => classification.system === 'LCAByg')?.name
    return {
      ...assembly,
      classification: [
        ...(assembly.classification || []),
        lcabygClass
          ? {
              system: 'BR18',
              name: LCABYG_TO_BR18_MAP[lcabygClass as string],
              code: '',
            }
          : undefined,
      ],
    }
  })
  project.classificationSystems = [...(project.classificationSystems || []), 'BR18']
  return project
}

export const LCABYG_TO_BR18_MAP: Record<string, string | null> = {
  Altanbund: 'Altaner og altangange',
  Andet: null,
  'Andet (El- og mekaniske anlæg)': null,
  'Andet (søjler og bjælker)': null,
  'Andet (udendørs areal)': null,
  'Andet (varme)': null,
  Beklædning: 'Ydervægge',
  Belysning: null,
  Belægninger: 'Belægninger',
  Bjælker: 'Bjælker',
  'Bærende indervægge': 'Indervægge',
  'Bærende indervægge i kælderen': 'Indervægge',
  Døre: 'Døre',
  'El-anlæg': null,
  Energiproduktion: 'Energiproduktion',
  Etagedæk: 'Etagedæk (dæk)',
  Faldstammer: null,
  Fastgørelse: 'Loft',
  Glasfacader: 'Glasfacader',
  Gulv: 'Gulv',
  Gulvvarme: 'Varme, ventilation og køl',
  'Ikke-bærende indervægge i kælderen': 'Indervægge',
  'Installationer over jord': null,
  'Installationer under jord': null,
  Kælderdæk: 'Terrændæk',
  Kælderydervægge: 'Ydervægge',
  Loft: 'Loft',
  'Nedløb fra tag': null,
  Pladefundament: 'Fundamenter',
  Punktfundament: 'Fundamenter',
  Pælefundering: 'Fundamenter',
  Radiatorer: 'Varme, ventilation og køl',
  Randfundamenter: 'Fundamenter',
  Rækværk: 'Trapper',
  'Sekundær bebyggelse': null,
  Spuns: 'Spuns',
  'Stribefundamenter under bærende indervægge': 'Fundamenter',
  Søjler: 'Søjler',
  Tage: 'Tage',
  Terrænbefæstninger: 'Terrændæk',
  Terrændæk: 'Terrændæk',
  Transportanlæg: 'Transportanlæg',
  'Trapper og ramper': 'Trappe',
  'Udendørs belysning': null,
  'Udendørs inventar': null,
  'Udendørs trapper og ramper': 'Trappe',
  Vandrør: 'Vand',
  Varmeforsyningsanlæg: 'Varme, ventilation og køl',
  Varmerør: 'Varme, ventilation og køl',
  Varmtvandsbeholder: 'Varme, ventilation og køl',
  Ventilationsanlæg: 'Varme, ventilation og køl',
  Ventilationskanaler: 'Varme, ventilation og køl',
  Vinduer: 'Vinduer',
  Ydervægge: 'Ydervægge',
  Drift: 'Drift',
}
