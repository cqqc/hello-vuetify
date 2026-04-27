<template>
  <v-card width="400" class="pa-4">
    <v-card-title>사용자 정보 입력 33333</v-card-title>

    <v-card-text>
      <v-form ref="formRef">
        <v-text-field
          v-model="form.name"
          label="이름"
          :rules="[rules.required]"
        />

        <v-text-field
          v-model="form.email"
          label="이메일"
          :rules="[rules.required, rules.email]"
        />

        <v-text-field
          v-model="form.phone"
          label="전화번호"
        />
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text>취소</v-btn>
      <v-btn color="primary" @click="submit">저장</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: ''
})

const rules = {
  required: v => !!v || '필수 입력입니다.',
  email: v => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.'
}

const submit = async () => {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  console.log('폼 데이터:', form.value)

  closeOverlay()
}
</script>
