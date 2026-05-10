// HW-03: Báo cáo kiểm tra trước khi release

let rawProjectName = "   Neko CRM   ";
let rawEnvName = "   ";
let rawPassRate = "82";
let rawHasReport = "true";
let rawCriticalMessage = "   ";
let browserUsed = "chrome"; // "chrome", "firefox", "safari", "edge"

// trim() — đúng, tạo biến mới — tốt
let cleanProjectName = rawProjectName.trim();
// Ternary gọn — đúng
// Góp ý nhỏ: rawEnvName.trim() gọi 2 lần — nên tạo biến riêng:
//    let envTrimmed = rawEnvName.trim();
//    let cleanEnvName = envTrimmed === "" ? "Development" : envTrimmed;
let cleanEnvName = rawEnvName.trim() === "" ? "Development" : rawEnvName.trim();

// Number() — đúng
let passRate = Number(rawPassRate);

// Đúng: .toLowerCase() === "true" — an toàn
// Góp ý nhỏ: thiếu .trim() trước toLowerCase()
//    Sửa: let hasReport = rawHasReport.trim().toLowerCase() === "true";
let hasReport = rawHasReport.toLowerCase() === "true";

// hasCriticalBug — viết thành function!
// Hay! Tư duy tốt — dùng function để tái sử dụng
// NHƯNG: bài này chưa học function, và quan trọng hơn:
//    Ở dòng 86 và 109: dùng hasCriticalBug mà KHÔNG gọi hàm (thiếu ())
//    hasCriticalBug là 1 function object → luôn truthy
//    !hasCriticalBug → luôn false → isReadyToRelease luôn false (sai!)
//    hasCriticalBug ? "Có..." → luôn "Có bug nghiêm trọng" (sai!)
//    Sửa: gọi hàm hasCriticalBug(rawCriticalMessage)
//    Hoặc dùng biến thay vì function:
//    let criticalBugResult = hasCriticalBug(rawCriticalMessage);
//    rồi dùng criticalBugResult ở dưới
function hasCriticalBug(message) {
    if (message === null || message === undefined) {
        return false;
    } else if (message.trim() === "") {
        return false;
    } else {
        return true;
    }
}

// if/else if xếp hạng — đúng logic
// Góp ý: console.log trực tiếp trong if — không lưu kết quả vào biến
//    Nên: let grade; if (...) { grade = "EXCELLENT" } ...
//    Rồi dùng grade ở phần output
//    Vì ở dòng 107 bạn lại tính lại bằng nested ternary (viết 2 lần)
if (passRate >= 95) {
    console.log("Grade: EXCELLENT");
} else if (passRate >= 80) {
    console.log("Grade: GOOD");
} else if (passRate >= 60) {
    console.log("Grade: NEEDS IMPROVEMENT");
} else {
    console.log("Grade: CRITICAL");
}

// switch/case — đúng, gọn
// Hay! Fall-through chrome/edge — chuẩn, đầy đủ safari + default
let engineName;
switch (browserUsed) {
    case "chrome":
    case "edge":
        engineName = "Chromium";
        break;
    case "firefox":
        engineName = "Gecko";
        break;
    case "safari":
        engineName = "WebKit";
        break;
    default:
        engineName = "Unknown";
}

// Ternary — đúng, gọn
let reportMessage = hasReport ? "Có report" : "Chưa có report";

// SAI: !hasCriticalBug — đây là !function → luôn false
//    Vì hasCriticalBug là function (truthy), !truthy = false
//    isReadyToRelease sẽ luôn false dù data đúng!
//    Sửa: !hasCriticalBug(rawCriticalMessage)
let isReadyToRelease = passRate >= 80 && !hasCriticalBug && hasReport;

// Output
console.log(`Project:         ${cleanProjectName}`);
console.log(`Environment:     ${cleanEnvName}`);
console.log(`Browser:         ${browserUsed}`);
console.log(`Engine:          ${engineName}`);
console.log(`Pass Rate:      ${passRate.toFixed(2)}%`);
// Góp ý: nested ternary 1 dòng — đúng kết quả nhưng rất khó đọc
//    Và grade đã tính ở if/else if trên (nhưng không lưu biến nên phải tính lại)
//    Nên: lưu grade vào biến 1 lần, dùng lại ở đây
console.log(`Grade:          ${passRate >= 95 ? "EXCELLENT" : passRate >= 80 ? "GOOD" : passRate >= 60 ? "NEEDS IMPROVEMENT" : "CRITICAL"}`);
console.log(`Report:         ${reportMessage}`);
// SAI: hasCriticalBug ở đây là function (truthy) → luôn "Có bug nghiêm trọng"
//    Sửa: hasCriticalBug(rawCriticalMessage) ? ...
console.log(`Critical Bug:   ${hasCriticalBug ? "Có bug nghiêm trọng" : "Không có bug nghiêm trọng"}`);
console.log(`Ready:          ${isReadyToRelease ? "YES" : "NO"}`);

// ===================================================
// TỔNG KẾT REVIEW — HUYỀN LT — HW-03
// ===================================================
// Kết quả: Cần sửa — Tư duy tốt nhưng dùng function sai cách
//
// Điểm tốt:
//   - Tư duy dùng function cho hasCriticalBug — chủ động, nâng cao
//   - Ép Boolean đúng: .toLowerCase() === "true"
//   - switch fall-through chrome/edge — chuẩn
//   - Ternary cho reportMessage — gọn
//   - Tạo biến mới (cleanProjectName, cleanEnvName) — giữ data gốc
//   - Nested ternary cho grade — sáng tạo (dù khó đọc)
//
// Cần cải thiện:
//   - hasCriticalBug là function nhưng dùng như biến (thiếu ()) → sai kết quả!
//     !hasCriticalBug → luôn false, hasCriticalBug ? → luôn true
//     Sửa: let isCriticalBug = hasCriticalBug(rawCriticalMessage);
//     Rồi dùng isCriticalBug ở isReadyToRelease và console.log
//   - Grade: if/else if in trực tiếp + nested ternary → tính 2 lần
//     Nên lưu vào biến 1 lần: let grade = ...
//   - Thiếu .trim() trước .toLowerCase() cho hasReport
//   - rawEnvName.trim() gọi 2 lần — nên tạo biến riêng
//   - Nên dùng const thay let cho biến không gán lại
// ===================================================
