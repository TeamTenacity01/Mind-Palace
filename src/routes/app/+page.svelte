<script lang="ts">
    let screenname;

</script>

<style lang="postcss">
    .app{
        @apply grid grid-cols-[1.5fr_8.5fr] h-full;
    }

    .sidepanel{
        @apply bg-slate-900 text-white grid grid-rows-[0.5fr_9fr_0.5fr];
    }
    .logo{
        @apply px-2 py-4 border-b border-b-slate-600;
    }

    .links{
        @apply grid grid-flow-row grid-rows-2;
    }
    .screenlinks{
        @apply flex flex-col;
    }
    .screenlinks > a {
        @apply p-2;
    }
    .screenlinks > a:hover {
        @apply bg-slate-600;
    }
    .teamlinks{
        @apply flex flex-col gap-3 text-left;
    }
    .teamlinks > a{
        @apply px-2 py-1 bg-slate-700;
    }
    .teamlinks-wrapper{
        @apply p-2 border-t border-t-slate-600;
    }
    .teamlinks-wrapper > h2{
        @apply my-2 text-slate-300;
    }

    .settingsbtn{
        @apply border-t border-slate-600 text-left p-2;
    }
    .settingsbtn:hover{
        @apply bg-slate-500;
    }
    .screen{
        @apply p-2;
    }
</style>

<main class="app">
    <section class="sidepanel">
        <div class="logo">
            <h1>Mind Palace Logo</h1>
        </div>
        <div class="links">
            <div class="screenlinks">
                <a href="/app">Dashboard</a>
                <a href="/app">My Tasks</a>
                <a href="/app">Inbox</a>
            </div>
            <div class="teamlinks-wrapper">
                <h2>Teams</h2>
                <!-- <hr> -->
                <div class="teamlinks">
                    <a href="/app">Team 1</a>
                    <a href="/app">Team 2</a>
                </div>
            </div>
        </div>
        <button class="settingsbtn">
            ⚙️ Settings
        </button>
    </section>

    <section class="screen">
        <h1>Dashboard</h1>
        <p>Screen</p>
    </section>
</main>