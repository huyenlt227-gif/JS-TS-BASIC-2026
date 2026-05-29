class Cart {
  #items = [];
  #discountRate = 0;

  // Method nội bộ cho phép class con gọi để đặt discount
  _setDiscountRate(rate) {
    this.#discountRate = rate;
  }

  addItem(item) {
    const { name, price, quantity } = item;

    // Validate name
    if (!name || name.trim() === "") {
      return { success: false, message: "Tên sản phẩm không được rỗng" };
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return { success: false, message: "Giá phải lớn hơn 0" };
    }

    // Validate quantity
    if (typeof quantity !== "number" || quantity <= 0) {
      return { success: false, message: "Số lượng phải lớn hơn 0" };
    }

    const trimmedName = name.trim();

    // Nếu tên đã tồn tại (không phân biệt hoa thường) -> tăng quantity
    const existing = this.#items.find(
      (i) => i.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.#items.push({ name: trimmedName, price, quantity });
    }

    return { success: true, message: "Thêm vào giỏ hàng thành công" };
  }

  removeItem(name) {
    const trimmed = name.trim().toLowerCase();
    this.#items = this.#items.filter(
      (i) => i.name.toLowerCase() !== trimmed
    );
  }

  getSubtotal() {
    return this.#items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  applyCoupon(code) {
    const normalized = code.trim().toUpperCase();
    if (normalized === "SALE10") {
      this.#discountRate = 0.1;
      return true;
    }
    if (normalized === "SALE20") {
      this.#discountRate = 0.2;
      return true;
    }
    return false;
  }

  checkout() {
    const subtotal = this.getSubtotal();
    const discount = subtotal * this.#discountRate;
    const total = subtotal - discount;
    return {
      items: this.#items.map((i) => ({ ...i })),
      subtotal,
      discount,
      total,
    };
  }
}

class VipCart extends Cart {
  #memberName;

  constructor(memberName) {
    super();
    this.#memberName = memberName;
  }

  applyCoupon(code) {
    // Thử mã thường trước
    const result = super.applyCoupon(code);
    if (result) return true;

    // Nếu mã thường không hợp lệ, kiểm tra mã VIP
    if (code.trim().toUpperCase() === "VIP30") {
      this._setDiscountRate(0.3);
      return true;
    }

    return false;
  }

  checkout() {
    const baseResult = super.checkout();
    return {
      ...baseResult,
      memberName: this.#memberName,
      cartType: "VIP",
    };
  }
}

// ============ TEST ============
const cart = new VipCart("Neko");

console.log(
  cart.addItem({ name: "Trà sữa trân châu", price: 30000, quantity: 2 })
);
// { success: true, message: 'Thêm vào giỏ hàng thành công' }

console.log(
  cart.addItem({ name: "  trà SỮA trân châu  ", price: 30000, quantity: 1 })
);
// Trùng tên -> quantity tăng lên 3
// { success: true, message: 'Thêm vào giỏ hàng thành công' }

console.log(cart.addItem({ name: "Trà đào", price: 25000, quantity: 1 }));
// { success: true, message: 'Thêm vào giỏ hàng thành công' }

console.log("applyCoupon(' vip30 '):", cart.applyCoupon(" vip30 "));
// true

console.log("checkout():", cart.checkout());
// {
//   items: [
//     { name: 'Trà sữa trân châu', price: 30000, quantity: 3 },
//     { name: 'Trà đào', price: 25000, quantity: 1 }
//   ],
//   subtotal: 115000,
//   discount: 34500,
//   total: 80500,
//   memberName: 'Neko',
//   cartType: 'VIP'
// }




















































// ## Phân tích Bài 2 

// ---

// ### Bức tranh tổng quan

// Bài này mô phỏng **giỏ hàng của một app đặt đồ uống** (kiểu Shopee Food, Grab).

// ```
// Cart (giỏ hàng thường)
// └── VipCart (giỏ hàng VIP, có thêm quyền lợi)
// ```

// ---

// ### Class cha: `Cart` — Giỏ hàng thường

// #### `#items = []` — Ngăn kéo bí mật chứa đồ

// Giống Bài 1, dùng `#` để khóa danh sách hàng lại — không ai thò tay vào được từ bên ngoài.

// ---

