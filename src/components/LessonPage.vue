<template>
  <main>
    <div v-for="product in products" :key="product.id">
      <h2>{{ product.subject }}</h2>
      <figure><img v-bind:src="product.image" /></figure>
      <p v-html="product.location"></p>
      <p>Price: {{ product.price }}</p>
      <p>Available spaces: {{ product.spaces }}</p>
      <button @click="addProduct(product)">Add to cart</button>
    </div>
  </main>
</template>

<script>
  export default {
    name: "LessonPage",
    props: ["lessons"],
    data() {
      return {
        products: [],
      };
    },

    methods: {
      addProduct(product) {
        this.$emit("addProduct", product);
      },
      canAdd(product) {
        return product.spaces;
      },
    },
  };
</script>
<style></style>
