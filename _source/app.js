/**
 * AntiRip.js
 * Version 1.2
 * By Farham Aghdasi
 */



/*
 * Before Use :
 * ساختار به صورت فایل ستینگ هست ، یعنی در واقع نیازمند به یک فایل تنظیمات برای اجرا کردن هر یک از دستورات هست که کار شمارو ساده تر میکنه
 * برای همین پیشنهاد میشه فایل تنظیمات رو حذف کنید ، سپس کد هایی که نیاز دارید رو در قالب خودتون قرار بدید
 * چون باعث میشه احتمال دزدیده شدن قالب شما کاهش پیدا کنه
 */

/**
 * Set Default Value
 * زمانی که متغیر ها فراخوانی نشده باشند ، مقدار دیفالت قرار داده میشه
 */
if (DefaultValueVars) {
    let AllowedDomains, AllowedProtocol, OfflineDomainChecker;
    function DefaultValue(SettingNames) {
        if (SettingNames === undefined) {
            SettingNames = false;
        }
    }
    DefaultValue(AllowedDomains, AllowedProtocol, OfflineDomainChecker);
}


/**
 * Delete Setting File After Loading Page
 */

let scripts = document.querySelector('[language="javascript"]');

window.addEventListener('load', () => {
    if (RemoveScript) {
        scripts.remove()
    }
})


/**
 * Optimize JS
 */

if (DisablePrint) {
    BlockPrint(80)
}
if (DisableSavePage) {
    SavePage(83)
}
if (DisableViewSource) {
    HideSourceCode(85)
}
if (DisableRefresh) {
    DisableF5(116, 82)
}
if (DisableFullscreen) {
    FullScreen(122)
}


/**
 * Debug Mode For AntiRip.js
 * All Vars Become False
 * این کد ی رفرسن ارور ایجاد میکنه و باعث میشه که راحت تر وارد دیباگ مود بشید 
 */
if (DebugMode) {
    scripts.remove()
}

/**
 * Clear Alert
 * باعث میشه که آلرت هارو پاک کنه
 */
if (DisableAlert) {
    window.alert = "";
}


/**
 * Disable Contole Log
 * Note: Insert Graphical Console log Up This Code
 * باعث میشه کنسول لاگ رو پاک کنه
 */
if (DisableConsole) {
    console.log = "";
    setInterval(() => {
        console.log = "";
    }, 1000)
}

/**
 * Block Every ctrl Command
 * این کد باعث میشه تمامی دستوراتی که با کنترل شروع میشه پرونت بشه و دیگه نیاز به نوشتن کی کد نیست
 */

if (Disablectrl) {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.keyCode) {
            e.preventDefault() // => Make It Disable
        }
    })
}

/**
 * Block Ctrl S
 * Prevent Default Ctrl With S (83)
 */
function SavePage(k) {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.keyCode === k) {
            e.preventDefault() // => Make It Disable
        }
    })
}




/** 
 * Block Ctrl P (print)
 * این کد با کی کد کار میکنه و مکانیزم اون با ایونت ها هست
*/
function BlockPrint() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault(); // => Make It Disable
        }
    });
}




/**
 * Block Right Click
 * قابلیت اینسپکت المنت را به طور کامل غیر فعال میکند
 */
if (DisableInspectElement) {
    /**
     * With ContextMenu Event
     */
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    /**
     * With F12 And ctrl + i With Keycode
     */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.keyCode === 73)) {
            e.preventDefault();
        }
    });
}


/**
 * Hide View Source Shortcut
 شورت کات برای دیدن سورس صفحه معمولا کنترل یو است که در اینجا پرونت شده با کی کد
 */

function HideSourceCode(k) {
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.keyCode === k) {
            e.preventDefault();
        }
    });
}

/**
 * Block Copy
 * با استفاده از چند روش ، قابلیت کپی کردن غیر فعال میشود
 */

if (DisableCopy) {
    /**
     * With Event Key Code
     */
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
        }
    });
    /**
     * With Body 
     */
    document.body.setAttribute("oncut", "return true");
    /**
     * With oncopy Event
     */
    document.addEventListener('copy', (e) => {
        e.preventDefault()
    })

}

/**
 * Disable Paste
 * با یک ایونت ساده کار میکنه
 */
if (DisablePaste) {
    /**
     * With Event Key Code
     */
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
        }
    });
    /**
     * With Body 
     */
    document.body.setAttribute("onpaste", "return true");
    /**
     * With oncopy Event
     */
    document.addEventListener('paste', (e) => {
        e.preventDefault()
    })
}


