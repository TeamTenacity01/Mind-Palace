<style lang="postcss">
    .settings{
        @apply font-inter;
    }
    .profile-info{
        @apply grid grid-cols-3 p-3;
    }
    .form-input{
        
    }
    .inputs{
        @apply grid grid-rows-3 justify-items-start content-between;
    }
    .delete{

    }
    .delete-button{

    }
    .divider{
        @apply border border-2 m-2;
    }
    h1{
        @apply font-bold text-3xl; 
    }
    p{
        @apply text-base;
    }
    select{
        @apply border border-black rounded-lg text-lg w-48;
    }
    input{
        @apply border border-black rounded-lg py-1 sm:px-1 px-0 lg:text-lg sm:text-sm text-xs;
    }
    h3{
        @apply font-bold;
    }

    
</style>


<main class="settings"> 
    <h1>Settings</h1>
    <p>Manage your Mind Palace account. All changes in your account will be applied to all of your workspace.</p>

    <div class="profile-info">
        <div class="profile ">
            <h2>PROFILE PHOTO</h2>
            <div class="icon">
                <div class="small-12 medium-2 large-2 columns">
                  <div class="circle">
                    <img class="profile-pic" id="prof" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg">
                  </div>
               </div>
            </div>
            <div class="flex flex-col">
                <button class=" self-center text-lg border border-black px-8 rounded-lg">Update</button>
            </div>
        </div>

        <div class="inputs">
            <div class="form-input">
                <h2>USERNAME</h2>
                <input placeholder="Type your username here">
            </div>

            <div class="form-input">
                <h2>EMAIL</h2>
                <input placeholder="Type your email here">
            </div>

            <div class="form-input">
                <h2>LANGUAGE</h2>
                <select>
                    <option>English</option>
                </select>
            </div>
        </div>

        <div class="inputs">
            <div class="form-input">
                <h2>FULL NAME</h2>
                <input placeholder="Type your name here">
            </div>

            <div class="form-input">
                <h2>TIME ZONE</h2>
                <select>
                    <option>CST</option>
                    <option>NST</option>
                    <option>AST</option>
                    <option>EST</option>
                    <option>MST</option>
                    <option>PST</option>
                </select>
            </div>
        </div>
    </div>

    <div class="delete">
        <div class="divider"></div>
        <h3>Delete your account</h3>
        <p>Once you delete your account and account data, there is no going back.</p>
        <p>DELETE YOUR ACCOUNT AND ACCOUNT DATA</p>
        <div class="delete-button">
            <input placeholder="Confirm your email">
            <button class="bg-red-500 text-lg rounded-lg px-5 py-1 text-center">Delete</button>
        </div>
    </div>

</main>