// #### `addItem()` — Bỏ món vào giỏ

// Nhân viên kiểm tra 3 thứ trước:

// | Kiểm tra | Lỗi trả về |
// |---|---|
// | `name` bỏ trống | `"Tên sản phẩm không được rỗng"` |
// | `price <= 0` | `"Giá phải lớn hơn 0"` |
// | `quantity <= 0` | `"Số lượng phải lớn hơn 0"` |

// Điểm đặc biệt — **nếu món đã có trong giỏ rồi thì không tạo dòng mới, chỉ cộng thêm số lượng**:

// > Thêm "Trà sữa" x2 → giỏ có 2 ly  
// > Thêm "  trà SỮA  " x1 → hệ thống nhận ra là cùng món → giỏ thành 3 ly

// Hệ thống tự động bỏ khoảng trắng và bỏ phân biệt hoa/thường khi so sánh tên.

// ---

// #### `removeItem()` — Bỏ món ra khỏi giỏ

// Gọi tên món → xóa khỏi danh sách. Cũng không phân biệt hoa thường.

// ---

// #### `getSubtotal()` — Tính tổng tiền thô

// Cộng từng món: `giá × số lượng`, rồi cộng tất cả lại.

// > 30,000 × 3 + 25,000 × 1 = **115,000đ**

// ---

// #### `applyCoupon()` — Áp mã giảm giá

// | Mã nhập vào | Kết quả |
// |---|---|
// | `"SALE10"` | Giảm 10%, trả `true` |
// | `"SALE20"` | Giảm 20%, trả `true` |
// | Mã khác | Không giảm, trả `false` |

// Mã được tự động `trim()` + chuyển hoa → `" sale10 "` vẫn được chấp nhận.

// ---

// #### `checkout()` — Xuất hóa đơn

// Trả về phiếu tổng kết:
// ```
// items:    danh sách món đã mua
// subtotal: tổng tiền gốc
// discount: số tiền được giảm
// total:    thực trả
// ```

// ---

// ### Class con: `VipCart` — Giỏ hàng VIP

// Kế thừa toàn bộ giỏ hàng thường, nhưng có **2 điểm nâng cấp**:

// ---

// #### Override `applyCoupon()` — Thêm quyền dùng mã VIP

// Quy trình xử lý khi nhập mã:

// ```
// Bước 1: Thử mã thường (SALE10, SALE20)
//          └─ Hợp lệ → áp dụng, xong
//          └─ Không hợp lệ → xuống Bước 2

// Bước 2: Kiểm tra có phải mã "VIP30" không
//          └─ Đúng → giảm 30%, trả true
//          └─ Sai  → trả false
// ```

// > Khách thường nhập `"VIP30"` → bị từ chối  
// > Khách VIP nhập `"VIP30"` → được giảm 30%

// ---

// #### Override `checkout()` — Hóa đơn VIP có thêm thông tin

// Gọi hóa đơn thường của cha trước (`super.checkout()`), rồi **dán thêm** tên thành viên và loại giỏ:

// ```
// ...tất cả thông tin hóa đơn thường...
// memberName: "Neko"
// cartType:   "VIP"
// ```

// ---

// ### Kết quả test mẫu

// ```
// Trà sữa trân châu  x2  →  thêm thành công
// "  trà SỮA  "      x1  →  nhận ra trùng tên → thành x3
// Trà đào            x1  →  thêm thành công
// applyCoupon("vip30")   →  true (mã VIP, giảm 30%)

// checkout():
//   subtotal:   115,000đ
//   discount:    34,500đ  (30%)
//   total:       80,500đ
//   memberName: "Neko"
//   cartType:   "VIP"
// ```

// ---

// ### Góc nhìn tester — Cần test gì?

// | Nhóm | Test case gợi ý |
// |---|---|
// | **Validate** | Tên rỗng, giá = 0, quantity âm |
// | **Gộp món** | Thêm cùng tên nhưng khác hoa/thường/khoảng trắng |
// | **Mã giảm giá** | SALE10, SALE20, VIP30, mã sai, mã có khoảng trắng |
// | **Phân quyền** | Khách thường dùng VIP30 → phải bị từ chối |
// | **Tính toán** | Tổng tiền, tiền giảm, thực trả có đúng không |