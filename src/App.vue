<template>
  <div id="app">
    <button @click="showCheckout">{{ this.cart.length }} Checkout</button>
    <lesson-list @addProduct="addToCart"></lesson-list>
    <checkout :cart="cart"></checkout>
  </div>
</template>

<script>
  import LessonList from "./components/LessonPage.vue";
  import Checkout from "./components/CheckoutPage.vue";

  export default {
    name: "App",
    components: {
      LessonList,
      Checkout,
    },
    data() {
      return { sitename: "Vue.js Pet Depot", cart: [], lessons: [] };
    },
    created: function () {
      fetch("http://localhost:5000/lessons").then((res) => {
        res.json().then((json) => {
          this.lessons = json;
        });
      });
    },
    methods: {
      showCheckout() {},
      addToCart(product) {
        console.log(`Added ${product.title} to cart`);
        this.cart.push(product);
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
