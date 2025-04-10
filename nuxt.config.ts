// https://nuxt.com/docs/api/configuration/nuxt-config
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@zadigetvoltaire/nuxt-gtm"],
  css: ["@/assets/css/main.css"],

  app: {
    baseURL: process.env.PUBLIC_BASE_URL,
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    head: {
      title: 'BrowCharm™ | Official Home of the Stencil Kit',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
        },
      ],
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXA_xtbuQE7O7XGFwTKFvToUiiEpALAAg&libraries=places",
          async: true,
          defer: true,
        },
        // {
        //   src: "https://static.klaviyo.com/onsite/js/UsRnHL/klaviyo.js?company_id=UsRnHL",
        //   async: true,
        //   defer: true,
        // },

      ]
    }
  },

  gtm: {
    id: "GTM-PWTVMQW", // Keep your GTM ID
    queryParams: "", // Only include if needed
    defer: true, // Keep this to ensure non-blocking script loading
    compatibility: false, // This can remain false unless you need compatibility with older GTM features
    nonce: "2726c7f26c", // Use only if required for Content Security Policy
    enabled: true, // Enable only in production
    debug: false, // Set to false in production to avoid performance overhead
    loadScript: true, // Keep this true to load the GTM script
    enableRouterSync: true, // Keep this if you want to track route changes
    ignoredViews: "", // Use this if there are specific views you want to exclude
    trackOnNextTick: true, // Consider setting to true to ensure tracking is more reliable
    devtools: false, // Set to false in production to avoid extra overhead
  },

  runtimeConfig: {
    CC_LOGIN_ID: 'revboostapirs.nymbus',
    CC_PASSWORRD: 'RSsfFrR2nN5PcC6L1pSRs',
    SHOPIFY_ACCESS_TOKEN:"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",
    // Keys within public are also exposed client-side
    public: {
      pixel_id: "",
      access_token: "",
      CC_CAMPAIGN_ID: "8",
      SecretKey: "darkAngle",
      svarBrandName: 'Brow Charm',
      svarDomainName: 'browcharm.co',
      svarDomainVipName: 'vip.browcharm.co',
      email: 'support@browcharm.co',
      phoneNumber: "(888) 688-1439",
      paypalBillerId: 43,
      vipProduct: 101,
      shipProfileId: 5,
      offer1: 451,
      vipoffer1:5043,
      offer1_1: 450,
      offer2: 453,
      offer2_1: 454,
      offer3: 2821,
      offer3_1: 2822,
      offer4: 104,
      offerDownsell4:105,
      freeShipProfileId: 125,
      upsellIdOffer1: 457,
      downsellIdOffer1: 458,
      // upsellIdOffer2: 719, // created new bundle product
      upsellIdOffer2: 730, // created new bundle product
      downsellIdOffer2: 731, // created new bundle product
      upsell2Bundle: [738, 739, 740],
      downsel2Bundle: [741, 742, 743],
      upsellIdOffer3: 466,
      downsellIdOffer3: 531,
      upsellIdOffer4: 457,
      downsellIdOffer4: 458,
      gtm: {
        id: "GTM-PWTVMQW",
        queryParams: "",
        defer: true,
        compatibility: false,
        nonce: "2726c7f26c",
        enabled: true,
        debug: true,
        loadScript: true,
        enableRouterSync: true,
        ignoredViews: "",
        trackOnNextTick: true,
        devtools: false,
      },
      apiBaseUrl:'https://5c30-122-176-102-18.ngrok-free.app/api'
    },
  },

  // sentry: {
  //   sourceMapsUploadOptions: {
  //     org: "revboost-7n",
  //     project: "javascript-nuxt-nymbchk003",
  //   },
  //},

  sourcemap: {
    client: "hidden",
  },
});