/**
 * Domain License
 * عنوان دامنه ها درون یک آبجکت قرار میگیرد که فقط سایت هایی که دامنه آنها با این برابر است ، دسترسی لود شدن میدهند
 */

const DomainURL = new URL(window.location.href);
let TrapEn;

/**
 * متغیر اول برای راحت کردن کار ما و انجام کار های مختلف مربوط به آدرس دامنه و ... میشه
 * دومی زمانی که با دامنه مطابقت نداشت ، برابر با ترو میشه و در قسمت ترپ ها ، کار ما انجام میشه
 */

/**
 * Protocol Checker
 * چندین بخش داره که در اینجا از پروتکل و چیز های دیگه استفاده شده
 * البته برای اینکه حجم کد کم بشه ، بجای اینکه متغیر دیگه ای با فیلد تروع قرار بدیم ، از تایپ آف استفاده میکنیم
 */

if (AllowedProtocol) {
    if (!AllowedProtocol.includes(DomainURL.protocol)) {
        TrapEn = true;
    }
}

/**
 * Host Domain Checker
 * دامنه ، ساب دامنه و آدرس هر قسمت اگه با این مطابقت نداشته باشه ، ترپ فعال میشه
 */

if (AllowedDomains) {
    if (!AllowedDomains.includes(DomainURL.host)) {
        TrapEn = true;
    }
}

/** 
 * Domain Checker With out Setting Files
 * به دلیل اینکه معمولا اگه فایل داخل کامپیوتر یک نفر دانلود شده باشه ، بر روی پروتکل فایلس هست ، فقط از این برای شناسایی استفاده میکنیم
*/
if (OfflineDomainChecker) {
    if (DomainURL.origin === 'files:' || DomainURL.protocol === 'file:') {
        TrapEn = true;
    }
}

/**
 * Note : زمانی که پسورد فعاله ، دیگه دامنه و پروتکل قابل اجرا نیست و برعکس
 */

/**
 * Set Page Password 
 * یک پسورد به صورت رمز نگاری شده ایجاد میشه ، سپس شما میتونید اون رو برای صفحه قرار بدید
 * این رمز نگاری با ام دی 5 هست و باعث میشه امنیت کمی بالاتر بره
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
 * Note : When TrapEn is True ,You Can Use This Code
 */
if (SendBlank) {
    window.addEventListener('load', () => {
        setInterval(() => {
            window.open()
        }, 5000)
    })
}


/**
* Notify Before Window Close
?! با استفاده از یک ایونت ، باعث میشه از کاربر ، درخواست کنه
*/
window.onbeforeunload = (e) => { return e }




/**
 * Trap For Domain
 * این ابزار ، باعث میشه که کاربر رو به یک صفحه پی اچ پی با یک کوئری نام دامنه انتقال بده که اینشکلی تمامی افرادی که قالب رو دریافت و اجرا کردند مشاهده بشه
 */
let urlQuery = new URL(window.location.href).pathname + " " + document.querySelector('title').textContent;

/**
 * XHR/Ajax Trap Domain With JS !
 * اگر کاربر بر روی زمپ وبسایت را ریپ کرده باشد ، به صورت آجاکس اطلاعات با کمک جی اس به سمت سرور فرستاده و اطلاعاتی مثل
 * cpu,user,folder,open apps را دریافت میکند
 */

if (TrapEn) {
    window.location.href = DomainTrapSend + "?" + encodeURIComponent(urlQuery);
}




/**
 * Disable Drag Content
 * از کپی کردن المنت ها جلوگیری میکنه و تمامی ایونت ها درگ ، دراپ رو غیر فعال میکنه
 */

if (DisableDrag) {
    addEventListener('dragstart', (e) => {
        e.preventDefault()
    })
    addEventListener('dragover', (e) => {
        e.preventDefault()
    })
    addEventListener('dragleave', (e) => {
        e.preventDefault()
    })
    addEventListener('dragend', (e) => {
        e.preventDefault()
    })
}

/**
 * Disable Iframe
 * یک المنت بالای ای فریم قرار میگیره که از کپی کردن و... جلوگیری میکنه
 */

let overlay = document.createElement('div');
overlay.style = 'position:absolute;top:0;left:0;width:100%;height:100%;zIndex:1;cursor:not-allowed'

if (DisableIframe) {
    document.querySelectorAll('iframe').forEach((i) => {
        i.parentElement.append(overlay)
    })
}

/**
 * Disable Audio Download Button 
 * یک اتریبیوت به تگ های صدا اضافه میشه تا این از دانلود جلوگیری بشه
 */

