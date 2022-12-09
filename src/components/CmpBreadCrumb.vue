<template>
  <nav aria-label="breadcrumb" role="navigation">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="item in breadCrumbs"><a :href="item.to.path ">{{ $t('routes.' + String(item.text)) }}</a></li>
    </ol>
  </nav>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import { CmpBaseButton } from '.';

export default defineComponent({
    name: 'CmpDropdown',
    components: {
      CmpBaseButton
    },
    computed: {
      breadCrumbs() {
        if (typeof this.$route.meta.breadCrumb === "function") {
          return this.$route.meta.breadCrumb.call(this);
        }
        return this.$route.meta.breadCrumb;
      },
    },
})
</script>