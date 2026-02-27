from playwright.sync_api import sync_playwright

def verify_login_page_redirect():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to login page
        # Note: Port 3000 is standard for Next.js, but check logs if different
        try:
            page.goto("http://localhost:3000/login", timeout=30000)

            # Verify the login form is visible
            # This confirms the page loaded and didn't crash
            page.wait_for_selector('text="Login Form"')

            # Take a screenshot of the login page
            page.screenshot(path="verification_login.png")
            print("Login page loaded successfully. Screenshot saved as verification_login.png")

        except Exception as e:
            print(f"Error accessing login page: {e}")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_login_page_redirect()
