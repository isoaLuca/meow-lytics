(function () {
  function trackEvent(eventType, eventData) {
    var serverUrl = "http://localhost:5000/analytics/track";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", serverUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // un userId aléatoire pour les tests
    var userId = generateRandomUserId();
    // var userId = getUserIdFromCookies();

    xhr.send(
      JSON.stringify({
        eventType: eventType,
        eventData: eventData,
        userId: userId,
      })
    );
  }

  function generateRandomUserId() {
    return Math.floor(Math.random() * 1000000).toString();
  }

  function getUserIdFromCookies() {
    var allCookies = document.cookie.split("; ");

    for (var i = 0; i < allCookies.length; i++) {
      var cookie = allCookies[i];
      var cookieName = cookie.split("=")[0].toLowerCase();

      if (cookieName.includes("user") && cookieName.includes("id")) {
        return cookie.split("=")[1];
      }
    }

    if (userId === null) {
      userId = generateRandomUserId();
      document.cookie = "userId=" + userId + "; max-age=31536000";
      trackEvent("new_visitor", {});
    }

    return userId;
  }

  function trackTag(tagId) {
    trackEvent("tag", { tagId });
  }

  const tags = document.getElementsByTagName("meow-tag");
  for (let i = 0; i < tags.length; i++) {
    const tagId = tags[i].getAttribute("data-id");
    if (tagId) {
      trackTag(tagId);
    }
  }

  trackEvent("pageview", {
    url: window.location.href,
    title: document.title,
  });

  document.addEventListener("click", function (event) {
    trackEvent("click", {
      element: event.target.tagName,
      x: event.clientX,
      y: event.clientY,
    });
  });
})();
