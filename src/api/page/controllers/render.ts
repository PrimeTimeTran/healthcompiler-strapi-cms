export default {
  async render(ctx) {
    const { slug } = ctx.params;
    const pageUid = "api::page.page";

    // 1️⃣ Fetch page content
    const pages = await strapi.entityService.findMany(pageUid, {
      filters: { slug },
    });

    // const page = pages?.[0];
    const page = await strapi.db.query(pageUid).findOne({
      where: { slug },
      populate: ['templateJson'] // ⚠ make sure templateJson is populated
    });
    if (!page) return ctx.notFound();

    // 2️⃣ Fetch template linked to this content type
    const templates = await strapi.entityService.findMany(
      "plugin::page-builder.template",
      {
        filters: {
          contentType: pageUid,
        },
      }
    );

    const template = templates?.[0];
    if (!template?.json) {
      ctx.throw(500, "Page Builder template not found");
    }

    console.log({
      template,
      page
    })

    // 3️⃣ Return payload expected by <Render />
    ctx.body = {
      templateJson: template.json,
      content: page,
    };
  },
};
