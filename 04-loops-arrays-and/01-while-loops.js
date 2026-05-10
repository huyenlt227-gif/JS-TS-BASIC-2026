// const sanPhamUI = [
//   { ten: "Chuột", gia: 150000, tonKho: true },
//   { ten: "Bàn phím", gia: 500000, tonKho: false },
//   { ten: "Màn hình", gia: 300000, tonKho: true },
//   { ten: "Tai nghe", gia: 200000, tonKho: true },
// ];

// // Lọc sản phẩm còn hàng bằng for
// const sanPhamConHang = [];
// for (let i = 0; i < sanPhamUI.length; i++) {
//   if (sanPhamUI[i].tonKho === true) {
//     sanPhamConHang.push(sanPhamUI[i]);
//   }
// }

// console.log(sanPhamConHang);

// // // Lọc sản phẩm có giá < 200000
// // const sanPhamGiaThap = sanPhamUI.filter(sp => sp.gia < 200000);

// // console.log(sanPhamGiaThap);
// // const sanPhamUI = [
// //   { ten: "Chuột", gia: 150000, tonKho: true },
// //   { ten: "Bàn phím", gia: 500000, tonKho: false },
// //   { ten: "Màn hình", gia: 300000, tonKho: true },
// //   { ten: "Tai nghe", gia: 200000, tonKho: true },
// // ];

// // Lọc sản phẩm giá < 200000 và còn hàng
// const sanPhamHopLe = sanPhamUI.filter(sp => sp.gia < 200000 && sp.tonKho);

// console.log(sanPhamHopLe);

// const users = [
//   { id: 1, ten: "neko", role: "admin" },
//   { id: 2, ten: "mew", role: "tester" },
//   { id: 3, ten: "Cat", role: "tester" },
// ];

// const adminUser = users.find(user => user.role === "admin");

// console.log(adminUser);

 // ## Bài 1: Refactor hàm `taoPayloadDangNhap()`
 
 // ### Bối cảnh thực tế
 
 // Form đăng nhập ngoài đời thường rất bẩn:
 
 // - người dùng gõ thừa khoảng trắng
 // - role viết hoa viết thường lung tung
 // - checkbox `remember me` lúc thì là `true`, lúc là `"yes"`, lúc là `"on"`
 // - dev truyền object input vào nhiều nơi, chỉ cần sửa trực tiếp nhầm một lần là bug dây chuyền
 
 // ### Đề bài
 
 // Viết hàm:
 
 // ```javascript
 // function taoPayloadDangNhap(formInput, options = {})
 // ```
 
 // ### Bộ data test dùng để làm bài
 
 const loginOptions = {
     defaultRole: "guest",
     allowedRoles: ["admin", "tester", "viewer", "guest"],
     minPasswordLength: 8
 };
 
 const loginTestData = [
     {
         name: "Case 1 - Hợp lệ cơ bản",
         formInput: {
             username: "  Neko_Admin  ",
             password: "  12345678  ",
             role: " tester ",
             rememberMe: "yes",
             device: "  chrome-win11  "
         }
     },
     {
         name: "Case 2 - Role rỗng, phải dùng defaultRole",
         formInput: {
             username: "  guest_user  ",
             password: "  abcdefgh  ",
             role: "   ",
             rememberMe: "no",
             device: " firefox "
         }
     },
     {
         name: "Case 3 - Username rỗng",
         formInput: {
             username: "    ",
             password: "12345678",
             role: "tester",
             rememberMe: "yes",
             device: "chrome"
         }
     },
     {
         name: "Case 4 - Username có khoảng trắng ở giữa",
         formInput: {
             username: "neko admin",
             password: "12345678",
             role: "tester",
             rememberMe: "yes",
             device: "chrome"
         }
     },
     {
         name: "Case 5 - Password quá ngắn",
         formInput: {
             username: "valid_user",
             password: "123",
             role: "tester",
             rememberMe: true,
             device: "chrome"
         }
     },
     {
         name: "Case 6 - Role không hợp lệ",
         formInput: {
             username: "valid_user",
             password: "12345678",
             role: "manager",
             rememberMe: "on",
             device: "chrome"
         }
     },
     {
         name: "Case 7 - rememberMe là boolean true",
         formInput: {
             username: "admin01",
             password: "abcdefgh",
             role: "admin",
             rememberMe: true,
             device: "edge"
         }
     },
     {
         name: "Case 8 - rememberMe là chuỗi lạ",
         formInput: {
             username: "viewer01",
             password: "abcdefgh",
             role: "viewer",
             rememberMe: "maybe",
             device: "safari"
         }
     }
 ];
 
 // Khi làm với bộ data test này:
 
 // - `formInput` nhận `loginTestData[i].formInput`
 // - `options` nhận `loginOptions`
 // - Ví dụ gọi hàm: `taoPayloadDangNhap(loginTestData[0].formInput, loginOptions)`
 
 // ### Yêu cầu
 
 // 1. Dùng object destructuring để lấy dữ liệu từ `formInput`.
 // 2. Dùng object destructuring + default value để lấy dữ liệu từ `options`.
 //    - Nếu `options.defaultRole` không có thì biến `defaultRole` nhận `"guest"`.
 //    - Nếu `options.minPasswordLength` không có thì biến `minPasswordLength` nhận `8`.
 //    - `"guest"` và `8` lấy theo `loginOptions` đã cho ở đầu bài, không phải tự nghĩ thêm.
 //    - `allowedRoles` lấy thẳng từ `options.allowedRoles`, không tự thêm giá trị khác.
 //    - Trong bộ data test hiện tại, `options` đã có đủ field nên 2 giá trị mặc định này có thể không chạy; chúng được giữ lại để bám đúng YC2.
 // 3. Chuẩn hóa dữ liệu:
 //    - `username` -> trim, chuyển về lowercase
 //    - `password` -> trim
 //    - `role` -> trim, lowercase
 //    - `device` -> trim
 //    - `rememberMe` -> chuyển về boolean
 // 4. Kiểm tra hợp lệ:
 //    - `username` không được rỗng
 //    - `username` không được chứa khoảng trắng ở giữa
 //    - `password` phải dài ít nhất `minPasswordLength`
 //    - `role` phải nằm trong `allowedRoles`
 // 5. Không được sửa trực tiếp `formInput` hoặc `options`.
 // 6. Phải trả về object theo dạng:
 
 // ```javascript
 // {
 //     isValid: true,
 //     payload: {
 //         username: "neko_admin",
 //         password: "12345678",
 //         role: "tester",
 //         rememberMe: true,
 //         device: "chrome-win11"
 //     },
 //     errors: []
 // }
 // ```
