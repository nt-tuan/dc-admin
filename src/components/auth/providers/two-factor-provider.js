export const newTwoFactorProvider = ({
  method,
  setupButtonLabel,
  isPreparing,
  setup,
  mutate,
  isSubmitting,
  component,
  register,
  helperText,
  isDisabled = false
}) => ({
  method,
  setupButtonLabel,
  isPreparing,
  setup,
  mutate,
  isSubmitting,
  component,
  register,
  helperText,
  isDisabled
});
