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

            <div id="login-btn" class="flex items-center justify-start">
              <div class="absolute" v-if="isLogged">
                <svg
                  class="ml-3 size-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <button
                class="p-2 w-full bg-[#23A6F0] text-white rounded-md hover:bg-[#3d96cd]"
              >
                Login
              </button>
            </div>
            <div
              v-if="generalErrorOccurred"
              id="general_error_section"
              class="bg-[rgba(255,0,0,0.15)] p-2"
            >
              <div for="general_error" class="text-sm text-red-500 pt-1">
                {{ generalError }}
              </div>
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
import { mapActions } from "vuex";
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginPage",
  data() {
    return {
      errors: {
        emailError: null,
        passwordError: null,
      },
      isLogged: false,
      email: null,
      password: null,
      hasError: false,
      generalError: ref(""),
      currentUser: null,
      generalErrorOccurred: false,
    };
  },

  methods: {
    ...mapActions(["loginUser"]),
    async loginUser() {
      //add logging in message to the page and add spin animation to the button
      this.isLogged = true;
      this.hasError = false;
      this.errors = {
        emailError: null,
        passwordError: null,
        generalError: null,
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
        const user = userCredential.user;
        console.log("user credential", userCredential);
        this.$store.dispatch("loginUser", {
          email: user.email,
          isAdmin: user.email === "realadmin.e_commerce@admin.com",
        });

        this.$router.push(this.isAdmin ? "/user/admin" : "/");
      } catch (e) {
        console.log("error", e); //    auth/invalid-credential
        switch (e.code) {
          case "auth/user-not-found":
            this.errors.emailError =
              "Bu e-posta ile kayıtlı bir kullanıcı bulunamadı.";
            break;
          case "auth/wrong-password":
            this.errors.passwordError = "Şifre hatalı. Lütfen tekrar deneyin.";
            break;
          case "auth/invalid-email":
            this.errors.emailError = "Geçersiz e-posta formatı.";
            break;
          case "auth/too-many-requests":
            this.errors.passwordError =
              "Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.";
            break;
          default:
            this.generalErrorOccurred = true;
            this.generalError = "Bir hata oluştu lütfen tekrar deneyin.";

            break;
        }
      } finally {
        this.isLogged = false;
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
