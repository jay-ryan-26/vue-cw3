<template>
  <div id="app">
    <h1 class="c-align">{{ sitename }}</h1>
    <button id="checkout-btn" @click="showCheckout">
      {{ this.cart.length }} Checkout
    </button>
    <div style="margin-top: 20px">
      <div v-if="showLessons">
        <span>
          <input type="text" v-model="search" placeholder="Search title.." />
        </span>
        <div style="margin: 10px 40% 10px 0px">
          <div>
            <h3>Sort By</h3>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="sort"
                id="radioLocation"
                value="location"
                v-model="sorting" />
              <label class="form-check-label" for="radioLocation"
                >Location</label
              >
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="sort"
                id="radioPrice"
                value="price"
                v-model="sorting" />
              <label class="form-check-label" for="radioPrice">Price</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="sort"
                id="radioSpace"
                value="spaces"
                v-model="sorting" />
              <label class="form-check-label" for="radioSpace">Spaces</label>
            </div>
            <div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="sort"
                  id="radioSubject"
                  value="subject"
                  v-model="sorting" />
                <label class="form-check-label" for="radioSubject"
                  >Subject</label
                >
              </div>
              <div>
                <h4>Direction</h4>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sortD"
                    id="asc"
                    value="asc"
                    v-model="sortDir" />
                  <label class="form-check-label" for="radioSubject"
                    >Ascending</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sortD"
                    id="desc"
                    value="desc"
                    v-model="sortDir" />
                  <label class="form-check-label" for="radioSubject"
                    >Descending</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <lesson-list
          :products="searchFilter"
          @addProduct="addToCart"></lesson-list>
      </div>
      <checkout v-else :cart="cart"></checkout>
    </div>
  </div>
</template>

<script>
  const Port = 3000;
  import LessonList from "./components/LessonPage.vue";
  import Checkout from "./components/CheckoutPage.vue";

  export default {
    name: "App",
    components: {
      LessonList,
      Checkout,
    },
    data() {
      return {
        sitename: "AfterSchool Activites",
        cart: [],
        lessons: [],
        showLessons: true,
        sorting: "price",
        sortDir: "asc",
        search: "",
      };
    },
    mounted() {
      fetch(`http://localhost:${Port}/lessons`).then((res) => {
        res.json().then((json) => {
          this.lessons = json;
        });
      });
    },
    methods: {
      showCheckout() {
        if (this.cart.length === 0) {
          this.showLessons = true;
          alert("To access the checkout page,\nAdd items to your cart");
        } else {
          this.showLessons = this.showLessons ? false : true;
        }
        console.log(this.showLessons);
        return this.showLessons;
      },
      addToCart(product) {
        console.log(`Added ${product.subject} to cart`);
        this.cart.push(product);
        product.spaces -= 1;
      },
      removeFromCart(product) {
        //increase the spaces by one on the main page
        product.spaces += 1;
        for (let i = 0; i <= this.cart.length; i++) {
          if (this.cart[i].id === product.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      },
      compare(a, b) {
        if (
          (this.sorting === "subject" && a.subject > b.subject) ||
          (this.sorting === "location" && a.location > b.location)
        ) {
          return 1;
        }
        if (
          (this.sorting === "subject" && a.subject < b.subject) ||
          (this.sorting === "location" && a.location < b.location)
        ) {
          return -1;
        }
        return 0;
      },
    },
    computed: {
      sortedLessons() {
        let lessonsArray = this.lessons.slice(0);

        // sorting price
        if (this.sorting === "price") {
          return this.sortDir === "asc"
            ? lessonsArray.sort((a, b) => {
                return a.price - b.price;
              })
            : lessonsArray.sort((a, b) => {
                return b.price - a.price;
              });
        }
        // sorting spaces
        if (this.sorting === "spaces") {
          return this.sortDir === "asc"
            ? lessonsArray.sort((a, b) => {
                return a.spaces - b.spaces;
              })
            : lessonsArray.sort((a, b) => {
                return b.spaces - a.spaces;
              });
        }

        // sorting subject or location
        if (
          (this.sorting === "subject" || this.sorting === "location") &&
          this.sortDir === "asc"
        ) {
          return lessonsArray.sort(this.compare);
        } else {
          lessonsArray.sort(this.compare);
          return lessonsArray.reverse();
        }
      },
      searchFilter() {
        return this.sortedLessons.filter((product) => {
          return product.subject
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    margin-top: 60px;
  }
  .c-align {
    text-align: center;
  }
  button {
    height: 30px;
    width: 100px;
    font-size: 15px;
  }
  #checkout-btn {
    width: 150px !important;
  }
</style>
