
var SAT = {};
SAT.pageUser = null;
SAT.pageRole = null;
SAT.pagePowerMap = null;
SAT.formHtml = null;
SAT.formData = null;
SAT.SATMenu = null;
SAT.page = 1;
SAT.pageSize = 5;
SAT.gridMgr = null;
SAT.contentDiv = 'content';

SAT.OpenPage = function (url) {
    window.location.href = url;
    return;
};
SAT.downloadBtnHTML = function (fname, brnTXT) {
    var html = '';
    html += '<a ';
    html += 'class="btn btn-info" ';
    html += 'href="../../doc/' + fname + '" >';
    html += ' <i class="icon-edit icon-white"></i> ';
    html += brnTXT;
    html += '</a> ';
    return html;
};

SAT.viewBtnHTML = function (formUrl, dataUrl, text) {
    var html = '';
    html += '<a ';
    html += 'class="btn btn-info" ';
    html += 'href="javascript:; " ';
    html += 'onclick="SAT.addForm(\'' + formUrl + '\', \'' + dataUrl + '\'); ">';
    html += ' <i class="icon-edit icon-white"></i> ';
    html += (text || SAT.get('field.detail'));
    html += '</a> ';
    return html
};

SAT.editBtnHTML = function (formUrl, dataUrl, text) {
    var html = '';
    html += '<a ';
    html += 'class="btn btn-info" ';
    html += 'href="javascript:;" ';
    html += 'onclick="SAT.addForm(\'' + formUrl + '\', \'' + dataUrl + '\'); ">';
    html += ' <i class="icon-edit icon-white"></i> ';
    html += (text || SATMsg.get('field.edit'));
    html += '</a>';
    return html;
};

SAT.deleteBtnHTML = function (deleteUrl, callbackLiteral, text) {
    var html = '';
    html += '<a class="btn btn-danger" ';
    html += 'href ="javascript:;" ';
    html += 'onclick="SAT.deleteObj(\'' + deleteUrl + '\', \'' + callbackLiteral + '\'); ">';
    html += ' <i class="icon-trash icon-white"></i> ';
    html += (text || SATMsg.get('field.delete'));
    html += '</a> ';
    return html;
};

SAT.getContentDiv = function () {
    return $('#' + SAT.contentDiv)
};
SAT.formDiv = 'formDiv';
SAT.getFormDiv = function () {
    return $('#' + SAT.formDiv)
};

SAT.pathDiv = 'breadcrumb';
SAT.getPathDiv = function () {
    return $('#' + SAT.pathDiv)
};

SAT.listDiv = 'listDiv';
SAT.getListDiv = function () {
    return $('#' + SAT.listDiv)
};

SAT.menuDiv = 'menuDiv';
SAT.getMenuDiv = function () {
    return $('#' + SAT.menuDiv)
};

SAT.noColumn = { display: 'No', align: 'center', width: '40', isSort: false, render: function (rowData, rowIndex, value, column) { var p = SAT.page || 1; p--; return p * SAT.pageSize + rowIndex + 1 } };

SAT.getParam = function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) { return "" }
    else { return decodeURIComponent(results[1].replace(/\+/g, " ")) }
};


// front page
SAT.initIndex = function () {

    SATMsg.render();
    SAT.loading(true);
    $.getJSON(SATUrl.getUser, function (resp) {
        if (resp.error != null && resp.error != '')
        { $("#userDetail").hide(); $('#userId').hide(); return }
        else {
            SAT.pageUser = resp.obj.user;
            SAT.pageRole = resp.obj.role;
            SAT.pagePowerMap = resp.obj.powerMap;
            $("#navcollapse").hide();
            
            $('#userId').html(' ' + SAT.pageUser.name);
        }
    }).fail(function (jqxhr, textStatus, error) { }).always(function () { SAT.loading(false); })
};


