class ProductStore {
  #products = [];

  addProduct(product) {
    const { id, name, category, price, inStock } = product;

    // Validate id trùng
    const isDuplicate = this.#products.some((p) => p.id === id);
    if (isDuplicate) {
      return { success: false, message: "Id sản phẩm đã tồn tại" };
    }

    // Validate name
    if (!name || name.trim() === "") {
      return { success: false, message: "Tên sản phẩm không được rỗng" };
    }

    // Validate category
    if (!category || category.trim() === "") {
      return { success: false, message: "Danh mục không được rỗng" };
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return { success: false, message: "Giá phải lớn hơn 0" };
    }

    // Validate inStock
    if (typeof inStock !== "boolean") {
      return { success: false, message: "inStock phải là kiểu boolean" };
    }

    // Lưu với name đã trim
    this.#products.push({ ...product, name: name.trim(), category: category.trim() });
    return { success: true, message: "Thêm sản phẩm thành công" };
  }

  findByName(keyword) {
    const trimmed = keyword.trim().toLowerCase();
    return this.#products.filter((p) =>
      p.name.toLowerCase().includes(trimmed)
    );
  }

  filterByCategory(category) {
    const trimmed = category.trim().toLowerCase();
    return this.#products.filter(
      (p) => p.category.toLowerCase() === trimmed
    );
  }

  getAvailableProducts() {
    return this.#products.filter((p) => p.inStock === true);
  }

  getTotalInventoryValue() {
    const available = this.getAvailableProducts();
    if (available.length === 0) return 0;
    return available.reduce((sum, p) => sum + p.price, 0);
  }
}

class DiscountProductStore extends ProductStore {
  #discountRate;

  constructor(discountRate) {
    super();
    this.#discountRate = discountRate;
  }

