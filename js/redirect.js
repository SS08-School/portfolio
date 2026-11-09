// Keep earlier page links and project/education bookmarks working locally too.
const destination = document.querySelector("[data-redirect]");
if (destination) {
  const target = new URL(destination.href);
  if (window.location.hash && window.location.hash !== "#top") {
    target.hash = window.location.hash;
  }
  window.location.replace(target.href);
}