// Website administer system
SAT.initIndexAdmin = function () {

    SAT.user(function () {

        if (SAT.pageUser == null) { return false }
        $('#userId').html(' ' + SAT.pageUser.name);
        SATMsg.render();
        SAT.renderPath();
        SAT.loadMenu();

        var bookmark = SAT.getBookmark();
        if (maxScreen) {
            var maxScreen = false;
            if (bookmark.indexOf(SAT.maxScreenKey) >= 0) {
                maxScreen = true;
                bookmark = bookmark.replace(SAT.maxScreenKey, '');
            }
            var bookmarks = bookmark.split('+');
            if (bookmarks[0] == 'loadHtml') {
                if (bookmarks.length == 2) {
                    SAT.loadHtml(eval(bookmarks[1]))
                }
                else if (bookmarks == '3') {
                    SAT.loadHtml(eval(bookmarks[1] + '?' + bookmarks[2]));
                }
            }
            else if (bookmarks[0] == 'addForm') {
                if (bookmarks.length == 3) {
                    SAT.addForm(eval(bookmarks[1]), eval(bookmarks))
                }
                else if (bookmarks.length == 4) {
                    SAT.addForm(eval(bookmarks[1]), eval(bookmarks[2]) + '?' + bookmarks[3]);
                }
            }
            if (maxScreen) {
                SAT.maxScreen(true);
            }
        }
    });
    SAT.getListDiv().hide();
    SAT.getFormDiv().hide()
};

SAT.renderPath = function (pathArray, skipIndex) {
    var html = '';
    html += '<ul class="breadcrumb">';
    if (!skipIndex) {
        html += '<li>';
        html += '<a href="javascript:; " onclick="SAT.initIndexAdmin(); ">' + SATMsg.get('index.path') + '</a>';
        html += '</li>';
    }
    if (pathArray) {
        $.each(pathArray, function (idx, obj) {
            html += '<li>';
            html += '<span class="divider">/</span> ';
            html += '<a href ="javascript:; " onclick =" ' + obj.click + '">' + obj.title + '</a>';
            html += '</li>';
        })
    }

    html += '</ul>';
    SAT.getPathDiv().html(html);
};

SAT.openCloseHtml = function (value) {
    return value ? '<span class="label label-success">' + SATMsg.get('field.open') + '</span>' : '<span class="label label-important">' + SATMsg.get('field.close') + '</span>';
};

// controls
SAT.renderRadio = function (jqDiv, name, value, radioData, titleLabel, valueLabel, excludeCallback) {
    var html = '';
    $.each(radioData, function (idx, obj) {
        if (excludeCallback && excludeCallback(obj)) { return; }
        var checked = '';
        if (value == obj[valueLabel]) {
            checked = 'checked = "checked"';
        }
        html += '<label class ="radio inline">';
        html += '<input type ="radio" name = "' + name + '" id ="' + name + '_' + obj[valueLabel] + '" value="' + obj[valueLabel] + '"' + checked + '/>';
        html += obj[titleLabel];
        html += '</label>';
    });
    jqDiv.html(html);
    $('input:radio[name=' + name + ']').uniform();
};

SAT.renderSelect = function (jqObj, value, selectData, titleLabel, valueLabel, excludeCallback, hasChoose, chooseTitle) {
    var html = '';
    if (hasChoose) {
        if (chooseTitle != null && chooseTitle != undefined) {
            html += '<option value="">' + chooseTitle + '</option>'
        }
        else {
            html += '<option value="">' + SATMsg.get('field.choose') + '</option>'
        }
    }
    $.each(selectData, function (idx, obj) {
        if (excludeCallback && excludeCallback(obj))
        { return }
        html += '<option value="' + obj[valueLabel] + '">' + obj[titleLabel] + '</option>'
    });
    jqObj.html(html);
    if (value) {
        jqObj.val(value)
    }
};
SAT.renderSelectRemote = function (jqObj, value, url, params, titleLabel, valueLabel, excludeCallback, hasChoose, chooseTitle) {
    SAT.loading(true);
    $.getJSON(url, params, function (resp) {
        SAT.renderSelect(jqObj, value, resp.obj.list, titleLabel, valueLabel, excludeCallback, hasChoose, chooseTitle)
    }).fail(
    function (jqxhr, textStatus, error) {
        SAT.alertAjaxError(textStatus + '(' + error + ')')
    }).always(
    function () {
        SAT.loading(false)
    })
};

