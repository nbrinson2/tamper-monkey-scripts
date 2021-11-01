// ==UserScript==
// @name         Youtube Sort Playlists Alphabetically
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Reorder youtube playlists in alphabetical order
// @author       You
// @match        *://*.youtube.com*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener("load", function() {

        // show whole playlist
        document.getElementsByTagName("ytd-guide-entry-renderer")[8].click()

        organizeAndAppend();
    });
})();

function organizeAndAppend() {

    let sidebarLength = document.getElementsByTagName("ytd-guide-entry-renderer").length;
    let showMoreLinkPosition = sidebarLength - 19;

    let elementArray = Array.from(document.getElementsByTagName("ytd-guide-entry-renderer"));
    elementArray = elementArray.splice(9, showMoreLinkPosition);

    elementArray = elementArray.sort(comparator);

    elementArray.forEach(a => document.getElementById("expandable-items").appendChild(a));

}

function addNewElement() {

    // clone playlist element
    let element = document.getElementsByTagName("ytd-guide-entry-renderer")[44].cloneNode(true);

    // append new playlist element to playlist div
    document.getElementById("expandable-items").appendChild(element);

    // set link to playlist
    document.querySelectorAll(".style-scope ytd-guide-entry-renderer a")[45].href = "/playlist?list=PLgPsjRCo6B9FXN3UyfH9AvI8rPXI3cb8P";

    // set name to playlist
    document.querySelectorAll(".style-scope ytd-guide-entry-renderer a tp-yt-paper-item  yt-formatted-string")[45].innerText = "brigham";
}

function comparator(a, b) {
    if (a.children[0].title < b.children[0].title) {
        return -1;
    }
    if (a.children[0].title > b.children[0].title) {
        return 1;
    }
    return 0;
}