CREATE TYPE "country" AS ENUM('unknown', 'afg', 'ala', 'alb', 'dza', 'asm', 'and', 'ago', 'aia', 'ata', 'atg', 'arg', 'arm', 'abw', 'aus', 'aut', 'aze', 'bhs', 'bhr', 'bgd', 'brb', 'blr', 'bel', 'blz', 'ben', 'bmu', 'btn', 'bol', 'bes', 'bih', 'bwa', 'bvt', 'bra', 'iot', 'brn', 'bgr', 'bfa', 'bdi', 'cpv', 'khm', 'cmr', 'can', 'cym', 'caf', 'tcd', 'chl', 'chn', 'cxr', 'cck', 'col', 'com', 'cog', 'cod', 'cok', 'cri', 'civ', 'hrv', 'cub', 'cuw', 'cyp', 'cze', 'dnk', 'dji', 'dma', 'dom', 'ecu', 'egy', 'slv', 'gnq', 'eri', 'est', 'swz', 'eth', 'flk', 'fro', 'fji', 'fin', 'fra', 'guf', 'pyf', 'atf', 'gab', 'gmb', 'geo', 'deu', 'gha', 'gib', 'grc', 'grl', 'grd', 'glp', 'gum', 'gtm', 'ggy', 'gin', 'gnb', 'guy', 'hti', 'hmd', 'vat', 'hnd', 'hkg', 'hun', 'isl', 'ind', 'idn', 'irn', 'irq', 'irl', 'imn', 'isr', 'ita', 'jam', 'jpn', 'jey', 'jor', 'kaz', 'ken', 'kir', 'prk', 'kor', 'kwt', 'kgz', 'lao', 'lva', 'lbn', 'lso', 'lbr', 'lby', 'lie', 'ltu', 'lux', 'mac', 'mdg', 'mwi', 'mys', 'mdv', 'mli', 'mlt', 'mhl', 'mtq', 'mrt', 'mus', 'myt', 'mex', 'fsm', 'mda', 'mco', 'mng', 'mne', 'msr', 'mar', 'moz', 'mmr', 'nam', 'nru', 'npl', 'nld', 'ncl', 'nzl', 'nic', 'ner', 'nga', 'niu', 'nfk', 'mkd', 'mnp', 'nor', 'omn', 'pak', 'plw', 'pse', 'pan', 'png', 'pry', 'per', 'phl', 'pcn', 'pol', 'prt', 'pri', 'qat', 'reu', 'rou', 'rus', 'rwa', 'blm', 'shn', 'kna', 'lca', 'maf', 'spm', 'vct', 'wsm', 'smr', 'stp', 'sau', 'sen', 'srb', 'syc', 'sle', 'sgp', 'sxm', 'svk', 'svn', 'slb', 'som', 'zaf', 'sgs', 'ssd', 'esp', 'lka', 'sdn', 'sur', 'sjm', 'swe', 'che', 'syr', 'twn', 'tjk', 'tza', 'tha', 'tls', 'tgo', 'tkl', 'ton', 'tto', 'tun', 'tur', 'tkm', 'tca', 'tuv', 'uga', 'ukr', 'are', 'gbr', 'usa', 'umi', 'ury', 'uzb', 'vut', 'ven', 'vnm', 'vgb', 'vir', 'wlf', 'esh', 'yem', 'zmb', 'zwe');--> statement-breakpoint
CREATE TYPE "standard" AS ENUM('en15804a1', 'en15804a2', 'unknown');--> statement-breakpoint
CREATE TYPE "subtype" AS ENUM('generic', 'specific', 'industry', 'representative');--> statement-breakpoint
CREATE TYPE "unit" AS ENUM('m', 'm2', 'm3', 'kg', 'tones', 'pcs', 'kwh', 'l', 'm2r1', 'km', 'tones_km', 'kgm3', 'unknown');--> statement-breakpoint
CREATE TABLE "epds" (
	"id" uuid,
	"version" text,
	"name" text NOT NULL,
	"type" text DEFAULT 'EPD' NOT NULL,
	"declaredUnit" "unit" NOT NULL,
	"publishedDate" date DEFAULT now() NOT NULL,
	"validUntil" date,
	"source" json DEFAULT '{}',
	"referenceServiceLife" integer,
	"standard" "standard" NOT NULL,
	"comment" text,
	"location" "country" NOT NULL,
	"subtype" "subtype" NOT NULL,
	"conversions" json DEFAULT '[]',
	"impacts" json DEFAULT '{}',
	"metaData" json DEFAULT '{}',
	CONSTRAINT "epds_pkey" PRIMARY KEY("id","version")
);
