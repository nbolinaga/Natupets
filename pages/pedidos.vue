<template>
  <div class="p-10 px-auto w-screen text-center">
    <h2
      v-if="user.verificado == false"
      class="text-center text-2xl font-main text-[#501111]"
    >
      No has sido verificado aun, para ser verificado ingresa tu número y
      dirección en la pagina de
      <nuxt-link to="/perfil" class="text-yellow-400">perfil</nuxt-link>, en
      unos minutos confirmaremos su información.
    </h2>
    <NewOrder
      v-if="user.verificado == true && confirmado == false"
      class="mx-auto mt-10"
      @confirm="confirmOrder"
    />
    <OrderConfirm
      v-if="user.verificado == true && confirmado == true"
      :pedido="pedido"
    />
    <button
      v-if="user.verificado == true && confirmado == true"
      class="bg-green-500 rounded-3xl px-4 mt-4 py-2 text-white hover:text-[#501111]"
      @click="confirmado = false"
    >
      Continuar
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pedido: {},
      confirmado: false,
    }
  },
  computed: {
    user() {
      return { ...this.$store.state.user }
    },
  },
  methods: {
    confirmOrder(pedido) {
      this.pedido = pedido
      this.confirmado = true
    },
  },
}
</script>
