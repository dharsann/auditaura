from .auth_crawler import login_and_get_page


def crawl_application(url, username=None, password=None):

    browser, page = login_and_get_page(url, username, password)

    links = page.eval_on_selector_all(
        "a",
        "elements => elements.map(e => e.href)"
    )

    browser.close()

    return {
        "pages": links,
        "api_calls": []
    }