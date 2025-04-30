<script>
    let count=$state(0)
    const onclick=()=>count++;
</script>
<div class="app">
    <button  {onclick}>Add</button>
    <span class="message">{count}</span>
<style>
    .app {height:100vh} /* splitpane divider need this */
    .message {font-size:100%}
</style>
</div>  