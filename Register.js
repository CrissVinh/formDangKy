import { useState } from "react";
import Error32 from "./Error32";
function Register(){
        // STATE LƯU DỮ LIỆU CỦA FORM
    const [inputs, setInputs] = useState({
        email: "",
        pass: "",
        sex: ""
    });

    const [errors, setErrors] = useState({});
    // errors là object lưu tất cả thông báo lỗi
    // Ban đầu chưa có lỗi nên khởi tạo object rỗng {}

    const [getFile, setFile] = useState(null);
    // getFile lưu file ảnh mà người dùng chọn
    // Ban đầu chưa chọn ảnh nên giá trị là null



    const arr = [           // ARRAY CHỨA DANH SÁCH GIỚI TÍNH
        {
            id: "", 
            name: "vui long chon: "
        },
        {
            id: 1,
            name: "male"
        },
        {
            id: 2, 
            name: "female"
        }
    ];

        //      HÀM XỬ LÝ CHUNG CHO INPUT VÀ SELECT
    const handleInput = (e) => { 
        // Lấy thuộc tính name của input đang nhập
        // Ex: name="email" thì nameInput = "email"       
        const nameInput = e.target.name;

        // Lấy giá trị người dùng nhập vào input
        // EX: nhập abc@gmail.com thì value = "abc@gmail.com"
        const value = e.target.value;

        setInputs(state => ({   // Cập nhật dữ liệu vào state inputs
            ...state,    // Giữ lại toàn bộ dữ liệu trước đó

            [nameInput]: value
                    // Cập nhật đúng thuộc tính có tên nameInput
                    // Ví dụ: [email]: "abc@gmail.com"
        }));
            // Nếu người dùng đã nhập dữ liệu thì xóa lỗi của input đó
        if(value.trim() !==""){
            setErrors(state =>({
                ...state,
                [nameInput]: ""
            }));
        }    


    }
        //      XỬ LÝ FILE AVATAR
    function hanldeFile(e) {
                                // e.target.files chứa danh sách file người dùng chọn
                                // [0] lấy file đầu tiên
        const file = e.target.files[0];

                                // Lưu file vào state getFile
                                // Nếu chưa có file thì lưu null
        setFile(file || null);
                                // Xóa thông báo lỗi avatar khi chọn file mới
                                // Việc kiểm tra file hợp lệ sẽ thực hiện khi submit
        if(file){
            setErrors(state => ({
                ...state,
                avatar: ""
            }));
        }
    }

    //      HÀM XỬ LÝ KHI NHẤN REGISTER
    function handleSubmit(e){
        e.preventDefault();     // Ngăn form tự động reload trang khi submit

        let errorsSubmit = {};  // Tạo object để lưu tất cả lỗi của form
        let flag = true;

        //  KIỂM TRA EMAIL
        if(inputs.email.trim() === ""){ //  Nếu email rỗng thì thông báo lỗi
            errorsSubmit.email = "vui long nhap email";
            flag = false;
        }else{
            // ktra định dạng email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Nếu không đúng thì trả về false
            if(!regexEmail.test(inputs.email)){
                errorsSubmit.email = "email khong dung dinh dang";
                flag = false;
            }
        }

        // KTRA PASS
        if(inputs.pass.trim() === ""){      // Nếu password chưa nhập thì báo lỗi
            errorsSubmit.pass = "vui long nhap pass";
            flag = false;
        }

        //  KTRA GIOI TINH
        if(inputs.sex === ""){      // Nếu chưa chọn Male/Female thì inputs.sex vẫn là chuỗi rỗng ""
            errorsSubmit.sex = "vui long chon gioi tinh";
            flag = false;
        }


        //  KTRA AVATAR
        if(!getFile){
            errorsSubmit.avatar = "vui long chon avatar";
            flag = false;

        }else{  //  neu đã chọn file
            const fileSize = getFile.size;  // Lấy dung lượng file ( byte )
            const fileName = getFile.name;  // Lấy tên file

                                    // Lấy phần mở rộng của file
                                    // split(".") tách tên file thành các phần
                                    // pop() lấy phần cuối cùng
                                    // toLowerCase() chuyển thành chữ thường
            const extension = fileName.split(".").pop().toLowerCase();

            // Array chứa các đuôi file được chấp nhận
            const arrImage = ["png", "jpg", "jpeg"];

                                    // Kiểm tra file có đúng định dạng ảnh không
                                    // includes() kiểm tra extension có nằm trong array không
            const allowedTypes = ["image/png", "image/jpeg"];
            if(
                !arrImage.includes(extension)   ||
                !allowedTypes.includes(getFile.type)
            ){
                errorsSubmit.avatar = "chi chap nhan png, jpg, jpeg";
                flag = false;
            }else if(fileSize > 1024 * 1024){
                        // 1KB = 1024 byte
                        // 1MB = 1024 * 1024 byte
                errorsSubmit.avatar = "dung luong anh khong vuot qua 1MB";
                flag = false;
            }
        }

        // HIỂN THỊ TẤT CẢ LỖI
                                        // Đưa object errorsSubmit vào state errors
                                        // Nếu không có lỗi thì errorsSubmit = {}
                                        // Điều này cũng giúp xóa lỗi cũ sau khi submit hợp lệ
        setErrors(errorsSubmit);


        //  KHI FORM HỢP LỆ
        if(flag){
            const user = {
                email: inputs.email,
                pass: inputs.pass
            };

                                        // Chuyển object thành chuỗi JSON
                                        // localStorage chỉ lưu dữ liệu dạng chuỗi
            // LƯU Ý BẢO MẬT:
            // Không lưu mật khẩu thật vào localStorage.
            // Với bài tập, chỉ lưu email để minh họa.
            // Password phải được xử lý an toàn ở backend.
            localStorage.setItem("dang ky Email", user.email);

            //th bao dki thanh cong
            alert("Đăng ký thành công!");

                            // Xem dữ liệu đã nhập trong Console
                            // Không in password để tránh lộ thông tin
            console.log("Email: ", inputs.email);
            console.log("Sex: ", inputs.sex);
            console.log("Avatar: ", getFile);
        }
    }

    //  HIỂN THỊ GIAO DIỆN ĐĂNG KÝ

    return(
        <div>
            <h2>ĐĂNG KÝ</h2>

                        {/* Component Error dùng để hiển thị tất cả lỗi */}
                        {/* Truyền state errors sang Error.js thông qua props */}
            <Error32 errors = {errors}/>

                        {/* Form đăng ký */}
                        {/* onSubmit gọi hàm handleSubmit khi nhấn ĐĂNG KÝ */}
                        {/* encType dùng khi form gửi dữ liệu file theo multipart */}
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                noValidate
            >
                {/* EMAIL */}
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" placeholder="Nhập email" value={inputs.email} onChange={handleInput}/>
                </div>

                {/* PASSS */}
                <div>
                    <label>Password: </label>
                    <input type="password" name="pass" placeholder="Nhập password" value={inputs.pass} onChange={handleInput}/>
                </div>

                {/* AVATAR */}
                <div>
                    <label>Avatar: </label>
                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg" onChange={hanldeFile}/>
                </div>

                {/* GIOI TINH */}
                <div>
                    <label>Sex: </label>
                    <select name="sex" value={inputs.sex} onChange={handleInput}>

                                    {/* Duyệt array arr để tạo các option */}
                        {arr.map((value, index) =>{
                            return(
                                <option key={index} value={value.id}>
                                    {value.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                {/* BUTTON */}
                <button type="submit">
                        ĐĂNG KÝ
                </button>
            </form>

        </div>
    )


}export default Register;