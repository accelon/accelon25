<script>
    let content=$state('')
    const onclick=async ()=>{
        content=await getPtkPage("cs-ccc","2");
    }
</script>
<div class="app">
    <button {onclick}>Get ZipPage</button>
    <span class="message">{content}</span>
<style>
    .app {height:100vh} /* splitpane divider need this */
    .message {font-size:100%}
</style>
</div>  