<template>
  <main>
    <div v-for="product in products" :key="product.id">
      <h2>{{ product.title }}</h2>
      <figure><img v-bind:src="product.image" /></figure>
      <p v-html="product.description"></p>
      <p>Price: {{ product.price }}</p>
      <p>Available stock: {{ product.availableInventory }}</p>
      <button @click="addProduct(product)">Add to cart</button>
    </div>
  </main>
</template>

<script>
  export default {
    name: "LessonPage",
    data() {
      return {
        products: [
          {
            id: 1,
            title: "Dog",
            image: "dog.png",
            price: "100",
            availableInventory: "50",
          },
          {
            id: 2,
            title: "Weed",
            image: "weed.png",
            price: "10",
            availableInventory: "100",
          },
        ],
      };
    },
    methods: {
      addProduct(product) {
        this.$emit("addProduct", product);
      },
    },
  };
</script>
<style></style>
