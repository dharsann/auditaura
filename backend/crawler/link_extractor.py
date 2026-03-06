async def extract_links(page):
    """Return unique internal links found on the current async page."""

    links = []

    elements = await page.locator("a").all()

    for el in elements:
        try:
            href = await el.get_attribute("href")
            if href and href.startswith("/"):
                links.append(href)
        except Exception:
            # ignore elements we can't read
            pass

    return list(set(links))