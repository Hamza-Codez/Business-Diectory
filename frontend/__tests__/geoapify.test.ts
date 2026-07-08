import { test } from 'node:test';
import assert from 'node:assert';
import { searchGeoapify, getStaticMapUrl } from '../src/lib/adapters/geoapify';

test('getStaticMapUrl correctly encodes markers and longitude-first center', () => {
  process.env.GEOAPIFY_API_KEY = "test_key";
  const url = getStaticMapUrl(35.68, 139.69);
  
  // Parse the constructed URL
  const parsed = new URL(url);
  const center = parsed.searchParams.get("center");
  const marker = parsed.searchParams.get("marker");
  
  // Center should be lonlat:{lng},{lat}
  assert.strictEqual(center, "lonlat:139.69,35.68");
  
  // Marker should use #8F1D21, which when properly URL encoded within the parameter parsing,
  // comes back as #8F1D21 when get() is called, but let's assert the raw search string to be sure
  // it wasn't double-encoded or corrupted.
  assert.match(parsed.search, /center=lonlat(?:%3A|:)139\.69(?:%2C|,)35\.68/);
  assert.match(parsed.search, /marker=lonlat(?:%3A|:)139\.69(?:%2C|,)35\.68(?:%3B|;)color(?:%3A|:)%238F1D21(?:%3B|;)size(?:%3A|:)medium/);
});

test('searchGeoapify generates correct lon,lat order for circle filters', async () => {
  // We need to mock fetch to inspect the URL
  const originalFetch = global.fetch;
  
  const capturedUrls: string[] = [];
  global.fetch = async (url: string | Request | URL, options?: RequestInit) => {
    capturedUrls.push(url.toString());
    // Return a fake 200 response to break out of the loop
    return new Response(JSON.stringify({ features: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  try {
    process.env.GEOAPIFY_API_KEY = "test_key";
    
    // Tokyo test fixture: lat=35.68, lon=139.69
    await searchGeoapify({
      categoryKeys: ["catering.restaurant"],
      coords: { lat: 35.68, lng: 139.69 },
      limit: 10
    });

    // URLSearchParams encodes ':' as '%3A' and ',' as '%2C'
    // We expect the first filter to be filter=circle:139.69,35.68,5000 (starting at 5km)
    assert.match(capturedUrls[0], /filter=circle(?:%3A|:)139\.69(?:%2C|,)35\.68(?:%2C|,)5000/);

  } finally {
    global.fetch = originalFetch;
  }
});
