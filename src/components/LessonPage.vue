<template>
  <main>
    <div style="display: flex; justify-content: start; flex-wrap: wrap">
      <div id="item-container" v-for="product in products" :key="product.id">
        <h2>{{ product.subject }}</h2>
        <figure><img v-bind:src="product.image" /></figure>
        <p v-html="product.location"></p>
        <p>Price: {{ product.price }}</p>
        <p>Available spaces: {{ product.spaces }}</p>
        <button v-if="canAdd(product)" @click="addProduct(product)">
          Add to cart
        </button>
        <button v-else disabled @click="addProduct(product)">
          Add to cart
        </button>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "LessonPage",
    props: ["products"],

    methods: {
      addProduct(product) {
        this.$emit("addProduct", product);
      },
      canAdd(product) {
        return product.spaces > 0;
      },
    },
  };
</script>
<style>
  img {
    width: 200px;
    height: 200px;
  }
  #item-container {
    border: 3px grey solid;
    border-radius: 10px;
    width: fit-content;
    margin: 20px;
    padding: 20px;
  }
</style>
