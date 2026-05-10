// ## Bài 2: Chuẩn hóa dữ liệu test case import từ spreadsheet

// ### Bối cảnh thực tế

// Khi import test case từ Excel hoặc Google Sheet, dữ liệu thường lộn xộn:

// - có dòng thừa khoảng trắng
// - priority lúc là số, lúc là chuỗi
// - status viết sai chính tả
// - cùng một test case id xuất hiện 2 lần

// ### Đề bài

// Viết hàm:

// ```javascript
// function chuanHoaDanhSachTest(rawRows, config = {})
// ```

// ### Bộ data test dùng để làm bài

// ```javascript
const testCaseConfig = {
    minPriority: 1,
    maxPriority: 5
};

const rawRows = [
    [" TC_LOGIN_001 ", "login", "1", " smoke ", "active"],
    ["TC_LOGIN_001", "login", "2", "regression", "active"],
    ["TC_SEARCH_002", "search", "0", "smoke", "active"],
    ["TC_CART_003", "", "3", "checkout", "inactive"],
    ["TC_PAY_004", "payment", "2", " critical ", "ACTIVE"],
    ["TC_ORDER_005", "order", "5", "sanity", "inactive"],
    ["TC_ORDER_006", " order ", "4", " SANITY ", "active"],
    ["LOGIN_007", "login", "2", "smoke", "active"],
    ["TC_USER_008", "user", "6", "regression", "active"],
    ["TC_API_009", "api", "3", "api", "disabled"],
    ["TC_API_010", "api", "2", " api ", "active"],
    ["TC_API_010", "api", "2", " api ", "active"],
    ["TC_REPORT_011", "report", "1", " nightly ", "INACTIVE"],
    [" TC_EMPTY_012 ", "   ", "2", "misc", "active"]
];
// ```

// Khi làm với bộ data test này:

// - `rawRows` nhận mảng `rawRows` ở trên
// - `config` nhận `testCaseConfig`
// - Ví dụ gọi hàm: `chuanHoaDanhSachTest(rawRows, testCaseConfig)`

// ### Quy ước dữ liệu

// Mỗi dòng có cấu trúc:

// ```javascript
// [id, module, priority, tag, status]
// ```

// ### Yêu cầu

// 1. Dùng array destructuring để bóc từng cột.
// 2. Chuẩn hóa:
//    - `id` -> trim, uppercase
//    - `module` -> trim, lowercase
//    - `priority` -> đổi sang number
//    - `tag` -> trim, lowercase
//    - `status` -> trim, lowercase
// 3. Test case hợp lệ khi:
//    - `id` bắt đầu bằng `TC_`
//    - `module` không rỗng
//    - `priority` nằm trong `1` đến `5`
//    - `status` chỉ là `active` hoặc `inactive`
//    - không bị trùng `id`
// 4. Khi gọi `chuanHoaDanhSachTest(rawRows, testCaseConfig)`, hàm phải `return` object có dạng:

// ```javascript
// {
//     validCases: [...],
//     invalidCases: [...],
//     summary: {
//         total: rawRows.length,
//         valid: ...,
//         invalid: ...,
//         duplicateIds: ...
//     }
// }
// ```

// ### Điều bắt buộc

// 1. Dùng `for` để duyệt `rawRows`.
// 2. Không dùng `map`, `filter`, `find` cho phần duyệt chính của bài này.
// 3. Không được sửa trực tiếp `rawRows`.
//    Nghĩa là không gán ngược vào từng dòng cũ trong mảng này, mà chỉ đọc dữ liệu cũ rồi tạo object mới để đưa vào kết quả trả về.
// 4. Mỗi test case hợp lệ phải được build thành object mới:

// ```javascript
// {
//     id: "TC_LOGIN_001",
//     module: "login",
//     priority: 1,
//     tag: "smoke",
//     status: "active"
// }
// ```
function chuanHoaDanhSachTest(rawRows, config = {}) {
  const { minPriority = 1, maxPriority = 5 } = config;

  let validCases = [];
  let invalidCases = [];
  let seenIds = new Set();
  let duplicateCount = 0;

  for (let i = 0; i < rawRows.length; i++) {
    const [idRaw, moduleRaw, priorityRaw, tagRaw, statusRaw] = rawRows[i];

    const id = idRaw.trim().toUpperCase();
    const module = moduleRaw.trim().toLowerCase();
    const priority = Number(priorityRaw);
    const tag = tagRaw.trim().toLowerCase();
    const status = statusRaw.trim().toLowerCase();

    let errors = [];

    // Kiểm tra ID
    if (!id.startsWith("TC_")) {
      errors.push("ID không bắt đầu bằng TC_");
    }
    if (seenIds.has(id)) {
      errors.push("ID bị trùng");
      duplicateCount++;
    }

    // Kiểm tra module
    if (!module) {
      errors.push("Module rỗng");
    }

    // Kiểm tra priority
    if (priority < minPriority || priority > maxPriority) {
      errors.push(`Priority phải nằm trong khoảng ${minPriority} đến ${maxPriority}`);
    }

    // Kiểm tra status
    if (!(status === "active" || status === "inactive")) {
      errors.push("Status không hợp lệ (chỉ active/inactive)");
    }

    const testCaseObj = { id, module, priority, tag, status };

    if (errors.length === 0) {
      validCases.push(testCaseObj);
    } else {
      invalidCases.push({ ...testCaseObj, errors });
    }

    seenIds.add(id);
  }

  return {
    validCases,
    invalidCases,
    summary: {
      total: rawRows.length,
      valid: validCases.length,
      invalid: invalidCases.length,
      duplicateIds: duplicateCount
    }
  };
}

const result = chuanHoaDanhSachTest(rawRows, testCaseConfig);

// Chỉ lấy error message:
console.log("Valid cases:", result.validCases);
console.log("Invalid cases:", result.invalidCases);
console.log("Summary:", result.summary);

