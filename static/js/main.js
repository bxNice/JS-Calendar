var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* NOTE: Whenever the term "weekday" is used here
         it is meant to include Saturdays and Sundays */

// Media query to watch window size.
var ResizeWatcher = window.matchMedia("(max-width: 768px), (max-height: 426px)");

// Attempt to detect the user's preferred language
// (including region), otherwise default to English.
var DetectedLang = navigator.userLanguage || navigator.languages && navigator.languages.length && navigator.languages[0] || navigator.language || navigator.browserLanguage || navigator.systemLanguage || "en";
var supportedLanguages = [{
    // Arabic (Saudi Arabia)
    title: "Arabic",
    value: "ar-SA",
    text: "عربي (ar-SA)"
}, {
    // Bangla (India/Bangladesh)
    title: "Bangla",
    value: "bn",
    text: "বাংলা (bn)"
}, {
    // Catalan
    title: "Catalan",
    value: "ca-ES",
    text: "Català (ca-ES)"
}, {
    // Czech (Czech Republic)
    title: "Czech",
    value: "cs-CZ",
    text: "Čeština (cs-CZ)"
}, {
    // German (Germany)
    title: "German",
    value: "de-DE",
    text: "Deutsch (de-DE)"
}, {
    // Greek (Greece)
    title: "Greek",
    value: "el-GR",
    text: "Ελληνικά (el-GR)"
}, {
    // English (US/UK)
    title: "English",
    value: "en",
    text: "English (en)"
}, {
    // Spanish (Spain)
    title: "Spanish",
    value: "es-ES",
    text: "Español (es-ES)"
}, {
    // Persian
    title: "Persian",
    value: "fa-IR",
    text: "فارسی (fa-IR)"
}, {
    // Finnish (Finland)
    title: "Finnish",
    value: "fi-FI",
    text: "suomi (fi-FI)"
}, {
    // French (France)
    title: "French",
    value: "fr-FR",
    text: "Français (fr-FR)"
}, {
    // Hebrew (Israel)
    title: "Hebrew",
    value: "he-IL",
    text: "עברית (he-IL)"
}, {
    // Hindi (India)
    title: "Hindi",
    value: "hi-IN",
    text: "हिन्दी (hi-IN)"
}, {
    // Croatian (Croatia)
    title: "Croatian",
    value: "hr-HR",
    text: "Hrvatski (hr-HR)"
}, {
    // Hungarian (Hungary)
    title: "Hungarian",
    value: "hu-HU",
    text: "magyar (hu-HU)"
}, {
    // Indonesian (Indonesia)
    title: "Indonesian",
    value: "id-ID",
    text: "Indonesian (id-ID)"
}, {
    // Italian (Italy)
    title: "Italian",
    value: "it-IT",
    text: "Italiano (it-IT)"
}, {
    // Japanese (Japan)
    title: "Japanese",
    value: "ja-JP",
    text: "日本語 (ja-JP)"
}, {
    // Korean (Korea)
    title: "Korean",
    value: "ko-KR",
    text: "한국어 (ko-KR)"
}, {
    // Malayalam (India)
    title: "Malayalam",
    value: "ml-IN",
    text: "മലയാളം (ml-IN)"
}, {
    // Malay (Malaysia)
    title: "Malay",
    value: "ms-MY",
    text: "Melayu (ms-MY)"
}, {
    // Dutch (Netherlands)
    title: "Dutch",
    value: "nl-NL",
    text: "Nederlands (nl-NL)"
}, {
    // Polish (Poland)
    title: "Polish",
    value: "pl-PL",
    text: "Polski (pl-PL)"
}, {
    // Portuguese (Portugal/Brazil)
    title: "Portuguese",
    value: "pt",
    text: "Português (pt)"
}, {
    // Russian (Russia)
    title: "Russian",
    value: "ru-RU",
    text: "Русский (ru-RU)"
}, {
    // Serbian
    title: "Serbian",
    value: "sr",
    text: "Српски (sr)"
}, {
    // Serbian (Latin)
    title: "Serbian (Latin)",
    value: "sr-Latn",
    text: "Srpski (sr-Latn)"
}, {
    // Swedish (Sweden)
    title: "Swedish",
    value: "sv-SE",
    text: "Svenska (sv)"
}, {
    // Kiswahili (Kenya)
    title: "Kiswahili",
    value: "sw-KE",
    text: "Kiswahili (sw-KE)"
}, {
    // Tamil (India)
    title: "Tamil",
    value: "ta-IN",
    text: "தமிழ் (ta)"
}, {
    // Thai (Thailand)
    title: "Thai",
    value: "th-TH",
    text: "ไทย (th-TH)"
}, {
    // Tagalog
    title: "Tagalog",
    value: "tl",
    text: "Tagalog (tl)"
}, {
    // Turkish (Turkey)
    title: "Turkish",
    value: "tr-TR",
    text: "Türkçe (tr-TR)"
}, {
    // Ukrainian (Ukraine)
    title: "Ukrainian",
    value: "uk-UA",
    text: "Українська (uk-UA)"
}, {
    // Chinese (Simplified)
    title: "Chinese (Simplified)",
    value: "zh-CN",
    text: "中文 (简体) (zh-CN)"
}, {
    // Chinese (Traditional)
    title: "Chinese (Traditional)",
    value: "zh-TW",
    text: "正體中文 (繁體) (zh-TW)"
}];
/**
 * If the DetectedLang isnt in supportedLanguages
 * it is appended to the bottom of the list.
 * 
 * NOTE: Due to region usually being included in DetectedLang,
 * this will sometimes lead to "redundancies," e.g.
 * English and American English both being listed.
 * 
 * NOTE: The methods used to localize month/weekday names
 * are not guaranteed to work with the DetectedLanguage,
 * and those elements will default to English. However, the
 * language listed in the LangSelector should still be
 * localized.
 */
