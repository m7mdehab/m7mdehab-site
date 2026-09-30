# Design truth: what is reference, what is fact, what is approximation

## The six finished cards are art-direction references

They define:

- composition;
- hierarchy;
- brand color direction;
- visual density;
- placement rhythm;
- approximate typography character;
- illustration language;
- intended rounded-rectangle silhouette.

They do **not** define recoverable font metadata. They were generated raster images, so an exact font family cannot be truthfully extracted from pixels. The prepared manifest therefore selects real fonts by visual and product evidence and requires final tuning against the overlay.

## Background limitation

The clean background plates were separately generated from the finished cards. They are not byte-identical to the backgrounds embedded in the finished-card references. A perfect pixel diff of the whole raster is therefore impossible by construction.

The correct acceptance standard is:

1. foreground geometry and hierarchy match the reference closely;
2. the approved clean background is used faithfully;
3. live text is sharp and correct;
4. supplied logos are real assets, not AI-rendered approximations;
5. project-specific diagrams/illustrations reproduce the reference language without inventing claims;
6. the card looks indistinguishable in intent and composition at normal viewing size.

## Truth overrides generated copy

The visual reference may contain AI-generated wording or numbers. Repository/public-safe truth wins.

Most important known correction:

- Solar reference callouts `~320 GWh/yr` and `~210 GWh/yr` are not supported by the current public repository. Do not ship them. Preserve the callout boxes but use non-numeric ranked-candidate language or real repository-derived values.

Presaira is not a World Cup-only project. The card must read as a sports forecasting platform with the World Cup as completed proof, UCL 2026/27 as active, and Formula 1/NBA as next expansion surfaces.

OpportunityOS must remain public-safe. Never pull private founder truth or private operational data into the portfolio merely because Codex can access the repository.

Makhbazy must remain a public-safe product journey abstraction. Do not reproduce protected internal screens.
