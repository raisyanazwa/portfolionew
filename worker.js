const PRIMARY_HOST = "raisyanzw.my.id";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === `www.${PRIMARY_HOST}`) {
      url.hostname = PRIMARY_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
