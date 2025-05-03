<template>
  <div class="p-6 border rounded-md shadow-md max-w-md mx-auto space-y-4">
    <h2 class="text-xl font-bold">Kategori Ekle</h2>

    <input
      v-model="isim"
      type="text"
      placeholder="Kategori İsmi"
      class="w-full p-2 border rounded"
    />

    <select v-model="parentId" class="w-full p-2 border rounded">
      <option value="">Ana Kategori (parent yok)</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.fullPath.join(" > ") }}
      </option>
    </select>

    <button
      @click="handleAddCategory"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Ekle
    </button>

    <div v-if="successMessage" class="text-green-600">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase"; // Firebase ayarlarının yapıldığı dosya
import { collection, addDoc, getDocs } from "firebase/firestore";

const isim = ref("");
const parentId = ref("");
const categories = ref([]);
const successMessage = ref("");

const fetchCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "kategoriler"));
  categories.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

onMounted(fetchCategories);

const handleAddCategory = async () => {
  if (!isim.value.trim()) return;

  const parentCategory = categories.value.find(
    (cat) => cat.id === parentId.value
  );
  const fullPath = parentCategory
    ? [...parentCategory.fullPath, isim.value]
    : [isim.value];

  const newCategory = {
    isim: isim.value,
    parentId: parentId.value || null,
    fullPath,
  };

  await addDoc(collection(db, "kategoriler"), newCategory);
  successMessage.value = "Kategori eklendi!";
  isim.value = "";
  parentId.value = "";
  fetchCategories(); // Listeyi güncelle
};
</script>
