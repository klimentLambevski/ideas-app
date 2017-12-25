<template>
  <div class="idea-form-container">
    <div class="idea-form">
      <div class="dot"></div>
      <ip-input
        placeholder=""
        v-model="formValues.content"
        :disabled="!editMode"
      ></ip-input>
      <input-select
        title="Impact"
        :disabled="!editMode"
        :label-active="labelsActive"
        v-model="formValues.ease"></input-select>
      <input-select
        title="Ease"
        :disabled="!editMode"
        :label-active="labelsActive"
        v-model="formValues.impact"></input-select>
      <input-select
        title="Confidence"
        :disabled="!editMode"
        :label-active="labelsActive"
        v-model="formValues.confidence"></input-select>
      <input-select
        title="Avg."
        :value="avg"
        :disabled="true"
        :label-active="labelsActive"
        :label-style="'bold'"></input-select>
      <template v-if="editMode">
        <div class="idea-form-action green" @click="saveIdea">
          <img src="./Confirm_V.png" srcset="./Confirm_V.png 1x, ./Confirm_V@2x.png 2x"/>
        </div>
        <div class="idea-form-action red" @click="cancel">
          <img src="./Confirm_V.png" srcset="./Cancel_X.png 1x, ./Cancel_X@2x.png 2x"/>
        </div>
      </template>
      <template v-else>
        <div class="idea-form-action edit" @click="editIdea">
          <img src="./pen.png" srcset="./pen.png 1x, ./pen@2x.png 2x"/>
        </div>
        <div class="idea-form-action edit" @click="$emit('delete')">
          <img src="./bin.png" srcset="./bin.png 1x, ./bin@2x.png 2x"/>
        </div>
      </template>
    </div>
    <div class="validation-error" v-if="error">Please write your idea</div>
  </div>
</template>

<script>
  import IpInput from '../ip-input/ip-input.vue';
  import InputSelect from '../input-select/input-select.vue';
  import * as _ from 'lodash';

  export default {
    components: {
      IpInput,
      InputSelect
    },
    data: () => ({
      formValues: {
        ease: 10,
        impact: 10,
        confidence: 10,
        content: ''
      },
      editMode: true,
      error: false
    }),
    props: {
      idea: {
        type: Object,
        default: () => ({})
      },
      create: {
        type: Function
      },
      update: {
        type: Function
      },
      disabled: {
        type: Boolean,
        default: true
      },
      labelsActive: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      avg() {
        return Math.round(((this.formValues.ease + this.formValues.impact + this.formValues.confidence) / 3) * 100) / 100;
      }
    },
    methods: {
      saveIdea() {
        if (!this.formValues.content) {
          this.error = true;
        } else if (this.formValues.id) {
          this.update(this.formValues)
            .then(res => {
              this.editMode = false;
            });
        } else {
          this.create(this.formValues);
        }
      },
      cancel() {
        this.$emit('cancel');

        if (this.formValues.id) {
          this.editMode = false;
          this.formValues = _.clone(this.idea);
        }

        this.error = false;
      },
      editIdea() {
        this.editMode = true;
      }
    },
    created() {
      this.formValues = _.clone(this.idea);

      this.editMode = !this.disabled;
    }
  }
</script>

<style lang="scss">
  @import "idea-form";
</style>
