<template>
  <form action="">
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
                    type="email"
                    class="border p-2 outline-[#23A6F0] rounded-md"
                    id="Name"
                  />
                </div>
                <div id="surname" class="flex flex-col w-full">
                  <label for="Surname" class="text-sm text-[#333333]"
                    >Surname</label
                  >
                  <input
                    type="email"
                    class="border p-2 outline-[#23A6F0] rounded-md"
                    id="Surname"
                  />
                </div>
              </div>
              <div class="flex w-full gap-4 flex-col md:flex-row">
                <div id="phone" class="flex flex-col w-full">
                  <label for="Phone" class="text-sm text-[#333333]"
                    >Phone</label
                  >
                  <input
                    type="phone"
                    class="border p-2 outline-[#23A6F0] rounded-md"
                    id="Phone"
                  />
                </div>
                <div id="email" class="flex flex-col w-full">
                  <label for="email" class="text-sm text-[#333333]"
                    >Email</label
                  >
                  <input
                    type="email"
                    class="border p-2 outline-[#23A6F0] rounded-md"
                    id="email"
                  />
                </div>
              </div>
              <div id="password" class="flex flex-col w-full">
                <label for="password" class="text-sm text-[#333333]"
                  >Password</label
                >
                <input
                  type="password"
                  class="border p-2 outline-[#23A6F0] rounded-md"
                  id="password"
                />
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
                class="p-2 w-full bg-[#23A6F0] text-white rounded-md hover:bg-[#3d96cd]"
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
export default {
  name: "LoginPage",
};
</script>
