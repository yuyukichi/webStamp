const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

//付随要素変数定義
var stamps = Cookies.get();
var oneStamp = true;
var music = new Audio('./madia/SE2.mp3');
var days = Object.keys(stamps)

// 初期表示
window.onload = function() {
    showProcess(today, calendar);
    document.getElementById("num").innerHTML = "×" + days.length
    if ("13" in stamps) {

    } else {
        Cookies.set("13", "stamp", { expires: 30 });
        Cookies.set("14", "stamp", { expires: 30 });
        Cookies.set("15", "stamp", { expires: 30 });
        document.getElementById("num").innerHTML = "×" + 3
    };
}

// 前の月表示
function prev() {
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if (year == today.getFullYear() &&
                    month == (today.getMonth()) &&
                    count == today.getDate()) {
                    if (days.includes(count.toString())) {
                        calendar += "<td class='todayStamp'>" + count + "</td>";
                    } else { calendar += "<td class='today' onclick='stampClick()'>" + count + "</td>"; }

                } else if (days.includes(count.toString())) {
                    calendar += "<td class='stamp'>" + count + "</td>";
                } else if ([13, 14, 15].includes(count)) {
                    calendar += "<td class='stamp'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}


//以下付随要素



function stampClick() {
    const today = new Date().getDate()

    //既に押されている？チェック
    if (today in stamps) {
        console.log("既に設定されています！！")
    } else {
        if (oneStamp) {
            Cookies.set(today, "stamp", { expires: 30 });
            music.play();
            console.log("設定しました！")
            var elem = document.getElementById("PageStyleSheet");

            elem.href = "Style2.css";
            const number = days.length + 1;
            document.getElementById("num").innerHTML = "×" + number
            oneStamp = false;
        } else {
            console.log("既に設定されています！！")
        }
    }
}


//Cookie調べて該当する日は背景画像変更
//現在のスタンプの値をCookie配列の個数に変更