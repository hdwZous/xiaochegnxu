const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
export const debug = function() {
    if (!log) return;
    log.debug.apply(log, arguments)
};
export const info = function() {
    if (!log) return;
    log.info.apply(log, arguments)
};
export const warn = function() {
    if (!log) return;
    log.warn.apply(log, arguments)
};
export const error = function() {
    if (!log) return;
    log.error.apply(log, arguments)
};

export const 
addFilterMsg = function (msg) {
    if (!log || !log.addFilterMsg) return
    if (typeof msg !== 'string') return
    log.addFilterMsg(msg)
};