SAT.lastBookmark = null;
SAT.addBookmark = function (bookmark) {

    var url = window.location.href;
    if (url.indexOf('#') >= 0) {
        SAT.lastBookmark = url.substr(url.indexOf('#') + 1);
        url = url.substr(0, url.indexOf('#'));
    } else {
        SAT.lastBookmark = '';
    }
    bookmark = bookmark.replace(/\./g, '_');
    url += '#' + bookmark;
    window.location.href = url;
};

SAT.getBookmark = function (bookmark) {
    var url = window.location.href;
    var bookmark;
    if (url.indexOf('#') >= 0) {
        bookmark = url.substr(url.indexOf('#') + 1);
        bookmark = bookmark.replace(/_/g, '.')
    }
    return bookmark
};
// alert
SAT.alertError = function (data) {
    if (data == 'error.admin.out') { SAT.alertAdminOutError() }
    else { alert(data) }
};

SAT.alertAdminOutError = function () {
    alert(SATMsg.get('error.adminOut'));
};
SAT.alertMustLoginError = function () {
    alert(SATMsg, get('error.mustLogin'));
    window.location.href = SATUrl.root;
    return;
};
SAT.checkMustLogin = function (data) {
    return data.indexOf('BischWebError:error.must.login') >= 0;
};
SAT.checkAdminOut = function (data) {
    return data.indexOf('error.admin.out') >= 0;
};

//form
SAT.addForm = function (htmlUrl, dataUrl) {

    SAT.formHtml = null;
    SAT.formData = null;
    SAT.loading(true);
    $.ajax({ type: 'GET',
        async: false,
        url: htmlUrl,
        complete: function () {
            SAT.loading(false);
        },
        error: function (xhr) {
            SAT.alertAjaxError(htmlUrl)
        },
        success: function (response) {
           
            var data = $.trim(response);
            if (SAT.checkMustLogin(data))
            { SAT.alertMustLoginError(); return; }
            else if (SAT.checkAdminOut(data)) {
                SAT.alertAdminOutError();
                return;
            }
            SAT.formHtml = response;
            SAT.loading(true);
            $.ajax({ type: 'GET',
                dataType: 'json',
                async: false,
                url: dataUrl,
                complete: function () {
                    SAT.loading(false);
                },
                error: function (xhr) {
                    SAT.alertAjaxError(dataUrl);
                },
                success: function (response) {
                    if (response.error) {
                        SAT.alertError(response.error);
                        return;
                    }
                    SAT.formData = response.obj;
                    SAT.resetForm();
                    SAT.showForm();
                    SAT.addBookmark('addForm+' + SATUrl.getKeyString(htmlUrl, dataUrl));
                }
            });
        }
    });
};

SAT.showForm = function () {
    SAT.getFormDiv().show();
    SAT.getListDiv().hide();
    SAT.syncContentDivHeightInForm();
};

SAT.resetForm = function () {
    SAT.getFormDiv().html(SAT.formHtml).height('auto');
    SATMsg.render();
    SAT.mergeForm($("#" + SAT.formDiv + " form:first"), SAT.formData);
};

SAT.closeForm = function () {
    SAT.getFormDiv().hide().empty();
    $(document).scrollTop(0);
    SAT.getListDiv().show();
    SAT.syncContentDivHeightInList();
    if (SAT.lastBookmark) {
        SAT.addBookmark(SAT.lastBookmark);
    }
};


