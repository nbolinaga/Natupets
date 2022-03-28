<template>
  <div
    class="rounded-xl border-2 border-yellow-400 p-10  bg-gray-50 text-center overflow-hidden"
  >
    <h3
      class="-m-10 py-4 px-10 bg-yellow-400 mb-10 font-main text-[#501111] text-xl"
    >
      POR VERIFICAR
    </h3>
    <p v-if="porVerificar.length == 0">No hay nadie por verificar</p>
    <ul>
      <li
        v-for="(user, index) in porVerificar"
        :key="index"
        class="border-2 rounded-2xl border-[#501111] text-left p-4 overflow-hidden mb-10"
      >
        <div class="-mt-4 bg-[#501111] -mx-4 text-white pl-4 py-2 mb-4">
          <h4 class="font-main text-2xl">{{ user.nombre }}</h4>
        </div>
        <p>Telefono: {{ user.telefono }}</p>
        <p>Direccion: {{ user.direccion }}</p>
        <button
          class="bg-green-500 rounded px-4 py-2 my-4 text-white hover:text-[#501111]"
          @click="verify(user)"
        >
          Aceptar
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    }
  },
  computed: {
    porVerificar() {
      return this.users.filter((user) => user.verificado === false)
    },
  },
  beforeMount() {
    const db = this.$fireModule.firestore()
    const query = db.collection('users')
    query.onSnapshot((snapshot) => {
      this.users = []
      snapshot.forEach((res) => {
        const user = { ...res.data() }
        this.users.push(user)
      })
    })
  },
  methods: {
    verify(user) {
      const db = this.$fireModule.firestore()
      db.collection('users').doc(user.id).update({
        verificado: true,
      })
    },
  },
}
</script>

<style></style>
