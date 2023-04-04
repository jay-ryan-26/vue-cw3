<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <h2>Checkout</h2>
    <div>
      <h3>USER DETAILS</h3>
      <p>
        <strong> Name </strong><input v-model="name" /><br /><strong>
          Phone </strong
        ><input class="mt-10" v-model="phone" /><br />
        <button class="mt-10" @click="validation(name, phone)">Submit</button>
      </p>
    </div>
    <div class="mt-10">
      <h3>PRINT</h3>
      <p>
        <strong> Name: </strong>
        {{ name }}<br /><strong class="mt-10"> Phone: </strong> {{ phone }}
        <br />
        <button class="mt-10" @click="validation(name, phone)">Submit</button>
      </p>
    </div>
    <h3>Added products</h3>
    <div v-for="(product, index) in cart" :key="index">
      <div id="item-container">
        <h2>{{ product.subject }}</h2>
        <figure><img v-bind:src="product.image" /></figure>
        <p v-html="product.location"></p>
        <p>Price: {{ product.price }}</p>

        <button @click="cart.splice(index, 1)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckoutForm",
    props: ["cart"],
    data() {
      return {
        name: "",
        phone: "",
      };
    },
    methods: {
      validation(word, num) {
        // var phoneRGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!/^[a-zA-Z]/.test(word)) {
          alert("Name needs to contain Letters only");
        } else if (!/^\d+$/.test(num)) {
          alert("Phone needs to contain Numbers only");
        } else {
          alert("Order Placed successfully");
          // eslint-disable-next-line vue/no-mutating-props
          this.cart.splice(0, this.cart.length);
          this.name = "";
          this.phone = "";
          window.location.reload();
        }
      },
    },
  };
</script>

<style>
  .mt-10 {
    margin-top: 10px;
  }
</style>
