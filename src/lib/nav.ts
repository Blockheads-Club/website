/** Full page load to `url`, replacing the current history entry (used for moved pages and old anchors). */
export function redirect(url: string) {
  location.replace(url);
}
