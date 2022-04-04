<template>
	<tbody>
		<tr class="bg-gray-50 border-b">
			<th
				v-if="$route.name == 'admin'"
				scope="row"
				class="px-6 py-4 font-medium text-gray-900">
				{{ pedido.cliente.nombre }}
			</th>
			<th scope="row" class="px-6 py-4 font-medium text-gray-900">
				{{ pedido.fecha }}
			</th>
			<td class="px-6 py-4">{{ pedido.cantidad }}</td>
			<td class="px-6 py-4">{{ pedido.dolares }} USD</td>
			<td class="px-6 py-4">{{ pedido.bolivares }} BsF</td>
			<td class="px-6 py-4 whitespace-nowrap flex inline">
				<p v-if="pedido.entregado" class="text-yellow-500 ml-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
					</svg>
				</p>
				<p v-if="pedido.pagado" class="text-green-500 ml-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
					</svg>
				</p>
				<p v-if="pedido.marcado" class="text-blue-500 ml-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
					</svg>
				</p>
				<p v-if="pedido.cancelado" class="text-red-500 ml-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</p>
			</td>
			<td class="pt-6 py-4 text-center hover:text-yellow-400">
				<button v-if="opened" @click="opened = false">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
					</svg>
				</button>
				<button v-if="!opened" @click="opened = true">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
			</td>
		</tr>
		<tr v-if="opened" class="border-b-8 border-[#501111] bg-gray-100 text-left">
			<td colspan="7" class="px-6 py-4">
				<button
					v-if="!pedido.pagado && !pedido.cancelado"
					class="bg-green-500 rounded px-4 py-2 mb-4 text-white hover:text-[#501111]"
					@click="marcarPagado(pedido)">
					Marcar Pedido Pagado
				</button>
				<button
					v-if="!pedido.entregado && !pedido.cancelado && $route.name == 'admin'"
					class="bg-yellow-500 rounded px-4 py-2 mb-4 text-white hover:text-[#501111]"
					@click="entregarPedido(pedido)">
					Marcar Entregado
				</button>
				<button
					v-if="
						!pedido.cancelado &&
						pedido.pagado &&
						!pedido.marcado &&
						$route.name == 'admin'
					"
					class="bg-blue-500 rounded px-4 py-2 mb-4 text-white hover:text-[#501111]"
					@click="confirmarPago(pedido)">
					Confirmar Pago
				</button>
				<button
					v-if="!pedido.entregado && !pedido.cancelado && !pedido.pagado"
					class="bg-red-500 rounded px-4 py-2 mb-4 text-white hover:text-[#501111]"
					@click="cancelarPedido(pedido)">
					Cancelar Pedido
				</button>
				<p v-if="pedido.entregado" class="text-yellow-500 text-lg">
					Entregado el {{ pedido.fechaEntrega }}
				</p>
				<p v-if="pedido.pagado" class="text-green-500 text-lg">
					Pagado el {{ pedido.fechaPago }}
				</p>
				<p v-if="pedido.cancelado" class="text-red-500 text-lg">
					Cancelado el {{ pedido.fechaCancelado }}
				</p>
				<p v-if="pedido.marcado" class="text-blue-500 text-lg">Pago confirmado</p>
				<h3 v-if="$route.name == 'admin'" class="text-2xl my-4">
					{{ pedido.cliente.telefono }}
				</h3>
				<div
					v-show="pedido.pickup"
					class="mt-2 font-main text-[#501111] py-2 text-xl">
					<h4 class="flex justify-left items-end">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
								clip-rule="evenodd"/>
						</svg>
						Pickup
					</h4>
				</div>
				<div v-show="!pedido.pickup" class="font-main text-[#501111] py-2">
					<h4 class="flex justify-left items-end text-xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2">
							<path
								d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
						</svg>
						Delivery
					</h4>
					<p class="text-lg">
						{{ pedido.cliente.direccion }}
					</p>
				</div>
			</td>
		</tr>
	</tbody>
</template>

<script>
export default {
	props: {
		pedido: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			opened: false,
		}
	},
	computed: {
		user() {
			return { ...this.$store.state.user }
		},
	},
	methods: {
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
		marcarPagado(pedido) {
			const db = this.$fireModule.firestore()
			const pedidoRef = db.collection('pedidos').doc(pedido.id)
			pedidoRef.update({
				pagado: !pedido.pagado,
				fechaPago: new Date(),
			})
		},
		entregarPedido(pedido) {
			if (this.user.admin === false) {
				return
			}
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
		confirmarPago(pedido) {
			if (this.user.admin === false) {
				return
			}
			const db = this.$fireModule.firestore()
			const pedidoRef = db.collection('pedidos').doc(pedido.id)
			pedidoRef.update({
				marcado: true,
			})
		},
	},
}
</script>

<style></style>
