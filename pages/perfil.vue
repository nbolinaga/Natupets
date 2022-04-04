<template>
	<div class="p-10">
		<div class="text-center">
			<h1 class="md:text-6xl text-3xl font-bold text-[#501111] mb-6 font-main">
				{{ user.nombre }}
			</h1>
			<h3 v-if="user.admin" class="text-2xl mb-12 -mt-4">Administrador</h3>
		</div>
		<div class="grid grid-cols-4 gap-12 items-start">
			<OrdersTable
				titulo="PEDIDOS"
				:pedidos="pedidos"
				class="col-span-3 hidden md:block"/>
			<div
				class="rounded-2xl pb-10 overflow-hidden text-center mb-10 shadow-md bg-gray-50 border-2 border-yellow-400 col-span-4 md:col-span-1">
				<h2 class="text-lg bg-yellow-400 mb-4 font-main text-[#501111] py-4">
					INFORMACIÓN PERSONAL
				</h2>
				<!-- <EditPhone :user-prop="user" /> -->
				<h3 class="px-4 py-2 text-center text-xl mt-4">
					{{ user.telefono }}
				</h3>
				<EditEmail :user-prop="user" />
				<EditDic :user-prop="user" />
			</div>
			<OrdersMobile
				titulo="PEDIDOS"
				:pedidos="pedidos"
				class="col-span-4 block md:hidden"/>
		</div>
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
		user() {
			return { ...this.$store.state.user }
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