function addDetectedLangOption() {
    if (supportedLanguages.filter(function (e) {
        return e.value === DetectedLang;
    }).length === 0) {
        var languageText = void 0;
        try {
            // Intl.DisplayNames is not supported on all browsers
            var languageNames = new Intl.DisplayNames(DetectedLang, { type: "language" });
            languageText = languageNames.of(DetectedLang) + " (" + DetectedLang + ")";
        } catch (e) {
            console.log("Couldn't get localized name of detected language - browser does not support this feature.");
            languageText = "Default (" + DetectedLang + ")";
        }

        supportedLanguages.push({
            title: DetectedLang,
            value: DetectedLang,
            text: languageText
        });
    }
}
addDetectedLangOption();

/**
 * Called when #sidebar-collapse-btn or #overlay is clicked.
 * Toggles #sidebar and #overlay from default to mobile styles.
 */
function toggleSidebar() {
    $("#sidebar, #overlay").toggleClass("active");
}

/**
 * @param {int} monthNum    the month from 0-11
 * @param {string} lang     the currently selected language
 * @param {boolean} short   abbreviates returned value if true
 * @returns {string}        the localized month name of the Date
 */
function getMonthName(monthNum, lang) {
    var short = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (arguments.length < 2 || typeof lang !== "string" || typeof short != "boolean" || typeof monthNum != "number") {
        throw "Invalid parameters given for getMonthName(int, string, bool)";
    }
    var tempDate = new Date(1, monthNum, 1);
    if (short) {
        return tempDate.toLocaleString(lang, { month: "short" });
    } else {
        return tempDate.toLocaleString(lang, { month: "long" });
    }
}

/**
 * @param {string} lang     the currently selected language
 * @param {boolean} short   abbreviates returned value if true
 * @returns {string}        the localized name of the current day of the week
 */
Date.prototype.getWeekdayName = function getWeekdayName(lang) {
    var short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (arguments.length < 1 || typeof lang !== "string" || typeof short != "boolean") {
        throw "Invalid parameters given for Date.getWeekdayName(string, bool)";
    }
    if (short) {
        return this.toLocaleString(lang, { weekday: "short" });
    } else {
        return this.toLocaleString(lang, { weekday: "long" });
    }
};

/**
 * Compare the year, month, and day of two dates
 * @param {Date} dateToCompare 
 * @returns {boolean}
 */
Date.prototype.compare = function compare(dateToCompare) {
    return this.getFullYear() === dateToCompare.getFullYear() && this.getMonth() === dateToCompare.getMonth() && this.getDate() === dateToCompare.getDate();
};

/**
 * Returns the number of days in a given month
 * @param {int} year 
 * @param {int} month 
 * @returns {int}
 */
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * A top-oriented navbar used in mobile view.
 * Contains a button used to open the Sidebar
 * that also shows the selected year and month.
 */
