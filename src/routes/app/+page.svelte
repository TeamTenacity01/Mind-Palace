<script lang="ts">
    let screenname;

</script>

<style lang="postcss">
    .app{
        @apply grid grid-cols-[2fr_8fr] h-full;
    }

    .sidepanel{
        @apply bg-slate-900 text-white p-2 grid grid-rows-[0.5fr_9fr_0.5fr];
    }
    .links{
        @apply grid grid-flow-row grid-rows-2;
    }
    .screenlinks{
        @apply flex flex-col;
    }
    .teamlinks{
        @apply flex flex-col p-2  bg-slate-700;
    }

    .screen{
        @apply p-2;
    }
</style>

<main class="app">
    <section class="sidepanel">
        <h1>Mind Palace Logo</h1>
        <div class="links">
            <div class="screenlinks">
                <a href="/app">Link 1</a>
                <a href="/app">Link 2</a>
                <a href="/app">Link 3</a>
            </div>
            <div class="teamlinks-wrapper">
                <h2>Teams</h2>
                <hr>
                <div class="teamlinks">
                    <a href="/app">Link 1</a>
                    <a href="/app">Link 2</a>
                    <a href="/app">Link 3</a>
                </div>
            </div>
        </div>
        <button class="settingsbtn">
            Settings
        </button>
    </section>

    <section class="screen">
        <h1>Dashboard</h1>
        <p>Screen</p>
    </section>
</main>