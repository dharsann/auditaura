async def collect_network_requests(page):
    """Attach a callback to gather network requests on an async page."""

    requests = []

    def handle_request(req):
        requests.append({
            "url": req.url,
            "method": req.method
        })

    # the async page object supports the same .on API
    page.on("request", handle_request)

    return requests