<template>
  <div
    class="rounded-xl border-2 border-yellow-400 p-10 bg-gray-50 text-center overflow-hidden"
  >
    <h3
      class="-m-10 py-4 px-10 bg-yellow-400 mb-10 font-main text-[#501111] text-xl"
    >
      PRECIO
    </h3>
    <div class="mt-4 flex-row">
      <h4 class="mb-6 text-xl">Precio actual: {{ price }} USD</h4>
      <h5 class="mb-6">Ingresar precio en dolares:</h5>
      <input
        v-model="newPrice"
        type="number"
        class="text-center py-2 border-2 rounded-3xl border-yellow-400"
      /><br />
      <button
        class="bg-[#501111] rounded-3xl px-4 mt-4 py-2 text-white hover:text-yellow-400"
        @click="changePrice"
      >
        CAMBIAR PRECIO
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPrice: NaN,
    }
  },
  computed: {
    price() {
      return this.$store.state.price
    },
  },
  methods: {
    changePrice() {
      const db = this.$fireModule.firestore()
      db.collection('adminData')
        .doc('stock')
        .update({
          price: parseFloat(this.newPrice),
        })
      this.$store.commit('changePrice', this.newPrice)
      this.newPrice = NaN
    },
  },
}
</script>

<style></style>
