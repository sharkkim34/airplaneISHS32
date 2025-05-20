const fs = require('fs');

const rows = Array.from({ length: 26 }, (_, i) => 28 + i);
const seats = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];

let data = {};
rows.forEach(row => {
  seats.forEach(seat => {
    data[`${row}${seat}`] = 0;
  });
});

fs.writeFileSync(__dirname + '/seatData.json', JSON.stringify(data, null, 2));
console.log("✅ seatData.json 생성 완료");
