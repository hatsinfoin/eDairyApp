export class UserRegistration {
    id: string | null;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userRole: string; // Role of the user (Admin, User, etc.)
    status: any;
    body: any;

    // Default constructor with default values
    constructor(
        id: string | null = null,  // Default value is null
        userId: string = '',
        firstName: string = '',
        lastName: string = '',
        email: string = '',
        password: string = '',
        confirmPassword: string = '',
        userRole: string = 'user'  // Default value is 'user'
    ) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.userRole = userRole;
    }

    // Optional: You can add some methods to handle validation, password matching, etc.

    // Validate if the password and confirmPassword match
    isPasswordMatching(): boolean {
        return this.password === this.confirmPassword;
    }

    // Optional: Override toString method to print a formatted output
    toString(): string {
        return `UserRegistration [id=${this.id}, userId=${this.userId}, firstName=${this.firstName}, lastName=${this.lastName}, email=${this.email}, userRole=${this.userRole}]`;
    }
}
