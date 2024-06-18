
# کتابخانه آنتی ریپ

توضیحات : یک کتابخانه ساده به زبان جاوا اسکریپت میباشد که برای جلوگیری از دزدیده شدن سورس کد وبسایت یا ریپ شدن وبسایت جلوگیری شود . این کتابخانه دارای صفحات متفاوت اعم از صفحه مدیریت ، ثبت نام ، ورود ، فراموشی رمز و ... است و تمامی کد هایی که در این پروژه استفاده شده است ، به صورت کامنت شده و دارای راهنمای مختصر است . 






## جشنواره نوجوانان خوارزمی

این پروژه برای جشنواره خوارزمی سال 1402-1403 ساخته شده .

این کتابخانه توسط فرهام اقدسی ، ساخته و تهیه شده است . 

میتوانید این پروژه را به صورت آنلاین در لینک زیر مشاهده کنید : 

https://kharazmi.farhamaghdasi.ir/

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/FarhamAghdasi/AntiRip.js/master/LICENSE))


## نحوه راه اندازی

پیشنهاد میشود که اطلاعاتی که مربوط به این سورس کد است را به صورت رمز نگاری شده استفاده کنید. 

شما میتوانید فایل تنظیمات را از طریق پنل کاربری ، تولید کنید و وارد فایل js اصلی خودتون کنید . در این صورت شما میتوانید با ابزار های رمز نگاری کننده ، از دانلود شدن و تکثیر شدن غیر قانونی وبسایت یا قالب خود ، جلوگیری کنید

این کتابخانه هم دارای فایل تنظیمات است که شما باید در صفحه مورد نظر خودتون قبل از اجرا شدن کتابخانه ، جای گذاری کنید . یک نمونه برای شما نشان داده میشود : 

```html 
 <script language="javascript" id="antirip">
        /* 
Start Settings
*/
DebugMode = false;
DisableSavePage = true;
DisablePrint = true;
DisableAlert = false;
Disablectrl = false;
DisableConsole = false;
BlockPrint = true;
DisableInspectElement = false;
DisableViewSource = true;
DisableCopy = true;
OfflineDomainChecker = false;
AllowedProtocol = ['http','https'];
AllowedDomains = ['sub.domain.ir','kharazmi.farhamaghdasi.ir'];
SendBlank = false;
DomainTrapSend = "kharazmi.farhamaghdasi.ir/assets/trap.php";
PasswordPage = "1234567";
DisableDrag = true;
DisableIframe = true;
DisableAudioDownload = true;
DisableRefresh = true;
DisableFullscreen = true;
DisableScreenShot = false;
DisablePaste = true;
LazySizes = true;
CanvasIMG = ['red','vazirmatn','20px','right','تصاویر دارای کپی رایت هستند'];
AllowNotification = ['فرهام اقدسی','یک کتابخانه ساده جاوا اسکریپت'];
OfflineNotify = true;
MobileOpptions = true
        /* 
End Settings
*/
    </script>
```

برای استفاده از این کد ، میتوانید از cdn زیر استفاده کنید :

```html
<link rel="stylesheet" href="https://cdn.farhamaghdasi.ir/antirip.min.js">
```

برای دریافت نسخه فشرده نشده و قابل ویرایش (همراه با کامنت گذاری) میتوانید از کد زیر استفاده کنید

```html
<link rel="stylesheet" href="https://cdn.farhamaghdasi.ir/antirip.min.js">
```




## ویژگی هایی که این کتابخانه ارائه میدهد :

توجه کنید که این یک کتابخانه سبک و نرم است و تنها برای محافظت از محتوای صفحه ، میتوان استفاده کرد .

- جلوگیری از ذخیره فایل ها در وب
- جلوگیری از دیدن سورس کد صفحه
- غیر فعال کردن کپی ، پیست ، ذخیره
- جلوگیری از پرینت صفحه
- لایسنس گذاری بر روی وبسایت
- بلاک کردن ریپر ها
- واترمارک گذاری بر روی تصاویر
- محافظت از محتوای iframe
- غیر فعال کردن ارور های کنسول ، رفرش کردن صفحه
- غیر فعال کردن حالت کشیدن ، رهاکردن صفحات
- توسعه یافته با vanilla js
- پشتیبانی از jquery 
- محدود کردن پروتکل ها 
- جلوگیری از ریپر ها
- حذف دکمه دانلود صدا
- lazysize اتوماتیک
- پنل کاربری برای ساخت فایل تنظیمات
- غیر فعال کردن تمام صفحه
- غیر فعال کردن تمامی دستوراتی که با ctrl انجام میشوند
- غیر فعال کردن رفرش ، کپی ، پیست
- لایسنس به صورت آفلاین بدون دامنه
- ترپ دامنه
- پسورد دامنه
- برسی آنلاین یا آفلاین بودن


