// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import mrujs from "mrujs";
import { MrujsTurbo } from "mrujs/plugins";

Turbo.session.drive = false;
mrujs.start({
  plugins: [MrujsTurbo()],
});
