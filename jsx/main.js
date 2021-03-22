/* NOTE: Whenever the term "weekday" is used here
         it is meant to include Saturdays and Sundays */


// Media query to watch window size.
const ResizeWatcher = window.matchMedia("(max-width: 768px), (max-height: 426px)");

// Attempt to detect the user's preferred language
// (including region), otherwise default to English.
const DetectedLang = navigator.userLanguage
    || (navigator.languages && navigator.languages.length && navigator.languages[0])
    || navigator.language
    || navigator.browserLanguage
    || navigator.systemLanguage
    || "en";
var supportedLanguages = [
    {
        // Arabic (Saudi Arabia)
        title: "Arabic",
        value: "ar-SA",
        text: "عربي (ar-SA)"
    },
    {
        // Bangla (India/Bangladesh)
        title: "Bangla",
        value: "bn",
        text: "বাংলা (bn)"
    },
    {
        // Catalan
        title: "Catalan",
        value: "ca-ES",
        text: "Català (ca-ES)"
    },
    {
        // Czech (Czech Republic)
        title: "Czech",
        value: "cs-CZ",
        text: "Čeština (cs-CZ)"
    },
    {
        // German (Germany)
        title: "German",
        value: "de-DE",
        text: "Deutsch (de-DE)"
    },
    {
        // Greek (Greece)
        title: "Greek",
        value: "el-GR",
        text: "Ελληνικά (el-GR)"
    },
    {
        // English (US/UK)
        title: "English",
        value: "en",
        text: "English (en)"
    },
    {
        // Spanish (Spain)
        title: "Spanish",
        value: "es-ES",
        text: "Español (es-ES)"
    },
    {
        // Persian
        title: "Persian",
        value: "fa-IR",
        text: "فارسی (fa-IR)"
    },
    {
        // Finnish (Finland)
        title: "Finnish",
        value: "fi-FI",
        text: "suomi (fi-FI)"
    },
    {
        // French (France)
        title: "French",
        value: "fr-FR",
        text: "Français (fr-FR)"
    },
    {
        // Hebrew (Israel)
        title: "Hebrew",
        value: "he-IL",
        text: "עברית (he-IL)"
    },
    {
        // Hindi (India)
        title: "Hindi",
        value: "hi-IN",
        text: "हिन्दी (hi-IN)"
    },
    {
        // Croatian (Croatia)
        title: "Croatian",
        value: "hr-HR",
        text: "Hrvatski (hr-HR)"
    },
    {
        // Hungarian (Hungary)
        title: "Hungarian",
        value: "hu-HU",
        text: "magyar (hu-HU)"
    },
    {
        // Indonesian (Indonesia)
        title: "Indonesian",
        value: "id-ID",
        text: "Indonesian (id-ID)"
    },
    {
        // Italian (Italy)
        title: "Italian",
        value: "it-IT",
        text: "Italiano (it-IT)"
    },
    {
        // Japanese (Japan)
        title: "Japanese",
        value: "ja-JP",
        text: "日本語 (ja-JP)"
    },
    {
        // Korean (Korea)
        title: "Korean",
        value: "ko-KR",
        text: "한국어 (ko-KR)"
    },
    {
        // Malayalam (India)
        title: "Malayalam",
        value: "ml-IN",
        text: "മലയാളം (ml-IN)"
    },
    {
        // Malay (Malaysia)
        title: "Malay",
        value: "ms-MY",
        text: "Melayu (ms-MY)"
    },
    {
        // Dutch (Netherlands)
        title: "Dutch",
        value: "nl-NL",
        text: "Nederlands (nl-NL)"
    },
    {
        // Polish (Poland)
        title: "Polish",
        value: "pl-PL",
        text: "Polski (pl-PL)"
    },
    {
        // Portuguese (Portugal/Brazil)
        title: "Portuguese",
        value: "pt",
        text: "Português (pt)"
    },
    {
        // Russian (Russia)
        title: "Russian",
        value: "ru-RU",
        text: "Русский (ru-RU)"
    },
    {
        // Serbian
        title: "Serbian",
        value: "sr",
        text: "Српски (sr)"
    },
    {
        // Serbian (Latin)
        title: "Serbian (Latin)",
        value: "sr-Latn",
        text: "Srpski (sr-Latn)"
    },
    {
        // Swedish (Sweden)
        title: "Swedish",
        value: "sv-SE",
        text: "Svenska (sv)"
    },
    {
        // Kiswahili (Kenya)
        title: "Kiswahili",
        value: "sw-KE",
        text: "Kiswahili (sw-KE)"
    },
    {
        // Tamil (India)
        title: "Tamil",
        value: "ta-IN",
        text: "தமிழ் (ta)"
    },
    {
        // Thai (Thailand)
        title: "Thai",
        value: "th-TH",
        text: "ไทย (th-TH)"
    },
    {
        // Tagalog
        title: "Tagalog",
        value: "tl",
        text: "Tagalog (tl)"
    },
    {
        // Turkish (Turkey)
        title: "Turkish",
        value: "tr-TR",
        text: "Türkçe (tr-TR)"
    },
    {
        // Ukrainian (Ukraine)
        title: "Ukrainian",
        value: "uk-UA",
        text: "Українська (uk-UA)"
    },
    {
        // Chinese (Simplified)
        title: "Chinese (Simplified)",
        value: "zh-CN",
        text: "中文 (简体) (zh-CN)"
    },
    {
        // Chinese (Traditional)
        title: "Chinese (Traditional)",
        value: "zh-TW",
        text: "正體中文 (繁體) (zh-TW)"
    },
];
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
    if (supportedLanguages.filter(e => e.value === DetectedLang).length === 0) {
        let languageText;
        try {
            let languageNames = new Intl.DisplayNames(DetectedLang, { type: "language" });
            languageText = `${languageNames.of(DetectedLang)} (${DetectedLang})`;
        }
        catch (e) {
            console.log("Couldn't get localized name of detected language - browser does not support this feature.");
            languageText = `Default ${DetectedLang}`;
        }

        supportedLanguages.push({
            title: DetectedLang,
            value: DetectedLang,
            text: languageText,
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
 * @param {string} lang     the currently selected language
 * @param {boolean} short   abbreviates returned value if true
 * @returns {string}        the localized month name of the Date
 */
Date.prototype.getMonthName = function getMonthName(lang, short = false) {
    if (arguments.length < 1 || typeof lang !== "string" || typeof short != "boolean") {
        throw "Invalid parameters given for Date.getMonthName(string, bool)";
    }
    if (short) {
        return this.toLocaleString(lang, { month: "short" });
    } else {
        return this.toLocaleString(lang, { month: "long" });
    }
}

/**
 * @param {string} lang     the currently selected language
 * @param {boolean} short   abbreviates returned value if true
 * @returns {string}        the localized name of the current day of the week
 */
Date.prototype.getWeekdayName = function getWeekdayName(lang, short = false) {
    if (arguments.length < 1 || typeof lang !== "string" || typeof short != "boolean") {
        throw "Invalid parameters given for Date.getMonthName(string, bool)";
    }
    if (short) {
        return this.toLocaleString(lang, { weekday: "short" });
    } else {
        return this.toLocaleString(lang, { weekday: "long" });
    }
}

/**
 * Compare the year, month, and day of two dates
 * @param {Date} dateToCompare 
 * @returns {boolean}
 */
Date.prototype.compare = function compare(dateToCompare) {
    return (
        this.getFullYear() === dateToCompare.getFullYear() &&
        this.getMonth() === dateToCompare.getMonth() &&
        this.getDate() === dateToCompare.getDate()
    );
}


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
    const dateState = React.useContext(DateContext);
    const langState = React.useContext(LangContext);

    return (
        <nav id="mobile-navbar">
            <div className="container-fluid p-0">
                <button type="button" id="sidebar-collapse-btn" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>&nbsp; <strong>{dateState.userDate.getFullYear()} {dateState.userDate.getMonthName(langState.userLang)}</strong>
                </button>
            </div>
        </nav>
    );
}

/**
 * A semitransparent overlay that sits between the
 * (active) Sidebar and the Calendar in mobile view.
 * 
 * Can be clicked to close the Sidebar.
 */
function Overlay() {
    return (
        <div id="overlay" onClick={toggleSidebar}></div>
    );
}

/**
 * A select input at the bottom of the Sidebar that allows
 * users to switch from the DetectedLang to any of the
 * languages found in supportedLanguages.
 */
function LangSelector() {
    const langState = React.useContext(LangContext);

    getLanguageOptions = () => {
        optionList = [];
        supportedLanguages.forEach((e) => {
            optionList.push(<option title={e.title} value={e.value} key={`lang-k-${e.value}`}>{e.text}</option>);
        });
        return optionList;
    }

    return (
        <div className="container-fluid lang-selector">
            <i className="fas fa-language" />
            <select value={langState.userLang} onChange={e => langState.setLang(e.target.value)}>
                {getLanguageOptions()}
            </select>
        </div>
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
    const langState = React.useContext(LangContext);
    const dateState = React.useContext(DateContext);
    const mobileState = React.useContext(MobileContext);
    const selectedMonth = dateState.userDate.getMonth();

    getLocalizedMonthList = (selectedLang, isMobile) => {
        monthList = [];
        let tempDate = new Date(0, 0, 1);
        for (let i = 0; i < 12; i++) {
            tempDate.setMonth(i);
            if (isMobile) {
                monthList.push(
                    <option value={i} key={`month-k-${i}`}>
                        {tempDate.getMonthName(selectedLang, true)}
                    </option>
                );
            } else {
                monthList.push(
                    <li value={i} className={i === selectedMonth ? "active" : null} key={`month-k-${i}`}>
                        <button onClick={() => changeMonth(i)}>{tempDate.getMonthName(selectedLang)}</button>
                    </li>
                );
            }
        }
        return monthList;
    }

    changeMonth = (newMonthNum) => {
        let newDate = dateState.userDate;
        newDate.setMonth(newMonthNum);
        dateState.setDate(newDate);
    }

    if (mobileState.userMobile) {
        return (
            <div className="container-fluid month-selector-mobile">
                <div className="row">
                    <div className="col text-center px-0 fs-4">
                        <button className="decrement-btn" onClick={() => changeMonth(selectedMonth - 1)}>{"<"}</button>
                    </div>
                    <div className="col-6 px-0 fs-4">
                        <select value={selectedMonth} onChange={e => changeMonth(e.target.value)}>
                            {getLocalizedMonthList(langState.userLang, true)}
                        </select >
                    </div>
                    <div className="col text-center px-0 fs-4">
                        <button className="increment-btn" onClick={() => changeMonth(selectedMonth + 1)}>{">"}</button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <ul className="month-selector list-unstyled" defaultValue={selectedMonth} onChange={e => changeMonth(e.target.value)}>
            {getLocalizedMonthList(langState.userLang, false)}
        </ul>
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
    const dateState = React.useContext(DateContext);
    const selectedYear = dateState.userDate.getFullYear();

    handleKeyPress = (event) => {
        if (["e", "E", "+", "-"].includes(event.key)) {
            event.preventDefault();
            return;
        } else if ("Enter" == event.key) {
            event.target.blur();
            changeYear(event.target.value);
            return;
        }
    }

    changeYear = (newYear) => {
        if (newYear > 9999 || newYear < 1000) {
            console.log("Invalid year");
            $(".year-selector input").val(selectedYear)
            return;
        }
        let newDate = dateState.userDate;
        newDate.setFullYear(newYear);
        dateState.setDate(newDate);
    }

    React.useEffect(() => {
        $(".year-selector input").val(selectedYear);
    });

    return (
        <div className="container-fluid year-selector">
            <div className="row">
                <div className="col text-center px-0 fs-4">
                    <button className="decrement-btn" onClick={() => changeYear(selectedYear - 1)}>{"<"}</button>
                </div>
                <div className="col-6 px-0 fs-4">
                    <input type="number" onBlur={e => changeYear(e.target.value)} onKeyDown={e => handleKeyPress(e)} />
                </div>
                <div className="col text-center px-0 fs-4">
                    <button className="increment-btn" onClick={() => changeYear(selectedYear + 1)}>{">"}</button>
                </div>
            </div>
        </div>
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
    const mobileState = React.useContext(MobileContext);

    return (
        <header>
            <nav id="sidebar" className={mobileState.userMobile ? "active" : "active"}>
                <ul className="date-selector list-unstyled components">
                    <li>
                        <CalYearSelector />
                    </li>
                    <li>
                        <CalMonthSelector />
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <LangSelector />
                </div>
            </nav>
            {mobileState.userMobile && <Overlay />}
        </header>

    );
}

/**
 * A day on the Calendar.
 * 
 * Can be clicked on to change to the respective date.
 */
function CalDay(props) {
    const dateState = React.useContext(DateContext);

    getClassName = (isThisMonth, dateOnCal) => {
        let className = isThisMonth ? "day this-month" : "day not-this-month";
        className += new Date().compare(dateOnCal) ? " today" : "";
        className += dateOnCal.compare(dateState.userDate) ? " active" : "";
        return className;
    }

    return (
        <td className={getClassName(props.isThisMonth, props.dateOnCal)} onClick={() => { dateState.setDate(props.dateOnCal) }}>
            <div className="date">{props.dateOnCal.getDate()}</div>
        </td>
    );
}

/**
 * The header for the Calendar table element.
 * Displays header cells corresponding to each weekday.
 */
function CalHeader() {
    const langState = React.useContext(LangContext);

    getLocalizedWeekdayNames = (selectedLang) => {
        let weekdayNames = [];
        let tempDate = new Date(5, 0, 1);
        for (let i = 1; i < 8; i++) {
            tempDate.setDate(i);
            weekdayNames.push(
                <th className="col weekday" key={`weekday-k-${i}`}>
                    <span className="mobile-text">{tempDate.getWeekdayName(selectedLang, true)}</span>
                    <span className="default-text">{tempDate.getWeekdayName(selectedLang)}</span>
                </th>
            );
        }
        return weekdayNames;
    }

    return (
        <thead id="cal-header">
            <tr className="text-center">
                {getLocalizedWeekdayNames(langState.userLang)}
            </tr>
        </thead>
    );
}

/**
 * The body for the Calendar table element.
 * Displays the weeks (rows) and days (cells)
 * of the calendar. 
 */
function CalBody() {
    const dateState = React.useContext(DateContext);

    createCalendar = (year, month) => {
        let calendar = [];
        let firstDayOfTheMonth = new Date(year, month, 1).getDay();
        let daysInMonth = getDaysInMonth(year, month);
        let currentDay = 1;
        for (let i = 0; i < 6; i++) {
            let week = [];
            for (let j = 0; j < 7; j++) {
                let calIterator = (i * 7) + j;
                let dateToPush;
                let dayIsThisMonth = false;
                if (i === 0 && j < firstDayOfTheMonth) {
                    dateToPush = new Date(year, month, 1 - (firstDayOfTheMonth - j));
                } else if (currentDay > daysInMonth) {
                    dateToPush = new Date(year, month + 1, calIterator - (daysInMonth + firstDayOfTheMonth) + 1);
                } else {
                    dateToPush = new Date(year, month, currentDay++);
                    dayIsThisMonth = true;
                }
                week.push(
                    <CalDay
                        key={`day-k-${calIterator}`}
                        dateOnCal={dateToPush}
                        isThisMonth={dayIsThisMonth}
                    />
                );
            }
            calendar.push(<tr className="week" key={`week-k-${i}`}>{week}</tr>);
        }
        return calendar;
    }

    return (
        <tbody id="cal-body">
            {this.createCalendar(dateState.userDate.getFullYear(), dateState.userDate.getMonth())}
        </tbody>
    );
}

/**
 * A table made up of the CalHeader and CalBody.
 */
function Calendar() {
    const mobileState = React.useContext(MobileContext);

    return (
        <main id="calendar" className={mobileState.userMobile ? "table-responsive" : "table-responsive active"}>
            <table className="table" cellPadding="0" cellSpacing="0">
                <CalHeader />
                <CalBody />
            </table>
        </main>
    );
}

/**
 * Used to display each of the three main components
 * and to switch the app to mobile view if needed.
 */
function Layout() {
    const mobileState = React.useContext(MobileContext);

    React.useEffect(() => {
        ResizeWatcher.addEventListener("change", e => {
            mobileState.setMobile(e.matches);
        });
    }, []);

    return (
        <React.Fragment>
            <Sidebar />
            <Calendar />
            {mobileState.userMobile && <MobileNavbar />}
        </React.Fragment>
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
    return (
        <MobileContextProvider>
            <DateContextProvider>
                <LangContextProvider>
                    <Layout />
                </LangContextProvider>
            </DateContextProvider>
        </MobileContextProvider>
    );
}


const LangContextProvider = (props) => {
    const setLang = (newLang) => {
        // console.log(`Changing language to ${newLang}`);
        setLangState({ ...langState, userLang: newLang });
    }
    const initState = {
        userLang: DetectedLang,
        setLang: setLang
    }
    const [langState, setLangState] = React.useState(initState);

    return (
        <LangContext.Provider value={langState}>
            {props.children}
        </LangContext.Provider>
    );
}

const DateContextProvider = (props) => {
    const setDate = (newDate) => {
        // console.log(`Changing date to ${newDate}`);
        setDateState({ ...dateState, userDate: newDate });
    }
    const initState = {
        userDate: new Date(),
        setDate: setDate
    }
    const [dateState, setDateState] = React.useState(initState);

    return (
        <DateContext.Provider value={dateState}>
            {props.children}
        </DateContext.Provider>
    );
}

const MobileContextProvider = (props) => {
    const setMobile = (isMobile) => {
        // console.log(`Changing mobile to ${isMobile}`);
        setMobileState({ ...mobileState, userMobile: isMobile });
    }
    const initState = {
        userMobile: ResizeWatcher.matches,
        setMobile: setMobile
    }
    const [mobileState, setMobileState] = React.useState(initState);

    return (
        <MobileContext.Provider value={mobileState}>
            {props.children}
        </MobileContext.Provider>
    );
}

const LangContext = React.createContext({
    userLang: DetectedLang,
    setLang: () => { }
});
const DateContext = React.createContext({
    userDate: new Date(),
    setDate: () => { }
});
const MobileContext = React.createContext({
    isMobile: ResizeWatcher.matches,
    setMobile: () => { }
});

console.log("test1");
ReactDOM.render(
    <App />,
    document.getElementById("root")
);