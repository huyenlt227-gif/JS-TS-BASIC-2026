// ## Bài 3: Merge config chạy test và bắt lỗi cấu hình

// ### Bối cảnh thực tế

// Dự án thường có nhiều lớp config:

// - `defaultConfig`
// - `envConfig`
// - `overrideConfig` do người chạy test truyền vào

// Bug rất hay gặp:

// - gộp sai thứ tự nên config bị ghi đè ngược
// - dùng spread với object rồi tưởng là sao chép sâu
// - timeout âm hoặc quá bé
// - CI mà vẫn bật `headed: true`
// - danh sách browser bị trùng tên

// ### Đề bài

// Viết 2 hàm:

// ```javascript
// function taoCauHinhCuoi(defaultConfig, envConfig, overrideConfig)
// function kiemTraCauHinh(config)
// ```

// ### Bộ data test dùng để làm bài

// ```javascript
const configCase1 = {
    defaultConfig: {
        env: "local",
        baseUrl: "http://localhost:3000",
        timeout: 30000,
        retries: 0,
        headed: true,
        browsers: ["chromium"],
        reporter: {
            type: "html",
            output: "reports/default"
        }
    },
    envConfig: {
        env: "staging",
        baseUrl: "https://staging.neko.dev",
        retries: 1,
        browsers: ["chromium", "firefox"]
    },
    overrideConfig: {
        timeout: 500,
        headed: true,
        browsers: [" Chromium ", "chromium", "webkit"],
        reporter: {
            type: "html",
            output: "reports/custom"
        }
    }
};

const configCase2 = {
    defaultConfig: {
        env: "ci",
        baseUrl: "https://ci.neko.dev",
        timeout: 10000,
        retries: 2,
        headed: true,
        browsers: ["chromium"],
        reporter: {
            type: "html",
            output: "reports/ci"
        }
    },
    envConfig: {},
    overrideConfig: {}
};

const configCase3 = {
    defaultConfig: {
        env: "staging",
        baseUrl: "ftp://bad-url",
        timeout: 2000,
        retries: 1,
        headed: false,
        browsers: ["firefox"],
        reporter: {
            type: "json",
            output: "reports/json"
        }
    },
    envConfig: {},
    overrideConfig: {}
};

const configCase4 = {
    defaultConfig: {
        env: "test",
        baseUrl: "https://prod.neko.dev",
        timeout: 5000,
        retries: 1,
        headed: false,
        browsers: ["webkit"],
        reporter: {
            type: "html",
            output: "reports/test"
        }
    },
    envConfig: {},
    overrideConfig: {}
};

const configCase5 = {
    defaultConfig: {
        env: "local",
        baseUrl: "http://localhost:3000",
        timeout: 30000,
        retries: -1,
        headed: false,
        browsers: [],
        reporter: {
            type: "",
            output: ""
        }
    },
    envConfig: {},
    overrideConfig: {}
};
// ```

// Khi làm với bộ data test này:

// - `defaultConfig`, `envConfig`, `overrideConfig` lấy từ từng `configCase`
// - `config` truyền vào `kiemTraCauHinh(config)` là object cuối sau khi đã merge
// - Ví dụ với `configCase1`:

// ```javascript
// const finalConfig = taoCauHinhCuoi(
//     configCase1.defaultConfig,
//     configCase1.envConfig,
//     configCase1.overrideConfig
// );

// kiemTraCauHinh(finalConfig);
// ```

// ### Yêu cầu

// 1. Dùng spread để merge config.
// 2. Thứ tự merge phải là:

// ```javascript
// defaultConfig -> envConfig -> overrideConfig
// ```

// 3. Trong `kiemTraCauHinh(config)`, với mảng `browsers`:
//    - dùng `map` để `trim` và đưa từng browser về lowercase
//    - dùng `filter` để lấy ra browser bị trùng
//    - dùng `find` để lấy browser trùng đầu tiên nếu có
// 4. Hàm `kiemTraCauHinh()` phải trả về:

// ```javascript
// {
//     errors: [],
//     warnings: []
// }
// ```

// - Không bắt buộc đúng từng câu chữ của `errors` và `warnings`.
// - Chỉ cần phân biệt đúng lỗi nào đưa vào `errors`, cảnh báo nào đưa vào `warnings`.
// - Có thể dùng câu ngắn gọn, dễ hiểu.

// ### Luật kiểm tra

// - `baseUrl` phải bắt đầu bằng `http://` hoặc `https://`
// - `timeout` phải từ `1000` trở lên
// - `retries` không được âm
// - `browsers` không được rỗng
// - không được có browser trùng sau khi đã `trim` và đưa về lowercase
// - nếu `env === "ci"` mà `headed === true` -> warning
// - nếu `baseUrl` chứa `"prod"` nhưng `env !== "production"` -> warning

// ### Điều bắt buộc

// 1. Không được sửa trực tiếp bất kỳ config đầu vào nào.
// 2. Dùng object destructuring ít nhất 1 lần.
// 3. Dùng `map`, `filter`, `find` ở phần xử lý `browsers`.