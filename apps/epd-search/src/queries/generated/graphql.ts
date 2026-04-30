/* eslint-disable */
export type Maybe<T> = T | null
export type InputMaybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any }
}

export type Assembly = {
  __typename?: 'Assembly'
  classification: Array<Maybe<Classification>>
  comment?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  metaData?: Maybe<Scalars['JSONObject']['output']>
  modelId?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  products: Array<Maybe<Product>>
  projectId?: Maybe<Scalars['String']['output']>
  quantity: Scalars['Float']['output']
  results?: Maybe<Impacts>
  type: Scalars['String']['output']
  unit: UnitEnum
  workspaceId?: Maybe<Scalars['String']['output']>
}

export type AssemblyInput = {
  classification?: InputMaybe<Array<InputMaybe<ClassificationInput>>>
  comment?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  metaData?: InputMaybe<Scalars['String']['input']>
  modelId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  products?: InputMaybe<Array<InputMaybe<ProductInput>>>
  projectId?: InputMaybe<Scalars['String']['input']>
  quantity?: InputMaybe<Scalars['Float']['input']>
  results?: InputMaybe<ImpactInput>
  type?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
  workspaceId?: InputMaybe<Scalars['String']['input']>
}

export type CalculationOptionsInput = {
  impactCategories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  lifeCycleModules?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  overwriteExistingResults?: InputMaybe<Scalars['Boolean']['input']>
}

export type Classification = {
  __typename?: 'Classification'
  code?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  system?: Maybe<Scalars['String']['output']>
}

export type ClassificationInput = {
  code?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  system?: InputMaybe<Scalars['String']['input']>
}

