import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {

const [user, setUser] = useState({ Email: "", Password: "" });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { ...user });
      localStorage.setItem("UserID", res.data.accessToken);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <section class="section">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
          <div class="card card-primary">
            <div class="pt-3 text-center"><h5>ĐĂNG NHẬP QUẢN TRỊ</h5></div>

            <div class="card-body">
              <form onSubmit={handleSubmit} class="needs-validation" novalidate="">
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input id="email" type="email" class="form-control" name="Email" tabindex="1" required autofocus onChange={onChangeInput}/>
                  <div class="invalid-feedback">
                    Please fill in your email
                  </div>
                </div>

                <div class="form-group">
                  <div class="d-block">
                      <label for="password" class="control-label">Mật khẩu:</label>
                    <div class="float-right">
                      <a href="#" class="text-small">
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>
                  <input id="password" type="password" class="form-control" name="Password" tabindex="2" required onChange={onChangeInput}/>
                  <div class="invalid-feedback">
                    please fill in your password
                  </div>
                </div>

                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="remember" class="custom-control-input" tabindex="3" id="remember-me"/>
                    <label class="custom-control-label" for="remember-me">Ghi nhớ đăng nhập</label>
                  </div>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
