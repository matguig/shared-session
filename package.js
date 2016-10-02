Package.describe({
  name: "matguig:shared-session",
  version: "0.1.0",
  summary: "Easily share a session, between the server side and the client side.",
  git: "https://github.com/matguig/shared-session.git",
  documentation: "README.md"
});

Package.onUse(function( api ) {
  api.versionsFrom("1.4.1.1");
  api.use(["ecmascript", "matb33:collection-hooks"]);
  api.addFiles("common/shared-session.js");
  api.mainModule("server/shared-session.js", "server");
});
