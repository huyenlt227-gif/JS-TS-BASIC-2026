Triết lý TS

trong TS chúng ta phải mô tả hình dạng cho mọi dữ liệu bằng type hoặc interface.
Nguyên tắc: Mọi object mọi hàm , mọi API respone phải có hợp đồng dữ liệu viết bằng
interface hoặc type

Hình dạng là = nó có những field nào, mỗi field thuộc kiểu gì, field nào bát buộc,
fueld nào tùy chọn.,
nGười tạo dữ liệu phải tọa đúng shape (đủ field, đủ kiểu)
người dùng đc TS đảm bảo: field nào tồn tại, có thể thiếu hay ko, kiểu gì

interface mình cứ tưởng tượng nó giống như bản thiết kế nhà

- kiến truc sư vẽ bản thiết kế (interface)trc
- thợ xây phải xây dưunjg ĐÚNG THEO thiết kế (object/class phải tuân theo interface)
- có thể mở rộng ban thiết kế (thêm phòng, thêm tâmgf = extends)
- nhiều kiến trúc sư có thể đống góp vào cùng 1 bản thiết kế (declaration merging)

.2 Type Alias - (nhãn dán)

-Mình có thể dán nhãn lên bất kì thứ gì (OBJECT, string, number, function ,typle)

- nhưng nhãn dán ko thể sửa sau khi viết (declaration merging)
- có thể tổ hợp nhiều thứ (Union)










