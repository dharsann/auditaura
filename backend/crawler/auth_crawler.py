from playwright.sync_api import sync_playwright


def login_and_get_page(url, username=None, password=None):

    playwright = sync_playwright().start()

    browser = playwright.chromium.launch(headless=True)

    page = browser.new_page()

    page.goto(url)

    if username and password:

        page.fill("input[name='email']", username)
        page.fill("input[name='password']", password)

        page.click("button[type='submit']")

        page.wait_for_load_state("networkidle")

    return browser, page