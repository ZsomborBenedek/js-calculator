<template>
  <div class="calculator">
    <div class="display">{{ display }}</div>
    <div v-on:click="load" class="btn darker">M-</div>
    <div v-on:click="save" class="btn darker">M+</div>
    <div v-on:click="clr" class="btn darker">C</div>
    <div v-on:click="div" class="btn operand">÷</div>
    <div v-on:click="input(7)" class="btn">7</div>
    <div v-on:click="input(8)" class="btn">8</div>
    <div v-on:click="input(9)" class="btn">9</div>
    <div v-on:click="mul" class="btn operand">x</div>
    <div v-on:click="input(4)" class="btn">4</div>
    <div v-on:click="input(5)" class="btn">5</div>
    <div v-on:click="input(6)" class="btn">6</div>
    <div v-on:click="sub" class="btn operand">-</div>
    <div v-on:click="input(1)" class="btn">1</div>
    <div v-on:click="input(2)" class="btn">2</div>
    <div v-on:click="input(3)" class="btn">3</div>
    <div v-on:click="add" class="btn operand">+</div>
    <div v-on:click="input(0)" class="btn zero">0</div>
    <div v-on:click="dec" class="btn darker">.</div>
    <div v-on:click="eq" class="btn operand">=</div>
  </div>
</template>

<script>
import memApi from "../api/memoryApi.js";

export default {
  data() {
    return {
      previous: null,
      display: 0,
      operand: null,
      operated: null,
    };
  },
  methods: {
    clr() {
      this.display = 0;
    },
    input(char) {
      if (this.operated) {
        this.operated = false;
        this.display = "";
      }
      this.display === 0
        ? (this.display = char)
        : (this.display = "" + this.display + char);
    },
    dec() {
      if (!this.display.toString().includes(".")) this.input(".");
    },
    add() {
      this.previous = this.display;
      this.operand = (a, b) => a + b;
      this.operated = true;
    },
    sub() {
      this.previous = this.display;
      this.operand = (a, b) => a - b;
      this.operated = true;
    },
    div() {
      this.previous = this.display;
      this.operand = (a, b) => a / b;
      this.operated = true;
    },
    mul() {
      this.previous = this.display;
      this.operand = (a, b) => a * b;
      this.operated = true;
    },
    eq() {
      this.display = this.operand(Number(this.previous), Number(this.display));
      this.previous = null;
    },
    async load() {
      this.display = await memApi
        .get("/mem")
        .then(function (response) {
          return response.data.memory;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    save() {
      memApi
        .post("/mem", {
          memory: this.display,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  width: 70vw;
  font-size: 2rem;
  display: grid;
  border: 1px solid rgb(46, 46, 46);
  border-radius: 2rem;
  -moz-border-radius: 2rem;
  -khtml-border-radius: 2rem;
  -webkit-border-radius: 2rem;
  box-shadow: -5px 5px 10px rgba(3, 4, 3, 0.4);
  line-height: 12vh;
  overflow: hidden;
}
.display {
  grid-column: 1 / 5;
  background: #dee4cd91;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  font-size: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  padding: 0 0.8rem;
}
.zero {
  grid-column: 1 / 3;
}
.btn {
  background: rgb(110, 110, 110);
  border: 0.5px solid #111;
  color: aliceblue;
}
.btn:active {
  outline: none;
  border: 0.5px solid #000000;
  box-shadow: inset 0px 5px 5px #00000080;
  -moz-box-shadow: inset 0px 5px 5px #00000080;
  -webkit-box-shadow: inset 0px 5px 5px #00000080;
}
.operand {
  background: rgba(0, 166, 80, 0.865);
}
.darker {
  background: hsl(0, 0%, 70%);
  background: linear-gradient(15deg, hsl(0, 0%, 60%) 0%, hsl(0, 0%, 70%) 100%);
}
@media only screen and (min-width: 768px) {
  .calculator {
    width: 50vw;
  }
}
@media only screen and (min-width: 1080px) {
  .calculator {
    width: 40vw;
  }
}
@media only screen and (min-width: 1200px) {
  .calculator {
    width: 30vw;
  }
}
@media only screen and (min-width: 1600px) {
  .calculator {
    width: 20vw;
  }
}
</style>
