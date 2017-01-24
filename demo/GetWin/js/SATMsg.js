

var SATMsg = [];

SATMsg.get = function (key) {
    var msgInstance = SATMsg.getInstance();
    if (!msgInstance) {
        return key;
    }
    var v = msgInstance[key];
    return v || key;
};

SATMsg.getInstance = function () {
    var lang = 'default';
    if (SAT.getParam('lang')) {
        lang = SAT.getParam('lang');
    }
    else if (SAT.pageUser && SAT.pageUser.lang) {
        lang = SAT.pageUser.lang;
    }
    return SATMsg[lang];
};

SATMsg.render = function () {

    $('span[bim],option[bim],title[bim],a[bim]').each(function () {
      
        var bim = $(this).attr('bim');
        $(this).html(SATMsg.get(bim));
    });
    $('div[bimTitle]').each(function () {
     
        var bim = $(this).attr('bimTitle');
        $(this).attr('title', SATMsg.get(bim));
    });
};
SATMsg.get = function (key,lang) {

    var msgInstance = SATMsg.getInstance(lang);
    if (!msgInstance) {
        return key;
    }
    var v = msgInstance[key];
    return v || key;
};

SATMsg.getInstance = function (lang) {
    if (SAT.getParam('lang')) {
        lang = SAT.getParam('lang');
    }
    else if (SAT.pageUser && SAT.pageUser.lang) {
        lang = SAT.pageUser.lang;
    }
    return SATMsg[lang];
};

SATMsg.render = function (lang) {

    $('span[bim],option[bim],title[bim],a[bim]').each(function () {
      
        var bim = $(this).attr('bim');
        $(this).html(SATMsg.get(bim,lang));
    });
    $('div[bimTitle]').each(function () {
     
        var bim = $(this).attr('bimTitle');
        $(this).attr('title', SATMsg.get(bim,lang));
    });
};

SATMsg['en'] = {};
var en = SATMsg['en'];
en['error.mustLogin'] = 'Please login first！';
en['login.fblogin'] = 'With Facebook';
en['field.cancel'] = 'Cancel';
en['field.signup'] = 'Sign up';
en['user.FBregister'] = 'With Facebook';
en['field.GoHome'] = 'Home';
en['field.companyProfile_profile'] = 'Profile';
en['field.companyProfile_history'] = 'History';
en['field.companyProfile_careers'] = 'Careers';
en['field.contactUs'] ='Contact Us';
en['field.International'] ='International Cooperation & Promotion';
en['field.PSSE'] ='Product & Software Engineering';
en['field.InternationalPurchase'] ='International Purchase';
en['field.activity'] ='Activity';
en['field.MandE'] ='Mechanical & Electrical products exporting';
en['field.procurement'] ='Procurement';
en['field.PE'] ='Product Engineering';
en['field.SE'] ='Software Engineering';
en['field.Others'] ='Others';
en['field.Select'] ='Please select';
en['field.clear'] = 'Clear';
en['field.Send'] = 'Send';
en['field.Profile'] ='About Getwin';
en['field.History'] ='History';
en['field.Careers'] ='Careers';
en['field.Vision'] ='Vision';
en['field.Location'] ='Location';
en['field.Organization'] ='Company organization & Business area';
en['field.ContactUsContent'] ='<h1>Dear Customer：<br />Please fill out the form below. For responses to questions, please provide your contact information.If you have prompt needs, please contact us through our 。<br />Telephone number：+886-2-2742-3386　Fax：+886-2-2742-2113</h1>';
en['field.CareerContent'] ='<p>We are always seeking motivated, talented, and innovative individuals who can contribute to our winning team. If you have got what it takes and are looking for a challenging and rewarding career.</p><p>If you think your skill set demands our attention and you want to work for one of the worlds fastest moving companies, do not hesitate to send us your resume to:</p>';


en['user.name'] = 'Name :';
en['user.tel'] = 'Contact Number:';
en['user.email'] = 'E-mail :';
en['user.product'] = 'Product :';
en['user.message'] = 'Message :';
en['user.attachement'] = 'Attachement :';

SATMsg['default'] = {};
var d = SATMsg['default'];

