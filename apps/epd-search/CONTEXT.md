# Context: EPD Search

## Glossary

### LCAx Data
A collective term for the various JSON formats standardized by LCAx, including EPDs, Assemblies, and Products.

### Assembly
A structured collection of Products or other Assemblies, representing a larger component or building element in a life cycle assessment.

### Product
A specific material or component used within an Assembly or project in a life cycle assessment.

### EPD (Environmental Product Declaration)
A standardized document that provides quantified environmental data about a product's life cycle.

### uploadedAt
A timestamp indicating when an EPD was uploaded to the LCAx system. This is stored within the `metaData` JSON field of the EPD record to track system entry time separately from the EPD's own `publishedDate`.

### Database Statistics
An admin-only dashboard feature providing insights into the database, including total counts and upload trends over time. The statistics are broken down by LCAx data type (EPDs, Assemblies, and Products).

### Organization
A logical grouping of users and LCAx Data. Every piece of data (EPDs, Assemblies, Products) belongs to an Organization. Each user is associated with exactly one Organization.

### Member
A user who belongs to an Organization.

### admin (Global Admin)
A super-administrator with system-wide access across all Organizations. Can perform any action in the system.

### organization-admin (Organization Admin)
A user with administrative privileges scoped to a specific Organization. They can manage members (CRUD), organization metadata, and the organization's LCAx Data.

### user (Organization User)
A regular user within an Organization. They can manage (CRUD) the organization's LCAx Data and view private data within their own Organization.

### Visibility
Data within an Organization can be either **Public** (searchable and viewable by anyone using the platform) or **Private** (viewable only by members of that specific Organization).
