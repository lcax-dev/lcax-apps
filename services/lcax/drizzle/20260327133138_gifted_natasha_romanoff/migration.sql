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
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;