// 一般
d['error.adminOut'] = '權限不足，無法進行此操作！';
d['error.mustLogin'] = '請先登入！';
d['error.ajax'] = 'Ajax request 發生錯誤 - ';
d['error.changePwDay'] = '密碼變更日期已到期，請重新設定密碼!';
d['delete.confirm'] = '是否刪除本筆資料？';
d['loading'] = '載入中...';
d['pager.firstPage'] = '第一頁';
d['pager.previousPage'] = '上一頁';
d['pager.nextPage'] = '下一頁';
d['pager.lastPage'] = '最後一頁';
d['field.no'] = 'No';
d['field.detail'] = '明細';
d['field.add'] = '新增';
d['field.edit'] = '編輯';
d['field.delete'] = '刪除';
d['field.query'] = '查詢';
d['field.action'] = '操作';
d['field.all'] = '全部';
d['field.open'] = '開啟';
d['field.close'] = '關閉';
d['field.clear'] = '清除重填';
d['field.Send'] = '確定送出';
d['field.yes'] = '是';
d['field.not'] = '否';
d['field.save'] = '存檔';
d['field.reset'] = '重設';
d['field.cancel'] = '取消';
d['field.choose'] = '請選擇';
d['field.confirm'] = '確定';
d['field.export'] = '匯出';
d['field.send'] = '寄送';
d['field.exception'] = '異常處理';
d['field.import'] = '匯入';
d['field.signup'] = '註冊';
d['field.GoHome'] = '回到首頁';
d['field.companyProfile_profile'] = '公司簡介';
d['field.companyProfile_history'] = '企業沿革';
d['field.companyProfile_careers'] = '人才招募';
d['field.contactUs'] ='聯絡我們';
d['field.International'] ='國際合作推廣';
d['field.PSSE'] ='產品工程與系統開發';
d['field.InternationalPurchase'] ='機電產品出口或代理採購';
d['field.activity'] ='活動訊息';
d['field.MandE'] ='機電產品出口';
d['field.procurement'] ='代理採購';
d['field.PE'] ='產品工程';
d['field.SE'] ='系統開發';
d['field.Others'] ='其  他';
d['field.Select'] ='請選擇 ';
d['field.Profile'] ='公司簡介';
d['field.History'] ='企業沿革';
d['field.Careers'] ='人才招募';
d['field.Vision'] ='經營理念';
d['field.Organization'] ='公司組織及營業項目';
d['field.Location'] ='營業據點';
d['field.CareerContent'] ='<p>人才是最重要的資產，誠摯地邀請您帶著一顆年輕、熱情、活力、強烈企圖心加入我們的行列，共創美好的明天</p><p>請直接將您的個人歷照傳，註明應徵職務及希望工作地點；</p><ul><li>郵寄至：</li><li>E-mail：： </li><li>傳真至：02-2501-9380</li></ul><p>我們收到履歷後將會進行篩選及面談作業；若您在三週內未接獲面談通知者，表示暫無職缺適合您；我們會將您的資料建檔，日後若有合適職缺，將主動與您聯繫。</p>';
d['field.ContactUsContent'] ='<h1>親愛的顧客　您好：<br />請在下方表格填入您的正確資料及聯絡方式，方便客服人員聯繫您。<br />聯絡電話：+886-2-2742-3386　傳真號碼：+886-2-2742-2113</h1>';



// 登入
d['login.title'] = '登入';
d['login.greeting'] = 'Share Table';
d['login.prompt'] = '請輸入您的帳號與密碼';
d['login.account'] = '帳號';
d['login.password'] = '密碼';
d['login.login'] = '登入';
d['login.fblogin'] = '使用 facebook帳號登入';

//重設密碼
d['changePw.appTitle'] = '修改密碼';
d['changePw.account'] = '帳號';
d['changePw.name'] = '姓名';
d['changePw.oldpassword'] = '舊密碼';
d['changePw.newpassword'] = '新密碼';
d['changePw.confirmNewPassword'] = '確認新密碼';


// 首頁
d['index.home'] = '首頁';
d['index.title'] = 'Bootstrap 首頁';
d['index.styleChooser'] = '風格';
d['index.appTitle'] = 'Bootstrap';
d['index.logout'] = '登出';
d['index.maxScreen'] = '螢幕最大化';
d['index.maxScreen.cancel'] = '取消螢幕最大化';
d['index.jsWarnTitle'] = '警告！';
d['index.jsWarnDetail'] = '您必須啟用 JavaScript 方能瀏覽本網站！';
d['index.path'] = '首頁';
d['index.footerLeft'] = '&copy; Bootstrap 2013';
d['index.footerRight'] = '&nbsp;';

// 使用者管理
d['user.appTitle'] = '帳號管理';
d['user.form'] = '編輯帳號';
d['user.account'] = '帳號';
d['user.password'] = '密碼';
d['user.name'] = '姓名';
d['user.cellphone'] = '手機';
d['user.display'] = '狀態';
d['user.role'] = '群組';
d['user.dep'] = '部門';
d['user.islock'] = '是否鎖定';
d['user.pwdchangedate'] = '上次密碼變更日期';
d['user.register'] = '註冊';
d['user.FBregister'] = '用FaceBook帳號註冊';
d['user.tel'] = '電　　話:';
d['user.email'] = 'E-mail :';
d['user.product'] = '產 品 :';
d['user.message'] = '留言內容 :';
d['user.attachement'] = '附 件 :';
