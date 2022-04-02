<template>
  <div
    class="rounded-xl border-2 border-yellow-400 p-10 bg-gray-50 text-center overflow-hidden"
  >
    <h3
      class="-m-10 py-4 px-10 bg-yellow-400 mb-10 font-main text-[#501111] text-xl"
    >
      {{ titulo }}
    </h3>

    <button v-if="opened == false" @click="opened = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </button>
    <button v-if="opened == true" class="mb-6" @click="opened = false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </button>
    <p v-if="pedidos.length == 0 && opened == true">No hay ningún pedido</p>
    <ul v-if="opened == true">
      <li
        v-for="(pedido, index) in pedidos"
        :key="index"
        class="border-2 rounded-2xl border-[#501111] text-left p-4 overflow-hidden mb-10"
      >
        <div class="-mt-4 bg-[#501111] -mx-4 text-white pl-4 py-2">
          <h4 class="font-main text-2xl">{{ pedido.cliente.nombre }}</h4>
          <p>
            {{ pedido.cliente.telefono }}
          </p>
        </div>
        <h4 class="text-xl mt-4">{{ pedido.cantidad }} Comidas</h4>
        <h4 class="text-md mt-4">
          {{ pedido.dolares }} USD - {{ pedido.bolivares }} BsF
        </h4>
        <p class="mb-4">Pedido hecho el {{ pedido.fecha }}</p>
        <button
          v-if="!pedido.entregado && !pedido.cancelado"
          class="bg-red-500 rounded px-4 py-2 mb-4 text-white hover:text-[#501111]"
          @click="cancelarPedido(pedido)"
        >
          Cancelar Pedido
        </button>
        <p v-if="pedido.entregado" class="text-green-500">
          Entregado el {{ pedido.fechaEntrega }}
        </p>
        <p v-if="pedido.pagado" class="text-yellow-500">
          Pagado el {{ pedido.fechaPago }}
        </p>
        <p v-if="pedido.cancelado" class="text-red-500">
          Cancelado el {{ pedido.fechaCancelado }}
        </p>
        <div
          v-show="pedido.pickup"
          class="mt-2 -mb-4 bg-[#501111] -mx-4 font-main text-white pl-4 py-2"
        >
          <h4 class="flex row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Pickup
          </h4>
        </div>
        <div
          v-show="!pedido.pickup"
          class="mt-2 -mb-4 bg-[#501111] -mx-4 font-main text-white px-4 py-2"
        >
          <h4 class="flex row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
            Delivery
          </h4>
          <p class="text-xs">{{ pedido.cliente.direccion }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pedidos: {
      type: Array,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    entregarPedido(pedido) {
      const db = this.$fireModule.firestore()
      const pedidoRef = db.collection('pedidos').doc(pedido.id)
      pedidoRef.update({
        entregado: true,
        fechaEntrega: new Date(),
      })
      this.$store.commit('sell', pedido.cantidad)
      const adminData = db.collection('adminData').doc('stock')
      adminData.update({
        disponibles: this.$store.state.stock,
        vendidas: this.$store.state.sold,
      })
    },
    pagado(pedido) {
      const db = this.$fireModule.firestore()
      const pedidoRef = db.collection('pedidos').doc(pedido.id)
      pedidoRef.update({
        pagado: true,
        fechaPago: new Date(),
      })
    },
    cancelarPedido(pedido) {
      const db = this.$fireModule.firestore()
      const pedidoRef = db.collection('pedidos').doc(pedido.id)
      pedidoRef.update({
        cancelado: !pedido.cancelado,
        fechaCancelado: new Date(),
      })
      this.$store.commit('cancelar', pedido.cantidad)
      const adminData = db.collection('adminData').doc('stock')
      adminData.update({
        vendidas: this.$store.state.sold,
      })
    },
  },
}
</script>

<style></style>
