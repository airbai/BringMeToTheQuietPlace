var util = {
    i18n: chrome.i18n.getMessage
}
if (localStorage["choose"] != "false") {
  localStorage["choose"] = "true";
}
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //alert(localStorage["choose"])
    if(localStorage["choose"] = "true"){
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
    }
});

chrome.extension.onMessage.addListener(function(req, sender, callback) {
  if(req)
  {
      if(req.action == "setChoose")
      {
          localStorage["choose"] = req["choose"];
          alert(req["choose"])
      }

      if(req.action == "getChoose")
      {
        callback({choose: localStorage["choose"]})
      }
  }
});