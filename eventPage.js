(function () {
    "use strict";

    var openTabRightNextToActiveTab = function (url, activeTabIndex, isActive) {
        if (isActive === undefined) {
            isActive = false;
        }

        chrome.tabs.create({url: url, active: isActive, index: activeTabIndex + 1});
    };

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            openTabRightNextToActiveTab(request.url, sender.tab.index);
        });
}());