  getTotalInventoryValue() {
    const original = super.getTotalInventoryValue();
    return original * (1 - this.#discountRate);
  }

  getDiscountInfo() {
    const originalTotal = super.getTotalInventoryValue();
    const discountAmount = originalTotal * this.#discountRate;
    const finalTotal = originalTotal - discountAmount;
    return {
      originalTotal,
      discountRate: this.#discountRate,
      discountAmount,
      finalTotal,
    };
  }
}

// ============ TEST ============
const store = new DiscountProductStore(0.1);

console.log(
  store.addProduct({
    id: "p01",
    name: "  iPhone 15 Pro  ",
    category: "phone",
    price: 29990000,
    inStock: true,
  })
);
// { success: true, message: 'Thêm sản phẩm thành công' }

console.log(
  store.addProduct({
    id: "p02",
    name: "MacBook Air",
    category: "laptop",
    price: 24990000,
    inStock: true,
  })
);
// { success: true, message: 'Thêm sản phẩm thành công' }

console.log(
  store.addProduct({
    id: "p03",
    name: "AirPods Pro",
    category: "audio",
    price: 5990000,
    inStock: false,
  })
);
// { success: true, message: 'Thêm sản phẩm thành công' }

console.log(
  store.addProduct({
    id: "p01",
    name: "Duplicate",
    category: "phone",
    price: 1000,
    inStock: true,
  })
);
// { success: false, message: 'Id sản phẩm đã tồn tại' }

console.log("findByName('iphone'):", store.findByName("iphone"));
// [{ id: 'p01', name: 'iPhone 15 Pro', ... }]

console.log("filterByCategory(' PHONE '):", store.filterByCategory(" PHONE "));
// [{ id: 'p01', name: 'iPhone 15 Pro', category: 'phone', ... }]

console.log("getAvailableProducts():", store.getAvailableProducts());
// [iPhone 15 Pro, MacBook Air]

console.log("getDiscountInfo():", store.getDiscountInfo());
// { originalTotal: 54980000, discountRate: 0.1, discountAmount: 5498000, finalTotal: 49482000 }




























// ## Phân tích Bài 1 

// ---

// ### Class là gì?

// Hãy tưởng tượng **class là một cái form mẫu** — giống như form đăng ký thông tin nhân viên trong công ty.

// - **Class `ProductStore`** = Bảng quản lý kho hàng
// - **Class `DiscountProductStore`** = Bảng quản lý kho hàng **có thêm tính năng giảm giá**

// ---

// ### `#products = []` — Ngăn kéo bí mật

// Kho hàng có một **ngăn kéo bí mật** (`#products`) chứa danh sách sản phẩm.

// Dấu `#` nghĩa là: **chỉ người trong nội bộ mới được mở ngăn kéo này**, người ngoài không thể thò tay vào lấy trực tiếp được.

// ---

// ### Các method — Các "nút bấm" trên bảng điều khiển

// Mỗi method giống như một **nút chức năng** trên phần mềm:

// | Nút | Làm gì |
// |---|---|
// | `addProduct()` | Thêm sản phẩm vào kho |
// | `findByName()` | Tìm kiếm sản phẩm theo tên |
// | `filterByCategory()` | Lọc sản phẩm theo danh mục |
// | `getAvailableProducts()` | Xem sản phẩm còn hàng |
// | `getTotalInventoryValue()` | Tính tổng tiền hàng trong kho |

// ---

// ### `addProduct()` — Nhân viên nhập kho nghiêm túc

// Khi bạn muốn **thêm 1 sản phẩm**, nhân viên sẽ kiểm tra lần lượt:

// 1. **Mã sản phẩm có bị trùng không?** → Nếu trùng, từ chối ngay
// 2. **Tên sản phẩm có bị bỏ trống không?** → Nếu rỗng, từ chối
// 3. **Danh mục có bị bỏ trống không?** → Nếu rỗng, từ chối
// 4. **Giá có hợp lệ không?** → Phải lớn hơn 0, không được âm hoặc bằng 0
// 5. **Trạng thái còn hàng có đúng định dạng không?** → Chỉ chấp nhận `true` hoặc `false`, không chấp nhận chữ `"true"` hay số `1`

// Qua hết 5 bước → mới cho vào kho, báo **"Thêm thành công"**.
// Không qua được bước nào → báo **"Lý do lỗi"** cụ thể.

// > Đây chính là điều một manual tester cần **test**: thử từng trường hợp lỗi xem hệ thống có báo đúng không!

// ---

// ### `findByName('iphone')` — Thanh tìm kiếm

// Gõ `"iphone"` (chữ thường) → vẫn tìm ra `"iPhone 15 Pro"` (chữ hoa).

// Hệ thống **tự động bỏ qua hoa/thường** và **bỏ khoảng trắng thừa** khi tìm — giống Google Search vậy.

// ---

// ### `DiscountProductStore` — Phiên bản nâng cấp

// Đây là **bảng quản lý kho hàng đặc biệt**, được nâng cấp từ bảng gốc.

// Nó **giữ nguyên tất cả** chức năng của bảng gốc, nhưng **thêm khả năng tính giảm giá**.

// Khi bạn tạo một kho hàng kiểu này, bạn khai báo ngay mức giảm giá:
// ```
// new DiscountProductStore(0.1)  →  giảm 10%
// ```

// ---

// ### `getDiscountInfo()` — Phiếu tổng kết giảm giá

// Trả về một phiếu tóm tắt:

// ```
// Tổng tiền gốc:     54,980,000đ
// Mức giảm:          10%
// Số tiền được giảm: 5,498,000đ
// Thực trả:          49,482,000đ
// ```

// ---

// ### Tóm lại — Góc nhìn của tester

// Khi test bài này, bạn cần kiểm tra **3 nhóm chính**:

// | Nhóm | Ví dụ cần test |
// |---|---|
// | **Validate đầu vào** | Thêm sản phẩm trùng id, tên rỗng, giá âm... |
// | **Tìm kiếm / lọc** | Tìm chữ hoa ra chữ thường, filter đúng category |
// | **Tính toán** | Tổng tiền đúng chưa, giảm giá tính đúng chưa |