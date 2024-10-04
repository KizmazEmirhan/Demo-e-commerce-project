<template>
  <div class="flex justify-center">
    <div class="container grid grid-cols-2 gap-4">
      <div class="flex flex-grow items-center justify-center text-center">
        <div
          :style="isDragging && 'border-color:green;'"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
          :class="{
            'bg-[#FAFAFA] border border-[#e2e8f0] h-full flex items-center justify-center w-full flex-col': true,
            'border-red-500': hasError && files.length === 0,
          }"
        >
          <input
            type="file"
            multiple
            name="file"
            id="imageInput"
            @change="onChange"
            ref="file"
            accept=".jpg,.jpeg,.png"
            class="opacity-0 overflow-hidden absolute w-[1px] h-[1px]"
          />
          <label
            for="imageInput"
            id="file-label"
            class="block cursor-pointer text-[20px] p-4"
          >
            <span v-if="hasError && files.length === 0">{{ errors.file }}</span>
            <div v-if="files.length !== 0 || !hasError">
              <div v-if="isDragging">Release to drop files here</div>
              <div v-else>Drop files here or <u>click here</u> to upload</div>
            </div>
          </label>

          <div v-if="files.length" class="flex flex-wrap gap-2 w-full p-2">
            <div
              v-for="(file, index) in files"
              :key="file.name"
              class="flex border gap-2 border-[#a2a2a2] p-1 w-full justify-between"
            >
              <div class="flex gap-2 items-center">
                <img
                  :src="generateURL(file)"
                  alt=""
                  class="border bg-[#a2a2a2] w-10 h-10 rounded-md"
                />
                <div>
                  <p>{{ file.name }}</p>
                </div>
              </div>
              <button @click="remove(index)" title="Remove File">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="text-inputs" class="flex flex-col gap-4">
        <form @submit.prevent="submitProduct" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="brand">Brand</label>
            <input
              type="text"
              v-model="brand"
              id="brand"
              :class="{ 'border-red-500': hasError && !brand }"
              class="border outline-[#23ABF0]"
            />
            <span v-if="hasError && !brand" class="text-red-500">{{
              errors.brand
            }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <label for="exp">Explanation</label>
            <textarea
              v-model="description"
              id="exp"
              :class="{ 'border-red-500': hasError && !description }"
              class="border outline-[#23ABF0]"
            ></textarea>
            <span v-if="hasError && !description" class="text-red-500">{{
              errors.desc
            }}</span>
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col w-full gap-1">
              <label for="gender">Gender</label>
              <select
                v-model="gender"
                id="gender"
                :class="{ 'border-red-500': hasError && !gender }"
                class="border p-2 outline-[#23a6e0]"
              >
                <option value="" disabled selected hidden>Select Gender</option>
                <option value="Male" class="flex items-center">Erkek</option>
                <option value="Female" class="flex items-center">Kadın</option>
              </select>
              <span v-if="hasError && !gender" class="text-red-500">{{
                errors.gender
              }}</span>
            </div>
            <div class="flex flex-col gap-1 w-full">
              <label for="price">Price</label>
              <input
                type="number"
                v-model="price"
                id="price"
                :class="{ 'border-red-500': hasError && !price }"
                class="border outline-[#23ABF0] h-full"
              />
              <span v-if="hasError && !price" class="text-red-500">{{
                errors.price
              }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label for="color">Color</label>
            <input
              type="text"
              v-model="color"
              id="color"
              :class="{ 'border-red-500': hasError && !color }"
              class="border outline-[#23ABF0]"
            />
            <span v-if="hasError && !color" class="text-red-500">{{
              errors.color
            }}</span>
          </div>

          <button
            type="submit"
            class="border bg-[#23a6e0] rounded text-white p-2 hover:bg-[#2687b0]"
          >
            Ürünü ekle
          </button>
        </form>
      </div>

      <div
        v-if="message"
        :class="{
          'bg-green-100 border-green-500': !isError,
          'bg-red-100 border-red-500': isError,
        }"
        class="border-l-4 p-4 my-4"
      >
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  data() {
    return {
      brand: "",
      description: "",
      gender: "",
      color: "",
      price: null,
      isDragging: false,
      files: [],
      hasError: false,
      errors: {
        brand: "",
        desc: "",
        price: "",
        file: "",
        color: "",
        gender: "",
      },
      message: null,
      isError: false,
    };
  },
  methods: {
    onChange() {
      this.files.push(...this.$refs.file.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },

    async submitProduct() {
      this.hasError = false;
      this.errors = {
        brand: "",
        desc: "",
        price: "",
        file: "",
        color: "",
        gender: "",
      };
      if (
        !this.brand ||
        !this.description ||
        !this.gender ||
        !this.price ||
        !this.color ||
        this.files.length === 0
      ) {
        this.hasError = true;
        if (!this.brand) this.errors.brand = "Brand alanı boş olamaz!";
        if (!this.description)
          this.errors.desc = "Explanation alanı boş olamaz!";
        if (!this.gender) this.errors.gender = "Gender seçilmelidir!";
        if (!this.price) this.errors.price = "Price alanı boş olamaz!";
        if (!this.color) this.errors.color = "Color alanı boş olamaz!";
        if (this.files.length === 0)
          this.errors.file = "En az bir resim ekleyin!";
        return;
      }
      try {
        const uploadPromises = this.files.map(async (file) => {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        });

        const imageUrls = await Promise.all(uploadPromises);

        await addDoc(collection(db, "products"), {
          brand: this.brand,
          description: this.description,
          gender: this.gender,
          color: this.color,
          price: this.price,
          images: imageUrls,
        });

        this.message = "Ürün başarıyla yüklendi!";
        this.isError = false;
        this.clearMessage();
      } catch (error) {
        console.error("Hata:", error);
        this.message = "Ürün yüklenirken hata oluştu.";
        this.isError = true;
      }
    },
    clearMessage() {
      setTimeout(() => {
        this.message = null;
        this.hasError = false;
      }, 3000);
    },
  },
};
</script>

<style>
.border-red-500 {
  border-color: red;
}

.bg-red-100 {
  background-color: #fee2e2;
}

.bg-green-100 {
  background-color: #d1fae5;
}

.border-l-4 {
  border-left-width: 4px;
}
</style>
