import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrap.config.js';

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
      category: 'Email Verification'
    });

    console.log('Email sent succesfully', response);
  } catch (err) {
    throw new Error(`Error sending verification email, ${err}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid:"b601b654-2258-4ae1-8890-ae4c2d161856",
      template_variables:{
        company_info_name: 'Booking app Company',
        name: name
      }
    })
    console.log('Welcome email sent succesfully');
  } catch (error) {
    throw new Error(`Error sending welcome email, ${err}`);
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{email}]
  try{
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
     subject: 'Reset your password ',
     html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
     category: 'Password Reset'
    })
    console.log('Password reset email sent succesfully');
  }catch(err){
    console.log(err);
    throw new Error(`Error sending password reset email, ${err}`);
  }
}


export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};