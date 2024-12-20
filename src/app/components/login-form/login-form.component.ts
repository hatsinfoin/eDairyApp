import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules
import { UserLoginService } from '../../services/user-login-service.service'; // Import your service
import { UserRegistrationService } from '../../services/user-registration.service'; // Import your service
import { UserLogin } from 'src/app/dataDTO/UserLogin.data'; // Import UserLogin DTO
import { StorageService } from '../../services/storage-service.service'; // Import your StorageService
import { UserRegistration } from 'src/app/dataDTO/UserRegistration.data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  // Define the form groups
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;

  errorMessage: string | null = null;
  segment: string = 'login';  // Set default segment to 'login'
  successMessage: string | null = null; // To store success message
  errorRegMessage: string | null = null; // To store error message
  constructor(
    private modalCtrl: ModalController,
    private userLoginService: UserLoginService,
    private router: Router,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private storageService: StorageService,
    private userRegistrationService: UserRegistrationService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Initialize login form with validation
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Username field with validation
      password: ['', Validators.required] // Password field with validation
    });

    // Initialize forgot password form with validation
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Email field for forgot password
    });

    // Initialize register form with validation
    this.registerForm = this.fb.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      userRole: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });

    this.storageService.init(); // Initialize the storage
  }

  segmentChanged(event: any) {
    console.log('Segment changed to: ', event.detail.value);
    // Add any custom logic here when the segment changes
  }

  goToRegister(setment: string) {
    // Switch to the 'register' segment when "Join Now" is clicked
    this.segment = setment;
  }

  // Cancel modal and close
  cancel() {
    alert("cancel");
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // Confirm modal action
  confirm() {
    alert("confirm");
    return this.modalCtrl.dismiss('confirm');
  }

  // Navigate to signup page
  singup() {
    this.router.navigate(['signup']);
  }

  // Navigate to forgot password page
  onForgot() {
    this.router.navigate(['forgot-password']);
  }

  // Login form submission logic
  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      const userLogin = new UserLogin();
      userLogin.setUsername(loginForm.get('username')?.value);
      userLogin.setPassword(loginForm.get('password')?.value);
      userLogin.setUserRole('user'); // Example user role, modify if needed

      console.log(userLogin);

      // Call validateUserLogin method of the service
      this.userLoginService.validateUserLogin(userLogin).subscribe(
        (response: any) => {
          if (response) {
            this.storageService.saveUserDetails(response).then(() => {
              console.log('User details saved');
              this.cancel();
            });
          } else {
            console.error('Invalid login credentials');
            this.errorMessage = 'Invalid credentials, please try again.';
          }
        },
        (error) => {
          console.error('Login error', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Register form submission logic
  register(registerForm: FormGroup) {

    if (registerForm.valid) {
      const userRegistration = new UserRegistration(
        registerForm.get('id')?.value,
        registerForm.get('userId')?.value,
        registerForm.get('firstName')?.value,
        registerForm.get('lastName')?.value,
        registerForm.get('email')?.value,
        registerForm.get('password')?.value,
        registerForm.get('confirmPassword')?.value,
        registerForm.get('userRole')?.value
      );
      userRegistration.id = null;
      console.log('Registering user:', userRegistration);
      try {
        // Call registerUser from UserRegistrationService
        this.userRegistrationService.registerUser(userRegistration).subscribe(
          (response) => {
            if (response === undefined || response === null) {
              console.error('Registration response is undefined or null');
              this.errorMessage = 'User Id already exists, Try with another ID.'; // Error message
              this.presentAlert(this.errorMessage);
              this.successMessage = null;
              return;
            }

            // On successful registration
            console.log('Registration successful:', response);
            this.successMessage = 'Registration successful! Please check your email for confirmation.'; // Success message
            this.presentAlert(this.successMessage);

            this.errorMessage = null; // Clear any previous error messages
            this.goToRegister('login');
          },
          (error) => {
            // On failure
            console.error('Registration error:', error.message);
            this.errorMessage = 'Registration failed. Please try again later.'; // Error message
            this.presentAlert(this.errorMessage);

            this.successMessage = null; // Clear any previous success messages
          }

        );
      } catch (error) {
        // Catching errors in the synchronous code or form validation
        console.error('Unexpected error:', error);
        this.errorMessage = 'An unexpected error occurred. Please try again later.'; // Generic error message
        this.presentAlert(this.errorMessage);

        this.successMessage = null; // Clear any previous success messages
      }
    } else {
      console.log('Register form is invalid');
      this.errorRegMessage = 'Please fill all required fields correctly.';
      this.successMessage = null; // Clear any previous success messages
    }

  }



  // Forgot password form submission logic
  resetPassword(forgotPasswordForm: FormGroup) {
    if (forgotPasswordForm.valid) {
      console.log('Password reset for email: ', forgotPasswordForm.get('email')?.value);

      // Call your forgot password service here to reset the password
      // this.userLoginService.forgotPassword(forgotPasswordForm.get('email')?.value).subscribe(
      //   (response) => {
      //     console.log('Password reset link sent successfully');
      //   },
      //   (error) => {
      //     console.error('Password reset error', error);
      //   }
      // );
    } else {
      console.log('Forgot password form is invalid');
    }
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  // Facebook login handler (to be implemented)
  onfacebook() {
    console.log('Facebook login clicked');
    // Implement Facebook login logic here
  }

  // Google login handler (to be implemented)
  onGoogle() {
    console.log('Google login clicked');
    // Implement Google login logic here
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['Action'],
    });

    await alert.present();
  }

}
