<template>
    <footer class="footer">
        <div class="container-fluid">
            <div class="copyright">
                © {{year}} {{ $t('others.footer-copyright') }} <a href="https://github.com/ic-matcom/academic_certificate.ui" target="_blank" rel="noopener">UH</a>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    type YearDataT = {
        year: number
    }

    export default defineComponent({
        name: 'LayFooterContent',
        data (): YearDataT {
            return {
                year: new Date().getFullYear()
            }
        }
    })
</script>
