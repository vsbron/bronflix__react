import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import useModal from "@/context/ModalContext";
import { changePasswordFormSchema } from "@/lib/formSchemas";
import { ChangePasswordFormData } from "@/lib/types";
import { auth } from "@/utils/firebase";

import FormWrap from "@/components/Forms/FormWrap";
import {
  FormError,
  FormGroup,
  FormLabelError,
} from "@/components/Forms/FormElements";

function ChangePasswordForm() {
  // Setting the state for the current form status and error
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { closeModal } = useModal();

  // Getting the functions and errors from react hook form
  const {
    register,
    handleSubmit,
    formState: { errors: err },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  // Form success handler
  const onSubmit = async (data: ChangePasswordFormData) => {
    // Enable submitting state
    setIsSubmitting(true);

    try {
      // Guard clause
      if (!auth.currentUser) {
        setFormError("No authenticated user found.");
        setIsSubmitting(false);
        return;
      }

      // Verify that current password is correct
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email as string,
        data.currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update the password
      await updatePassword(auth.currentUser, data.newPassword);

      // Close the form
      closeModal();
    } catch (e: unknown) {
      console.error(e);
      let message = "Couldn't change password due to an unknown error";
      
      if (e instanceof Error && e.message.includes("auth/invalid-credential")) {message = "Your current password is incorrect"}
      setFormError(message);
    } finally {
      // Disabling submitting state
      setIsSubmitting(false);
    }
  };

  // Returned JSX
  return (
    <>
      <FormWrap
        title="SET A NEW PASSWORD"
        submit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        error={formError}
        buttonText="CHANGE PASSWORD"
      >
        <FormGroup>
          <FormLabelError name="Current Password">
            {err.currentPassword && (
              <FormError>({err.currentPassword.message})</FormError>
            )}
          </FormLabelError>
          <input
            type="password"
            id="currentPassword"
            className="input-styles input-wide-styles"
            {...register("currentPassword")}
            placeholder="Enter your current password"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <FormLabelError name="Password">
            {err.newPassword && (
              <FormError>({err.newPassword.message})</FormError>
            )}
          </FormLabelError>
          <input
            type="password"
            id="newPassword"
            className="input-styles input-wide-styles"
            {...register("newPassword")}
            placeholder="Enter the new password"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <FormLabelError name="Confirm Password">
            {err.confirmPassword && (
              <FormError>({err.confirmPassword.message})</FormError>
            )}
          </FormLabelError>
          <input
            type="password"
            id="confirmPassword"
            className="input-styles input-wide-styles"
            {...register("confirmPassword")}
            placeholder="Confirm your new password"
            disabled={isSubmitting}
          />
        </FormGroup>
      </FormWrap>
    </>
  );
}

export default ChangePasswordForm;
