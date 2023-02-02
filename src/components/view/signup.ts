export function renderSignupForm() {
    return `
    <form class="form-auth" action="#" method="post">
        <h2>Account registration</h2>
        <input type="email" name="login-auth" placeholder="Enter login" required >
        <input type="password" name="pass-auth" placeholder="Enter password" required >
        <input type="password" name="pass-auth" placeholder="Repeat password" required >
        <button class="button-auth" type="submit" name="submit-auth">Register</button>
        <p align="center">or</p>
        <a align="center"  href="/auth?type=login">Log in</a>
    </form>`;
}
