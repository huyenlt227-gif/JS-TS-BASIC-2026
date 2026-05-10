let loiChao = "Xin chào các bạn";
let loiChao2 = 'Xin chào các bạn';
let myName = "I'm Huyen";

const tenHocVien = "Huyền";

//dung backstick nhung bien ten hoc vien vao chuoi khac

const loiGioiThieu = `Xin chào, tôi tên là ${tenHocVien}`;
 //output 
console.log(loiGioiThieu);

const productName = "Iphone 14 Pro Max";

const productSelector = `h2:has-text("${productName}")`;
//output
console.log(productSelector);


//khai bao bien tuoi va gán giá trị nguyên
let tuoi = 20;

//khai bao bien diem va gán giá trị thập phân
let diem = 8.5;                 

let ketQua = (tuoi - 5) * diem; //tính toán kết quả

//in kết quả ra console
console.log(ketQua);

//kiểu dữ liệu boolean
let isStudent = true; //biến boolean có giá trị true
let isEmployed = false; //biến boolean có giá trị false 
let daTotNghiep = true; //biến boolean có giá trị true
let denDangbat = false; //biến boolean có giá trị false

//length() đếm số lượng ký tự trong chuỗi
let matKhau = "123456";
console.log(matKhau.length);

//trim() loại bỏ khoảng trắng ở đầu và cuối chuỗi
let tenDangNhap = "  user123  ";
console.log(tenDangNhap.trim());

//toUpperCase() chuyển đổi chuỗi thành chữ hoa
// IPHONE 15 - data test lại là iphone 15
//giai phap chuyển cả hai về cùng 1 kiểu (thường là lowercase) rồi mới so sánh

let tenSanPham = "iPhOne 15";  
console.log(tenSanPham.toLowerCase());

//include() kiểm tra xem chuỗi có chứa một chuỗi con hay không, trả về true hoặc false

let thongBao = "Đăng nhập thất bại. Sai mật khẩu.";
console.log(thongBao);
console.log(thongBao.includes("Sai mật khẩu")); //true

let msg = "login Error: Invalid username or password.";
console.log(msg);
console.log(msg.includes("Invalid username or password")); //true

let msg2 = "login Error: Invalid username or password.";
console.log(msg2.includes("Error")); //true
console.log(msg2.includes("error")); //true

let a = "Hello";
let b = "hello";
console.log(a.toLowerCase() === b.toLowerCase()); //true   

//include co check khoảng trắng
let s = "Xin chào các bạn";
console.log(s.includes("chào")); //true
console.log(s.includes("chào  ")); //false
//  vì có khoảng trắng sau chữ "chào"


//replace() thay thế một phần của chuỗi bằng một phần khác
let giaTien = "100$";
let giaTienSo = giaTien.replace("$", ""); //loại bỏ ký tự "$"
console.log(giaTienSo);

let tien = "1.000.000";
console.log(tien.replace(".", "")); //kết quả: "1000000" nhưng chỉ thay thế được 1 dấu chấm đầu tiên

console.log(tien.replaceAll(".", "")); //kết quả: "1000000" thay thế tất cả dấu chấm trong chuỗi

//để thay thế tất cả dấu chấm, ta có thể sử dụng biểu thức chính quy với flag "g" (global)
let tien2 = "1.000.000";
console.log(tien2.replace(/\./g, "")); //kết quả: "1000000"

let urlUI = "https://example.com/ui";
console.log(urlUI.indexOf("example"));

//substring() trích xuất một phần của chuỗi dựa trên vị trí bắt đầu và kết thúc
let maDon = "ORD-1026-00567"
maDon.substring(4,8) //kết quả: "1026" - trích xuất phần chuỗi từ vị trí 4 đến vị trí 8 (không bao gồm vị trí 8)
maDon.substring(0,3) //kết quả: "ORD" - trích xuất phần chuỗi từ vị trí 0 đến vị trí 3 (không bao gồm vị trí 3)

//slice: muốn lấy chuỗi dưới dạng âm (từ cuối chuỗi đếm ngược về đầu chuỗi)
let fileName = "report_final_v2.docx";
fileName.slice(-4) //kết quả: ".docx" - trích xuất phần chuỗi từ vị trí -4 đến hết chuỗi (lấy 4 ký tự cuối cùng)
fileName.slice(0,6) //kết quả: "report" - trích xuất phần chuỗi từ vị trí 0 đến vị trí 6 (không bao gồm vị trí 6)


//kết hợp với substring() để trích xuất phần chuỗi ký tự từ vị trí tìm được

let errorMsg = "Error 404: Not Found";

let pos = errorMsg.indexOf(":");
console.log(errorMsg.substring(errorMsg.indexOf(":") + 2)); //kết quả: "Not Found" - trích xuất phần chuỗi từ vị trí sau dấu ":" đến hết chuỗi


let rawText = "  Order ID: ORD-2026-123 | Status: Success  ";

//yêu cầu lấy ra được ORD-2026-123
// dùng indexOf + length + slice để lấy
 let start = rawText.indexOf("ORD"); //vị trí bắt đầu của "ORD"
 let end = rawText.indexOf("|");    //vị trí của dấu "|"
 let orderId = rawText.slice(start, end).trim(); //kết quả: "ORD-2026-123" - trích xuất phần chuỗi từ vị trí bắt đầu đến vị trí của dấu "|" và loại bỏ khoảng trắng
 console.log(orderId);  

// Bài toán: định dạng số 9.5 thành chuỗi "009.50"
let amount = 9.5;
let formattedAmount = amount.toFixed(2).padStart(6, '0');
console.log(formattedAmount); // "009.50"