function MobileNavbar() {
    var dateState = React.useContext(DateContext);
    var langState = React.useContext(LangContext);

    return React.createElement(
        "nav",
        { id: "mobile-navbar" },
        React.createElement(
            "div",
            { className: "container-fluid p-0" },
            React.createElement(
                "button",
                { type: "button", id: "sidebar-collapse-btn", onClick: toggleSidebar },
                React.createElement("i", { className: "fas fa-bars" }),
                "\xA0 ",
                React.createElement(
                    "strong",
                    null,
                    dateState.userDate.getFullYear(),
                    " ",
                    getMonthName(dateState.userDate.getMonth(), langState.userLang)
                )
            )
        )
    );
}

/**
 * A semitransparent overlay that sits between the
 * (active) Sidebar and the Calendar in mobile view.
 * 
 * Can be clicked to close the Sidebar.
 */
function Overlay() {
    return React.createElement("div", { id: "overlay", onClick: toggleSidebar });
}

/**
 * A select input at the bottom of the Sidebar that allows
 * users to switch from the DetectedLang to any of the
 * languages found in supportedLanguages.
 */
function LangSelector() {
    var langState = React.useContext(LangContext);

    getLanguageOptions = function getLanguageOptions() {
        optionList = [];
        supportedLanguages.forEach(function (e) {
            optionList.push(React.createElement(
                "option",
                { title: e.title, value: e.value, key: "lang-k-" + e.value },
                e.text
            ));
        });
        return optionList;
    };

    return React.createElement(
        "div",
        { className: "container-fluid lang-selector" },
        React.createElement("i", { className: "fas fa-language" }),
        React.createElement(
            "select",
            { value: langState.userLang, onChange: function onChange(e) {
                    return langState.setLang(e.target.value);
                } },
            getLanguageOptions()
        )
    );
}

/**
 * The CalMonthSelector is found in the Sidebar
 * and allows the user to change the selected month.
 * 
 * The default CalMonthSelector displays each month
 * in a list of buttons.
 * 
 * The mobile version features a select input flanked
 * by decrement/increment buttons.
 */
function CalMonthSelector() {
    var langState = React.useContext(LangContext);
    var dateState = React.useContext(DateContext);
    var mobileState = React.useContext(MobileContext);
    var selectedMonth = dateState.userDate.getMonth();

    getLocalizedMonthList = function getLocalizedMonthList(selectedLang, isMobile) {
        monthList = [];

        var _loop = function _loop(i) {
            if (isMobile) {
                monthList.push(React.createElement(
                    "option",
                    { value: i, key: "month-k-" + i },
                    getMonthName(i, selectedLang, true)
                ));
            } else {
                monthList.push(React.createElement(
                    "li",
                    { value: i, className: i === selectedMonth ? "active" : null, key: "month-k-" + i },
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                return changeMonth(i);
                            } },
                        getMonthName(i, selectedLang)
                    )
                ));
            }
        };

        for (var i = 0; i < 12; i++) {
            _loop(i);
        }
        return monthList;
    };

    changeMonth = function changeMonth(newMonthNum) {
        var newDate = dateState.userDate;
        newDate.setMonth(newMonthNum);
        dateState.setDate(newDate);
    };

    if (mobileState.userMobile) {
        return React.createElement(
            "div",
            { className: "container-fluid month-selector-mobile" },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col text-center px-0" },
                    React.createElement(
                        "button",
                        { className: "decrement-btn", onClick: function onClick() {
                                return changeMonth(selectedMonth - 1);
                            } },
                        "<"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-6 px-0" },
                    React.createElement(
                        "select",
                        { value: selectedMonth, onChange: function onChange(e) {
                                return changeMonth(e.target.value);
                            } },
                        getLocalizedMonthList(langState.userLang, true)
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col text-center px-0" },
                    React.createElement(
                        "button",
                        { className: "increment-btn", onClick: function onClick() {
                                return changeMonth(selectedMonth + 1);
                            } },
                        ">"
                    )
                )
            )
        );
    }
    return React.createElement(
        "ul",
        { className: "month-selector list-unstyled", defaultValue: selectedMonth, onChange: function onChange(e) {
                return changeMonth(e.target.value);
            } },
        getLocalizedMonthList(langState.userLang, false)
    );
}

/**
 * The CalYearSelector is at the top of the Sidebar
 * and allows the user to change the selected year.
 * 
 * It consists of a number input flanked by
 * decrement/increment buttons.
 */
