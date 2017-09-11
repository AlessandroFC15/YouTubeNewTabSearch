
(function () {
    "use strict";

    var openTabRightNextToActiveTab = function (url, activeTabIndex, isActive) {
        if (isActive === undefined) {
            isActive = false;
        }

        chrome.tabs.create({ url: url, active: isActive, index: activeTabIndex + 1});
    };

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
                "from the extension");

            openTabRightNextToActiveTab(request.url, sender.tab.index);

            sendResponse({success: true});
        });
}());

