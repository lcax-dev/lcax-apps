ALTER TABLE "account" ADD COLUMN "issuer" text;--> statement-breakpoint
CREATE UNIQUE INDEX "account_issuer_accountId_uidx" ON "account" USING btree ("issuer","account_id");