function taoPayloadDangNhap(formInput, options = {}) {
     // 1. Object destructuring để lấy dữ liệu từ formInput
    const { username, password, role, rememberMe, device } = formInput;
     // 2. Object destructuring + default value để lấy dữ liệu từ options
     const {
         defaultRole = "guest",
         allowedRoles,
         minPasswordLength = 8
     } = options;

    // 3. Chuẩn hóa dữ liệu
    const normalizedUsername = String(username).trim().toLowerCase();
    const normalizedPassword = String(password).trim();
    const normalizedRole = String(role).trim().toLowerCase();
    const normalizedDevice = String(device).trim();
    const normalizedRememberMe =
        rememberMe === true ||
        String(rememberMe).toLowerCase() === "yes" ||
        String(rememberMe).toLowerCase() === "on";

    // 4. Kiểm tra hợp lệ
    const errors = [];

    if (normalizedUsername.length === 0) {
        errors.push("Username không được rỗng");
    } else if (normalizedUsername.includes(" ")) {
        errors.push("Username không được chứa khoảng trắng ở giữa");
    }

    if (normalizedPassword.length < minPasswordLength) {
        errors.push(`Password phải dài ít nhất ${minPasswordLength}`);
    }

    const finalRole = normalizedRole.length === 0 ? defaultRole : normalizedRole;
    if (!Array.isArray(allowedRoles) || !allowedRoles.includes(finalRole)) {
        errors.push("Role không hợp lệ");
    }

    const isValid = errors.length === 0;

    return {
        isValid,
        payload: {
            username: normalizedUsername,
            password: normalizedPassword,
            role: finalRole,
            rememberMe: normalizedRememberMe,
            device: normalizedDevice
        },
        errors
    };
}

loginTestData.forEach(testCase => {
    console.log(`\n--- ${testCase.name} ---`);
    const result = taoPayloadDangNhap(testCase.formInput, loginOptions);
    console.log(result);
});
 
 