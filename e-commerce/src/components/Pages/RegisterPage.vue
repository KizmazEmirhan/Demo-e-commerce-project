<template>
  <form @submit.prevent="register">
    <div class="flex justify-center pt-5">
      <div class="container bg-[#FAFAFA] rounded-lg">
        <div class="flex justify-center gap-5 p-4 flex-col lg:flex-row">
          <div class="flex flex-col gap-6 w-full p-2 justify-center">
            <p class="text-center font-bold text-xl">Register</p>
            <div
              id="input-section-for-login"
              class="items-center flex flex-col gap-4"
            >
              <div class="flex w-full gap-4 flex-col md:flex-row">
                <div id="name" class="flex flex-col w-full">
                  <label for="Name" class="text-sm text-[#333333]">Name</label>
                  <input
                    type="text"
                    :class="{
                      'border p-2 outline-[#23A6F0] rounded-md': true,
                      'border-red-500': errors.firstName,
                    }"
                    id="Name"
                    v-model="firstName"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-sm">
                    {{ errors.firstName }}
                  </p>
                </div>
                <div id="surname" class="flex flex-col w-full">
                  <label for="Surname" class="text-sm text-[#333333]"
                    >Surname</label
                  >
                  <input
                    type="text"
                    :class="{
                      'border p-2 outline-[#23A6F0] rounded-md': true,
                      'border-red-500': errors.lastName,
                    }"
                    id="Surname"
                    v-model="lastName"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-sm">
                    {{ errors.lastName }}
                  </p>
                </div>
              </div>
              <div class="flex w-full gap-4 flex-col md:flex-row">
                <div id="phone" class="flex flex-col w-full">
                  <label for="Phone" class="text-sm text-[#333333]"
                    >Phone</label
                  >
                  <input
                    type="phone"
                    :class="{
                      'border p-2 outline-[#23A6F0] rounded-md': true,
                      'border-red-500': errors.phone,
                    }"
                    id="Phone"
                    v-model="phone"
                  />
                  <p v-if="errors.phone" class="text-red-500 text-sm">
                    {{ errors.phone }}
                  </p>
                </div>
                <div id="email" class="flex flex-col w-full">
                  <label for="email" class="text-sm text-[#333333]"
                    >Email</label
                  >
                  <input
                    type="email"
                    :class="{
                      'border p-2 outline-[#23A6F0] rounded-md': true,
                      'border-red-500': errors.email,
                    }"
                    id="email"
                    v-model="email"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm">
                    {{ errors.email }}
                  </p>
                </div>
              </div>
              <div id="password" class="flex flex-col w-full">
                <label for="password" class="text-sm text-[#333333]"
                  >Password</label
                >
                <input
                  type="password"
                  :class="{
                    'border p-2 outline-[#23A6F0] rounded-md': true,
                    'border-red-500': errors.password,
                  }"
                  id="password"
                  v-model="password"
                />
                <p v-if="errors.password" class="text-red-500 text-sm">
                  {{ errors.password }}
                </p>
              </div>
              <div id="confirm-password" class="flex flex-col w-full">
                <label for="confirm-password" class="text-sm text-[#333333]"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="border p-2 outline-[#23A6F0] rounded-md"
                  id="confirm-password"
                />
              </div>
            </div>

            <div id="register-btn" class="">
              <button
                type="submit"
                :class="{
                  'p-2 w-full bg-[#23A6F0] text-white rounded-md hover:bg-[#3d96cd]': true,
                  'bg-red-500': hasError,
                }"
              >
                Register
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
import { registerUser } from "@/firebase";
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
      password: null,
      hasError: false,
      errors: {
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        password: null,
      },
    };
  },
  name: "LoginPage",
  methods: {
    async register() {
      this.hasError = false;
      this.errors = {
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        password: null,
      };
      if (!this.firstName) {
        this.errors.firstName = "İsim alanı boş olamaz";
        this.hasError = true;
      }
      if (!this.lastName) {
        this.errors.lastName = "Soyisim alanı boş olamaz";
        this.hasError = true;
      }
      if (!this.phone) {
        this.hasError = true;
        this.errors.phone = "Telefon alanı boş olamaz";
      }
      if (!this.email) {
        this.errors.email = "E-posta alanı boş olamaz";
        this.hasError = true;
      }
      if (!this.password) {
        this.errors.password = "Şifre alanı boş olamaz";
        this.hasError = true;
      }
      await registerUser(
        this.firstName,
        this.lastName,
        this.phone,
        this.email,
        this.password
      );
    },
  },
};
</script>
