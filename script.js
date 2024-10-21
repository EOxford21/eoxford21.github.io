function filterData() {
  event.preventDefault();

  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);
  
  // Get all rows from the table body
  const rows = document.querySelectorAll("#pitchTable tbody tr");

  rows.forEach(row => {
    // Get the date from the second cell in the row (assuming the format is YYYY-MM-DD)
    const dateCell = row.cells[1].textContent;
    const rowDate = new Date(dateCell);

    // Check if the row date is within the range
    if (rowDate >= startdate && rowDate <= enddate) {
      row.style.display = ""; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("pitchTable").getElementsByTagName("tbody")[0];

  fetch("https://compute.samford.edu/zohauth/clients/datajson/1")
    .then(response => response.json())
    .then(data => {
      data.forEach(pitch => {
        const row = tableBody.insertRow();

        const pitchLink = `<a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a>`;

        row.innerHTML = `
          <td>${pitchLink}</td>
          <td>${pitch.Date}</td>
          <td>${pitch.Time}</td>
          <td>${pitch.Batter}</td>
          <td>${pitch.Balls}</td>
          <td>${pitch.Strikes}</td>
          <td>${pitch.Outs}</td>
          <td>${pitch.PitchCall}</td>
          <td>${pitch.KorBB || ""}</td>
          <td>${pitch.RelSpeed || ""}</td>
          <td>${pitch.SpinRate || ""}</td>
          <td>${pitch.SpinAxis || ""}</td>
        `;
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});