export enum CountryEnum {
  Abw = 'ABW',
  Afg = 'AFG',
  Ago = 'AGO',
  Aia = 'AIA',
  Ala = 'ALA',
  Alb = 'ALB',
  And = 'AND',
  Are = 'ARE',
  Arg = 'ARG',
  Arm = 'ARM',
  Asm = 'ASM',
  Ata = 'ATA',
  Atf = 'ATF',
  Atg = 'ATG',
  Aus = 'AUS',
  Aut = 'AUT',
  Aze = 'AZE',
  Bdi = 'BDI',
  Bel = 'BEL',
  Ben = 'BEN',
  Bes = 'BES',
  Bfa = 'BFA',
  Bgd = 'BGD',
  Bgr = 'BGR',
  Bhr = 'BHR',
  Bhs = 'BHS',
  Bih = 'BIH',
  Blm = 'BLM',
  Blr = 'BLR',
  Blz = 'BLZ',
  Bmu = 'BMU',
  Bol = 'BOL',
  Bra = 'BRA',
  Brb = 'BRB',
  Brn = 'BRN',
  Btn = 'BTN',
  Bvt = 'BVT',
  Bwa = 'BWA',
  Caf = 'CAF',
  Can = 'CAN',
  Cck = 'CCK',
  Che = 'CHE',
  Chl = 'CHL',
  Chn = 'CHN',
  Civ = 'CIV',
  Cmr = 'CMR',
  Cod = 'COD',
  Cog = 'COG',
  Cok = 'COK',
  Col = 'COL',
  Com = 'COM',
  Cpv = 'CPV',
  Cri = 'CRI',
  Cub = 'CUB',
  Cuw = 'CUW',
  Cxr = 'CXR',
  Cym = 'CYM',
  Cyp = 'CYP',
  Cze = 'CZE',
  Deu = 'DEU',
  Dji = 'DJI',
  Dma = 'DMA',
  Dnk = 'DNK',
  Dom = 'DOM',
  Dza = 'DZA',
  Ecu = 'ECU',
  Egy = 'EGY',
  Eri = 'ERI',
  Esh = 'ESH',
  Esp = 'ESP',
  Est = 'EST',
  Eth = 'ETH',
  Fin = 'FIN',
  Fji = 'FJI',
  Flk = 'FLK',
  Fra = 'FRA',
  Fro = 'FRO',
  Fsm = 'FSM',
  Gab = 'GAB',
  Gbr = 'GBR',
  Geo = 'GEO',
  Ggy = 'GGY',
  Gha = 'GHA',
  Gib = 'GIB',
  Gin = 'GIN',
  Glp = 'GLP',
  Gmb = 'GMB',
  Gnb = 'GNB',
  Gnq = 'GNQ',
  Grc = 'GRC',
  Grd = 'GRD',
  Grl = 'GRL',
  Gtm = 'GTM',
  Guf = 'GUF',
  Gum = 'GUM',
  Guy = 'GUY',
  Hkg = 'HKG',
  Hmd = 'HMD',
  Hnd = 'HND',
  Hrv = 'HRV',
  Hti = 'HTI',
  Hun = 'HUN',
  Idn = 'IDN',
  Imn = 'IMN',
  Ind = 'IND',
  Iot = 'IOT',
  Irl = 'IRL',
  Irn = 'IRN',
  Irq = 'IRQ',
  Isl = 'ISL',
  Isr = 'ISR',
  Ita = 'ITA',
  Jam = 'JAM',
  Jey = 'JEY',
  Jor = 'JOR',
  Jpn = 'JPN',
  Kaz = 'KAZ',
  Ken = 'KEN',
  Kgz = 'KGZ',
  Khm = 'KHM',
  Kir = 'KIR',
  Kna = 'KNA',
  Kor = 'KOR',
  Kwt = 'KWT',
  Lao = 'LAO',
  Lbn = 'LBN',
  Lbr = 'LBR',
  Lby = 'LBY',
  Lca = 'LCA',
  Lie = 'LIE',
  Lka = 'LKA',
  Lso = 'LSO',
  Ltu = 'LTU',
  Lux = 'LUX',
  Lva = 'LVA',
  Mac = 'MAC',
  Maf = 'MAF',
  Mar = 'MAR',
  Mco = 'MCO',
  Mda = 'MDA',
  Mdg = 'MDG',
  Mdv = 'MDV',
  Mex = 'MEX',
  Mhl = 'MHL',
  Mkd = 'MKD',
  Mli = 'MLI',
  Mlt = 'MLT',
  Mmr = 'MMR',
  Mne = 'MNE',
  Mng = 'MNG',
  Mnp = 'MNP',
  Moz = 'MOZ',
  Mrt = 'MRT',
  Msr = 'MSR',
  Mtq = 'MTQ',
  Mus = 'MUS',
  Mwi = 'MWI',
  Mys = 'MYS',
  Myt = 'MYT',
  Nam = 'NAM',
  Ncl = 'NCL',
  Ner = 'NER',
  Nfk = 'NFK',
  Nga = 'NGA',
  Nic = 'NIC',
  Niu = 'NIU',
  Nld = 'NLD',
  Nor = 'NOR',
  Npl = 'NPL',
  Nru = 'NRU',
  Nzl = 'NZL',
  Omn = 'OMN',
  Pak = 'PAK',
  Pan = 'PAN',
  Pcn = 'PCN',
  Per = 'PER',
  Phl = 'PHL',
  Plw = 'PLW',
  Png = 'PNG',
  Pol = 'POL',
  Pri = 'PRI',
  Prk = 'PRK',
  Prt = 'PRT',
  Pry = 'PRY',
  Pse = 'PSE',
  Pyf = 'PYF',
  Qat = 'QAT',
  Reu = 'REU',
  Rou = 'ROU',
  Rus = 'RUS',
  Rwa = 'RWA',
  Sau = 'SAU',
  Sdn = 'SDN',
  Sen = 'SEN',
  Sgp = 'SGP',
  Sgs = 'SGS',
  Shn = 'SHN',
  Sjm = 'SJM',
  Slb = 'SLB',
  Sle = 'SLE',
  Slv = 'SLV',
  Smr = 'SMR',
  Som = 'SOM',
  Spm = 'SPM',
  Srb = 'SRB',
  Ssd = 'SSD',
  Stp = 'STP',
  Sur = 'SUR',
  Svk = 'SVK',
  Svn = 'SVN',
  Swe = 'SWE',
  Swz = 'SWZ',
  Sxm = 'SXM',
  Syc = 'SYC',
  Syr = 'SYR',
  Tca = 'TCA',
  Tcd = 'TCD',
  Tgo = 'TGO',
  Tha = 'THA',
  Tjk = 'TJK',
  Tkl = 'TKL',
  Tkm = 'TKM',
  Tls = 'TLS',
  Ton = 'TON',
  Tto = 'TTO',
  Tun = 'TUN',
  Tur = 'TUR',
  Tuv = 'TUV',
  Twn = 'TWN',
  Tza = 'TZA',
  Uga = 'UGA',
  Ukr = 'UKR',
  Umi = 'UMI',
  Unknown = 'UNKNOWN',
  Ury = 'URY',
  Usa = 'USA',
  Uzb = 'UZB',
  Vat = 'VAT',
  Vct = 'VCT',
  Ven = 'VEN',
  Vgb = 'VGB',
  Vir = 'VIR',
  Vnm = 'VNM',
  Vut = 'VUT',
  Wlf = 'WLF',
  Wsm = 'WSM',
  Yem = 'YEM',
  Zaf = 'ZAF',
  Zmb = 'ZMB',
  Zwe = 'ZWE',
}

