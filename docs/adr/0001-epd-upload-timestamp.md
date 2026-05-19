# 1. Store EPD Upload Timestamp in MetaData

Date: 2026-05-19

## Status

Accepted

## Context

We need to track when EPDs are uploaded to the system to provide statistics and trend charts. The existing `publishedDate` field in the `epds` table represents the official publication date by the EPD issuer, which may differ significantly from the upload date.

## Decision

Instead of adding a new column to the `epds` table, we will store the upload timestamp (`uploadedAt`) within the existing `metaData` JSON field. 

## Consequences

- Pros:
  - No database migration required for the schema change.
  - Flexible storage within metadata.
- Cons:
  - Querying and aggregating by `uploadedAt` might be less performant than a dedicated indexed column.
  - Requires manual handling in the GraphQL resolvers to ensure the field is populated.
