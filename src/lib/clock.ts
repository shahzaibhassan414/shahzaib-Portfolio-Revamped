// The lock screen shows the visitor's own date and time, iPhone style: "Monday, October 5"
// above "9:41" (12-hour, no AM/PM). The page is static, so an inline script in
// HeroLockscreen fills it in before the first paint, and LockscreenClock keeps it current.
// Kept outside the client component so the server component gets real strings.

export const CLOCK_DATE_ID = "lockscreen-date";
export const CLOCK_TIME_ID = "lockscreen-time";

/** Shared with the inline script, so the first paint and later updates match exactly. */
export const formatClockSource = `function(d){var h=d.getHours()%12||12,m=d.getMinutes();return[d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),h+":"+(m<10?"0":"")+m]}`;

/** Runs as the HTML parses: sets the clock before the first paint. */
export const clockInlineScript = `(function(){var f=${formatClockSource},v=f(new Date()),a=document.getElementById("${CLOCK_DATE_ID}"),b=document.getElementById("${CLOCK_TIME_ID}");if(a&&b){a.textContent=v[0];b.textContent=v[1]}})()`;