function CalYearSelector() {
    var dateState = React.useContext(DateContext);
    var selectedYear = dateState.userDate.getFullYear();

    handleKeyPress = function handleKeyPress(event) {
        if (["e", "E", "+", "-"].includes(event.key)) {
            event.preventDefault();
            return;
        } else if ("Enter" == event.key) {
            event.target.blur();
            changeYear(event.target.value);
            return;
        }
    };

    changeYear = function changeYear(newYear) {
        if (newYear > 9999 || newYear < 1000) {
            console.log("Invalid year");
            $(".year-selector input").val(selectedYear);
            return;
        }
        var newDate = dateState.userDate;
        newDate.setFullYear(newYear);
        dateState.setDate(newDate);
    };

    React.useEffect(function () {
        $(".year-selector input").val(selectedYear);
    });

    return React.createElement(
        "div",
        { className: "container-fluid year-selector" },
        React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col text-center px-0" },
                React.createElement(
                    "button",
                    { className: "decrement-btn", onClick: function onClick() {
                            return changeYear(selectedYear - 1);
                        } },
                    "<"
                )
            ),
            React.createElement(
                "div",
                { className: "col-6 px-0" },
                React.createElement("input", { type: "number", onBlur: function onBlur(e) {
                        return changeYear(e.target.value);
                    }, onKeyDown: function onKeyDown(e) {
                        return handleKeyPress(e);
                    } })
            ),
            React.createElement(
                "div",
                { className: "col text-center px-0" },
                React.createElement(
                    "button",
                    { className: "increment-btn", onClick: function onClick() {
                            return changeYear(selectedYear + 1);
                        } },
                    ">"
                )
            )
        )
    );
}

/**
 * The Sidebar contains the LangSelector, CalMonthSelector
 * and CalYearSelector.
 * 
 * By default is fixed to the left side of the screen.
 * 
 * In mobile view it is show/hidden via the button in the
 * MobileNavbar.
 */
function Sidebar() {
    var mobileState = React.useContext(MobileContext);

    return React.createElement(
        "header",
        null,
        React.createElement(
            "nav",
            { id: "sidebar", className: mobileState.userMobile ? "" : "active" },
            React.createElement(
                "ul",
                { className: "date-selector list-unstyled components" },
                React.createElement(
                    "li",
                    null,
                    React.createElement(CalYearSelector, null)
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(CalMonthSelector, null)
                )
            ),
            React.createElement(
                "div",
                { className: "sidebar-footer" },
                React.createElement(LangSelector, null)
            )
        ),
        mobileState.userMobile && React.createElement(Overlay, null)
    );
}

/**
 * A day on the Calendar.
 * 
 * Can be clicked on to change to the respective date.
 */
function CalDay(props) {
    var dateState = React.useContext(DateContext);

    getClassName = function getClassName(isThisMonth, dateOnCal) {
        var className = isThisMonth ? "day this-month" : "day not-this-month";
        className += new Date().compare(dateOnCal) ? " today" : "";
        className += dateOnCal.compare(dateState.userDate) ? " active" : "";
        return className;
    };

    return React.createElement(
        "td",
        { className: getClassName(props.isThisMonth, props.dateOnCal), onClick: function onClick() {
                dateState.setDate(props.dateOnCal);
            } },
        React.createElement(
            "div",
            { className: "date" },
            props.dateOnCal.getDate()
        )
    );
}

/**
 * The header for the Calendar table element.
 * Displays header cells corresponding to each weekday.
 */
function CalHeader() {
    var langState = React.useContext(LangContext);

    getLocalizedWeekdayNames = function getLocalizedWeekdayNames(selectedLang) {
        var weekdayNames = [];
        var tempDate = new Date(5, 0, 1);
        for (var i = 1; i < 8; i++) {
            tempDate.setDate(i);
            weekdayNames.push(React.createElement(
                "th",
                { className: "col weekday", key: "weekday-k-" + i },
                React.createElement(
                    "span",
                    { className: "mobile-text" },
                    tempDate.getWeekdayName(selectedLang, true)
                ),
                React.createElement(
                    "span",
                    { className: "default-text" },
                    tempDate.getWeekdayName(selectedLang)
                )
            ));
        }
        return weekdayNames;
    };

    return React.createElement(
        "thead",
        { id: "cal-header" },
        React.createElement(
            "tr",
            { className: "text-center" },
            getLocalizedWeekdayNames(langState.userLang)
        )
    );
}

/**
 * The body for the Calendar table element.
 * Displays the weeks (rows) and days (cells)
 * of the calendar. 
 */
