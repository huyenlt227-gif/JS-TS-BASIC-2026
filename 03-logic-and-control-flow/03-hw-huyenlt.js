// Tình huống: Bạn đang viết một bản kiểm tra trước khi release. Hệ thống trả về dữ liệu thô từ UI và config. Bạn cần xử lý thành báo cáo rõ ràng.			
// Dữ liệu đầu vào:			
			
let rawProjectName = "   Neko CRM   ";			
let rawEnvName = "   ";			
let rawPassRate = "82";			
let rawHasReport = "true";			
let rawCriticalMessage = "   ";			
let browserUsed = "chrome"; // "chrome", "firefox", "safari", "edge"			
			
			
// Yêu cầu:			
// Dùng .trim() để làm sạch rawProjectName và rawEnvName.			
// Nếu rawEnvName sau khi trim() là rỗng -> gán environment = "Development". Nếu không rỗng -> dùng chính giá trị đã làm sạch.			
let cleanProjectName = rawProjectName.trim();		
let cleanEnvName = rawEnvName.trim() === "" ? "Development" : rawEnvName.trim(); 

// Ép rawPassRate sang Number.       
let passRate = Number(rawPassRate);	

// Ép rawHasReport sang Boolean đúng cách.		
let hasReport = rawHasReport.toLowerCase() === "true";

// Tạo hasCriticalBug theo quy tắc:			
// nếu message là null hoặc undefined -> false			
// nếu sau trim() là rỗng -> false	
// ngược lại -> true			
function hasCriticalBug(message) {
    if (message === null || message === undefined) {
     false;
    } else if (message.trim() === "") {
     false;
    } else {
     true;
    }
}
// Dùng if / else if để xếp hạng:			
// >= 95 -> "EXCELLENT"			
// >= 80 -> "GOOD"			
// >= 60 -> "NEEDS IMPROVEMENT"			
// còn lại -> "CRITICAL"			
			
if (passRate >= 95) {
    console.log("Grade: EXCELLENT");
} else if (passRate >= 80) {
    console.log("Grade: GOOD");
} else if (passRate >= 60) {
    console.log("Grade: NEEDS IMPROVEMENT");
} else {
    console.log("Grade: CRITICAL");
}       

// Dùng switch/case để gán tên engine cho browserUsed:			
// chrome -> "Chromium"			
// edge -> "Chromium"			
// firefox -> "Gecko"			
// safari -> "WebKit"			
// Nếu không khớp -> "Unknown"		

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

// Dùng toán tử 3 ngôi để tạo message cho report:			
// nếu hasReport là true -> "Có report"			
// ngược lại -> "Chưa có report"			
let reportMessage = hasReport ? "Có report" : "Chưa có report";

// Tạo isReadyToRelease theo quy tắc:			
// nếu pass rate dưới 80 -> false			
// nếu có critical bug -> false			
// nếu chưa có report -> false			
// còn lại -> true			
let isReadyToRelease = passRate >= 80 && !hasCriticalBug && hasReport;

// In báo cáo ra console.			
			
// Expected output			
// Project:         Neko CRM			
// Environment:     Development			
// Browser:         chrome			
// Engine:          Chromium			
			
// Pass Rate:       82.00%			
// Grade:           GOOD			
// Report:          Có report			
// Critical Bug:    Không có bug nghiêm trọng			
			
// Ready:           YES			        
console.log(`Project:         ${cleanProjectName}`);
console.log(`Environment:     ${cleanEnvName}`);
console.log(`Browser:         ${browserUsed}`);
console.log(`Engine:          ${engineName}`);
console.log(`Pass Rate:      ${passRate.toFixed(2)}%`);     
console.log(`Grade:          ${passRate >= 95 ? "EXCELLENT" : passRate >= 80 ? "GOOD" : passRate >= 60 ? "NEEDS IMPROVEMENT" : "CRITICAL"}`);
console.log(`Report:         ${reportMessage}`);
console.log(`Critical Bug:   ${hasCriticalBug ? "Có bug nghiêm trọng" : "Không có bug nghiêm trọng"}`);
console.log(`Ready:          ${isReadyToRelease ? "YES" : "NO"}`);          
    
			
			
			
