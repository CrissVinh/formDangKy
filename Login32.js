import { useState } from "react";
import Error32 from "./Error32";

function Login32(){

    const [inputs, setInputs] = useState({  //LƯU DỮ LIỆU FORM LOGIN
        email: "",
        pass: ""
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {    //XỬ LÝ CHUNG CHO CÁC INPUT
        const nameInput = e.target.name;
        const value = e.target.value;

        setInputs(state => ({
            ...state,
            [nameInput]: value
        }))
                    // Nếu người dùng nhập dữ liệu
                // thì xóa thông báo lỗi của input đó

        if(value.trim() != ""){
            setErrors(state =>({
                ...state,
                [nameInput]: ""
            }));
        }


                    // Xóa thông báo sai tài khoản khi người dùng nhập lại
        setErrors(state =>({
            ...state,
            login: ""
        }))
    }
    


    //XỬ LÝ KHI NHẤN LOGIN
    function handleSubmit(e){
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        //KIỂM TRA EMAIL
        if(inputs.email.trim() == ""){
            errorsSubmit.email = " vui long nhap email";
            flag = false;
        }else{
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regexEmail.test(inputs.email)){
                errorsSubmit.email = "email khong dung dinh dang";
                flag = false;
            }    
        }
        //KIỂM TRA PASSWORD
        if(inputs.pass.trim() == ""){
            errorsSubmit.pass = "vui long nhap password";
            flag = false;
        }

        //KIỂM TRA THÔNG TIN ĐĂNG NHẬP
        if(flag){
            const emailRegister = localStorage.getItem("dang ky Email")
            const passRegister  = localStorage.getItem("dang ky Password")

                            // So sánh thông tin Login với Register
                            // === kiểm tra cả giá trị và kiểu dữ liệu
            if(
                inputs.email === emailRegister &&
                inputs.pass === passRegister
            ){
                alert("dang nhap thanh cong");
            }else{
                errorsSubmit.login = "Email hoac Pass khong dung";  
                flag = false;
            }
        }
        //CẬP NHẬT THÔNG BÁO LỖI
        setErrors(errorsSubmit);
    }
    return( // GIAO DIỆN LOGIN
        <div>
            <h2>ĐĂNG NHẬP</h2>

            <Error32 errors ={errors}/>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>Email: </label>

                    <input type="email" name="email" placeholder=" nhap Email" onChange={handleInput}/>
                </div>

                <div>
                    <label>Password: </label>
                    <input type="password" name="pass" placeholder="nhap Password" onChange={handleInput}/>
                </div>

                <button type="submit">ĐĂNG NHẬP</button>
            </form> 
        </div>
    )
}export default Login32;