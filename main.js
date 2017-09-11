/*global YoutubeInterfaceManager, MirrorFinder */

(function () {
    "use strict";

    var url = window.location.href;

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    var execute = function () {
        console.log('execute');

        var button;

        var timeToFindSearchButton = setInterval(function () {
            console.log('Trying to find the search button...');
            button = document.getElementById('search-icon-legacy');

            if (! button) {
                button = document.getElementById('search-btn');
            }

            if (button) {
                clearInterval(timeToFindSearchButton);
                doStuff(button);
                console.log("Found it");
            }
        }, 1000);
    };

    var doStuff = function (button) {
        var buttonNewTab = document.getElementById('button-newTab');

        if (! buttonNewTab) {
            var newNode = document.createElement('div');
            newNode.id = 'button-newTab';
            newNode.style.cursor = "pointer";
            newNode.style.width = "65px";
            newNode.style.border = "1px solid var(--yt-searchbox-legacy-button-border-color)";
            newNode.style.backgroundColor = "var(--yt-searchbox-legacy-button-color)";
            newNode.style.borderRadius = "0 2px 2px 0";
            newNode.style.margin = "0";
            newNode.style.textAlign = "center";

            newNode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 30" ' +
                'enable-background="new 0 0 24 24" xml:space="preserve" style="width: 20px;height: 20px; margin-top: 6px"><g><path fill="#000000" d="M18.8,13.7c-0.2,0-0.4,0.2-0.4,0.4v6.2H3.6V5.8h6.3c0.2,0,0.4-0.2,0.4-0.4S10.1,5,9.9,5H3.2   C3,5,2.8,5.2,2.8,5.4v15.3c0,0.2,0.2,0.4,0.4,0.4h15.6c0.2,0,0.4-0.2,0.4-0.4v-6.6C19.2,13.9,19.1,13.7,18.8,13.7z"></path><path fill="#000000" d="M20.8,2.8h-6.7c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4h5.7L8.3,15.1c-0.2,0.2-0.2,0.4,0,0.6   c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1L20.4,4.3V10c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4V3.3C21.2,3,21,2.8,20.8,2.8z"></path></g></svg>';

            newNode.addEventListener('click', function () {
                var queryTerm = document.querySelector('input#search').value;

                chrome.runtime.sendMessage({url: 'https://www.youtube.com/results?search_query=' + queryTerm}, function(response) {
                    console.log(response);
                });
            });

            insertAfter(newNode, button);

            console.log('criado');
        } else {
            console.log('já existia');
        }
    };

    var prepareForUrlChanges = function () {
        // Set a interval to check for url changes
        setInterval(function () {
            if (url !== window.location.href) {
                console.log('Url is different!');

                url = window.location.href;

                execute();
            }
        }, 500);
    };

    prepareForUrlChanges();
    execute();
}());
