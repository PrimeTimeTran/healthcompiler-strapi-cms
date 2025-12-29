export default {
  routes: [
    {
      method: "GET",
      path: "/pages/render/:slug",
      handler: "render.render",
      config: {
        auth: false,
      },
    },
  ],
};
