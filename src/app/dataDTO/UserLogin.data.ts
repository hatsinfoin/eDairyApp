export class UserLogin {
    username: string;  // Can be email or username
    password: string;
    email: string;
    userRole: string;  // Role of the user (Admin, User, etc.)

    // Constructor for login with optional parameters
    constructor(
        username: string = '',
        password: string = '',
        userRole: string = '',
        email: string = ''
    ) {
        this.username = username;
        this.password = password;
        this.userRole = userRole;
        this.email = email;
    }

    // Getters and setters (optional if using direct access to fields)
    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getUserRole(): string {
        return this.userRole;
    }

    public setUserRole(userRole: string): void {
        this.userRole = userRole;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // String representation of the object
    public toString(): string {
        return `UserLogin [username=${this.username}, userRole=${this.userRole}]`;
    }
}
