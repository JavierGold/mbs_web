import type { FormSubmissionMessages, FormSubmissionState } from '../forms/formSubmission'

export function FormSubmitButton({
  state,
  label,
  sendingLabel,
  className,
}: {
  state: FormSubmissionState
  label: string
  sendingLabel: string
  className: string
}) {
  const disabled = state === 'sending' || state === 'success'
  return <button className={className} type="submit" disabled={disabled}>
    {state === 'sending' ? sendingLabel : label}
  </button>
}

export function FormSubmissionStatus({
  state,
  messages,
}: {
  state: FormSubmissionState
  messages: FormSubmissionMessages
}) {
  if (state === 'idle') return <div className="form-submission-status form-submission-status--idle" aria-live="polite" aria-atomic="true" />

  const isError = state === 'error'
  const icon = state === 'success' ? '✓' : state === 'error' ? '!' : state === 'unavailable' ? 'i' : ''
  return <div className={`form-submission-status form-submission-status--${state}`} role={isError ? 'alert' : 'status'} aria-live={isError ? 'assertive' : 'polite'} aria-atomic="true">
    {icon && <span className="form-submission-status__icon" aria-hidden="true">{icon}</span>}
    <span>{messages[state]}</span>
  </div>
}
