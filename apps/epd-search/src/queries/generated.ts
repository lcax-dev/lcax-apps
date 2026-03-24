import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any }
  _FieldSet: { input: any; output: any }
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
  Abw = 'abw',
  Afg = 'afg',
  Ago = 'ago',
  Aia = 'aia',
  Ala = 'ala',
  Alb = 'alb',
  And = 'and',
  Are = 'are',
  Arg = 'arg',
  Arm = 'arm',
  Asm = 'asm',
  Ata = 'ata',
  Atf = 'atf',
  Atg = 'atg',
  Aus = 'aus',
  Aut = 'aut',
  Aze = 'aze',
  Bdi = 'bdi',
  Bel = 'bel',
  Ben = 'ben',
  Bes = 'bes',
  Bfa = 'bfa',
  Bgd = 'bgd',
  Bgr = 'bgr',
  Bhr = 'bhr',
  Bhs = 'bhs',
  Bih = 'bih',
  Blm = 'blm',
  Blr = 'blr',
  Blz = 'blz',
  Bmu = 'bmu',
  Bol = 'bol',
  Bra = 'bra',
  Brb = 'brb',
  Brn = 'brn',
  Btn = 'btn',
  Bvt = 'bvt',
  Bwa = 'bwa',
  Caf = 'caf',
  Can = 'can',
  Cck = 'cck',
  Che = 'che',
  Chl = 'chl',
  Chn = 'chn',
  Civ = 'civ',
  Cmr = 'cmr',
  Cod = 'cod',
  Cog = 'cog',
  Cok = 'cok',
  Col = 'col',
  Com = 'com',
  Cpv = 'cpv',
  Cri = 'cri',
  Cub = 'cub',
  Cuw = 'cuw',
  Cxr = 'cxr',
  Cym = 'cym',
  Cyp = 'cyp',
  Cze = 'cze',
  Deu = 'deu',
  Dji = 'dji',
  Dma = 'dma',
  Dnk = 'dnk',
  Dom = 'dom',
  Dza = 'dza',
  Ecu = 'ecu',
  Egy = 'egy',
  Eri = 'eri',
  Esh = 'esh',
  Esp = 'esp',
  Est = 'est',
  Eth = 'eth',
  Fin = 'fin',
  Fji = 'fji',
  Flk = 'flk',
  Fra = 'fra',
  Fro = 'fro',
  Fsm = 'fsm',
  Gab = 'gab',
  Gbr = 'gbr',
  Geo = 'geo',
  Ggy = 'ggy',
  Gha = 'gha',
  Gib = 'gib',
  Gin = 'gin',
  Glp = 'glp',
  Gmb = 'gmb',
  Gnb = 'gnb',
  Gnq = 'gnq',
  Grc = 'grc',
  Grd = 'grd',
  Grl = 'grl',
  Gtm = 'gtm',
  Guf = 'guf',
  Gum = 'gum',
  Guy = 'guy',
  Hkg = 'hkg',
  Hmd = 'hmd',
  Hnd = 'hnd',
  Hrv = 'hrv',
  Hti = 'hti',
  Hun = 'hun',
  Idn = 'idn',
  Imn = 'imn',
  Ind = 'ind',
  Iot = 'iot',
  Irl = 'irl',
  Irn = 'irn',
  Irq = 'irq',
  Isl = 'isl',
  Isr = 'isr',
  Ita = 'ita',
  Jam = 'jam',
  Jey = 'jey',
  Jor = 'jor',
  Jpn = 'jpn',
  Kaz = 'kaz',
  Ken = 'ken',
  Kgz = 'kgz',
  Khm = 'khm',
  Kir = 'kir',
  Kna = 'kna',
  Kor = 'kor',
  Kwt = 'kwt',
  Lao = 'lao',
  Lbn = 'lbn',
  Lbr = 'lbr',
  Lby = 'lby',
  Lca = 'lca',
  Lie = 'lie',
  Lka = 'lka',
  Lso = 'lso',
  Ltu = 'ltu',
  Lux = 'lux',
  Lva = 'lva',
  Mac = 'mac',
  Maf = 'maf',
  Mar = 'mar',
  Mco = 'mco',
  Mda = 'mda',
  Mdg = 'mdg',
  Mdv = 'mdv',
  Mex = 'mex',
  Mhl = 'mhl',
  Mkd = 'mkd',
  Mli = 'mli',
  Mlt = 'mlt',
  Mmr = 'mmr',
  Mne = 'mne',
  Mng = 'mng',
  Mnp = 'mnp',
  Moz = 'moz',
  Mrt = 'mrt',
  Msr = 'msr',
  Mtq = 'mtq',
  Mus = 'mus',
  Mwi = 'mwi',
  Mys = 'mys',
  Myt = 'myt',
  Nam = 'nam',
  Ncl = 'ncl',
  Ner = 'ner',
  Nfk = 'nfk',
  Nga = 'nga',
  Nic = 'nic',
  Niu = 'niu',
  Nld = 'nld',
  Nor = 'nor',
  Npl = 'npl',
  Nru = 'nru',
  Nzl = 'nzl',
  Omn = 'omn',
  Pak = 'pak',
  Pan = 'pan',
  Pcn = 'pcn',
  Per = 'per',
  Phl = 'phl',
  Plw = 'plw',
  Png = 'png',
  Pol = 'pol',
  Pri = 'pri',
  Prk = 'prk',
  Prt = 'prt',
  Pry = 'pry',
  Pse = 'pse',
  Pyf = 'pyf',
  Qat = 'qat',
  Reu = 'reu',
  Rou = 'rou',
  Rus = 'rus',
  Rwa = 'rwa',
  Sau = 'sau',
  Sdn = 'sdn',
  Sen = 'sen',
  Sgp = 'sgp',
  Sgs = 'sgs',
  Shn = 'shn',
  Sjm = 'sjm',
  Slb = 'slb',
  Sle = 'sle',
  Slv = 'slv',
  Smr = 'smr',
  Som = 'som',
  Spm = 'spm',
  Srb = 'srb',
  Ssd = 'ssd',
  Stp = 'stp',
  Sur = 'sur',
  Svk = 'svk',
  Svn = 'svn',
  Swe = 'swe',
  Swz = 'swz',
  Sxm = 'sxm',
  Syc = 'syc',
  Syr = 'syr',
  Tca = 'tca',
  Tcd = 'tcd',
  Tgo = 'tgo',
  Tha = 'tha',
  Tjk = 'tjk',
  Tkl = 'tkl',
  Tkm = 'tkm',
  Tls = 'tls',
  Ton = 'ton',
  Tto = 'tto',
  Tun = 'tun',
  Tur = 'tur',
  Tuv = 'tuv',
  Twn = 'twn',
  Tza = 'tza',
  Uga = 'uga',
  Ukr = 'ukr',
  Umi = 'umi',
  Unknown = 'unknown',
  Ury = 'ury',
  Usa = 'usa',
  Uzb = 'uzb',
  Vat = 'vat',
  Vct = 'vct',
  Ven = 'ven',
  Vgb = 'vgb',
  Vir = 'vir',
  Vnm = 'vnm',
  Vut = 'vut',
  Wlf = 'wlf',
  Wsm = 'wsm',
  Yem = 'yem',
  Zaf = 'zaf',
  Zmb = 'zmb',
  Zwe = 'zwe',
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
  calculateProject: Project
  deleteEpds: Array<Epd>
  updateEpds: Array<Epd>
}

