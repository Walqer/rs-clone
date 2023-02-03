export function renderSignupForm() {
    return `
    <form class="auth-form signup-form">
        <h2>Account registration</h2>
        <input type="text" placeholder="Enter login" required >
        <input type="password" placeholder="Enter password" required >
        <input type="password" placeholder="Repeat password" required >
        <button type="submit">Register</button>
        <p align="center">or</p>
        <a align="center"  href="/auth?type=login">Log in</a>
    </form>`;
}
