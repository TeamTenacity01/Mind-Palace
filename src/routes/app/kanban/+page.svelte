<script>
	import { dropzone, draggable } from './dnd';
	let data = {
		columns: [
			{
				id: 1,
				label: '📫 Todo'
			},
			{
				id: 2,
				label: 'In Progress'
			},
			{
				id: 3,
				label: 'Awaiting Merge'
			},
			{
				id: 4,
				label: '✅Done'
			}
		],
		cards: [
			{
				column: 1,
				id: 'a',
				title: 'Wash Dishes'
			},
			{
				column: 2,
				id: 'b',
				title: 'Code DND Example'
			},
			{
				column: 3,
				id: 'b',
				title: 'Code DND Example'
			},
			{
				column: 4,
				id: 'b',
				title: 'Code DND Example'
			}
		]
	};
	function addColumn() {
		const newColumnId = data.columns.length + 1; // Generate a new ID for the column
		const newColumn = {
			id: newColumnId,
			label: `New Column ${newColumnId}` // Customize this label as needed
		};
		data.columns = [...data.columns, newColumn]; // Add the new column to the columns array
	}
</script>

<div class="container">
	<ul>
		{#each data.columns as column}
			{@const cards = data.cards.filter((c) => c.column === column.id)}

			<li
				class="column"
				use:dropzone={{
					on_dropzone(card_id) {
						const card = data.cards.find((c) => c.id === card_id);
						card.column = column.id;
						data = data;
					}
				}}
			>
				<h2>{column.label}</h2>
				{#if cards.length > 0}
					<ul class="cards">
						{#each cards as card}
							<li use:draggable={card.id}>
								{card.title}
							</li>
						{/each}
					</ul>
				{:else}
					<p>No Cards...</p>
				{/if}
			</li>
		{/each}
	</ul>
	<div class="plus" on:click={addColumn}>
		<svg
			fill="#000000"
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			width="60px"
			height="60px"
			viewBox="0 0 45.402 45.402"
			xml:space="preserve"
		>
			<g>
				<path
					d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
				/>
			</g>
		</svg>
	</div>
</div>

<style>
	.container {
		display: flex;
	}
	.plus {
		align-content: center;
		padding: 30px;
	}

	:root {
		--sk-back-h: 206;
		--sk-back-3-hsl: ;
		--sk-back-1: hsl(0, 0%, 100%);
		--sk-back-2: hsl(0, 0%, 100%);
		--sk-back-3: hsl(206, 64%, 98%);
		--sk-back-4: hsl(206, 44%, 93%);
		--sk-back-5: hsl(206, 20%, 80%);
		--sk-text-1: hsl(0, 0%, 13%);
		--sk-text-2: hsl(0, 0%, 27%);
		--sk-text-3: hsl(240, 8%, 44%);
		--sk-theme-1: hsl(15, 100%, 55%);
		--sk-theme-2: hsl(240, 8%, 44%);
		--sk-theme-3: hsl(204, 100%, 63%);
		--sk-font: 'Overpass', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		--sk-font-mono: 'Fira Mono', monospace;
	}

	body {
		background-color: var(--sk-back-3);
		color: var(--sk-text-1);
		margin: 0.75em;
		font-family: var(--sk-font);
		accent-color: var(--sk-theme-1);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--sk-back-1: hsl(0, 0%, 10%);
			--sk-back-2: hsl(0, 0%, 18%);
			--sk-back-3: hsl(0, 0%, 14%);
			--sk-back-4: hsl(0, 0%, 22%);
			--sk-back-5: hsl(0, 0%, 40%);
			--sk-text-1: hsl(0, 0%, 90%);
			--sk-text-2: hsl(0, 0%, 80%);
			--sk-text-3: hsl(0, 0%, 65%);
		}

		body {
			color-scheme: dark;
		}

		a {
			color: var(--sk-theme-3);
		}

		a:visited {
			color: hsl(267, 100%, 75%);
		}
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
	}

	li {
		padding: 1rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: var(--sk-back-5);
	}

	.column {
		min-width: 25ch;
	}

	h2 {
		margin-block-start: 0;
		margin-block-end: 0.5rem;
	}

	.cards {
		flex-direction: column;
	}

	.column:global(.droppable) {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	.column:global(.droppable) * {
		pointer-events: none;
	}
</style>
