##OpenPermit Specification##

The OpenPermit Specification presents permit information, requirements, application details and other relevant permit process information in a unified and standardized format. The API also covers operations for permit processes such as applying for a permit, submitting requirements (i.e. documents, construction plans, etc.) and retrieving permit status information. These APIs will allow developers to build applications to streamline, automate and help visualize different aspects of the permitting process in jurisdictions.

The OpenPermit API defines a large set of operations with the aim to support all parts of the permitting process in a jurisdiction. However, moving the entire permitting process to be electronic, all in one shot, could be quite a big task, not to mention too disruptive for many jurisdictions. We expect that many jurisdictions will not implement the entire specification in one pass, but they will gradually move part of their permitting workflows to be electronic. To this end, we have tried to divide the API into sections that can be implemented in isolation and will allow for gradual adoption of OpenPermit. These sections have been aligned with specific services that can be offered by a jurisdiction individually, but could also all be part of a 100% electronic permitting process.

## Data schemas and other standards

OpenPermit is based on the work of different standards groups and organizations. The specification strives to reuse existing, widely used standards as much as possible. 

Permitting domain data schemas and formats returned by the APIs follow the [BLDS Specification](http://permitdata.org) as much as possible. 

Date and DateTime formats follow [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)

Geospatial data response formats follow the [GeoJSON standard](http://geojson.org/geojson-spec.html).

Geospatial Search features follow [OpenSearch Geo Extensions Draft Standard](http://www.opensearch.org/Specifications/OpenSearch/Extensions/Geo/1.0/Draft_2).

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/openpermit/openpermit.github.io/issues/).

## Contributing

Please read through our [contributing guidelines](https://github.com/openpermit/openpermit.github.io/blob/master/CONTRIBUTE.md). 
Included are directions for opening issues, coding standards, and notes on development.

## Documentation

The official OpenPermit API specification and documentation, included in this repo under the docs folder, is built with [Swagger](http://swagger.io) and publicly hosted on GitHub Pages at <http://www.openpermit.org/docs/index.html>. The docs may also be run locally.

## Community

Get updates on OpenPermit development and chat with the project maintainers and community members.

* Follow [@openpermit on Twitter](https://twitter.com/openpermit).
* Contact us [directly](mailto:support@openpermit.org).

## Current Roadmap

We are always looking for ideas that will help grow the OpenPermit community. We keep the current roadmap with what we are planning to implement in our wiki [home]https://github.com/openpermit/openpermit.github.io/wiki

## Copyright and license

Code and documentation copyright 2015 OpenPermit Foundation. The specification is released under [Creative Commons](http://creativecommons.org/licenses/by/3.0/).