SAT.mergeForm = function (formDom, formData) {
    if (!formData) { return } var formObj = $(formDom);
    if (typeof formData == 'object') { resobj = formData }
    else { resobj = JSON.parse(formData) } for (var tagName in resobj) {
        var val = resobj[tagName];
        if (val == null) { val = '' } formObj.find("input[name='" + tagName + "']").each(function () {
            if ($(this).attr("type") == "text" || $(this).attr("type") == "password" || $(this).attr("type") == "hidden") { $(this).val(val) } else if ($(this).attr("type") == "radio") {
                var theVal = $(this).val();
                if (typeof val == 'boolean')
                { theVal = $(this).val() === 'true' }
                if (theVal == val) { $(this).attr("checked", true) }
            }
            else if ($(this).attr("type") == "checkbox") {
                if ($(this).val() == val) { $(this).attr("checked", true) }
                else { $(this).attr("checked", false) }
            }
            else if ($(this).attr("type") == "button") { $(this).click(function () { eval(val) }) }
        });
        formObj.find("span[name='" + tagName + "']").each(function () { $(this).html(val) }); formObj.find("select[name='" + tagName + "']").each(function () { $(this).children().each(function () { if ($(this).val() == val) { $(this).attr("selected", true) } }) });
        formObj.find("img[name='" + tagName + "']").each(function () { $(this).attr("src", val) }); formObj.find("textarea[name='" + tagName + "']").each(function () { $(this).html(val) })
    }
};

SAT.loadHtml = function (theUrl) {
    SAT.loading(true);
    $.ajax({
        type: 'GET',
        async: false,
        url: theUrl,
        complete: function () {
            SAT.loading(false);
        },
        error: function (xhr) {
            SAT.alertAjaxError(theUrl);
        },
        success: function (html) {
            if (SAT.checkMustLogin(html)) {
                SAT.alertMustLoginError();
                return;
            }
            else if (SAT.checkAdminOut(html)) {
                SAT.alertAdminOutError();
                return;
            }
            
            var contentWidth = SAT.getContentDiv().width();
            var result = 'loadHtml+' + SATUrl.getKey(theUrl);
            var qs = SATUrl.getQueryString(theUrl);
            if (qs) {
                result += '+' + SATUrl.getQueryString(theUrl);
            }
            SAT.addBookmark(result);
            SAT.getListDiv().html(html);
            SATMsg.render();
            SAT.showList();
        }
    });
};

SAT.loadMenu = function () {
    SAT.loading(true);
    $.getJSON(SATUrl.menuListAll, { checkPower: true }, function (resp) {
        var html = SAT._loopMenuCategory(resp.obj.list, '', 0);
        SAT.getMenuDiv().html(html)
    }).fail(function (jqxhr, textStatus, error) { SAT.alertAjaxError(textStatus + '(' + error + ')') }).always(function () {
        SAT.loading(false)
    });

};

SAT.currentMenuCategeory = '';
SAT._loopMenuCategory = function (list, html, level) {
    if (list) {
        $.each(list, function (idx, c) {
            if (!c.display) { return; }
            if (c.type == 'category' && c.children.length == 0)
            { return; }
            var prefixSpace = '';
            for (var i = 1; i <= level; i++)
            { prefixSpace += '&nbsp;&nbsp;&nbsp;'; }
            if (c.type == 'category') {
                SAT.currentMenuCategory = 'menuCategory_' + c.uid;
                html += '<li class="menuCategory menuCategory_' + c.uid + '"><a class="ajax-link" href="javascript:;" onclick ="SAT._activeMenu(\'menuCategory_' + c.uid + '\'); ' + c.url + '">';
                html += prefixSpace + '<i class="icon-folder-close"></i><span class="hidden-tablet"> ' + c.title + '</span></a></li>';

            }
            else if (c.type == 'item') {
                html += '<li class="menuItem menuItem_' + c.uid + ' menuItem_' + SAT.currentMenuCategory + '" style="display: none;"><a class="ajax-link" href="javascript:;" onclick="SAT._activeMenu(\'menuItem_' + c.uid + '\'); ' + c.url + '">';
                html += prefixSpace + '<i class="icon-list-alt"></i><span class="hidden-tablet"> ' + c.title + '</span></a><li>';
            }
            html = SAT._loopMenuCategory(c.children, html, level + 1);
        });
    }
    return html;
};

