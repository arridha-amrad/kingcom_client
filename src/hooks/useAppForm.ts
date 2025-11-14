import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import {
  AuthSubscribeBtn,
  AuthTextField,
} from '@/components/Forms/AuthForm/auth.FormComponents'
import {
  ProductInput,
  ProductSubmitButton,
  ProductTextArea,
} from '@/components/Forms/ProductForm/product.FormComponent'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: {
    AuthTextField,
    ProductTextArea,
    ProductInput,
  },
  formComponents: {
    AuthSubscribeBtn,
    ProductSubmitButton,
  },
  fieldContext,
  formContext,
})
