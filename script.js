function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
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