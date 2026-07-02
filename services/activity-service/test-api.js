const jwt = require('jsonwebtoken');

const token = jwt.sign({ sub: 'admin-id', email: 'admin@sv5t.vn', role: 'ADMIN' }, 'sv5t-super-secret-key');

const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:3003/activities', {
      don_vi_tc_id: "23159dfb-8244-407e-ac4c-b25f4e24e252",
      ten_hoat_dong: "Mùa hè xanh 2024",
      tieu_chi_id: "a499df80-68bb-4cdb-b792-3fa6bba16bbe",
      thoi_gian_bat_dau: "2024-06-01T00:00:00Z",
      thoi_gian_ket_thuc: "2024-06-15T00:00:00Z",
      hinh_thuc_dd: "EXCEL"
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Success:", res.data);
  } catch (e) {
    console.log("Error status:", e.response?.status);
    console.log("Error data:", e.response?.data);
    console.log("Error message:", e.message);
  }
}
test();
