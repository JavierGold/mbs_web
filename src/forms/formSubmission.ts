export type FormSubmissionState = 'idle' | 'sending' | 'success' | 'error' | 'unavailable'
export type FormSubmissionMessages = Record<Exclude<FormSubmissionState, 'idle'>, string>
/** The submitter must resolve only after a backend confirms the request succeeded. */
export type FormSubmitter = () => Promise<void>

export async function runFormSubmission(
  submitter: FormSubmitter | null,
  setState: (state: FormSubmissionState) => void,
) {
  if (!submitter) {
    setState('unavailable')
    return
  }

  setState('sending')
  try {
    await submitter()
    setState('success')
  } catch {
    setState('error')
  }
}
