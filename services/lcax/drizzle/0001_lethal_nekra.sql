CREATE TABLE "assemblies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"comment" text,
	"quantity" double precision NOT NULL,
	"unit" "unit" NOT NULL,
	"classification" json DEFAULT '[]'::json,
	"products" json DEFAULT '[]'::json NOT NULL,
	"results" json,
	"metaData" json DEFAULT '{}'::json
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"referenceServiceLife" double precision NOT NULL,
	"impactData" json DEFAULT '[]'::json NOT NULL,
	"quantity" double precision NOT NULL,
	"unit" "unit" NOT NULL,
	"transport" json DEFAULT '[]'::json,
	"results" json,
	"metaData" json DEFAULT '{}'::json
);
