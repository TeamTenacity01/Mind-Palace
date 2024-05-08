<script lang="ts">
	// @ts-nocheck
	import { v4 as uuidv4 } from 'uuid'; // Import uuid library to generate unique IDs
	import Fa from 'svelte-fa';
	import { faGripVertical, faPencil } from '@fortawesome/free-solid-svg-icons';

	let baskets = [
		{
			name: 'Todo',
			items: [
				{ id: uuidv4(), name: 'Orange' },
				{ id: uuidv4(), name: 'Pineapple' }
			],
			draggingOver: ''
		},
		{
			name: 'In Progress',
			items: [
				{ id: uuidv4(), name: 'Banana' },
				{ id: uuidv4(), name: 'Apple' }
			],
			draggingOver: ''
		},
		{
			name: 'Done',
			items: [{ id: uuidv4(), name: 'GrapeFruit' }],
			draggingOver: ''
		}
	];

	// let draggingOver = "";
	let hoveringOverBasket;

	function dragStart(event, basketIndex, itemIndex) {
		// The data we want to make available when the element is dropped
		// is the index of the item being dragged and
		// the index of the basket from which it is leaving.
		const data = { basketIndex, itemIndex };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
		draggingItem = event.target as HTMLElement;
		draggingItem.classList.add('dragging');
	}

	function drop(event, basketIndex) {
		event.preventDefault();
		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);

		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
		const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);

		// Add the item to the drop target basket.
		baskets[basketIndex].items.push(item);
		baskets = baskets;

		hoveringOverBasket = null;
	}

	function addColumn() {
		// Define a new column object with default values
		const newColumn = {
			name: 'New Column',
			items: [{ id: uuidv4(), name: 'New Task...' }],
			draggingOver: ''
		};

		// Add the new column to the baskets array
		baskets.push(newColumn);
		baskets = [...baskets];
	}

	function addItem(basketIndex) {
		// Define a default task name
		const defaultTask = { id: uuidv4(), name: 'New Task...' };

		// Push the default task to the specified column's items array
		baskets[basketIndex].items.push(defaultTask);
		baskets[basketIndex].items = [...baskets[basketIndex].items];
	}

	function deleteColumn(columnIndex) {
		// Remove the column at the specified index
		baskets.splice(columnIndex, 1);
		// Update the state
		baskets = baskets;
	}
</script>

<div class="container">
	<ul>
		{#each baskets as basket, basketIndex (basket)}
			<div class="column-content mt-2 {basket.draggingOver}">
				<li
					class="column p-4"
					class:hovering={hoveringOverBasket === basket.name}
					on:dragover={() => {
						basket.draggingOver = 'outline outline-red-400 cursor-grabbing';
					}}
					on:dragenter={() => (hoveringOverBasket = basket.name)}
					on:dragleave={() => {
						hoveringOverBasket = null;
						basket.draggingOver = '';
					}}
					on:drop={(event) => {
						drop(event, basketIndex);
						basket.draggingOver = '';
					}}
					ondragover="return false"
				>
					<div on:click={() => deleteColumn(basketIndex)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							class="xsvg"
						>
							<path
								d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59 L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59z"
							></path>
						</svg>
					</div>
					<!-- Column Title -->
					<input class="column-title" type="text" bind:value={basket.name} />

					<!-- Card Rendering -->
					{#if basket.items.length > 0}
						<ul class="cards">
							{#each basket.items as item, itemIndex (item)}
								<li
									class="card"
									draggable={true}
									on:dragstart={(event) => dragStart(event, basketIndex, itemIndex)}
									key={item.id}
								>
									<div class="card-wrapper">
										<div class="draggy">
											<Fa icon={faGripVertical} size="0.7x" />
										</div>
										<a href="/app">{item.name}</a>
										<div class="my-auto mr-2 opacity-70 cursor-pointer">
											<Fa icon={faPencil} size="0.7x" />
										</div>
									</div>
								</li>
							{/each}
						</ul>
					{:else}
						<p></p>
					{/if}
				</li>
				<button class="addItem" on:click={() => addItem(basketIndex)}><p>﹢Add Item</p></button>
			</div>
		{/each}
	</ul>
	<div class="addColumn">
		<button class="addItem" on:click={addColumn}><p>﹢Add Block</p></button>
	</div>
</div>

<style lang="postcss">
	.xsvg:hover {
		transform: scale(1.2); /* Scale the icon to 120% of its original size */
	}
	.xsvg {
		position: relative;
		top: -23px;
		left: -20px;
	}
	.container {
		display: flex;
	}

	ul {
		@apply flex gap-4 m-0 p-0;
	}

	.column-content {
		@apply flex flex-col justify-between border border-gray-300 rounded-lg;
	}
	.column-content:nth-child(1) {
		@apply ml-1;
	}
	.card {
		@apply inline outline outline-1 outline-gray-400 outline-offset-2 rounded-sm py-1;
	}
	.draggy {
		@apply my-auto mx-1 opacity-0 cursor-grab;
	}
	.card:hover .draggy {
		@apply opacity-40;
	}
	.cards {
		flex-direction: column;
		@apply my-2 py-2;
	}
	.card-wrapper {
		@apply flex w-full flex-row;
	}
	.card-wrapper > a {
		@apply flex-1 outline-none;
	}
	.card-wrapper > span {
		@apply flex;
	}
	.column {
		min-width: 38ch;
		position: relative;
		padding-bottom: 40px;
		height: 100%;
	}
	.column-title {
		@apply text-xl;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	.column-title:focus {
		@apply outline-none;
	}
	.addItem {
		@apply text-center flex justify-center w-full p-3 font-semibold text-neutral-400;
	}
	.addItem:hover {
		@apply text-black;
	}
	.addColumn {
		@apply ml-4 mt-2 min-w-[38ch] relative bg-white h-fit border border-gray-300 rounded-lg;
	}
</style>