function CalBody() {
    var dateState = React.useContext(DateContext);

    createCalendar = function createCalendar(year, month) {
        var calendar = [];
        var firstDayOfTheMonth = new Date(year, month, 1).getDay();
        var daysInMonth = getDaysInMonth(year, month);
        var currentDay = 1;
        for (var i = 0; i < 6; i++) {
            var week = [];
            for (var j = 0; j < 7; j++) {
                var calIterator = i * 7 + j;
                var dateToPush = void 0;
                var dayIsThisMonth = false;
                if (i === 0 && j < firstDayOfTheMonth) {
                    dateToPush = new Date(year, month, 1 - (firstDayOfTheMonth - j));
                } else if (currentDay > daysInMonth) {
                    dateToPush = new Date(year, month + 1, calIterator - (daysInMonth + firstDayOfTheMonth) + 1);
                } else {
                    dateToPush = new Date(year, month, currentDay++);
                    dayIsThisMonth = true;
                }
                week.push(React.createElement(CalDay, {
                    key: "day-k-" + calIterator,
                    dateOnCal: dateToPush,
                    isThisMonth: dayIsThisMonth
                }));
            }
            calendar.push(React.createElement(
                "tr",
                { className: "week", key: "week-k-" + i },
                week
            ));
        }
        return calendar;
    };

    return React.createElement(
        "tbody",
        { id: "cal-body" },
        this.createCalendar(dateState.userDate.getFullYear(), dateState.userDate.getMonth())
    );
}

/**
 * A table made up of the CalHeader and CalBody.
 */
function Calendar() {
    var mobileState = React.useContext(MobileContext);

    return React.createElement(
        "main",
        { id: "calendar", className: mobileState.userMobile ? "table-responsive" : "table-responsive active" },
        React.createElement(
            "table",
            { className: "table", cellPadding: "0", cellSpacing: "0" },
            React.createElement(CalHeader, null),
            React.createElement(CalBody, null)
        )
    );
}

/**
 * Used to display each of the three main components
 * and to switch the app to mobile view if needed.
 */
function Layout() {
    var mobileState = React.useContext(MobileContext);

    React.useEffect(function () {
        ResizeWatcher.addEventListener("change", function (e) {
            mobileState.setMobile(e.matches);
        });
    }, []);

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(Sidebar, null),
        React.createElement(Calendar, null),
        mobileState.userMobile && React.createElement(MobileNavbar, null)
    );
}

/**
 * The "root" component that provides the different
 * contexts to the rest of the components in the tree.
 * 
 * It could be combined with Layout but I prefer
 * separating the context providers.
 */
function App() {
    console.log("test2");
    return React.createElement(
        MobileContextProvider,
        null,
        React.createElement(
            DateContextProvider,
            null,
            React.createElement(
                LangContextProvider,
                null,
                React.createElement(Layout, null)
            )
        )
    );
}

var LangContextProvider = function LangContextProvider(props) {
    var setLang = function setLang(newLang) {
        // console.log(`Changing language to ${newLang}`);
        setLangState(Object.assign({}, langState, { userLang: newLang }));
    };
    var initState = {
        userLang: DetectedLang,
        setLang: setLang
    };

    var _React$useState = React.useState(initState),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        langState = _React$useState2[0],
        setLangState = _React$useState2[1];

    return React.createElement(
        LangContext.Provider,
        { value: langState },
        props.children
    );
};

var DateContextProvider = function DateContextProvider(props) {
    var setDate = function setDate(newDate) {
        // console.log(`Changing date to ${newDate}`);
        setDateState(Object.assign({}, dateState, { userDate: newDate }));
    };
    var initState = {
        userDate: new Date(),
        setDate: setDate
    };

    var _React$useState3 = React.useState(initState),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        dateState = _React$useState4[0],
        setDateState = _React$useState4[1];

    return React.createElement(
        DateContext.Provider,
        { value: dateState },
        props.children
    );
};

var MobileContextProvider = function MobileContextProvider(props) {
    var setMobile = function setMobile(isMobile) {
        // console.log(`Changing mobile to ${isMobile}`);
        setMobileState(Object.assign({}, mobileState, { userMobile: isMobile }));
    };
    var initState = {
        userMobile: ResizeWatcher.matches,
        setMobile: setMobile
    };

    var _React$useState5 = React.useState(initState),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        mobileState = _React$useState6[0],
        setMobileState = _React$useState6[1];

    return React.createElement(
        MobileContext.Provider,
        { value: mobileState },
        props.children
    );
};

var LangContext = React.createContext({
    userLang: DetectedLang,
    setLang: function setLang() {}
});
var DateContext = React.createContext({
    userDate: new Date(),
    setDate: function setDate() {}
});
var MobileContext = React.createContext({
    isMobile: ResizeWatcher.matches,
    setMobile: function setMobile() {}
});

console.log("test1");
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));