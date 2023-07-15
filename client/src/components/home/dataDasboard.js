export function updateDashboard() {
  fetch("http://localhost:5000/analytics/data")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("visitors-count").textContent =
        data.visitorsCount;
      document.getElementById("pageviews-count").textContent =
        data.pageViewsCount;
      document.getElementById("events-count").textContent = data.eventsCount;

      const eventsTableBody = document
        .getElementById("events-table")
        .getElementsByTagName("tbody")[0];
      data.latestEvents.forEach((event) => {
        const newRow = eventsTableBody.insertRow();

        newRow.insertCell().textContent = event.id;
        newRow.insertCell().textContent = event.type;
        newRow.insertCell().textContent = JSON.stringify(event.data);
        newRow.insertCell().textContent = new Date(
          event.timestamp
        ).toLocaleString();
      });
    })
    .catch((error) => console.error("Error:", error));
}
