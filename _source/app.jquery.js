/**
 * AntiRip.js
 * Version 1.2
 * By Farham Aghdasi
 */

$(document).ready(function() {

    /**
     * Set Default Value
     */
    let AllowedDomains, AllowedProtocol, OfflineDomainChecker;

    function DefaultValue(SettingNames) {
        if (SettingNames === undefined) {
            SettingNames = false;
        }
    }
    DefaultValue(AllowedDomains, AllowedProtocol, OfflineDomainChecker);


    /**
     * Delete Setting File After Loading Page
     */
    let scripts = $('[language="javascript"]');

    $(window).on('load', function() {
        if (RemoveScript) {
            scripts.remove();
        }
    });


    /**
     * Optimize JS
     */
    if (DisablePrint) {
        BlockPrint(80);
    }
    if (DisableSavePage) {
        SavePage(83);
    }
    if (DisableViewSource) {
        HideSourceCode(85);
    }
    if (DisableRefresh) {
        DisableF5(116, 82);
    }
    if (DisableFullscreen) {
        FullScreen(122);
    }


    /**
     * Debug Mode For AntiRip.js
     */
    if (DebugMode) {
        scripts.remove();
    }

    /**
     * Clear Alert
     */
    if (DisableAlert) {
        window.alert = function() {};
    }

    /**
     * Disable Contole Log
     */
    if (DisableConsole) {
        console.log = function() {};
        setInterval(function() {
            console.log = function() {};
        }, 1000);
    }

    /**
     * Block Every ctrl Command
     */
    if (Disablectrl) {
        $(document).on('keydown', function(e) {
            if (e.ctrlKey && e.keyCode) {
                e.preventDefault(); // => Make It Disable
            }
        });
    }

    /**
     * Block Ctrl S
     */
    function SavePage(k) {
        $(document).on('keydown', function(e) {
            if (e.ctrlKey && e.keyCode === k) {
                e.preventDefault(); // => Make It Disable
            }
        });
    }

    /**
     * Block Print
     */
    function BlockPrint() {
        $(document).on('keydown', function(e) {
            if (e.ctrlKey && e.keyCode === 80) {
                e.preventDefault(); // => Make It Disable
            }
        });
    }

    /**
     * Block Right Click
     */
    if (DisableInspectElement) {
        $(document).on('contextmenu', function(e) {
            e.preventDefault();
        });
        $(document).on('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.keyCode === 73)) {
                e.preventDefault();
            }
        });
    }

    /**
     * Hide View Source Shortcut
     */
    function HideSourceCode(k) {
        $(document).on("keydown", function(e) {
            if (e.ctrlKey && e.keyCode === k) {
                e.preventDefault();
            }
        });
    }

    /**
     * Block Copy
     */
    if (DisableCopy) {
        $(document).on("keydown", function(e) {
            if (e.ctrlKey && e.keyCode === 67) {
                e.preventDefault();
            }
        });
        $(document).on("copy", function(e) {
            e.preventDefault();
        });
    }

    /**
     * Disable Paste
     */
    if (DisablePaste) {
        $(document).on("keydown", function(e) {
            if (e.ctrlKey && e.keyCode === 80) {
                e.preventDefault();
            }
        });
        $(document).on("paste", function(e) {
            e.preventDefault();
        });
    }

    /**
     * Domain License
     */
    const DomainURL = new URL(window.location.href);
    let TrapEn;

    if (AllowedProtocol && !AllowedProtocol.includes(DomainURL.protocol)) {
        TrapEn = true;
    }

    if (AllowedDomains && !AllowedDomains.includes(DomainURL.host)) {
        TrapEn = true;
    }

    if (OfflineDomainChecker && (DomainURL.origin === 'files:' || DomainURL.protocol === 'file:')) {
        TrapEn = true;
    }

    /**
     * Set Page Password
     */
    if (PasswordPage) {
        let hash__ = MD5.generate(PasswordPage);
        let __check = MD5.generate(prompt("Enter The Password"));
        if (__check !== hash__) {
            TrapEn = true;
        }
    }

    /**
     * Send Member To Blank Page
     */
    if (SendBlank) {
        $(window).on('load', function() {
            setInterval(function() {
                window.open();
            }, 5000);
        });
    }

    /**
     * Notify Before Window Close
     */
    window.onbeforeunload = function(e) {
        return e;
    };

    /**
     * Trap For Domain
     */
    let urlQuery = new URL(window.location.href).pathname + " " + $('title').text();

    if (TrapEn) {
        window.location.href = DomainTrapSend + "?" + encodeURIComponent(urlQuery);
    }

    /**
     * Disable Drag Content
     */
    if (DisableDrag) {
        $(document).on('dragstart dragover dragleave dragend', function(e) {
            e.preventDefault();
        });
    }

    /**
     * Disable Iframe
     */
    if (DisableIframe) {
        $('iframe').each(function() {
            $(this).parent().append(overlay);
        });
    }

    /**
     * Disable Audio Download Button
     */
    if (DisableAudioDownload) {
        $('audio').each(function() {
            $(this).attr('controlsList', 'nodownload');
            $(this).attr('preload', 'none');
            $(this).css('-webkit-media-controls-enclosure', 'overflow:hidden');
            $(this).css('-webkit-media-controls-panel', 'width: calc(100% + 30px);');
        });
    }

    /**
     * Disable F5
     */
    function DisableF5(F5, R) {
        $(document).on("keydown", function(e) {
            if (e.keyCode === F5 || (e.ctrlKey && e.keyCode === R) || (e.ctrlKey && e.shiftKey && e.keyCode === R) || (e.altKey && e.keyCode === R)) {
                e.preventDefault();
            }
        });
    }

    /**
     * Disable Full Screen
     */
    function FullScreen(F11) {
        $(window).on("keydown", function(e) {
            if (e.keyCode === F11) {
                e.preventDefault();
            }
        });
    }

    /**
     * lazysizes
     */
    let _IMG = $('img');

    if (LazySizes) {
        _IMG.each(function() {
            $(this).addClass('lazyload');
        });
    }

    /**
     * Notification Tool
     */
    if (AllowNotification && !("Notification" in window)) {
        swal("ارور !", "مرورگر شما از اعلان ها پشتیبانی نمیکند !", "error");
    } else if (Notification.permission === "granted") {
        new Notification(AllowNotification[0], {
            body: AllowNotification[1],
            icon: AllowNotification[2],
            vibrate: true
        });
    } else {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                new Notification(AllowNotification[0], {
                    body: AllowNotification[1],
                    icon: AllowNotification[2],
                    vibrate: true
                });
            } else {
                // Handle the case where user denies or blocks notifications
                swal("ارور !", "مرورگر شما از اعلان ها پشتیبانی نمیکند !", "error");
            }
        });
    }

    /**
     * Graphical Console Log
     */
    console.log("%c AntiRip.js v1.2", "color:red;background:black;border-radius:30px;box-shadow: 0 1px 10px 0 rgba(0,0,0,0.2);color: red;cursor: not-allowed;font-size:30px;padding:20px");

    /**
     * Block Screenhot Page
     */
    if (DisableScreenShot) {
        let _Title = $('title').text();

        function BlurPage() {
            $('body').css('-webkit-filter', 'blur(5px)');
            document.title = 'Take Mouse To Body !';
        }

        function UnBlur() {
            $('body').css('-webkit-filter', 'blur(0px)');
            document.title = _Title;
        }

        $(document).on('mouseleave', function() {
            BlurPage();
        });
        $(document).on('mouseenter', function() {
            UnBlur();
        });
    }

    /**
     * Online Or Offline
     */
    if (OfflineNotify) {
        /**
         * First Way
         */
        $(window).on('offline', function() {
            swal('You Are Offline !', 'Turn On Network !', 'warning');
        });

        /**
         * Second Way
         */
        if (!window.navigator.onLine) {
            swal('You Are Offline !', 'Turn On Network !', 'warning');
        }
    }

    /**
     * Disable Zoom In Mobile
     * فقط به متا تگ ویو پورت ، کدی اضافه میشه که از زوم جلوگیری میکنه
     */
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">')
    /**
     * For Chrome
     */
    $('body').style.zoom = 'reset'

})