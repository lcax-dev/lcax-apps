# Public Assembly force-publishes nested Products and EPDs

A Public Assembly must not contain Private children: its nested Products and those Products’ impact EPDs are Public. We rejected showing holes in the tree, hiding the whole Assembly, and revealing Private nested documents.

**Status:** accepted  
**Date:** 2026-09-02

Making an Assembly Public, or uploading it as Public, uses a confirmation modal and then force-publishes those children. Cancel does not save the Assembly as Public and does not change children. While an Assembly remains Public, a nested Product or impact EPD cannot be made Private; the write is blocked and the parent Assemblies are named. Making the Assembly Private does not change children.

Existing Public Assemblies that violate the rule are repaired by force-publishing children (no per-row consent), not by privatizing the Assemblies. Search may ship before this write path exists; until then a Public Assembly is still returned and nested items the viewer cannot see are omitted.

Write-path enforcement, the modal, and the migration are not part of the Assembly search slice.
