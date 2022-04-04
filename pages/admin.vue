<template>
	<div class="p-10">
		<OrdersTable titulo="PEDIDOS" :pedidos="pedidos" class="hidden md:block" />
		<Price class="mt-10" />
		<Stock class="mt-10" />
		<OrdersMobile
			titulo="NO ENTREGADOS"
			:pedidos="noEntregados"
			class="block md:hidden mt-10"/>
		<OrdersMobile
			titulo="ENTREGADO"
			:pedidos="entregados"
			class="block md:hidden mt-10"/>
		<OrdersMobile
			titulo="CANCELADO"
			:pedidos="cancelado"
			class="block md:hidden mt-10"/>
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
		entregados() {
			return this.pedidos.filter((pedido) => pedido.entregado === true)
		},
		cancelado() {
			return this.pedidos.filter((pedido) => pedido.cancelado === true)
		},
		noEntregados() {
			return this.pedidos.filter(
				(pedido) => pedido.entregado === false && pedido.fechaCancelado === null
			)
		},
	},
	beforeMount() {
		if (this.$store.state.user.admin === false) {
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
				return (
					day +
					'/' +
					month +
					'/' +
					year +
					' - ' +
					this.pad(date.getHours()) +
					':' +
					this.pad(date.getMinutes())
				)
			} catch (e) {
				return ''
			}
		},
		pad(value) {
			if (value < 10) {
				return '0' + value
			} else {
				return value
			}
		},
	},
}
</script>

<style></style>
