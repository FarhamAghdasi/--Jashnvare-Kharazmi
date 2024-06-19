const codes = {
    DebugMode: `scripts.remove();`,
    DisableAlert: `window.alert = "";`,
    OptimizeJS: `BlockPrint(80);SavePage(83);HideSourceCode(85);DisableF5(116, 82);FullScreen(122);`,
    DefaultValueVars: ` let AllowedDomains, AllowedProtocol, OfflineDomainChecker; function DefaultValue(SettingNames) { if (SettingNames === undefined) { SettingNames = false; } } DefaultValue(AllowedDomains, AllowedProtocol, OfflineDomainChecker);`,
    DisableConsole: `console.log = "";setInterval(() => {console.log = "";}, 1000); console.log("%c AntiRip.js v1.2", "color:red;background:black;border-radius:30px;box-shadow: 0 1px 10px 0 rgba(0,0,0,0.2);color: red;cursor: not-allowed;font-size:30px;padding:20px");`,
    DisableCtrl: `document.addEventListener('keydown',(e)=>{if (e.ctrlKey && e.keyCode){e.preventDefault()}})`,
    DisableSavePage: `function SavePage(k) {document.addEventListener('keydown', (e) => {if (e.ctrlKey && e.keyCode === k) {e.preventDefault()}})}`,
    DisablePrint: `function BlockPrint() {document.addEventListener('keydown', (e) => {if (e.ctrlKey && e.keyCode === 80) {e.preventDefault();}});}`,
    DisableInspectElement: `document.addEventListener('contextmenu', (e) => {e.preventDefault();});document.addEventListener('keydown', (e) => {if (e.key === 'F12' || (e.ctrlKey && e.keyCode === 73)) {e.preventDefault();}});}`,
    DisableViewSource: `function HideSourceCode(k) {document.addEventListener("keydown", (e) => {if (e.ctrlKey && e.keyCode === k) {e.preventDefault();}});}`,
    DisableCopy: `document.addEventListener("keydown", (e) => {if (e.ctrlKey && e.keyCode === 67) {e.preventDefault();}});document.body.setAttribute("oncut", "return true");document.addEventListener('copy', (e) => {e.preventDefault()})`,
    DisablePaste: `document.addEventListener("keydown", (e) => {if (e.ctrlKey && e.keyCode === 80) {e.preventDefault();}});document.body.setAttribute("onpaste", "return true");document.addEventListener('paste', (e) => {e.preventDefault()})`,
    DomainLicenseVars: `const DomainURL = new URL(window.location.href);let TrapEn;`,
    ProtocolChecker: `if (!AllowedProtocol.includes(DomainURL.protocol)) {TrapEn = true;}`,
    DomainsChecker: `if (!AllowedDomains.includes(DomainURL.host)) {TrapEn = true;}`,
    OfflineDomainChecker: `if (DomainURL.origin === 'files:' || DomainURL.protocol === 'file:') {TrapEn = true;}`,
    PasswordPage: `let hash__ = MD5.generate(PasswordPage);let __check = MD5.generate(prompt("Enter The Password"));if (__check !== hash__) {TrapEn = true;}`,
    SendBlank: `window.addEventListener('load', () => {setInterval(() => {window.open()}, 5000)})`,
    BeforeClose: `window.onbeforeunload = (e) => { return e }`,
    TrapDomain: `if (TrapEn) {window.location.href = DomainTrapSend + "?" + encodeURIComponent(urlQuery)}`,
    DisableDrag: `addEventListener('dragstart', (e) => {e.preventDefault()})addEventListener('dragover', (e) => {e.preventDefault()})addEventListener('dragleave', (e) => {e.preventDefault()})addEventListener('dragend', (e) => {e.preventDefault()})`,
    OverlayVars: `let overlay = document.createElement('div');overlay.style = 'position:absolute;top:0;left:0;width:100%;height:100%;zIndex:1;cursor:not-allowed'`,
    DisableIframe: `document.querySelectorAll('iframe').forEach((i) => {i.parentElement.append(overlay)})`,
    DisableAudioDownload: `document.querySelectorAll('audio').forEach((i) => {i.setAttribute('controlsList', 'nodownload');i.setAttribute('preload' , 'none');document.style = 'audio::-webkit-media-controls-enclosure {overflow:hidden;}audio::-webkit-media-controls-panel {width: calc(100% + 30px);}'})`,
    DisableRefresh: `function DisableF5(F5, R) {document.addEventListener("keydown", (e) => {if (e.keyCode === F5 || (e.ctrlKey && e.keyCode === R) || (e.ctrlKey && e.shiftKey && e.keyCode === R) || (e.altKey && e.keyCode === R)) {e.preventDefault();}});}`,
    DisableFullscreen: `function FullScreen(F11) {window.addEventListener("keydown", (e) => {if (e.keyCode === F11) {e.preventDefault();}});}`,
    IMGvar: `let _IMG = document.querySelectorAll('img');`,
    LazySizes: `_IMG.forEach((i) => {i.classList.add('lazyload')})`,
    AllowNotification: `if (!("Notification" in window)) {swal("ارور !", "مرورگر شما از اعلان ها پشتیبانی نمیکند !", "error");} else if (Notification.permission === "granted") {new Notification(AllowNotification[0], {body: AllowNotification[1],icon: AllowNotification[2],vibrate: true});} else {Notification.requestPermission().then((permission) => {if (permission === "granted") {new Notification(AllowNotification[0], {body: AllowNotification[1],icon: AllowNotification[2],vibrate: true});} else {swal("ارور !", "مرورگر شما از اعلان ها پشتیبانی نمیکند !", "error");}});}`,
    DisableScreenShot: `let _Title = document.querySelector('title').textContent;function BlurPage() {document.body.style = '-webkit-filter: blur(5px);-moz-filter: blur(5px);-ms-filter: blur(5px);-o-filter: blur(5px);filter: blur(5px);';document.title = 'Take Mouse To Body !'}function UnBlur() {document.body.style = "-webkit-filter: blur(0px);-moz-filter: blur(0px);-ms-filter: blur(0px);-o-filter: blur(0px);filter: blur(0px);";document.title = _Title}document.addEventListener('mouseleave', () => {BlurPage()})document.addEventListener('mouseenter', () => {UnBlur()})`,
    OfflineNotify: `window.addEventListener('offline' , () => {swal('You Are Offline !', 'Turn On Network !' ,'warning');}) if (!window.navigator.onLine) {swal('You Are Offline !', 'Turn On Network !' ,'warning');}`,
    MobileOpptions: ` document.querySelector('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">')document.body.style.zoom = 'reset'`

}

toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

/**
 * CodeMirror Editor Config
 */
const editor = CodeMirror(document.getElementById('editor'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'material',
    autoCloseBrackets: true
});

const helpEditor = CodeMirror(document.getElementById('HelpEditor'), {
    mode: 'javascript',
    theme: 'material',
    autoCloseBrackets: true,
    value: `
        DebugMode = false;
        DefaultValueVars = false;
        RemoveScript = false;
        
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
        AllowedProtocol = ['https','http'];
        AllowedDomains = ['kharazmi.farhamaghdasi.ir'];
        SendBlank = false;
        DomainTrapSend = "https://kharazmi.farhamaghdasi.ir/assets/trap.php";
        PasswordPage = 12345;
        DisableDrag = true;
        DisableIframe = true;
        DisableAudioDownload = true;
        DisableRefresh = true;
        DisableFullscreen = true;
        DisableScreenShot = false;
        DisablePaste = true;
        LazySizes = true;
        AllowNotification = ['فرهام اقدسی','یک کتابخانه ساده جاوا اسکریپت'];
        OfflineNotify = true;
        MobileOpptions = true;`
});

document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        let code = codes[this.value];
        const content = editor.getValue();

        // if (this.value === 'OfflineDomainChecker') {
        //     const domainURL = new URL(window.location.href);
        //     code = code.replace('files:', domainURL.origin + ':');
        // }

        if (this.checked) {
            const newContent = content + '\n' + code;
            editor.setValue(newContent);
        } else {
            const newContent = content.replace('\n' + code, '');
            editor.setValue(newContent);
        }
        editor.setCursor(editor.lineCount(), 0);
    });
});


let update = document.getElementById('updateButton');

update.addEventListener('click', function () {
    const allowedDomains = document.querySelector('.allowedDomains').value;
    const domainTrapSend = document.querySelector('.domainTrapSend').value;
    const allowedProtocol = document.querySelector('.allowedProtocol').value;
    const allowNotification = document.querySelector('.allowNotification').value;
    if (allowedDomains,allowedProtocol,allowNotification !== Object) {
        toastr.error('لطفا مقادیر را به صورت object بنویسید');
        const newContent = `
AllowedDomains = ${allowedDomains};
DomainTrapSend = "${domainTrapSend}";
AllowedProtocol = ${allowedProtocol};
AllowNotification = ${allowNotification};
`;

        // افزودن مقادیر به ابتدای محتوای ویرایشگر
        const content = editor.getValue();
        editor.setValue(newContent + content);

        toastr.success("برای ایجاد دوباره صفحه را رفرش کنید")
        update.remove()
    }

}
);





document.getElementById('copyButton').addEventListener('click', function () {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(function () {
        toastr.success('کد با موفقیت کپی شد!');
    }, function () {
        toastr.error('خطا در کپی کردن کد!');

    });
});
