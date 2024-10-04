<template>
    <div id="filter-component" class="w-64 p-4 bg-white rounded-lg shadow-md">
        <p class="text-lg font-bold mb-4">Filter:</p>

        <div class="mb-6">
            <p class="text-md font-semibold mb-2">Price Range</p>
            <input type="range" class="w-full accent-[#23A6F0]" />
            <div class="flex justify-between mt-2">
                <input type="number" id="min-price" placeholder="Min" class="border border-gray-300 p-2 rounded w-24 outline-[#23A6F0]" />
                <input type="number" id="max-price" placeholder="Max" class="border border-gray-300 p-2 rounded w-24 outline-[#23A6F0]" />
            </div>
            <button class="mt-3 bg-[#23A6F0] text-white py-2 px-4 rounded hover:bg-blue-500 w-full">
                Apply
            </button>
        </div>

        <hr class="my-4" />

        <div class="mb-6">
            <p class="text-md font-semibold mb-2">Categories</p>
            <div class="space-y-2">
                <div>
                    <input type="radio" name="category" id="cat1" class="mr-2" />
                    <label for="cat1">Category 1</label>
                </div>
                <div>
                    <input type="radio" name="category" id="cat2" class="mr-2" />
                    <label for="cat2">Category 2</label>
                </div>
            </div>
        </div>

        <hr class="my-4" />

        <div class="mb-6">
            <p class="text-md font-semibold mb-2">Brands</p>
            <div class="space-y-2">
                <div>
                    <input type="radio" name="brand" id="brand1" class="mr-2" />
                    <label for="brand1">Brand 1</label>
                </div>
                <div>
                    <input type="radio" name="brand" id="brand2" class="mr-2" />
                    <label for="brand2">Brand 2</label>
                </div>
            </div>
        </div>

        <hr class="my-4" />

        <div>
            <p class="text-md font-semibold mb-2">Colors</p>
            <div class="space-y-2">
                <div>
                    <input type="radio" name="color" id="color1" class="mr-2" />
                    <label for="color1" class="text-[red]">Red</label>
                </div>
                <div>
                    <input type="radio" name="color" id="color2" class="mr-2" />
                    <label for="color2" class="text-[blue]">Blue</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterComponent",
};
</script>
