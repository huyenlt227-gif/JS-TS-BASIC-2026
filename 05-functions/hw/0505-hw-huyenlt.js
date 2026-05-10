//  Bài 5: Lọc danh sách test cần chạy lại bằng `map`, `filter`, `find`

// ### Bối cảnh thực tế

// Sau một lượt chạy regression, team thường phải chốt rất nhanh:

// - test nào cần chạy lại
// - test nào thiếu owner để giao người xử lý
// - test fail mức độ ưu tiên cao đầu tiên là test nào
// - dữ liệu trả về có đang bị thừa khoảng trắng hoặc viết hoa viết thường lung tung không

// ### Đề bài

// Viết hàm:

// ```javascript
// function locDanhSachChayLai(rawRuns)
// ```

// ### Bộ data test dùng để làm bài

// ```javascript
const rawRuns = [
    { id: " tc_login_001 ", module: " login ", status: " FAIL ", owner: "an", priority: 1, enabled: true },
    { id: "TC_SEARCH_002", module: "search", status: "pass", owner: "binh", priority: 2, enabled: true },
    { id: " tc_cart_003 ", module: " cart ", status: " flaky ", owner: " chi ", priority: 1, enabled: true },
    { id: "TC_PAY_004", module: "payment", status: "fail", owner: "", priority: 1, enabled: true },
    { id: " TC_USER_005 ", module: " user ", status: " skip ", owner: "duy", priority: 3, enabled: true },
    { id: "TC_REPORT_006", module: "report", status: "fail", owner: "ha", priority: 2, enabled: false },
    { id: " ", module: "api", status: "fail", owner: "linh", priority: 1, enabled: true },
    { id: "TC_SYNC_007", module: " sync ", status: " FAIL ", owner: " minh ", priority: 2, enabled: true },
    { id: "TC_BILL_008", module: "billing", status: "pass", owner: "", priority: 1, enabled: true },
    { id: "TC_ORDER_009", module: " order ", status: " flaky ", owner: "nam", priority: 2, enabled: true }
];
// ```

// Khi làm với bộ data test này:

// - `rawRuns` nhận trực tiếp mảng `rawRuns` ở trên
// - Ví dụ gọi hàm: `locDanhSachChayLai(rawRuns)`

// ### Yêu cầu

// 1. Dùng `map` để tạo `normalizedRuns`.
// 2. Trong từng phần tử của `normalizedRuns`, chuẩn hóa dữ liệu:
//    - `id` -> trim, uppercase
//    - `module` -> trim, lowercase
//    - `status` -> trim, lowercase
//    - `owner` -> trim
//    - giữ nguyên `priority`, `enabled`
// 3. Dùng `filter` để tạo `rerunList`. Một test cần chạy lại khi:
//    - `enabled === true`
//    - `id` không rỗng
//    - `status` là `fail` hoặc `flaky`
// 4. Dùng `filter` để tạo `missingOwnerList`. Chỉ lấy các test:
//    - `enabled === true`
//    - `id` không rỗng
//    - `owner === ""`
// 5. Dùng `find` để tạo `firstCriticalCase`. Đây là test đầu tiên thỏa:
//    - `enabled === true`
//    - `id` không rỗng
//    - `priority === 1`
//    - `status === "fail"`
// 6. Hàm phải `return` object có dạng:

// ```javascript
// {
//     normalizedRuns: [...],
//     rerunList: [...],
//     missingOwnerList: [...],
//     firstCriticalCase: { ... } // hoặc null nếu không có
// }
// ```

// ### Điều bắt buộc

// 1. Dùng object destructuring khi đọc từng phần tử bên trong `map`.
// 2. Giữ bài này trong 1 hàm chính `locDanhSachChayLai(rawRuns)`.
// 3. Không được sửa trực tiếp `rawRuns`.
// 4. Không dùng `for` cho phần xử lý chính của bài này.
function locDanhSachChayLai(rawRuns) {
  // 1. map -> normalizedRuns
  const normalizedRuns = rawRuns.map(({ id, module, status, owner, priority, enabled }) => {
    return {
      id: id.trim().toUpperCase(),
      module: module.trim().toLowerCase(),
      status: status.trim().toLowerCase(),
      owner: owner.trim(),
      priority,
      enabled
    };
  });

  // 2. filter -> rerunList
  const rerunList = normalizedRuns.filter(run =>
    run.enabled === true &&
    run.id !== "" &&
    (run.status === "fail" || run.status === "flaky")
  );

  // 3. filter -> missingOwnerList
  const missingOwnerList = normalizedRuns.filter(run =>
    run.enabled === true &&
    run.id !== "" &&
    run.owner === ""
  );

  // 4. find -> firstCriticalCase
  const firstCriticalCase = normalizedRuns.find(run =>
    run.enabled === true &&
    run.id !== "" &&
    run.priority === 1 &&
    run.status === "fail"
  ) || null;

  // 5. return object
  return {
    normalizedRuns,
    rerunList,
    missingOwnerList,
    firstCriticalCase
  };
}

// ===== RUN FUNCTION =====
const output = locDanhSachChayLai(rawRuns);

console.log("=== Normalized Runs ===");
console.log(output.normalizedRuns);

console.log("\n=== Rerun List ===");
console.log(output.rerunList);

console.log("\n=== Missing Owner List ===");
console.log(output.missingOwnerList);

console.log("\n=== First Critical Case ===");
console.log(output.firstCriticalCase);
