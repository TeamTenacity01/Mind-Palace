<script lang="ts">
    import Kanban from "$lib/components/Kanban/Kanban.svelte";
    import Timeline from "$lib/components/Timeline/Timeline.svelte";

    let views = [
        { 
            label: "Board View",
            value: 1,
            component: Kanban,
        },
        { 
            label: "Timeline View",
            value: 2,
            component: Timeline,
        },
    ];

    let currentComponent = views[0].component;
    let activeTab = views[0];

    function changeView(component: any, view: any){
        currentComponent = component;
        activeTab = view;
    }
</script>

<style lang="postcss">
    .view-list{
        @apply flex w-full gap-3;
    }
    .view-option{
        @apply border border-slate-300 py-3 px-4 rounded-md border-b-0 rounded-b-none;
    }
    .active-tab {
        @apply text-white bg-slate-800;
    }
</style>

<h1 class="mb-8">Team Tenacity</h1>
<section>
    <div class="view-list">
        {#each views as view}
            <button class="view-option {activeTab === view ? 'active-tab' : ''}" on:click={() => changeView(view.component, view)}>
                {view.label}
            </button>
        {/each}
        <button class="view-option">
            +
        </button>
    </div>
    <hr class="mb-8">

    <div>
        <svelte:component this={currentComponent}></svelte:component>
    </div>
</section>
