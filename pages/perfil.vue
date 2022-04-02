<template>
  <div class="p-10">
    <div class="text-center">
      <h1 class="md:text-6xl text-3xl font-bold text-[#501111] mb-6 font-main">
        {{ user.nombre }}
      </h1>
      <h3 v-if="user.admin" class="text-2xl mb-12 -mt-4">Administrador</h3>
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 items-start text-center">
      <div
        class="border-2 border-yellow-400 rounded-2xl bg-gray-100 pb-10 overflow-hidden"
      >
        <h2 class="text-xl bg-yellow-400 mb-4 font-main text-[#501111] py-4">
          INFORMACIÓN PERSONAL
        </h2>
        <div class="my-6">
          <input
            v-if="editarEmail"
            v-model="user.email"
            type="text"
            class="px-4 py-2 text-center border-2 rounded-2xl border-yellow-400"
          />
          <h3 v-if="!editarEmail" class="px-4 py-2 text-center text-xl">
            {{ user.email }}
          </h3>
          <button
            class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400"
          >
            <span v-if="!editarEmail" @click="editarEmail = true"
              >EDITAR EMAIL</span
            ><span v-if="editarEmail" @click="editarInfoEmail">GUARDAR</span>
          </button>
        </div>

        <div class="mb-6">
          <div v-if="editarTelefono">
            <select
              id="countryCodes"
              v-model="codeRaw"
              name="codes"
              class="my-4 appearance-none px-4 py-2 text-center border-2 rounded-2xl border-yellow-400 w-16"
            >
              <option
                v-for="(country, index) in countriesCodes"
                :key="index"
                :value="country.code"
              >
                {{ country.code }} {{ country.name }}
              </option>
            </select>
            <input
              v-model="numberRaw"
              type="string"
              class="px-4 py-2 text-center border-2 rounded-2xl border-yellow-400"
            /><br />
            <button
              v-if="editarTelefono"
              class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400 mb-6"
              @click="makeid()"
            >
              ENVIAR CÓDIGO
            </button>
          </div>
          <h3 v-if="!editarTelefono" class="px-4 py-2 text-center text-xl">
            {{ user.telefono }}
          </h3>

          <h4 v-if="editarTelefono" class="mb-2">
            Ingrese el código secreto enviado a este numero de WhatsApp
          </h4>
          <input
            v-if="editarTelefono"
            v-model="secretConfirm"
            type="string"
            class="px-4 py-2 text-center border-2 rounded-2xl border-yellow-400"
          />

          <button
            class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400"
          >
            <span v-if="!editarTelefono" @click="editarTelefono = true"
              >EDITAR WHATSAPP</span
            ><span v-if="editarTelefono" @click="editarInfoTelefono"
              >GUARDAR</span
            >
          </button>
          <button
            v-if="editarTelefono"
            class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400"
            @click="editarTelefono = false"
          >
            CANCELAR
          </button>
        </div>
        <div class="mb-6">
          <textarea
            v-if="editarDireccion"
            v-model="user.direccion"
            type="text"
            class="px-4 py-2 text-center border-2 rounded-2xl border-yellow-400"
          />
          <h3 v-if="!editarDireccion" class="px-4 py-2 text-center text-xl">
            {{ user.direccion }}
          </h3>
          <button
            class="text-sm bg-[#501111] rounded-3xl px-4 py-2 text-white hover:text-yellow-400"
          >
            <span v-if="!editarDireccion" @click="editarDireccion = true"
              >EDITAR DIRECCIÓN</span
            ><span v-if="editarDireccion" @click="editarInfoDireccion"
              >GUARDAR</span
            >
          </button>
        </div>
        <p>Su dirección sera usada solo para las entregas de la comida</p>
      </div>
      <UserOrders titulo="PEDIDOS" :pedidos="porEntregar" />
      <UserOrders titulo="PEDIDOS PASADOS" :pedidos="entregados" />
    </div>
  </div>
</template>

<script>
import { countries } from '../static/countryCode.json'

export default {
  data() {
    return {
      editarEmail: false,
      editarTelefono: false,
      editarDireccion: false,
      pedidos: [],
      countriesCodes: countries,
      test: true,
      codeRaw: '',
      numberRaw: '',
      secret: '',
      secretConfirm: null,
    }
  },
  computed: {
    user() {
      const temp = { ...this.$store.state.user }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.codeRaw = temp.telefono.substring(0, 3)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.numberRaw = temp.telefono.substring(3)
      return temp
    },
    porEntregar() {
      return this.pedidos.filter(
        (pedido) => pedido.entregado === false && pedido.cancelado === false
      )
    },
    cancelados() {
      return this.pedidos.filter((pedido) => pedido.cancelado === true)
    },
    entregados() {
      return this.pedidos.filter((pedido) => pedido.entregado === true)
    },
  },
  beforeMount() {
    const db = this.$fireModule.firestore()
    const query = db.collection('pedidos').orderBy('fecha', 'asc')
    query.onSnapshot((snapshot) => {
      this.pedidos = []
      snapshot.forEach((res) => {
        const pedido = {
          ...res.data(),
          id: res.id,
          cliente: res
            .data()
            .cliente.get()
            .then((res) => {
              pedido.cliente = res.data()
            }),
          fecha: this.getFormattedDate(res.data().fecha),
          fechaPago: this.getFormattedDate(res.data().fechaPago),
          fechaEntrega: this.getFormattedDate(res.data().fechaEntrega),
          fechaCancelado: this.getFormattedDate(res.data().fechaCancelado),
        }
        if (res.data().cliente.id === this.user.id) {
          this.pedidos.push(pedido)
        }
      })
    })
  },
  methods: {
    makeid() {
      let result = ''
      const number = `${this.codeRaw}${this.numberRaw}`
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      this.secret = result
      const db = this.$fireModule.firestore()
      db.collection('messages').add({
        to: `whatsapp:${number}`,
        body: `Bienvenido a NATUPETS, su código de confirmación es: ${result}`,
      })
    },
    editarInfoTelefono() {
      if (this.numberRaw.length !== 10) {
        alert(
          'El número debe tener 10 dígitos sin espacios\nRecuerde colocar el código sin 0\nEjemplo: 4141234567'
        )
        return
      }
      if (this.secretConfirm !== this.secret) {
        alert('El código secreto no coincide')
        return
      }
      this.user.telefono = `${this.codeRaw}${this.numberRaw}`
      const db = this.$fireModule.firestore()
      db.collection('users').doc(this.user.id).update({
        telefono: this.user.telefono,
      })
      this.editarTelefono = false
      this.$store.commit('setUser', this.user)
    },
    editarInfoEmail() {
      const db = this.$fireModule.firestore()
      db.collection('users').doc(this.user.id).update({
        email: this.user.email,
      })
      this.editarEmail = false
      this.$store.commit('setUser', this.user)
    },
    editarInfoDireccion() {
      const db = this.$fireModule.firestore()
      db.collection('users').doc(this.user.id).update({
        direccion: this.user.direccion,
      })
      this.editarDireccion = false
      this.$store.commit('setUser', this.user)
    },
    getFormattedDate(date) {
      try {
        date = date.toDate()
        const year = date.getFullYear()

        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month

        let day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day

        return (
          day +
          '/' +
          month +
          '/' +
          year +
          ' - ' +
          date.getHours() +
          ':' +
          date.getMinutes()
        )
      } catch (e) {
        return ''
      }
    },
  },
}
</script>

<style></style>
