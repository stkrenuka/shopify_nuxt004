export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  const runtimeConfig = useRuntimeConfig(event);
  const access_token = runtimeConfig.SHOPIFY_ACCESS_TOKEN;
  const variant_id=body.variant_id;
  return {
    "metafields": [
        {
            "id": 41743754264850,
            "namespace": "productId",
            "key": "productId",
            "value": "108.176",
            "description": null,
            "owner_id": 51162647494930,
            "created_at": "2025-04-07T05:27:03-04:00",
            "updated_at": "2025-04-07T05:27:03-04:00",
            "owner_resource": "variant",
            "type": "single_line_text_field",
            "admin_graphql_api_id": "gid://shopify/Metafield/41743754264850"
        }
    ]
}
  const url = `https://getbrowcharm.myshopify.com/admin/api/2025-01/variants/${variant_id}/metafields.json`;
  const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": `${access_token}`,
      },
    };
    let capiRes = await fetch(url, requestOptions);
  return capiRes.json();
})
