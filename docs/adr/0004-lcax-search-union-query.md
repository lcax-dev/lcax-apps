# LCAx Search uses a server-side union query

Search ranking and the 50-row cap live on the server. One `Query.search` returns a GraphQL union of EPD | Assembly, already filtered, name-sorted, and sliced. We rejected client-side merge of `epds` plus a future assemblies list because chips and the cap would disagree across round-trips.

**Status:** accepted  
**Date:** 2026-09-02

`kinds` is optional (empty/null = both). Free text matches EPD `name` + `comment` and Assembly `name` + `description`. Filters are a union: EPD-only fields never hide Assemblies, Assembly `classification` (JSON text `ilike`) never hides EPDs, and `unit` maps to EPD `declaredUnit` and Assembly `unit`. Visibility is the existing Public-OR-own-org rule (admin unscoped).

Assembly GraphQL objects always expose hydrated `Product[]`, never raw `ProductReference`. Catalog references are batched and omitted when missing or not visible; inline products on a visible Assembly stay. Search list queries skip that expansion when `products` is not selected.

This does not change ADR 0002 (mixed catalog) or ADR 0003 (Public Assembly write rules).
