const API_URL = 'http://localhost:3000/api';
const seatContainer = document.getElementById('seat-container');
const selectedSeatText = document.getElementById('selected-seat');

let selectedSeat = localStorage.getItem('selectedSeat');

function renderSeats(seatData) {
  seatContainer.innerHTML = '';
  Object.entries(seatData).forEach(([seatId, count]) => {
    const div = document.createElement('div');
    div.className = 'seat';
    if (seatId === selectedSeat) div.classList.add('selected');
    div.innerHTML = `
      <div class="seat-id">${seatId}</div>
      <div class="vote-count">선택수: ${count}</div>
    `;
    div.onclick = () => selectSeat(seatId);
    seatContainer.appendChild(div);
  });
}

function fetchSeats() {
  fetch(`${API_URL}/seats`)
    .then(res => res.json())
    .then(renderSeats);
}

function selectSeat(seatId) {
  if (selectedSeat === seatId) return;
  localStorage.setItem('selectedSeat', seatId);
  selectedSeat = seatId;
  selectedSeatText.innerText = `선택한 좌석: ${seatId}`;
  fetch(`${API_URL}/select`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seat: seatId }),
  }).then(fetchSeats);
}

setInterval(fetchSeats, 3000);
fetchSeats();
if (selectedSeat) selectedSeatText.innerText = `선택한 좌석: ${selectedSeat}`;
