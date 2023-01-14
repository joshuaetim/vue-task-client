<template>
    <section class="steps" id="steps">
        <div class="container">
            <div class="mx-auto col-md-12 col-lg-7">

                <!-- step-1 -->

                <div class="show-section">
                    <section class="steps-inner">
                        <div class="wrapper">
                            <form action="#" method="post">
                                <div class="form-heading">
                                    Login
                                </div>
                                <div class="form-inner">
                                    <div class="form-group">
                                        <input type="text" name="" id="matric" class="form-control" v-model="username" required>
                                        <label for="">Matric Number</label>
                                    </div>
                                    <br>
                                    <div class="form-group">
                                        <input :type="showPassword ? `text` : `password`" name="pass" id="" class="form-control" v-model="password" required>
                                        <label for="">Password</label>
                                        
                                    </div>
                                    <br/>
                                    <div class="form-check">
  <input class="form-check-input" type="checkbox" v-model="showPassword"  id="show_password">
  <label class="form-check-label" for="show_password">
    Show Password
  </label>
</div>
                                    <br>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-primary" @click="loginUser">Login <i class="fa-solid fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: 'csc/2014/99',
                password: 'pass',
                showPassword: false,
            }
        },
        mounted() {
            document.title = "Login"
        },
        methods: {
            async loginUser(e) {
                const data = {
                    matric: this.username,
                    password: this.password,
                }
                if (data.matric == "" || data.password == "") {
                    return
                }
                const responseRaw = await fetch(process.env.VUE_APP_ROOT_URL + "/auth/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                    body: JSON.stringify(data)
                });
                const responseJson = await responseRaw.json()
                // console.log(responseJson.data)
                const result = responseJson.data
                localStorage.setItem("token", responseJson.token)
                window.location.href = "/"
                // console.log(responseJson.token)
            }
        },
    }
</script>