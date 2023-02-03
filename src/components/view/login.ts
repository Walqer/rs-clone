export function renderLoginForm() {
    return `
    <form class="auth-form login-form">
        <h2>Login to Task manager</h2>
        <input type="text" placeholder="Enter login" required >
        <input type="password" placeholder="Enter password" required >
        <button  type="submit">Log in</button>
        <p>or</p>
        <a href="/auth?type=signup">Register accaunt</a>
    </form>`;
}
