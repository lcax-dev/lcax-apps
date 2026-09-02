# Mixed EPD and Assembly results in LCAx Search

LCAx Search is a catalog of peer LCAx Data types, not an EPD-only app. Search returns EPDs and Assemblies in one list, with optional type chips (none selected = both; no Product chip). We rejected type-first tabs (filters stay clean but hide mixed discovery) and a lowest-common-denominator card.

**Status:** accepted  
**Date:** 2026-09-02

Free text matches EPD `name` + `comment` and Assembly `name` + `description` (not nested Product/EPD names, not Assembly `comment`). Filters are a union: each applies only to rows that have the field. There is one merged unit control (EPD declared unit and Assembly unit). Assemblies also filter by classification. Results share a card skeleton (type badge, name, unit) plus type-specific extras, cap at 50 total, sort by name, no pagination. Assembly detail is `/assemblies/:id`.

Who can find a record follows existing EPD Visibility (Public anonymously; Private to the owning Organization). Product search is out of scope.
