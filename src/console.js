import { config } from "./config.js";

/**
 * ASCII console signature & build info
 */
console.log(
  `%c
     ______                                         ____                __        ______
    / ____/___  ____ ___  ____  _________ ______   / __ \\___  _________/ /__     / ____/___ __________ _
   / /   / __ \\/ __ \`__ \\/ __ \\/ ___/ __ \`/ ___/  / / / / _ \\/ ___/ __  / _ \\   / /   / __ \`/ ___/ __ \`/
  / /___/ /_/ / / / / / / /_/ / /  / /_/ / /     / /_/ /  __(__  ) /_/ /  __/  / /___/ /_/ (__  ) /_/ /
  \\____/\\____/_/ /_/ /_/ .___/_/   \\__,_/_/     /_____/\\___/____/\\__,_/\\___/   \\____/\\__,_/____/\\__,_/
                    /_/
  `,
  "color:orange; font-weight: bold;"
);

console.groupCollapsed("Build");

console.group("General");
console.table({
  Environment: config.environment,
  Version: config.version,
});
console.groupEnd();

console.groupCollapsed("Firebase");
console.table(config.firebase);
console.groupEnd();

console.groupEnd();