SAT._activeMenu = function (uid) {
    var target = $('ul.main-menu li.' + uid);
    var active = target.hasClass('active');
    var isCategory = target.hasClass('menuCategory');
    var isItem = target.hasClass('menuItem');
    if (isCategory) {
        if (active) {
            $('ul.main-menu li.menuItem_' + uid).hide();
            target.removeClass('active');
            $('i.icon-folder-open', target).removeClass('icon-folder-open').addClass('icon-folder-close');
        }
        else {
            $('ul.main-menu li.menuItem_' + uid).show();
            target.addClass('active');
            $('i.icon-folder-open', target).removeClass('icon-folder-open');
            $('i.icon-folder-close', target).removeClass('icon-folder-close').addClass('icon-folder-open');
        }
    }
    else if (isItem) {
        if (active) {
            target.removeClass('active');
        }
        else {
            $('ul.main-menu li.menuItem').removeClass('active');
            target.addClass('active');
        }
    }
    if ($('body').scrollTop() > 0) {
        $('body').scrollTop(0);
    }
};

SAT.showList = function () {
    SAT.getListDiv().show();
    SAT.getFormDiv().empty().hide();
};

SAT.syncContentDivHeightInForm = function () {
    SAT.getContentDiv().height(SAT.getFormDiv().height() + SAT.getPathDiv().height());
};

SAT.syncContentDivHeightInList = function () {
    SAT.getContentDiv().height(SAT.getListDiv().height() + SAT.getPathDiv().height());
};

SAT.deleteObj = function (deleteUrl, callbackLiteral) {
    if (!confirm(SATMsg.get('delete.confirm'))) { return; }
    SAT.loading(true);

    $.ajax({
        type: 'POST',
        dataType: 'json',
        async: false,
        url: deleteUrl,
        complete: function () { SAT.loading(false) },
        error: function (xhr, textStatus, error) {
            if (SAT.checkMustLogin(xhr.responseTex)) {
                SAT.alertMustLoginError();
                return;
            }
            SAT.alertAjaxError(deleteUrl);
        },
        success: function (resp) {
            if (resp.error) { alert(resp.error); return; }
            if (resp.msg) { alert(resp.msg); }
            SAT.reloadList();
            if (callbackLiteral) { eval(callbackLiteral) }
            return;
        }
    });

};

SAT.reloadList = function () {
    if (SAT.gridMgr) { SAT.gridMgr.loadData(true); }
};

SAT.validate = function (url, beforeSumbitCallback, afterSubmitCallback, rules, message) {
    $('#' + SAT.formDiv + ' form:first').validate({
        rules: rules || {},
        messages: message || {},
        submitHandler: function (form) {
            if (beforeSumbitCallback) { beforeSumbitCallback(function () { SAT.submitForm(form, url, afterSubmitCallback) }) }
            else { SAT.submitForm(form, url, afterSubmitCallback) }
        }, showErrors: function (errorMap, errorList) {
            if (SATConfig.validateErrorShow == 'inline' || SATConfig.validateErrorShow == 'both') { this.defaultShowErrors() }
            if (SATConfig.validateErrorShow == 'alert' || SATConfig.validateErrorShow == 'both') {
                if (this.numberOfInvalids() != 0 && this.numberOfInvalids() == errorList.length && this.currentElements.length > 1) {
                    var msg = '';
                    msg += '你有 ' + this.numberOfInvalids() + ' 個錯誤!\r\n';
                    for (var idx in errorList) {
                        var e = $(errorList[idx].element);
                        var title = e.parents('div.control-group:first').find('label span[bim]').text();
                        msg += (title || e.attr('name')) + ': ' + errorList[idx].message + '\r\n';
                    }
                    alert(msg);
                }
            }
        }
    });
    $('#' + SAT.formDiv + ' form:first .required').each(function () {
        $(this).parents('div.control-group').first().children('label').first().prepend(SATConfig.validateErrorTag)
    });
};