export type MutationAddEpdsArgs = {
  values: Array<EpdsInsertInput>
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
  En15804a1 = 'en15804a1',
  En15804a2 = 'en15804a2',
  Unknown = 'unknown',
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
  Generic = 'generic',
  Industry = 'industry',
  Representative = 'representative',
  Specific = 'specific',
}

export type SubTypeFilter = {
  eq?: InputMaybe<SubTypeEnum>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export enum UnitEnum {
  Kg = 'kg',
  Kgm3 = 'kgm3',
  Km = 'km',
  Kwh = 'kwh',
  L = 'l',
  M = 'm',
  M2 = 'm2',
  M2r1 = 'm2r1',
  M3 = 'm3',
  Pcs = 'pcs',
  Tones = 'tones',
  TonesKm = 'tones_km',
  Unknown = 'unknown',
}

export type UnitFilter = {
  eq?: InputMaybe<UnitEnum>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Assembly: ResolverTypeWrapper<Assembly>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  AssemblyInput: AssemblyInput
  Classification: ResolverTypeWrapper<Classification>
  ClassificationInput: ClassificationInput
  CountryEnum: CountryEnum
  CountryFilter: CountryFilter
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  EPD: ResolverTypeWrapper<Epd>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  EPDConversion: ResolverTypeWrapper<EpdConversion>
  EPDConversionInput: EpdConversionInput
  EPDImpactInput: EpdImpactInput
  EPDSource: ResolverTypeWrapper<EpdSource>
  EPDSourceInput: EpdSourceInput
  EpdsFilters: EpdsFilters
  EpdsInsertInput: EpdsInsertInput
  EpdsOrderBy: EpdsOrderBy
  EpdsUpdateInput: EpdsUpdateInput
  ImpactCategory: ResolverTypeWrapper<ImpactCategory>
  ImpactCategoryInput: ImpactCategoryInput
  ImpactInput: ImpactInput
  Impacts: ResolverTypeWrapper<Impacts>
  IntFilter: IntFilter
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>
  Product: ResolverTypeWrapper<Product>
  ProductInput: ProductInput
  Project: ResolverTypeWrapper<Project>
  ProjectArea: ResolverTypeWrapper<ProjectArea>
  ProjectAreaInput: ProjectAreaInput
  ProjectInfo: ResolverTypeWrapper<ProjectInfo>
  ProjectInfoInput: ProjectInfoInput
  ProjectInput: ProjectInput
  ProjectLocation: ResolverTypeWrapper<ProjectLocation>
  ProjectLocationInput: ProjectLocationInput
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>
  SoftwareInfo: ResolverTypeWrapper<SoftwareInfo>
  SoftwareInfoInput: SoftwareInfoInput
  SortOrder: SortOrder
  StandardEnum: StandardEnum
  StandardFilter: StandardFilter
  StringFilter: StringFilter
  SubTypeEnum: SubTypeEnum
  SubTypeFilter: SubTypeFilter
  UnitEnum: UnitEnum
  UnitFilter: UnitFilter
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Assembly: Assembly
  String: Scalars['String']['output']
  Float: Scalars['Float']['output']
  AssemblyInput: AssemblyInput
  Classification: Classification
  ClassificationInput: ClassificationInput
  CountryFilter: CountryFilter
  Boolean: Scalars['Boolean']['output']
  EPD: Epd
  Int: Scalars['Int']['output']
  EPDConversion: EpdConversion
  EPDConversionInput: EpdConversionInput
  EPDImpactInput: EpdImpactInput
  EPDSource: EpdSource
  EPDSourceInput: EpdSourceInput
  EpdsFilters: EpdsFilters
  EpdsInsertInput: EpdsInsertInput
  EpdsOrderBy: EpdsOrderBy
  EpdsUpdateInput: EpdsUpdateInput
  ImpactCategory: ImpactCategory
  ImpactCategoryInput: ImpactCategoryInput
  ImpactInput: ImpactInput
  Impacts: Impacts
  IntFilter: IntFilter
  JSONObject: Scalars['JSONObject']['output']
  Mutation: Record<PropertyKey, never>
  Product: Product
  ProductInput: ProductInput
  Project: Project
  ProjectArea: ProjectArea
  ProjectAreaInput: ProjectAreaInput
  ProjectInfo: ProjectInfo
  ProjectInfoInput: ProjectInfoInput
  ProjectInput: ProjectInput
  ProjectLocation: ProjectLocation
  ProjectLocationInput: ProjectLocationInput
  Query: Record<PropertyKey, never>
  SoftwareInfo: SoftwareInfo
  SoftwareInfoInput: SoftwareInfoInput
  StandardFilter: StandardFilter
  StringFilter: StringFilter
  SubTypeFilter: SubTypeFilter
  UnitFilter: UnitFilter
}

export type AssemblyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Assembly'] = ResolversParentTypes['Assembly'],
> = {
  classification?: Resolver<Array<Maybe<ResolversTypes['Classification']>>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>
  modelId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  products?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['Impacts']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  unit?: Resolver<ResolversTypes['UnitEnum'], ParentType, ContextType>
  workspaceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type ClassificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Classification'] = ResolversParentTypes['Classification'],
> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  system?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type EpdResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EPD'] = ResolversParentTypes['EPD'],
> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  conversions?: Resolver<Maybe<Array<Maybe<ResolversTypes['EPDConversion']>>>, ParentType, ContextType>
  declaredUnit?: Resolver<Maybe<ResolversTypes['UnitEnum']>, ParentType, ContextType>
  epdId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  impacts?: Resolver<Maybe<ResolversTypes['Impacts']>, ParentType, ContextType>
  location?: Resolver<Maybe<ResolversTypes['CountryEnum']>, ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>
  modelId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  source?: Resolver<Maybe<ResolversTypes['EPDSource']>, ParentType, ContextType>
  standard?: Resolver<Maybe<ResolversTypes['StandardEnum']>, ParentType, ContextType>
  subtype?: Resolver<Maybe<ResolversTypes['SubTypeEnum']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  validUntil?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  workspaceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type EpdConversionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EPDConversion'] = ResolversParentTypes['EPDConversion'],
> = {
  metaData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
}

export type EpdSourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EPDSource'] = ResolversParentTypes['EPDSource'],
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type ImpactCategoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ImpactCategory'] = ResolversParentTypes['ImpactCategory'],
> = {
  a0?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a1a3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  a5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b5?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b6?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b7?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  b8?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c3?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  c4?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
}

export type ImpactsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Impacts'] = ResolversParentTypes['Impacts'],
> = {
  adpe?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  adpf?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  ap?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  cru?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  eee?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  eet?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  ep?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  ep_fw?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  ep_mar?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  ep_ter?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  etp_fw?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  fw?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  gwp?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  gwp_bio?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  gwp_fos?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  gwp_lul?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  htp_c?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  htp_nc?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  hwd?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  irp?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  mer?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  mrf?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  nhwd?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  nrsf?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  odp?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  penre?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  penrm?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  penrt?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  pere?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  perm?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  pert?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  pm?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  pocp?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  rsf?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  rwd?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  sm?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  sqp?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
  wdp?: Resolver<Maybe<ResolversTypes['ImpactCategory']>, ParentType, ContextType>
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addEpds?: Resolver<
    Array<ResolversTypes['EPD']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddEpdsArgs, 'values'>
  >
  calculateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, Partial<MutationCalculateProjectArgs>>
  deleteEpds?: Resolver<Array<ResolversTypes['EPD']>, ParentType, ContextType, Partial<MutationDeleteEpdsArgs>>
  updateEpds?: Resolver<
    Array<ResolversTypes['EPD']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEpdsArgs, 'set'>
  >
}

export type ProductResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product'],
> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  impactData?: Resolver<Maybe<Array<Maybe<ResolversTypes['EPD']>>>, ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  referenceServiceLife?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['Impacts']>, ParentType, ContextType>
  transport?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  assemblies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Assembly']>>>, ParentType, ContextType>
  classificationSystems?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  formatVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  impactCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  lciaMethod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lifeCycleModules?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  location?: Resolver<ResolversTypes['ProjectLocation'], ParentType, ContextType>
  metaData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  projectInfo?: Resolver<Maybe<ResolversTypes['ProjectInfo']>, ParentType, ContextType>
  projectPhase?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  referenceStudyPeriod?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  results?: Resolver<Maybe<ResolversTypes['Impacts']>, ParentType, ContextType>
  softwareInfo?: Resolver<Maybe<ResolversTypes['SoftwareInfo']>, ParentType, ContextType>
}

export type ProjectAreaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectArea'] = ResolversParentTypes['ProjectArea'],
> = {
  definition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
}

export type ProjectInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectInfo'] = ResolversParentTypes['ProjectInfo'],
> = {
  buildingCompletionYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  buildingFootprint?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  buildingHeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  buildingMass?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  buildingModelScope?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  buildingPermitYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  buildingType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  buildingTypology?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  buildingUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  certifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>
  energyDemandElectricity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  energyDemandHeating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  energySupplyElectricity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  energySupplyHeating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  exportedElectricity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  floorsAboveGround?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  floorsBelowGround?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  frameType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  generalEnergyClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  grossFloorArea?: Resolver<Maybe<ResolversTypes['ProjectArea']>, ParentType, ContextType>
  heatedFloorArea?: Resolver<Maybe<ResolversTypes['ProjectArea']>, ParentType, ContextType>
  localEnergyClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  roofType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type ProjectLocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProjectLocation'] = ResolversParentTypes['ProjectLocation'],
> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  country?: Resolver<ResolversTypes['CountryEnum'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  epds?: Resolver<Array<ResolversTypes['EPD']>, ParentType, ContextType, Partial<QueryEpdsArgs>>
}

export type SoftwareInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SoftwareInfo'] = ResolversParentTypes['SoftwareInfo'],
> = {
  calculationType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  goalAndScopeDefinition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaSoftware?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lcaSoftwareVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Assembly?: AssemblyResolvers<ContextType>
  Classification?: ClassificationResolvers<ContextType>
  EPD?: EpdResolvers<ContextType>
  EPDConversion?: EpdConversionResolvers<ContextType>
  EPDSource?: EpdSourceResolvers<ContextType>
  ImpactCategory?: ImpactCategoryResolvers<ContextType>
  Impacts?: ImpactsResolvers<ContextType>
  JSONObject?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Product?: ProductResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectArea?: ProjectAreaResolvers<ContextType>
  ProjectInfo?: ProjectInfoResolvers<ContextType>
  ProjectLocation?: ProjectLocationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  SoftwareInfo?: SoftwareInfoResolvers<ContextType>
}

export type GetEpdQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetEpdQuery = {
  __typename?: 'Query'
  epds: Array<{
    __typename?: 'EPD'
    id?: string | null
    name?: string | null
    epdId?: string | null
    type?: string | null
    declaredUnit?: UnitEnum | null
    version?: string | null
    publishedDate?: string | null
    validUntil?: string | null
    referenceServiceLife?: number | null
    standard?: StandardEnum | null
    location?: CountryEnum | null
    subtype?: SubTypeEnum | null
    metaData?: any | null
    source?: { __typename?: 'EPDSource'; name?: string | null; url?: string | null } | null
    conversions?: Array<{
      __typename?: 'EPDConversion'
      value?: number | null
      to?: string | null
      metaData?: string | null
    } | null> | null
    impacts?: {
      __typename?: 'Impacts'
      gwp?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        b1?: number | null
        b2?: number | null
        b3?: number | null
        b4?: number | null
        b5?: number | null
        b6?: number | null
        b7?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
      odp?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
      ap?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
      ep?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
      pocp?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
      adpe?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
      adpf?: {
        __typename?: 'ImpactCategory'
        a1a3?: number | null
        a4?: number | null
        a5?: number | null
        c1?: number | null
        c2?: number | null
        c3?: number | null
        c4?: number | null
        d?: number | null
      } | null
    } | null
  }>
}

export type SearchEpdsQueryVariables = Exact<{
  where?: InputMaybe<EpdsFilters>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}>

export type SearchEpdsQuery = {
  __typename?: 'Query'
  epds: Array<{
    __typename?: 'EPD'
    id?: string | null
    name?: string | null
    declaredUnit?: UnitEnum | null
    location?: CountryEnum | null
    subtype?: SubTypeEnum | null
    metaData?: any | null
  }>
}

export const GetEpdDocument = gql`
  query GetEpd($id: String!) {
    epds(where: { id: { eq: $id } }, limit: 1) {
      id
      name
      epdId
      type
      declaredUnit
      version
      publishedDate
      validUntil
      referenceServiceLife
      standard
      location
      subtype
      metaData
      source {
        name
        url
      }
      conversions {
        value
        to
        metaData
      }
      impacts {
        gwp {
          a1a3
          a4
          a5
          b1
          b2
          b3
          b4
          b5
          b6
          b7
          c1
          c2
          c3
          c4
          d
        }
        odp {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        ap {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        ep {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        pocp {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        adpe {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        adpf {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
      }
    }
  }
`

/**
 * __useGetEpdQuery__
 *
 * To run a query within a React component, call `useGetEpdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEpdQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<GetEpdQuery, GetEpdQueryVariables> &
    ({ variables: GetEpdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetEpdQuery, GetEpdQueryVariables>(GetEpdDocument, options)
}
export function useGetEpdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEpdQuery, GetEpdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetEpdQuery, GetEpdQueryVariables>(GetEpdDocument, options)
}
// @ts-ignore
export function useGetEpdSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetEpdQuery, GetEpdQueryVariables>,
): ApolloReactHooks.UseSuspenseQueryResult<GetEpdQuery, GetEpdQueryVariables>
export function useGetEpdSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<GetEpdQuery, GetEpdQueryVariables>,
): ApolloReactHooks.UseSuspenseQueryResult<GetEpdQuery | undefined, GetEpdQueryVariables>
export function useGetEpdSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<GetEpdQuery, GetEpdQueryVariables>,
) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<GetEpdQuery, GetEpdQueryVariables>(GetEpdDocument, options)
}
export type GetEpdQueryHookResult = ReturnType<typeof useGetEpdQuery>
export type GetEpdLazyQueryHookResult = ReturnType<typeof useGetEpdLazyQuery>
export type GetEpdSuspenseQueryHookResult = ReturnType<typeof useGetEpdSuspenseQuery>
export type GetEpdQueryResult = Apollo.QueryResult<GetEpdQuery, GetEpdQueryVariables>
export const SearchEpdsDocument = gql`
  query SearchEpds($where: EpdsFilters, $limit: Int, $offset: Int) {
    epds(where: $where, limit: $limit, offset: $offset) {
      id
      name
      declaredUnit
      location
      subtype
      metaData
    }
  }
`

/**
 * __useSearchEpdsQuery__
 *
 * To run a query within a React component, call `useSearchEpdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEpdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEpdsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchEpdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SearchEpdsQuery, SearchEpdsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<SearchEpdsQuery, SearchEpdsQueryVariables>(SearchEpdsDocument, options)
}
export function useSearchEpdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchEpdsQuery, SearchEpdsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<SearchEpdsQuery, SearchEpdsQueryVariables>(SearchEpdsDocument, options)
}
// @ts-ignore
export function useSearchEpdsSuspenseQuery(
  baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SearchEpdsQuery, SearchEpdsQueryVariables>,
): ApolloReactHooks.UseSuspenseQueryResult<SearchEpdsQuery, SearchEpdsQueryVariables>
export function useSearchEpdsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<SearchEpdsQuery, SearchEpdsQueryVariables>,
): ApolloReactHooks.UseSuspenseQueryResult<SearchEpdsQuery | undefined, SearchEpdsQueryVariables>
export function useSearchEpdsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<SearchEpdsQuery, SearchEpdsQueryVariables>,
) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<SearchEpdsQuery, SearchEpdsQueryVariables>(SearchEpdsDocument, options)
}
export type SearchEpdsQueryHookResult = ReturnType<typeof useSearchEpdsQuery>
export type SearchEpdsLazyQueryHookResult = ReturnType<typeof useSearchEpdsLazyQuery>
export type SearchEpdsSuspenseQueryHookResult = ReturnType<typeof useSearchEpdsSuspenseQuery>
export type SearchEpdsQueryResult = Apollo.QueryResult<SearchEpdsQuery, SearchEpdsQueryVariables>
