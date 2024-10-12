<template>
  <form @submit.prevent="loginUser(email, password)">
    <div class="flex justify-center pt-5">
      <div class="container bg-[#FAFAFA] rounded-lg">
        <div class="flex justify-center gap-5 p-4 flex-col lg:flex-row">
          <div class="flex flex-col gap-6 w-full p-2 justify-center">
            <p class="text-center font-bold text-xl">Login</p>
            <div
              id="input-section-for-login"
              class="items-center flex flex-col gap-4"
            >
              <div class="flex flex-col w-full">
                <label for="email" class="text-sm text-[#333333] font-bold"
                  >Email</label
                >
                <input
                  type="email"
                  :class="{
                    'border-red-400': errors.emailError,
                    'border p-2 outline-[#23A6F0] rounded-md': true,
                  }"
                  v-model="email"
                  id="email"
                />
                <label
                  v-if="errors.emailError"
                  for="email"
                  class="text-xs font-bold text-red-400 pt-1"
                  >{{ errors.emailError }}</label
                >
              </div>
              <div class="flex flex-col w-full">
                <label for="password" class="text-sm text-[#333333] font-bold"
                  >Password</label
                >
                <div class="flex justify-end items-center">
                  <input
                    type="password"
                    :class="{
                      'border p-2 outline-[#23A6F0] rounded-md relative w-full': true,
                      'border-red-400': errors.passwordError,
                    }"
                    v-model="password"
                    id="password"
                  />
                  <i
                    class="bi bi-eye absolute pr-4 cursor-pointer"
                    @click="showPassword"
                  ></i>
                </div>
                <label
                  v-if="errors.passwordError"
                  for="password"
                  class="text-xs font-bold text-red-400 pt-1"
                  >{{ errors.passwordError }}</label
                >
              </div>
            </div>

            <div id="login-btn" class="">
              <button
                class="p-2 w-full bg-[#23A6F0] text-white rounded-md hover:bg-[#3d96cd]"
              >
                Login
              </button>
            </div>
          </div>
          <div class="flex justify-center">
            <img
              src="../../assets/loginPage/josh-sorenson-P_K20Fdu7ZQ-unsplash.jpg"
              alt=""
              class="w-[616px] h-[816px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { auth } from "@/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "LoginPage",
  data() {
    return {
      errors: {
        emailError: null,
        passwordError: null,
      },
      email: null,
      password: null,
      hasError: false,
    };
  },
  methods: {
    async loginUser() {
      this.hasError = false;
      this.errors = {
        emailError: null,
        passwordError: null,
      };
      if (!this.email) {
        this.hasError = true;
        this.errors.emailError = "Email boş olamaz";
      }
      if (!this.password) {
        this.hasError = true;
        this.errors.passwordError = "Şifre boş olamaz";
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        console.log("Giriş başarılı", userCredential.user);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
    showPassword() {
      const passwordEl = document.getElementById("password");
      if (passwordEl.type == "password") {
        passwordEl.type = "text";
      } else {
        passwordEl.type = "password";
      }
    },
  },
};
</script>