SAT.submitForm = function (form, url, afterSubmitCallback) {
    SAT.loading(true);

    $(form).ajaxSubmit({
        url: url,
        type: "post",
        dataType: 'json',
        complete: function () {
            SAT.loading(false);
        },
        success: function (resp) {
            SAT.reloadList();
            if (resp.error) {
                alert(resp.error);
                return;
            }
            if (resp.msg) {
                alert(resp.msg);
            }
            SAT.closeForm();
            SAT.reloadList();
            if (afterSubmitCallback) {
                afterSubmitCallback();
            }
            return;
        },
        error: function (xhr, status, error, form) {
            if (SAT.checkMustLogin(xhr.responseText)) {
                SAT.alertMustLoginError();
                return;
            }
            SAT.alertAjaxError(status);
        }
    })
};
SAT.user = function (callback) {
    if (!SAT.pageUser) {
        SAT.loading(true);
        $.getJSON(SATUrl.getUser, function (resp) {
            if (resp.error != null && resp.error != '')
            { alert(resp.error); window.location = SATUrl.loginPage; return }
            else {
                if (resp.obj.isOverChangePwDay == true) {
                    alert(SATMsg.get('error.changePwDay'));
                    resetPw(false)
                }
                SAT.pageUser = resp.obj.user;
                SAT.pageRole = resp.obj.role;
                SAT.pagePowerMap = resp.obj.powerMap
            }
            if (callback)
            { callback() }
        }
        ).fail(function (jqxhr, textStatus, error) { }).always(function () { SAT.loading(false) })
    } else { if (callback) { callback() } }
};

SAT.logout = function () {
    SAT.loading(true);
    $.post(SATUrl.logout, function (resp) {
        if (resp.error) { alert(resp.error) }
        if (resp.msg) { alert(resp.msg) }
        window.location.href = SATUrl.loginPage; return
    }).fail(function (jqxhr, textStatus, error)
    { SAT.alertAjaxError(textStatus + '(' + error + ')') }).always(function () { SAT.loading(false) })
};

SAT.maxScreenKey = '>maxScreen';
SAT.maxScreen = function (flag) {
    if (flag) {
        $('#headeContainer').hide();
        $('menuContainer').hide();
        $('#closeMaxScreen').show();
        SAT.addBookmark((SAT.getBookmark() || '') + SAT.maxScreenKey);
        $('#content').width($(document).width() - 100);
        $(window).trigger('resize.grid');
    }
    else {
        $('#headerContainer').show();
        $('#menuContainer').show();
        $('#closeMaxScreen').hide();
        var b = SAT.getBookmark();
        if (b) {
            b = b.replace(SAT.maxScreenKey, '');
            SAT.addBookmark(b)
        } $('#content').width('82.905982906%');
        $(window).trigger('resize.grid')
    }
};

SAT.getUser = function (callback) {
    SAT.loading(true);
    $.getJSON(SATUrl.getUser, function (resp) {
        if (resp.error != null && resp.error != '') {
            alert(resp.error);
            window.location = SAT.loginPage; return
        }
        else {
            if (resp.obj.isOverChangePwDay == true) {
                alert(SAT.get('error.changePwDay'));
                resetPW(false)
            }
            SAT.pageUser = resp.obj.user;
            SAT.pageRole = resp.obj.role;
            SAT.pagePowerMap = resp.obj.powerMap
        }
        if (callback)
        { callback() }
    }).fail(function (jqxhr, textStatus, error) { }).always(function () { SAT.loading(false)})

};

