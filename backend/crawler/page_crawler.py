async def crawl_pages(page, base_url, depth=2):
    """Recursively navigate a site up to `depth` using an async page object."""

    visited = set()
    discovered = []

    async def crawl(current_url, level):
        if level > depth:
            return
        if current_url in visited:
            return

        visited.add(current_url)
        try:
            await page.goto(base_url + current_url)

            links = await page.locator("a").all()
            for link in links:
                href = await link.get_attribute("href")
                if href and href.startswith("/"):
                    discovered.append(href)
                    await crawl(href, level + 1)
        except Exception:
            # ignore navigation or locator errors
            pass

    await crawl("/", 0)
    return list(set(discovered))