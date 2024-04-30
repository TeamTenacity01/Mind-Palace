<script lang="ts">
    import { dropzone, draggable } from './dnd';

    // Define types for your columns and cards
    type Column = {
        id: number;
        label: string;
    };

    type Card = {
        column: number;
        id: string;
        title: string;
    };

    type Data = {
        columns: Column[];
        cards: Card[];
    };

    let editingColumnId: number | null = null;

    // Define the initial data with explicit types
    let data: Data = {
        columns: [
            { id: 1, label: 'Todo' },
            { id: 2, label: 'In Progress' },
            { id: 3, label: 'Done' }
        ],
        cards: [
			{ column: 2, id: 'b', title: 'Attend The Banquet', },
			{ column: 3, id: 'c', title: 'Build Amazing Tool', },
			{ column: 1, id: 'c', title: 'Blow Everyone Away', },
        ]
    }

	function generateUniqueId(): string {
		// Generate a unique ID (you can use any method you prefer)
		return Math.random().toString(36).substr(2, 9);
	}

	function addCard(columnId:number): void {
		const newCardId: string = generateUniqueId();
		const newCard: Card = {
			column: columnId,
			id: newCardId,
			title: `New Card...`
			// title: `New Card ${newCardId}`
		};
		data.cards = [...data.cards, newCard];
	}

    function addColumn(): void {
        const newColumnId: number = data.columns.length + 1;
        const newColumn: Column = {
            id: newColumnId,
			label: `New Column`
            // label: `New Column ${newColumnId}`
        };
        data.columns = [...data.columns, newColumn];
		addCard(newColumnId);
    }

    function startEditing(id: number): void {
        editingColumnId = id;
    }

    function stopEditing(label: string, id: number): void {
        const column = data.columns.find(c => c.id === id);
        if (column) {
            column.label = label;
        }
        editingColumnId = null;
    }
</script>

<style>
	.text:hover {
		background-color: rgba(243, 243, 243, 0.957);
	}
	.container {
		display: flex;
	}
	.plus {
		align-content: center;
		padding: 30px;
	}

	body {
		background-color: hsl(206, 64%, 98%);
		color: hsl(0, 0%, 13%);
		margin: 0.75em;
		accent-color: hsl(15, 100%, 55%);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
	}

	.column-content {
		@apply flex flex-col justify-between;
		background-color: hsl(0, 0%, 100%);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: hsl(206, 20%, 80%);
	}

	.cards {
		flex-direction: column;
		@apply my-2 py-2;
	}
	/* .cards li{
		@apply border-y border-slate-300;
	} */
	.column:global(.droppable) {
		outline: 0.1rem solid hsl(15, 100%, 55%);
		outline-offset: 0.25rem;
	}
	.column:global(.droppable) * {
		pointer-events: none;
	}
	.column {
		min-width: 38ch;
		position: relative;
		padding-bottom: 40px;
		height: 100%;
	}

	.column-title{
		@apply text-xl;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
	.column-title:focus{
		@apply outline-none;
	}
	.addItem{
		@apply text-center flex justify-center w-full p-3 font-semibold text-neutral-400;
	}
	.addItem:hover{
		@apply text-black;
	}
	.addColumn{
		@apply ml-4 min-w-[38ch] relative bg-white h-fit;
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: hsl(206, 20%, 80%);
	}
</style>



<div class="container">

	<ul>
		{#each data.columns as column}
			{@const cards = data.cards.filter((c) => c.column === column.id)}
			<div class="column-content">
				<li class="column p-4" use:dropzone={{ on_dropzone(card_id) { const card = data.cards.find((c) => c.id === card_id); card.column = column.id;data = data;}}}>
					<!-- Column Title -->
					<input class="column-title" id={"column-input-" + column.id} type="text" bind:value={column.label} on:blur={() => stopEditing(column.label, column.id)} />
					
					<!-- Card Rendering -->
					{#if cards.length > 0}
						<ul class="cards">
							{#each cards as card}
								<li use:draggable={card.id}>
									{card.title}
								</li>
							{/each}
						</ul>
					{:else}
						<p></p>
					{/if}
				</li>
				<button class="addItem" on:click={()=> addCard(column.id)}><p>﹢Add Item</p></button>
			</div>  
		{/each}
	</ul>
	<div class="addColumn">
		<button class="addItem" on:click={addColumn}><p>﹢Add Block</p></button>
	</div>
</div>
