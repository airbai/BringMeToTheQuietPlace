chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var url = changeInfo.url || tab.url;
    if (url && changeInfo.status == "loading") {
        var sites = JSON.parse(localStorage["beRedirectedSites"] || "[]") || [".qq.com", "weibo.com", "newsmth.net", "douban.com"];
        var redirect = false;
        $.each(sites, function (k, v) {
            redirect = url.indexOf(v) > -1;
            if (redirect) {
                var places = JSON.parse(localStorage["thequiteplace"] || "[]") || [];
                $.each(places, function (i, p) {
                    if (p.isDefault) {
                        chrome.tabs.update(tabId, { url: p.place });
                        return false;
                    }
                });

                return false;
            }
        });
    }
});