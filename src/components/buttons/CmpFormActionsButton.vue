<template>

    <!-- PC MODE -->
    <div class="row d-sm-none d-md-flex">

        <!-- left group -->
        <div class="col-md-2 text-md-left">

            <!-- delete -->
            <CmpBaseButton v-if:="showDelete"
                           @click.prevent="$emit('deleteIntent', $event)"
                           class="mr-md-2"
                           buttonType="danger"
                           :title="$t('btn.tip-remove-entity')">
                <i class="tim-icons icon-trash-simple" style="padding-bottom: 2px; padding-right: 4px;" />
                {{ $t( 'btn.val-del' ) }}
            </CmpBaseButton>
        </div>

        <!-- right group -->
        <div class="col-md-10 text-md-right">

            <!-- cancel -->
            <CmpBaseButton v-if="showCancel"
                           @click.prevent="$emit('cancelIntent', $event)"
                           class="mr-sm0 mr-sm-2"
                           buttonType="default"
                           :title="$t('btn.tip-cancel')">
                <i class="tim-icons icon-simple-remove" style="padding-bottom: 2px; padding-right: 4px;" />
                {{ $t( 'btn.val-cancel' ) }}
            </CmpBaseButton>

            <!-- save and stay in the form -->
            <button @click.prevent="$emit('saveIntent', $event, true)"
                    class="btn btn-success ml-sm-0 ml-sm-2"
                    :title="$t('btn.tip-save-stay')">
                <i class="tim-icons icon-double-right" style="padding-bottom: 2px; padding-right: 4px;" />
                {{ $t( 'btn.val-apply' ) }}
            </button>

            <!-- save -->
            <button @click.prevent="$emit('saveIntent', $event, false)"
                    class="btn btn-success ml-sm-0 ml-sm-2"
                    :title="$t('btn.tip-save')">
                <i class="tim-icons icon-check-2" style="padding-bottom: 2px; padding-right: 4px;" />
                {{ $t( 'btn.val-save' ) }}
            </button>
        </div>
    </div>

    <!-- MOBILE MODE -->
    <div class="row d-md-none d-sm-flex">
        <div class="col-12 text-center">

            <!-- delete -->
            <!-- TODO check this title -->
            <CmpBaseButton v-if="showDelete"
                           round
                           @click.prevent="$emit('deleteIntent', $event)"
                           class="mr-md-2"
                           buttonType="danger"
                           title="Remove the Catalog">
                <i class="tim-icons icon-trash-simple" style="padding-bottom: 2px; padding-right: 4px;" />
            </CmpBaseButton>

            <CmpBaseButton v-if="showCancel"
                           round
                           @click.prevent="$emit('cancelIntent', $event)"
                           class="ml-sm-2 mr-sm-2"
                           buttonType="default"
                           title="Do nothing">
                <i class="tim-icons icon-simple-remove" style="padding-bottom: 2px; padding-right: 4px;" />
            </CmpBaseButton>

            <!-- TODO check this title -->
            <button @click.prevent="$emit('saveIntent', $event, false)"
                    class="btn btn-success btn-round ml-sm-2"
                    title="Save the catalog">
                <i class="tim-icons icon-check-2" style="padding-bottom: 2px; padding-right: 4px;" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CmpBaseButton from './CmpBaseButton.vue'


export default defineComponent({
    name:       'CmpFormActionsButton',
    components: { CmpBaseButton },
    props:      {
        showDelete: {
            type: Boolean,
            description:
                  'If we have to show the delete button regarding the form mode pass it to this component'
        },

        showCancel: {
            type:    Boolean,
            default: true
        }
    },
    emits:      [ 'deleteIntent', 'cancelIntent', 'saveIntent' ]
    // 'saveIntent' return the event and a binary state (boolean) for saying (doWeNeedToStay) if the call is from the apply button or the conventional save button. That allows to know if we need to stay in the form, o move on back to other view
    // -doWeNeedToStay- is the name we given to the param capturing the value back in the form components
})
</script>