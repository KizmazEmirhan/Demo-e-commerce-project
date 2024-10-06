<template>
  <form @submit.prevent="loginUser">
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
                <label for="email" class="text-sm text-[#333333]">Email</label>
                <input
                  type="email"
                  class="border p-2 outline-[#23A6F0] rounded-md"
                  v-model="email"
                  required
                  id="email"
                />
              </div>
              <div class="flex flex-col w-full">
                <label for="password" class="text-sm text-[#333333]"
                  >Password</label
                >
                <input
                  type="password"
                  class="border p-2 outline-[#23A6F0] rounded-md"
                  v-model="password"
                  required
                  id="password"
                />
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
  methods: {
    async loginUser() {
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
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