SAT.userBySingle = function (callback) {
    if (SAT.pageUser) {
       
        SAT.loading(true);
        $.getJSON(SATUrl.getUser, function (resp) {
            if (resp.error != null && resp.error != '') {
                alert(resp.error);
                parent.window.location = SATUrl.loginPage;
                return;
            }
            else {
                SAT.pageUser = resp.obj.user;
                SAT.pageRole = resp.obj.role;
                SAT.pagePowerMap = resp.obj.powerMap
            }
            if (callback)
            { callback() }
        }).fail(function (jqxhr, textStatus, error) { }).always(function () { SAT.loading(false) })
    }
    else { if (callback) { callback() } }
};


SAT.alertAjaxError = function (url) { alert(SATMsg.get('error.ajax') + url) };
SAT.addLoading = function () {
    if($('.l-grid-loading-SAT').length==0) {
        $('body').append('<div clss="l-grid-loading-SAT" style="display:none;">'+SATMsg.get('loading') + '</div>')
    }
};
SAT.loading = function (flag) {
    if (flag) { $('.l-grid-loading-SAT').show() }
    else { $('.l-grid-loading-SAT').hide() }
};



SAT.getParameterByName = function (name) {
              name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
              var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
              return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
          };

//facebook

          SAT.fblogin = function () {     // facebook 登入
              FB.login(function (response) {
                  var path = SATUrl.login + '?code=' + response.authResponse.accessToken;
                  $.ajax({
                      url: path,
                      dataType: "json",
                      success: function (result) {
                          //alert(result.msg);
                          window.location.href = SATUrl.index;
                      }
                  });

                  if (response.authResponse) { // 登入成功
                      //查看登入成功後的回傳資料 response.authResponse
                      console.log(response.authResponse);
                      //查看 Facebook Access_Token
                      console.log(response.authResponse.accessToken);
                      //查看你的 Facebook ID
                      console.log(response.authResponse.userID);
                      FB.api('/me', function (response) {
                          //查看 Facebook Graph API 的回傳資料 response
                          console.log(response);
                          console.log('FB_api:' + JSON.stringify(response));
                          console.log('FB_id:' + response.id);
                          //設置使用者 Facebook ID
                          localStorage.setItem('FB_id', response.id);
                          console.log('FB_name:' + response.name);
                          console.log('FB_messages:' + response.username + '@facebook.com');
                          console.log('FB_main_email:' + response.email);
                          console.log('FB_userURL:' + response.link);
                          //                        checkfbstatus();    //判斷登入登出按鈕
                      });
                  } else { // 登入失敗
                      alert('登入失敗。');
                  }
              }, {
                  //scope:"放置使用者所需要的權限"
                  //EX：publish_stream -> 使用者發文權限
                  //關ㄤ說明 請按此
                  scope: "email,xmpp_login,publish_stream,publish_actions,,publish_actions,read_friendlists,user_birthday,friends_birthday,user_status,friends_status,user_about_me,friends_about_me,read_mailbox,read_stream,create_event,user_events"
              });

          };

          SAT.FBinit = function () {
              FB.init({
                  appId: '1486199678276095',
                  cookie: true,  // enable cookies to allow the server to access 
                  // the session
                  xfbml: true,  // parse social plugins on this page
                  version: 'v2.0' // use version 2.0
              });

          };

     SAT.CheckPlayer = function (_code) {
         var path = SATUrl.login + '?code=' + _code;
         $.ajax({
             url: path,
             type: 'POST',
             dataType: "json",
             success: function (result) {
                 if (result.msg == null)
                 { window.location.href = SATUrl.index; }
             }, error: function (xhr, status, error, form) {
                 // parseerror or something else

             }
         });
     };

     $(function () {
         SAT.addLoading()
     });