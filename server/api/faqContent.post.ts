export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const runtimeConfig = useRuntimeConfig(event);
  const access_token = runtimeConfig.SHOPIFY_ACCESS_TOKEN;
  const page_id = body.page_id;

  const cacheKey = `faq_page_${page_id}`;
  const cache = useStorage(); // Nitro cache layer
  const cachedData = await cache.getItem<any>(cacheKey);

  const FOUR_HOURS = 4 * 60 * 60 * 1000;

  // If cache exists and is still valid
  if (cachedData && Date.now() - cachedData.timestamp < FOUR_HOURS) {
    console.log("Cache hit for FAQ content");
    return cachedData.response;
  }
  else{
    console.log("Cache miss for FAQ content");
     // If not cached or expired, fetch from Shopify
  const url = `https://getbrowcharm.myshopify.com/admin/api/2025-01/pages/${page_id}.json`;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": access_token,
    },
  };

  const res = await fetch(url, requestOptions);
  const response = await res.json();

  // Save to cache
  await cache.setItem(cacheKey, {
    response,
    timestamp: Date.now(),
  });

  return response;
  }


});