if (DisableAudioDownload) {
    document.querySelectorAll('audio').forEach((i) => {
        i.setAttribute('controlsList', 'nodownload');
        i.setAttribute('preload', 'none');
        document.style = 'audio::-webkit-media-controls-enclosure {overflow:hidden;}audio::-webkit-media-controls-panel {width: calc(100% + 30px);}'
    })
}




/**
 * Disable F5 
 * در واقع چند تا از شورت کات ها برای غیر فعال کردن رفرش ، ایجاد شده
 */
function DisableF5(F5, R) {
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === F5 || (e.ctrlKey && e.keyCode === R) || (e.ctrlKey && e.shiftKey && e.keyCode === R) || (e.altKey && e.keyCode === R)) {
            e.preventDefault();
        }
    });
}





/**
 * Disable Full Screen
 * با استفاده از ایونت های ساده نوشته میشه
 */
function FullScreen(F11) {
    window.addEventListener("keydown", (e) => {
        if (e.keyCode === F11) {
            e.preventDefault();
        }
    });
}



/**
 * lazysizes
 * به صورت اتوماتیک لیزی لود رو به تصاویر می فرسته البته پیشنهاد میشه که به صورت دستی این کار روانجام بدید
 // یعنی اینکه پس از اجرا شدن این اسکریپت ، سورس کد رو در فایل اصلی قرار بدید
 */
let _IMG = document.querySelectorAll('img');

if (LazySizes) {

    _IMG.forEach((i) => {
        i.classList.add('lazyload')
    })
}




/**
 * IMG to Canvas (No Rip)
 * تمامی تصاویر وبسایت رو به canvas تبدیل میکنه و متن کپی رایت درون اون قرار میده
 Note : زمانی که لیزی لود داره استفاده میشه ، دیگه این روز کاربردی نداره چون به طور پیشفرض بهینه سازی میکنه و نیازی به این نیست
 */

let _Lazy = document.querySelectorAll('[data-src]')

if (CanvasIMG) {
    window.addEventListener('load', () => {
        _Lazy.forEach((i) => {
            let _canvas = document.createElement("canvas");
            _canvas.className = i.className;
            _canvas.setAttribute('data-src', i.getAttribute("data-src"));
            _canvas.width = i.width;
            _canvas.height = i.height;

            let context = _canvas.getContext("2d");

            let img = new Image();
            img.src = i.getAttribute("data-src");

            img.onload = function () {
                context.drawImage(img, 0, 0, _canvas.width, _canvas.height);

                context.fillStyle = CanvasIMG[0];
                context.font = `${CanvasIMG[2]} ${CanvasIMG[1]}`;
                context.textAlign = CanvasIMG[3];
                context.fillText(CanvasIMG[4], _canvas.width / 2, _canvas.height - 10);

                i.parentNode.replaceChild(_canvas, i);
            };
        });
    });
}






/**
 * Notification Tool
 * میتونید متن دلخواه و هر چیزی که دلتون خواست رو توش قرار بدید و کاربرد های مختلفی داره
 * این نسخه با کمک ای پی آی نوتیفیکشن ساخته شده
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
    Notification.requestPermission().then((permission) => {
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
    let _Title = document.querySelector('title').textContent;

    function BlurPage() {
        document.body.style = '-webkit-filter: blur(5px);-moz-filter: blur(5px);-ms-filter: blur(5px);-o-filter: blur(5px);filter: blur(5px);';
        document.title = 'Take Mouse To Body !'
    }

    function UnBlur() {
        document.body.style = "-webkit-filter: blur(0px);-moz-filter: blur(0px);-ms-filter: blur(0px);-o-filter: blur(0px);filter: blur(0px);";
        document.title = _Title
    }

    document.addEventListener('mouseleave', () => {
        BlurPage()
    })
    document.addEventListener('mouseenter', () => {
        UnBlur()
    })

}

/**
 * Online Or Offline
 */

if (OfflineNotify) {
    /**
     * First Way
     */
    window.addEventListener('offline', () => {
        swal('You Are Offline !', 'Turn On Network !', 'warning');
    })

    /**
     * Secend Way
     */
    if (!window.navigator.onLine) {
        swal('You Are Offline !', 'Turn On Network !', 'warning');
    }
}


/**
 * Mobile Settings
 * دستوراتی مربوط به گوشی ها نوشته شده
 */

if (MobileOpptions) {
    /**
     * Disable Zoom In Mobile
     * فقط به متا تگ ویو پورت ، کدی اضافه میشه که از زوم جلوگیری میکنه
     */
    document.querySelector('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">')
    /**
     * For Chrome
     */
    document.body.style.zoom = 'reset'
}