// Bài 4: Phân tích kết quả chạy test có chạy lại

// ### Bối cảnh thực tế

// Đây là kiểu dữ liệu QA và automation gặp suốt:

// - một test có thể chạy nhiều lần
// - có test fail rồi pass ở lần chạy lại sau
// - có test duration âm do dữ liệu log lỗi
// - có kết quả trả về cho một test không tồn tại trong danh sách master

// ### Đề bài

// Viết hàm:

// ```javascript
// function phanTichKetQuaChay(results, options)
// ```

// ### Bộ data test dùng để làm bài

// ```javascript
const resultOptions = {
    slowThreshold: 2500,
};

const results = [
    {
        id: "TC_LOGIN_001",
        module: "login",
        statuses: ["fail", "pass"],
        durations: [1200, 800],
        owner: "an"
    },
    {
        id: "TC_SEARCH_002",
        module: "search",
        statuses: ["pass"],
        durations: [600],
        owner: "binh"
    },
    {
        id: "TC_CART_003",
        module: "cart",
        statuses: ["fail", "fail", "fail"],
        durations: [1500, 1700, 1600],
        owner: ""
    },
    {
        id: "TC_PAY_004",
        module: "payment",
        statuses: ["pass"],
        durations: [-50],
        owner: "chi"
    },
    {
        id: "TC_PROFILE_005",
        module: "profile",
        statuses: ["pass", "pass"],
        durations: [700, 650],
        owner: "duy"
    },
    {
        id: "",
        module: "report",
        statuses: ["pass"],
        durations: [300],
        owner: "ha"
    },
    {
        id: "TC_API_006",
        module: "api",
        statuses: ["fail", "unknown"],
        durations: [400, 500],
        owner: "linh"
    },
    {
        id: "TC_BILL_007",
        module: "billing",
        statuses: ["fail", "pass", "pass", "pass"],
        durations: [600, 700, 650, 620],
        owner: "minh"
    },
    {
        id: "TC_LOG_008",
        module: "log",
        statuses: ["skip"],
        durations: [100],
        owner: "nam"
    },
    {
        id: "TC_SYNC_009",
        module: "sync",
        statuses: ["fail", "pass"],
        durations: [1500],
        owner: "oanh"
    }
];
// ```

// Khi làm với bộ data test này:

// - `results` nhận mảng `results` ở trên
// - `options` nhận `resultOptions`
// - Ví dụ gọi hàm: `phanTichKetQuaChay(results, resultOptions)`

// ### Yêu cầu

// 1. Tính cho mỗi test:
//    - `finalStatus`
//    - `retryCount`
//    - `totalDuration`
//    - `isFlaky`
//    - `isSlow`
// 2. Một test được xem là `flaky` nếu:
//    - có ít nhất 1 lần `fail`
//    - và lần cuối là `pass`
// 3. Một test là `slow` nếu tổng duration lớn hơn `slowThreshold`
// 4. Một test là invalid nếu:
//    - thiếu `id`
//    - `statuses.length !== durations.length`
//    - có duration âm
// 5. Khi gọi `phanTichKetQuaChay(results, resultOptions)`, hàm phải `return` object có dạng:

// ```javascript
// {
//     analyzed: [...],
//     invalid: [...],
//     summary: {
//         total: results.length,
//         passed: ...,
//         failed: ...,
//         flaky: ...,
//         slow: ...,
//         invalid: ...
//     }
// }
// ```

// ### Điều bắt buộc

// 1. Dùng destructuring khi đọc từng result object.
// 2. Không dùng biến global để cộng dồn phần tổng kết.
// 3. Giữ bài này trong 1 hàm chính `phanTichKetQuaChay(results, options)`.

function phanTichKetQuaChay(results, options) {

    const analyzed = [];
    const invalid = [];
    const summary = {
        total: results.length,
        passed: 0,
        failed: 0,
        flaky: 0,
        slow: 0,
        invalid: 0
    };

    for (const result of results) {
        // Destructure result object
        const { id, module, statuses, durations, owner } = result;
        // Check invalid conditions
        const isInvalid = !id || statuses.length !== durations.length || durations.some(d => d < 0);
        if (isInvalid) {
            invalid.push(result);
            summary.invalid++;
            continue;
        }           
        // phân tích result
        const finalStatus = statuses[statuses.length - 1];
        const retryCount = statuses.filter(s => s === "fail").length;
        const totalDuration = durations.reduce((sum, d) => sum + d, 0);
        const isFlaky = retryCount > 0 && finalStatus === "pass";
        const isSlow = totalDuration > options.slowThreshold;

        // push vào analyzed
        analyzed.push({
            id,
            module,
            owner,
            finalStatus,
            retryCount,
            totalDuration,
            isFlaky,
            isSlow
        });
        // update summary
        if (finalStatus === "pass") {
            summary.passed++;
        } else {
            summary.failed++;
        }
        if (isFlaky) {
            summary.flaky++;
        }
        if (isSlow) {
            summary.slow++;
        }   
        
    }

    return {
        analyzed,
        invalid,
        summary
    };
}   

// ===== RUN FUNCTION =====
const output = phanTichKetQuaChay(results, resultOptions);

console.log("=== Analyzed ===");
console.log(output.analyzed);

console.log("\n=== Invalid ===");
console.log(output.invalid);

console.log("\n=== Summary ===");
console.log(output.summary);