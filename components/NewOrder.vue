<template>
  <div
    class="rounded-xl border-2 border-yellow-400 p-10 md:w-[30vw] bg-gray-50 text-center overflow-hidden sm:w-[80vw] sm:mx-auto"
  >
    <h3
      class="-m-10 py-4 px-10 bg-yellow-400 mb-10 font-main text-[#501111] text-xl"
    >
      NUEVO PEDIDO
    </h3>
    <div class="mt-4 flex-row">
      <p class="mb-2">Cantidad de comidas que desea (0.5kg c/u)</p>
      <input
        v-model="pedido.cantidad"
        type="number"
        class="text-center py-2 border-2 rounded-3xl border-yellow-400"
      />
      <h4 class="text-xl mt-4">{{ kilos }} Kg</h4>
      <div class="border-t-2 border-yellow-400 my-6 py-2">
        <h4 class="text-xl mb-2">Total:</h4>
        <h5 class="text-md">{{ total }} USD</h5>
        <h5 class="text-md">{{ totalBolivares }} BsF</h5>
      </div>
      <div class="p-4">
        <input
          v-model="pedido.pickup"
          class="appearance-none border-2 h-6 w-6 border-yellow-400 rounded-3xl bg-white checked:bg-yellow-400 cursor-pointer"
          type="checkbox"
        />
        <label class="text-xl ml-2"> Pickup </label>
      </div>
      <button
        class="bg-[#501111] rounded-3xl px-4 mt-4 py-2 text-white hover:text-yellow-400"
        @click="addPedido"
      >
        HACER PEDIDO
      </button>
    </div>
    <div class="border-t-2 border-yellow-400 mt-6 pt-4">
      <h4 class="text-xl mb-2">Precio por Kilo: {{ precio }} USD</h4>
      <p class="text-sm">Cambio Dolar: {{ dolar }} BsF</p>
      <p class="text-sm">{{ fecha }}</p>
    </div>
  </div>
</template>

<script>
import pedidoTemp from '../static/pedido.js'
export default {
  data() {
    return {
      pedido: { ...pedidoTemp },
      dolar: NaN,
      fecha: new Date(),
    }
  },
  computed: {
    precio() {
      return this.$store.state.price
    },
    kilos() {
      return this.pedido.cantidad / 2
    },
    total() {
      return this.precio * this.kilos
    },
    totalBolivares() {
      return Math.round(this.total * this.dolar * 100) / 100
    },
    user(){
      return this.$store.state.user
    }
  },
  mounted() {
    try {
      this.$axios
        .get('https://s3.amazonaws.com/dolartoday/data.json')
        .then((res) => {
          this.dolar = res.data.USD.promedio
          this.fecha = res.data._timestamp.fecha
        })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  methods: {
    addPedido() {
      if ((this.pedido.cantidad % 1 === 0) === false) {
        alert('Ingresa un numero entero')
      } else if (this.pedido.cantidad < 1) {
        alert('Ingresa un numero mayor a 0')
      } else {
        this.pedido.cantidad = parseInt(this.pedido.cantidad)
        const db = this.$fireModule.firestore()
        const clienteTemp = this.$store.state.user
        this.pedido.fecha = new Date()
        this.pedido.cliente = db.doc(`users/${clienteTemp.id}`)
        this.pedido.dolares = this.total
        this.pedido.bolivares = this.totalBolivares
        db.collection('pedidos')
          .add(this.pedido)
          .then(() => {
            this.pedido = { ...pedidoTemp }
          })
        this.$store.commit('addSold', this.pedido.cantidad)
        const adminData = db.collection('adminData').doc('stock')
        adminData.update({
          vendidas: this.$store.state.sold,
        })
        this.$emit('confirm', this.pedido)
        let messageBody = ''
        if(this.pedido.pickup === true){
          messageBody = `NATUPETS\n\nTu pedido de ${this.pedido.cantidad} comidas ha sido recibido.\n\nMonto a cancelar es de ${this.pedido.dolares} USD,\n\nCuando su pedido este listo para ser recogido recibirá otro mensaje.\n\n ¡Gracias por su compra!.\n\n${this.pedido.fecha}`
        }
        if(this.pedido.pickup === false){
          messageBody = `NATUPETS\n\nTu pedido de ${this.pedido.cantidad} comidas ha sido recibido.\n\nMonto a cancelar es de ${this.pedido.dolares} USD,\n\nCuando su pedido este listo para ser enviado recibirá otro mensaje.\n\n ¡Gracias por su compra!.\n\n${this.pedido.fecha}`
        }
        db.collection('messages').add({
          to: `whatsapp:${this.user.telefono}`,
          body: messageBody,
        })
      }
    },
  },
}
</script>

<style></style>
