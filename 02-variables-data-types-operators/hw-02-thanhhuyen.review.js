 
//Bài tập: Kiểm tra tính năng Giảm giá trên Shopee
//Dữ liệu đầu vào:
//Giá gốc (Lấy từ UI - String): " 1.000.000 đ "
//Phần trăm giảm (Lấy từ DB - Number): 20 (tức là 20%)
//Giá sau giảm (Lấy từ UI - String): " 800.000 đ "


let giaGoc = " 1.000.000 đ ";
// loại bỏ khoảng trắng — đúng
let giaGocClean = giaGoc.trim();
// loại bỏ dấu "đ" — đúng
let giaGocNumber = giaGocClean.replace("đ", "");
// loại bỏ dấu "." — dùng replaceAll, đúng
let giaGocNumberFinal = giaGocNumber.replaceAll(".", "");
// Number() ép kiểu — đúng, kết quả 1000000
let giaGocSo = Number(giaGocNumberFinal);

//Chuyển đổi Giá sau giảm về Number — chủ động xử lý thêm, tốt
let giaSauGiam = " 800.000 đ ";
let giaSauGiamClean = giaSauGiam.trim();
let giaSauGiamNumber = giaSauGiamClean.replace("đ", "");
let giaSauGiamNumberFinal = giaSauGiamNumber.replaceAll(".", "");
let giaSauGiamSo = Number(giaSauGiamNumberFinal);

//Tính toán giá mong đợi — công thức đúng, kết quả 800000
let phanTramGiam = 20;
let giaSauGiamDuKien = giaGocSo * (100 - phanTramGiam) / 100;

console.log("Giá gốc:", giaGocSo);
console.log("Giá sau giảm dự kiến:", giaSauGiamDuKien);
console.log("Giá sau giảm thực tế:", giaSauGiamSo);
// Hay! So sánh === kiểm tra expected vs actual — tư duy Automation Testing rất tốt
console.log("So Sánh dự kiến và thực tế:", giaSauGiamDuKien === giaSauGiamSo);


// BÀI 2

let tenSanPham = "   macbook pro m3   ";
// trim() + toUpperCase() — đúng
let tenSanPhamClean = tenSanPham.trim();
let tenSanPhamFinal = tenSanPhamClean.toUpperCase();


let giaGoc1 = "Price: 30,000,000 vnđ";
let giaGocClean1 = giaGoc1.trim();
// Đúng: indexOf(":") + 2 và indexOf("vnđ") — dùng cả từ "vnđ", linh hoạt và an toàn
let giaGocNumber1 = giaGocClean1.slice(giaGocClean1.indexOf(":") + 2, giaGocClean1.indexOf("vnđ")).trim();
// replaceAll bỏ dấu phẩy — đúng, kết quả 30000000
let giaGocSo1 = Number(giaGocNumber1.replaceAll(",", ""));

let soLuong = "Sl: 2 máy";
let soLuongClean = soLuong.trim();
// Đúng: indexOf(":") + 2 và indexOf("máy") — dùng cả từ "máy", an toàn
let soLuongNumber = Number(soLuongClean.slice(soLuongClean.indexOf(":") + 2, soLuongClean.indexOf("máy")).trim());   

let maGiamGia = "DISCOUNT CODE: 10% OFF";
// Đúng: indexOf(":") + 2 và indexOf("%") — lấy ra "10", Number() → 10
let phanTramGiam1 = Number(maGiamGia.slice(maGiamGia.indexOf(":") + 2, maGiamGia.indexOf("%")));

// Tính toán đúng: 30000000 x 2 = 60000000
let tongTienGoc = giaGocSo1 * soLuongNumber;
// 60000000 x (100-10) / 100 = 54000000
let tongTienSauGiam = tongTienGoc * (100 - phanTramGiam1) / 100;    

// Format tiền bằng slice — đúng!
// slice(0, -6) lấy phần triệu: "54"
// slice(-6) lấy 6 ký tự cuối: "000000"
//   → slice(0,3) = "000" (phần nghìn), slice(3) = "000" (phần đơn vị)
// Kết quả: "54" + "." + "000" + "." + "000" = "54.000.000"
let tongTienStr = String(tongTienSauGiam);
let phanNguyen = tongTienStr.slice(0, -6);
let phanThapPhan = tongTienStr.slice(-6);
let tongTienDinhDang = phanNguyen + "." + phanThapPhan.slice(0, 3) + "." + phanThapPhan.slice(3);

// Dùng multiline template literal — output đúng format
// Lưu ý nhỏ: dòng đầu sẽ có 1 dòng trống vì backtick xuống hàng ngay
console.log(`
HÓA ĐƠN THANH TOÁN - ID: #0002
Sản phẩm: ${tenSanPhamFinal}    
Đơn giá: ${giaGocSo1}
Số lượng: ${soLuongNumber}
Tổng tiền (Gốc): ${tongTienGoc}
Giảm giá: ${phanTramGiam1}%
THÀNH TIỀN: ${tongTienDinhDang} VNĐ
`);

// ===================================================
// TỔNG KẾT REVIEW — THANH HUYỀN
// ===================================================
// Bài 1: Đạt — Xử lý đúng, công thức đúng, chủ động so sánh === expected vs actual
// Bài 2: Đạt — Logic đúng, output đúng format, format tiền đúng!
//
// Điểm tốt:
//   - Bài 1: chủ động so sánh === kiểm tra expected vs actual — tư duy Automation xuất sắc
//   - Bài 2 dùng indexOf("vnđ"), indexOf("máy"), indexOf("%") — CẢ TỪ, không dùng 1 ký tự
//   - Format tiền bằng slice — đúng cách, kết quả "54.000.000"
//   - Comment rõ ràng từng bước
//   - Biến đặt tên rõ nghĩa (giaSauGiamDuKien, tongTienDinhDang...)
//   - Output đầy đủ, đúng thứ tự, đúng nhãn tiếng Việt
//
// Cần cải thiện:
//   - Bài 1 chia quá nhiều biến trung gian (giaGocClean, giaGocNumber, giaGocNumberFinal)
//     Có thể chain: Number(giaGoc.trim().replace("đ","").replaceAll(".","").trim())
//   - Template literal có dòng trống ở đầu (do backtick xuống hàng ngay)
//
// ===================================================
