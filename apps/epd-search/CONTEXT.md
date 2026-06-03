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
