<script setup>
import "rapidoc";
</script>

<template>
  <header class="global"><span>hello</span></header>
  <rapi-doc
    spec-url="/sample.json"
    render-style="read"
    show-header="false"
    allow-spec-url-load="false"
    allow-spec-file-load="false"
    primary-color="#00b2db"
  >
    <header class="internal">ここが内側のheader</header>
    <footer>ここが内側のfooter</footer>
  </rapi-doc>
</template>

<style scoped>
rapi-doc {
  height: calc(100vh - 30px);
  width: 100%;
}
header {
  height: 30px;
  width: 100%;
  background: #ddffff;
}
</style>
