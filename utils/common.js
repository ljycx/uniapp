export function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
	// console.log("now",now)
	// console.log("time",time)
	// console.log("diff",diff)

    // 时间差单位换算
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day; // 粗略计算一个月

    if (diff < minute) {
        return "刚刚";
    } else if (diff < hour) {
        const minutes = Math.floor(diff / minute);
        return `${minutes}分钟前`;
    } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        return `${hours}小时前`;
    } else if (diff < month) {
        const days = Math.floor(diff / day);
        return `${days}天前`;
    } else if (diff < 4 * month) {
        const months = Math.floor(diff / month);
        return `${months}月前`;
    } else {
        return "null";
    }
}


