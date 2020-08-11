Async generator wrapper for paginated AWS SDK results.

paginate Usage
==============

```js
const paginate = require("aws-async-paginate");
const AWS = require("aws-sdk");
const route53 = new AWS.Route53();

async function listHostedZones() {
    // start with a bound AWS API call
    const fn = route53.listHostedZones.bind(route53);

    // specify API response key which has result data
    const dataKey = "HostedZones";

    // asynchronous iterate over all results
    for await (const zone of paginate(fn, dataKey)) {
        console.log(zone.Id, zone.Name);
    }
}
```
