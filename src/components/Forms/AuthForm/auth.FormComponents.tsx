import { useFieldContext, useFormContext } from '@/hooks/useAppForm'
import { cn } from '@/utils'
import { useStore } from '@tanstack/react-form'
import { useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export const AuthSubscribeBtn = ({ label }: { label: string }) => {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 flex items-center justify-center gap-2 h-16 text-xl font-semibold bg-foreground w-full disabled:brightness-75 text-background rounded-full"
        >
          {label}
        </button>
      )}
    </form.Subscribe>
  )
}

const ErrorMessages = ({
  errors,
}: {
  errors: Array<string | { message: string }>
}) => {
  const error =
    errors[0] && (typeof errors[0] === 'string' ? errors[0] : errors[0].message)

  return <div className="text-sm text-red-400 pl-4 mt-1">{error}</div>
}

export const AuthTextField = ({
  icon,
  ...props
}: { icon: React.ReactNode } & InputHTMLAttributes<HTMLInputElement>) => {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(
            'bg-foreground/10 focus:ring-2 pl-16 pr-4 ring-foreground/50 text-xl outline-0 w-full h-16 rounded-full',
            props.type === 'password' ? 'pr-16' : 'pr-4'
          )}
          {...props}
          type={
            props.type === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : props.type
          }
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 aspect-square">
          {icon}
        </div>
        {props.type === 'password' && (
          <div className="absolute top-1/2 -translate-y-1/2 right-4 aspect-square">
            {showPassword ? (
              <EyeOff
                onClick={() => setShowPassword(false)}
                className="stroke-foreground/50"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="stroke-foreground/50"
              />
            )}
          </div>
        )}
      </div>
      {field.state.meta.isDirty && <ErrorMessages errors={errors} />}
    </div>
  )
}
