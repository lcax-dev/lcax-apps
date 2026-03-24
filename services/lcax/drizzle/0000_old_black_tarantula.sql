CREATE TYPE "public"."country" AS ENUM('DNK', 'GBR', 'USA', 'DEU', 'FRA', 'SWE', 'NOR', 'FIN', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."standard" AS ENUM('EN15804_A1', 'EN15804_A2', 'ISO14025', 'ISO14040', 'ISO14044', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."subtype" AS ENUM('Generic', 'Specific', 'Industry', 'Representative');--> statement-breakpoint
CREATE TYPE "public"."unit" AS ENUM('M', 'M2', 'M3', 'KG', 'TONES', 'PCS', 'L', 'M2R1', 'UNKNOWN');--> statement-breakpoint
CREATE TABLE "epds" (
	"id" uuid NOT NULL,
	"version" text NOT NULL,
	"name" text NOT NULL,
	"type" text DEFAULT 'EPD' NOT NULL,
	"declaredUnit" "unit" NOT NULL,
	"publishedDate" date DEFAULT now() NOT NULL,
	"validUntil" date,
	"source" json DEFAULT '{}'::json,
	"referenceServiceLife" integer,
	"standard" "standard" NOT NULL,
	"comment" text,
	"location" "country" NOT NULL,
	"subtype" "subtype" NOT NULL,
	"conversions" json DEFAULT '[]'::json,
	"impacts" json DEFAULT '{}'::json,
	"metaData" json DEFAULT '{}'::json,
	CONSTRAINT "epds_id_version_pk" PRIMARY KEY("id","version")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;