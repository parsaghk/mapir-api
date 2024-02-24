## Installation

With npm:

```bash
npm install --save mapir-api
```

With Yarn:

```bash
yarn add mapir-api
```

With pnpm:

```bash
pnpm add mapir-api
```

## Usage

Import MapirApi:

```typescript
import { MapirApi } from 'mapir-api';
```

Create an instance using apiKey:

```typescript
const mapirApi = new MapirApi({ apiKey: MAPIR_API_KEY, })
```

## Examples

### Reverse and FastReverse

Both of them use to convert geographical coordinates to address details. the only difference is in response time. *
*FastReverse** is about 20ms and **Reverse** api is around 70ms.

```typescript
const reverseResponse = await mapirApi.fastReverse({
  latitude: 35.72379,
  longitude: 51.33417,
});
```

```typescript
const reverseResponse = await mapirApi.reverse({
  latitude: 35.72379,
  longitude: 51.33417,
});
```

### Search and  AutoCompleteSearch

We use them in order to find places based on your desired text. The differences of them is only related to search
algorithm. Such that search api find places exactly equal to the text but autocomplete api search location matches part
of the entered information with existing data and suggests the closest and most likely results.

```typescript

const searchResponseList = await mapirApi.search(
  new SearchRequest({ text: 'صادقیه' }),
);
```

```typescript
const autoCompleteSearchResponseList = await mapirApi.autoCompleteSearch(
  new SearchRequest({ text: 'صادقیه' }),
);
```