export type CountryFilter = {
  eq?: InputMaybe<CountryEnum>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export type Epd = {
  __typename?: 'EPD'
  comment?: Maybe<Scalars['String']['output']>
  conversions?: Maybe<Array<Maybe<EpdConversion>>>
  declaredUnit?: Maybe<UnitEnum>
  epdId?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  impacts?: Maybe<Impacts>
  location?: Maybe<CountryEnum>
  metaData?: Maybe<Scalars['JSONObject']['output']>
  modelId?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  projectId?: Maybe<Scalars['String']['output']>
  publishedDate?: Maybe<Scalars['String']['output']>
  referenceServiceLife?: Maybe<Scalars['Int']['output']>
  source?: Maybe<EpdSource>
  standard?: Maybe<StandardEnum>
  subtype?: Maybe<SubTypeEnum>
  type?: Maybe<Scalars['String']['output']>
  validUntil?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['String']['output']>
  workspaceId?: Maybe<Scalars['String']['output']>
}

export type EpdConversion = {
  __typename?: 'EPDConversion'
  metaData?: Maybe<Scalars['String']['output']>
  to?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['Float']['output']>
}

export type EpdConversionInput = {
  metaData?: InputMaybe<Scalars['String']['input']>
  to?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['Float']['input']>
}

export type EpdImpactInput = {
  adpe?: InputMaybe<ImpactCategoryInput>
  adpf?: InputMaybe<ImpactCategoryInput>
  ap?: InputMaybe<ImpactCategoryInput>
  cru?: InputMaybe<ImpactCategoryInput>
  eee?: InputMaybe<ImpactCategoryInput>
  eet?: InputMaybe<ImpactCategoryInput>
  ep?: InputMaybe<ImpactCategoryInput>
  ep_fw?: InputMaybe<ImpactCategoryInput>
  ep_mar?: InputMaybe<ImpactCategoryInput>
  ep_ter?: InputMaybe<ImpactCategoryInput>
  etp_fw?: InputMaybe<ImpactCategoryInput>
  fw?: InputMaybe<ImpactCategoryInput>
  gwp?: InputMaybe<ImpactCategoryInput>
  gwp_bio?: InputMaybe<ImpactCategoryInput>
  gwp_fos?: InputMaybe<ImpactCategoryInput>
  gwp_lul?: InputMaybe<ImpactCategoryInput>
  htp_c?: InputMaybe<ImpactCategoryInput>
  htp_nc?: InputMaybe<ImpactCategoryInput>
  hwd?: InputMaybe<ImpactCategoryInput>
  irp?: InputMaybe<ImpactCategoryInput>
  mer?: InputMaybe<ImpactCategoryInput>
  mrf?: InputMaybe<ImpactCategoryInput>
  nhwd?: InputMaybe<ImpactCategoryInput>
  nrsf?: InputMaybe<ImpactCategoryInput>
  odp?: InputMaybe<ImpactCategoryInput>
  penre?: InputMaybe<ImpactCategoryInput>
  penrm?: InputMaybe<ImpactCategoryInput>
  penrt?: InputMaybe<ImpactCategoryInput>
  pere?: InputMaybe<ImpactCategoryInput>
  perm?: InputMaybe<ImpactCategoryInput>
  pert?: InputMaybe<ImpactCategoryInput>
  pm?: InputMaybe<ImpactCategoryInput>
  pocp?: InputMaybe<ImpactCategoryInput>
  rsf?: InputMaybe<ImpactCategoryInput>
  rwd?: InputMaybe<ImpactCategoryInput>
  sm?: InputMaybe<ImpactCategoryInput>
  sqp?: InputMaybe<ImpactCategoryInput>
  wdp?: InputMaybe<ImpactCategoryInput>
}

export type EpdSource = {
  __typename?: 'EPDSource'
  name?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type EpdSourceInput = {
  name?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type EpdsFilters = {
  OR?: InputMaybe<Array<InputMaybe<EpdsFilters>>>
  comment?: InputMaybe<StringFilter>
  declaredUnit?: InputMaybe<UnitFilter>
  id?: InputMaybe<StringFilter>
  location?: InputMaybe<CountryFilter>
  name?: InputMaybe<StringFilter>
  publishedDate?: InputMaybe<StringFilter>
  referenceServiceLife?: InputMaybe<IntFilter>
  standard?: InputMaybe<StandardFilter>
  subtype?: InputMaybe<SubTypeFilter>
  type?: InputMaybe<StringFilter>
  validUntil?: InputMaybe<StringFilter>
  version?: InputMaybe<StringFilter>
}

export type EpdsInsertInput = {
  comment?: InputMaybe<Scalars['String']['input']>
  conversions?: InputMaybe<Array<InputMaybe<EpdConversionInput>>>
  declaredUnit?: InputMaybe<Scalars['String']['input']>
  formatVersion?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  impacts?: InputMaybe<EpdImpactInput>
  location?: InputMaybe<Scalars['String']['input']>
  metaData?: InputMaybe<Scalars['JSONObject']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['String']['input']>
  referenceServiceLife?: InputMaybe<Scalars['Int']['input']>
  source?: InputMaybe<EpdSourceInput>
  standard?: InputMaybe<Scalars['String']['input']>
  subtype?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  validUntil?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['String']['input']>
}

export type EpdsOrderBy = {
  comment?: InputMaybe<SortOrder>
  declaredUnit?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  location?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  publishedDate?: InputMaybe<SortOrder>
  referenceServiceLife?: InputMaybe<SortOrder>
  standard?: InputMaybe<SortOrder>
  subtype?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
  validUntil?: InputMaybe<SortOrder>
  version?: InputMaybe<SortOrder>
}

export type EpdsUpdateInput = {
  comment?: InputMaybe<Scalars['String']['input']>
  declaredUnit?: InputMaybe<Scalars['String']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  metaData?: InputMaybe<Scalars['JSONObject']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedDate?: InputMaybe<Scalars['String']['input']>
  referenceServiceLife?: InputMaybe<Scalars['Int']['input']>
  source?: InputMaybe<EpdSourceInput>
  standard?: InputMaybe<Scalars['String']['input']>
  subtype?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  validUntil?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['String']['input']>
}

export type ImpactCategory = {
  __typename?: 'ImpactCategory'
  a0?: Maybe<Scalars['Float']['output']>
  a1a3?: Maybe<Scalars['Float']['output']>
  a4?: Maybe<Scalars['Float']['output']>
  a5?: Maybe<Scalars['Float']['output']>
  b1?: Maybe<Scalars['Float']['output']>
  b2?: Maybe<Scalars['Float']['output']>
  b3?: Maybe<Scalars['Float']['output']>
  b4?: Maybe<Scalars['Float']['output']>
  b5?: Maybe<Scalars['Float']['output']>
  b6?: Maybe<Scalars['Float']['output']>
  b7?: Maybe<Scalars['Float']['output']>
  b8?: Maybe<Scalars['Float']['output']>
  c1?: Maybe<Scalars['Float']['output']>
  c2?: Maybe<Scalars['Float']['output']>
  c3?: Maybe<Scalars['Float']['output']>
  c4?: Maybe<Scalars['Float']['output']>
  d?: Maybe<Scalars['Float']['output']>
}

export type ImpactCategoryInput = {
  a0?: InputMaybe<Scalars['Float']['input']>
  a1a3?: InputMaybe<Scalars['Float']['input']>
  a4?: InputMaybe<Scalars['Float']['input']>
  a5?: InputMaybe<Scalars['Float']['input']>
  b1?: InputMaybe<Scalars['Float']['input']>
  b2?: InputMaybe<Scalars['Float']['input']>
  b3?: InputMaybe<Scalars['Float']['input']>
  b4?: InputMaybe<Scalars['Float']['input']>
  b5?: InputMaybe<Scalars['Float']['input']>
  b6?: InputMaybe<Scalars['Float']['input']>
  b7?: InputMaybe<Scalars['Float']['input']>
  b8?: InputMaybe<Scalars['Float']['input']>
  c1?: InputMaybe<Scalars['Float']['input']>
  c2?: InputMaybe<Scalars['Float']['input']>
  c3?: InputMaybe<Scalars['Float']['input']>
  c4?: InputMaybe<Scalars['Float']['input']>
  d?: InputMaybe<Scalars['Float']['input']>
}

export type ImpactInput = {
  adpe?: InputMaybe<ImpactCategoryInput>
  adpf?: InputMaybe<ImpactCategoryInput>
  ap?: InputMaybe<ImpactCategoryInput>
  cru?: InputMaybe<ImpactCategoryInput>
  eee?: InputMaybe<ImpactCategoryInput>
  eet?: InputMaybe<ImpactCategoryInput>
  ep?: InputMaybe<ImpactCategoryInput>
  ep_fw?: InputMaybe<ImpactCategoryInput>
  ep_mar?: InputMaybe<ImpactCategoryInput>
  ep_ter?: InputMaybe<ImpactCategoryInput>
  etp_fw?: InputMaybe<ImpactCategoryInput>
  fw?: InputMaybe<ImpactCategoryInput>
  gwp?: InputMaybe<ImpactCategoryInput>
  gwp_bio?: InputMaybe<ImpactCategoryInput>
  gwp_fos?: InputMaybe<ImpactCategoryInput>
  gwp_lul?: InputMaybe<ImpactCategoryInput>
  htp_c?: InputMaybe<ImpactCategoryInput>
  htp_nc?: InputMaybe<ImpactCategoryInput>
  hwd?: InputMaybe<ImpactCategoryInput>
  irp?: InputMaybe<ImpactCategoryInput>
  mer?: InputMaybe<ImpactCategoryInput>
  mrf?: InputMaybe<ImpactCategoryInput>
  nhwd?: InputMaybe<ImpactCategoryInput>
  nrsf?: InputMaybe<ImpactCategoryInput>
  odp?: InputMaybe<ImpactCategoryInput>
  penre?: InputMaybe<ImpactCategoryInput>
  penrm?: InputMaybe<ImpactCategoryInput>
  penrt?: InputMaybe<ImpactCategoryInput>
  pere?: InputMaybe<ImpactCategoryInput>
  perm?: InputMaybe<ImpactCategoryInput>
  pert?: InputMaybe<ImpactCategoryInput>
  pm?: InputMaybe<ImpactCategoryInput>
  pocp?: InputMaybe<ImpactCategoryInput>
  rsf?: InputMaybe<ImpactCategoryInput>
  rwd?: InputMaybe<ImpactCategoryInput>
  sm?: InputMaybe<ImpactCategoryInput>
  sqp?: InputMaybe<ImpactCategoryInput>
  wdp?: InputMaybe<ImpactCategoryInput>
}

export type Impacts = {
  __typename?: 'Impacts'
  adpe?: Maybe<ImpactCategory>
  adpf?: Maybe<ImpactCategory>
  ap?: Maybe<ImpactCategory>
  cru?: Maybe<ImpactCategory>
  eee?: Maybe<ImpactCategory>
  eet?: Maybe<ImpactCategory>
  ep?: Maybe<ImpactCategory>
  ep_fw?: Maybe<ImpactCategory>
  ep_mar?: Maybe<ImpactCategory>
  ep_ter?: Maybe<ImpactCategory>
  etp_fw?: Maybe<ImpactCategory>
  fw?: Maybe<ImpactCategory>
  gwp?: Maybe<ImpactCategory>
  gwp_bio?: Maybe<ImpactCategory>
  gwp_fos?: Maybe<ImpactCategory>
  gwp_lul?: Maybe<ImpactCategory>
  htp_c?: Maybe<ImpactCategory>
  htp_nc?: Maybe<ImpactCategory>
  hwd?: Maybe<ImpactCategory>
  irp?: Maybe<ImpactCategory>
  mer?: Maybe<ImpactCategory>
  mrf?: Maybe<ImpactCategory>
  nhwd?: Maybe<ImpactCategory>
  nrsf?: Maybe<ImpactCategory>
  odp?: Maybe<ImpactCategory>
  penre?: Maybe<ImpactCategory>
  penrm?: Maybe<ImpactCategory>
  penrt?: Maybe<ImpactCategory>
  pere?: Maybe<ImpactCategory>
  perm?: Maybe<ImpactCategory>
  pert?: Maybe<ImpactCategory>
  pm?: Maybe<ImpactCategory>
  pocp?: Maybe<ImpactCategory>
  rsf?: Maybe<ImpactCategory>
  rwd?: Maybe<ImpactCategory>
  sm?: Maybe<ImpactCategory>
  sqp?: Maybe<ImpactCategory>
  wdp?: Maybe<ImpactCategory>
}

export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  addEpds: Array<Epd>
  calculateAssembly: Assembly
  calculateProduct: Product
  calculateProject: Project
  deleteEpds: Array<Epd>
  updateEpds: Array<Epd>
}

export type MutationAddEpdsArgs = {
  values: Array<EpdsInsertInput>
}

export type MutationCalculateAssemblyArgs = {
  assembly?: InputMaybe<AssemblyInput>
  options?: InputMaybe<CalculationOptionsInput>
}

export type MutationCalculateProductArgs = {
  options?: InputMaybe<CalculationOptionsInput>
  product?: InputMaybe<ProductInput>
}

export type MutationCalculateProjectArgs = {
  project?: InputMaybe<ProjectInput>
}

export type MutationDeleteEpdsArgs = {
  where?: InputMaybe<EpdsFilters>
}

export type MutationUpdateEpdsArgs = {
  set: EpdsUpdateInput
  where?: InputMaybe<EpdsFilters>
}

export type Product = {
  __typename?: 'Product'
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  impactData?: Maybe<Array<Maybe<Epd>>>
  metaData?: Maybe<Scalars['JSONObject']['output']>
  name?: Maybe<Scalars['String']['output']>
  quantity?: Maybe<Scalars['Float']['output']>
  referenceServiceLife?: Maybe<Scalars['Int']['output']>
  results?: Maybe<Impacts>
  transport?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  unit?: Maybe<Scalars['String']['output']>
}

export type ProductInput = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  impactData?: InputMaybe<Array<InputMaybe<EpdsInsertInput>>>
  metaData?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  quantity?: InputMaybe<Scalars['Float']['input']>
  referenceServiceLife?: InputMaybe<Scalars['Int']['input']>
  results?: InputMaybe<ImpactInput>
  transport?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
}

export type Project = {
  __typename?: 'Project'
  assemblies?: Maybe<Array<Maybe<Assembly>>>
  classificationSystems?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  comment?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  formatVersion: Scalars['String']['output']
  id: Scalars['String']['output']
  impactCategories?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  lciaMethod?: Maybe<Scalars['String']['output']>
  lifeCycleModules?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  location: ProjectLocation
  metaData?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  owner?: Maybe<Scalars['String']['output']>
  projectInfo?: Maybe<ProjectInfo>
  projectPhase?: Maybe<Scalars['String']['output']>
  referenceStudyPeriod?: Maybe<Scalars['Int']['output']>
  results?: Maybe<Impacts>
  softwareInfo?: Maybe<SoftwareInfo>
}

export type ProjectArea = {
  __typename?: 'ProjectArea'
  definition?: Maybe<Scalars['String']['output']>
  unit?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['Float']['output']>
}

export type ProjectAreaInput = {
  definition?: InputMaybe<Scalars['String']['input']>
  unit?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['Float']['input']>
}

export type ProjectInfo = {
  __typename?: 'ProjectInfo'
  buildingCompletionYear?: Maybe<Scalars['Int']['output']>
  buildingFootprint?: Maybe<Scalars['Float']['output']>
  buildingHeight?: Maybe<Scalars['Float']['output']>
  buildingMass?: Maybe<Scalars['Float']['output']>
  buildingModelScope?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  buildingPermitYear?: Maybe<Scalars['Int']['output']>
  buildingType?: Maybe<Scalars['String']['output']>
  buildingTypology?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  buildingUsers?: Maybe<Scalars['Int']['output']>
  certifications?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  energyDemandElectricity?: Maybe<Scalars['Float']['output']>
  energyDemandHeating?: Maybe<Scalars['Float']['output']>
  energySupplyElectricity?: Maybe<Scalars['Float']['output']>
  energySupplyHeating?: Maybe<Scalars['Float']['output']>
  exportedElectricity?: Maybe<Scalars['Float']['output']>
  floorsAboveGround?: Maybe<Scalars['Int']['output']>
  floorsBelowGround?: Maybe<Scalars['Int']['output']>
  frameType?: Maybe<Scalars['String']['output']>
  generalEnergyClass?: Maybe<Scalars['String']['output']>
  grossFloorArea?: Maybe<ProjectArea>
  heatedFloorArea?: Maybe<ProjectArea>
  localEnergyClass?: Maybe<Scalars['String']['output']>
  roofType?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type ProjectInfoInput = {
  buildingCompletionYear?: InputMaybe<Scalars['Int']['input']>
  buildingFootprint?: InputMaybe<Scalars['Float']['input']>
  buildingHeight?: InputMaybe<Scalars['Float']['input']>
  buildingMass?: InputMaybe<Scalars['Float']['input']>
  buildingModelScope?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  buildingPermitYear?: InputMaybe<Scalars['Int']['input']>
  buildingType?: InputMaybe<Scalars['String']['input']>
  buildingTypology?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  buildingUsers?: InputMaybe<Scalars['Int']['input']>
  certifications?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  energyDemandElectricity?: InputMaybe<Scalars['Float']['input']>
  energyDemandHeating?: InputMaybe<Scalars['Float']['input']>
  energySupplyElectricity?: InputMaybe<Scalars['Float']['input']>
  energySupplyHeating?: InputMaybe<Scalars['Float']['input']>
  exportedElectricity?: InputMaybe<Scalars['Float']['input']>
  floorsAboveGround?: InputMaybe<Scalars['Int']['input']>
  floorsBelowGround?: InputMaybe<Scalars['Int']['input']>
  frameType?: InputMaybe<Scalars['String']['input']>
  generalEnergyClass?: InputMaybe<Scalars['String']['input']>
  grossFloorArea?: InputMaybe<ProjectAreaInput>
  heatedFloorArea?: InputMaybe<ProjectAreaInput>
  localEnergyClass?: InputMaybe<Scalars['String']['input']>
  roofType?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

export type ProjectInput = {
  assemblies?: InputMaybe<Array<InputMaybe<AssemblyInput>>>
  classificationSystems?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  comment?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  formatVersion?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  impactCategories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  lciaMethod?: InputMaybe<Scalars['String']['input']>
  lifeCycleModules?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  location?: InputMaybe<ProjectLocationInput>
  metaData?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  owner?: InputMaybe<Scalars['String']['input']>
  projectInfo?: InputMaybe<ProjectInfoInput>
  projectPhase?: InputMaybe<Scalars['String']['input']>
  referenceStudyPeriod?: InputMaybe<Scalars['Int']['input']>
  results?: InputMaybe<ImpactInput>
  softwareInfo?: InputMaybe<SoftwareInfoInput>
}

export type ProjectLocation = {
  __typename?: 'ProjectLocation'
  address?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  country: CountryEnum
}

export type ProjectLocationInput = {
  address?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  country?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  epds: Array<Epd>
}

export type QueryEpdsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<InputMaybe<EpdsOrderBy>>>
  where?: InputMaybe<EpdsFilters>
}

export type SoftwareInfo = {
  __typename?: 'SoftwareInfo'
  calculationType?: Maybe<Scalars['String']['output']>
  goalAndScopeDefinition?: Maybe<Scalars['String']['output']>
  lcaSoftware?: Maybe<Scalars['String']['output']>
  lcaSoftwareVersion?: Maybe<Scalars['String']['output']>
}

export type SoftwareInfoInput = {
  calculationType?: InputMaybe<Scalars['String']['input']>
  goalAndScopeDefinition?: InputMaybe<Scalars['String']['input']>
  lcaSoftware?: InputMaybe<Scalars['String']['input']>
  lcaSoftwareVersion?: InputMaybe<Scalars['String']['input']>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum StandardEnum {
  En15804A1 = 'EN15804_A1',
  En15804A2 = 'EN15804_A2',
  Unknown = 'UNKNOWN',
}

export type StandardFilter = {
  eq?: InputMaybe<StandardEnum>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>
  eq?: InputMaybe<Scalars['String']['input']>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export enum SubTypeEnum {
  Generic = 'Generic',
  Industry = 'Industry',
  Representative = 'Representative',
  Specific = 'Specific',
}

export type SubTypeFilter = {
  eq?: InputMaybe<SubTypeEnum>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export enum UnitEnum {
  Kg = 'KG',
  Kgm3 = 'KGM3',
  Km = 'KM',
  Kwh = 'KWH',
  L = 'L',
  M = 'M',
  M2 = 'M2',
  M2R1 = 'M2R1',
  M3 = 'M3',
  Pcs = 'PCS',
  Tones = 'TONES',
  TonesKm = 'TONES_KM',
  Unknown = 'UNKNOWN',
}

export type UnitFilter = {
  eq?: InputMaybe<UnitEnum>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}
