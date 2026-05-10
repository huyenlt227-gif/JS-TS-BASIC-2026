 
//Bài tập: Kiểm tra tính năng Giảm giá trên Shopee
//Tình huống Automation: Bạn cần kiểm tra xem tính năng Giảm giá (Discount) trên trang Shopee hoạt động có đúng logic toán học không.
//Dữ liệu đầu vào:
//Giá gốc (Lấy từ UI - String): " 1.000.000 đ "
//Phần trăm giảm (Lấy từ DB - Number): 20 (tức là 20%)
//Giá sau giảm (Lấy từ UI - String): " 800.000 đ "
//Yêu cầu: Viết code để:
//Làm sạch và chuyển đổi Giá gốc về Number.
//Tính toán giá mong đợi: Giá gốc * (100 - 20) / 100.


let giaGoc = " 1.000.000 đ ";
// loại bỏ khoảng trắng
let giaGocClean = giaGoc.trim();
// loại bỏ dấu "đ" và dấu "." để có thể chuyển đổi sang số
let giaGocNumber = giaGocClean.replace("đ", "");
// loại bỏ dấu "." để có thể chuyển đổi sang số
let giaGocNumberFinal = giaGocNumber.replaceAll(".", "");
let giaGocSo = Number(giaGocNumberFinal);

//Chuyển đổi Giá sau giảm về Number.
let giaSauGiam = " 800.000 đ ";
// loại bỏ khoảng trắng
let giaSauGiamClean = giaSauGiam.trim();
// loại bỏ dấu "đ" và dấu "." để có thể chuyển đổi sang số
let giaSauGiamNumber = giaSauGiamClean.replace("đ", "");
let giaSauGiamNumberFinal = giaSauGiamNumber.replaceAll(".", "");
let giaSauGiamSo = Number(giaSauGiamNumberFinal);

//Tính toán giá mong đợi: Giá gốc * (100 - 20) / 100.
let phanTramGiam = 20;
let giaSauGiamDuKien = giaGocSo * (100 - phanTramGiam) / 100;

console.log("Giá gốc:", giaGocSo);
console.log("Giá sau giảm dự kiến:", giaSauGiamDuKien);
console.log("Giá sau giảm thực tế:", giaSauGiamSo);
console.log("So Sánh dự kiến và thực tế:", giaSauGiamDuKien === giaSauGiamSo);


//"Bạn đang viết script test cho trang thương mại điện tử. Bạn lấy được thông tin đơn hàng từ giao diện web, nhưng dữ liệu trả về rất “bẩn” (lẫn lộn chữ, số, ký tự lạ, khoảng trắng). 
// Nhiệm vụ của bạn là làm sạch chúng, tính toán tổng tiền, và in ra một cái Hóa đơn (Receipt) chuẩn chỉnh."
// Dữ liệu đầu vào
// "let tenSanPham = ""   macbook pro m3   "";
// let giaGoc = ""Price: 30,000,000 vnđ"";
// let soLuong = ""Sl: 2 máy"";
// let maGiamGia = ""DISCOUNT CODE: 10% OFF"";"
// "Bạn phải viết code xử lý để khi chạy console.log, màn hình hiện ra y hệt như sau:

// "
// HÓA ĐƠN THANH TOÁN - ID: #0002
// Sản phẩm: MACBOOK PRO M3
// Đơn giá: 30000000
// Số lượng: 2
// Tổng tiền (Gốc): 60000000
// Giảm giá: 10%
// THÀNH TIỀN: 54.000.000 VNĐ

let tenSanPham = "   macbook pro m3   ";
let tenSanPhamClean = tenSanPham.trim();
let tenSanPhamFinal = tenSanPhamClean.toUpperCase();


let giaGoc1 = "Price: 30,000,000 vnđ";
let giaGocClean1 = giaGoc1.trim();
let giaGocNumber1 = giaGocClean1.slice(giaGocClean1.indexOf(":") + 2, giaGocClean1.indexOf("vnđ")).trim();
let giaGocSo1 = Number(giaGocNumber1.replaceAll(",", ""));

let soLuong = "Sl: 2 máy";
let soLuongClean = soLuong.trim();
let soLuongNumber = Number(soLuongClean.slice(soLuongClean.indexOf(":") + 2, soLuongClean.indexOf("máy")).trim());   

let maGiamGia = "DISCOUNT CODE: 10% OFF";
let phanTramGiam1 = Number(maGiamGia.slice(maGiamGia.indexOf(":") + 2, maGiamGia.indexOf("%")));

let tongTienGoc = giaGocSo1 * soLuongNumber;
let tongTienSauGiam = tongTienGoc * (100 - phanTramGiam1) / 100;    

// Dùng slice để định dạng số thành chuỗi có dấu chấm ngàn
let tongTienStr = String(tongTienSauGiam);
let phanNguyen = tongTienStr.slice(0, -6);
let phanThapPhan = tongTienStr.slice(-6);
let tongTienDinhDang = phanNguyen + "." + phanThapPhan.slice(0, 3) + "." + phanThapPhan.slice(3);

console.log(`
HÓA ĐƠN THANH TOÁN - ID: #0002
Sản phẩm: ${tenSanPhamFinal}    
Đơn giá: ${giaGocSo1}
Số lượng: ${soLuongNumber}
Tổng tiền (Gốc): ${tongTienGoc}
Giảm giá: ${phanTramGiam1}%
THÀNH TIỀN: ${tongTienDinhDang} VNĐ
`);

thêm bài tập về slice để rèn luyện
//Bài tập: Định dạng số điện thoại
//Bạn có một số điện thoại dưới dạng chuỗi: "0123456789". Bạn muốn định dạng nó thành dạng "(012) 345-6789" để hiển thị trên giao diện người dùng. Hãy sử dụng phương thức slice() để thực hiện điều này.   
let soDienThoai = "0123456789";
let soDienThoaiDinhDang = `(${soDienThoai.slice(0, 3)}) ${soDienThoai.slice(3, 6)}-${soDienThoai.slice(6)}`;
console.log(soDienThoaiDinhDang); // Kết quả: "(012) 345-6789"              

thêm bài về slice dùng cả âm và dương
//Bài tập: Trích xuất phần tên miền từ URL
//Bạn có một URL dưới dạng chuỗi: "https://www.example.com/path/to/page". Bạn muốn trích xuất phần tên miền "www.example.com" từ URL này. Hãy sử dụng phương thức slice() để thực hiện điều này.
let url = "https://www.example.com/path/to/page";
let tenMien = url.slice(url.indexOf("//") + 2, url.indexOf("/path"));
console.log(tenMien); // Kết quả: "www.example.com"     
