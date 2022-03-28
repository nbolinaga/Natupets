<template>
  <div class="p-10 grid gap-12 grid-cols-1 md:grid-cols-2 items-start">
    <Price class="" />
    
     <Stock class="" />
     <ToVerified class="" />
   <OrderList
      class=""
      :pedidos="porEntregar"
      titulo="POR ENTREGAR"
    />
    <OrderList
      class=""
      :pedidos="entregados"
      titulo="ENTREGADOS"
    />
    <OrderList
      class=""
      :pedidos="cancelados"
      titulo="CANCELADOS"
    />
    <Twilio/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pedidos: [],
    }
  },
  computed: {
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
    if(this.$store.state.user.admin === false){
      this.$router.push('/')
    }
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
        this.pedidos.push(pedido)
      })
    })
  },
  methods: {
    getFormattedDate(date) {
      try {
        date = date.toDate()
        const year = date.getFullYear()

        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month

        let day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day

        return day + '/' + month + '/' + year + ' - ' + date.getHours() + ':' + date.getMinutes()
      } catch (e) {
        return ''
      }
    },
  },
}
</script>

<style></style>
