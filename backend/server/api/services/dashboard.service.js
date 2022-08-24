class DashboardService {
  createDateRange(startTimestamp, endTimestamp) {
    let dateRange = [];
    let start = new Date(parseInt(startTimestamp));
    let ptr = start;
    let end = new Date(parseInt(endTimestamp));
    while (ptr <= end) {
      var date = ptr;
      dateRange.push(date.getTime());
      ptr.setDate(ptr.getDate() + 1);
    }
    return dateRange;
  }

  getIndex(timestamp, dateRange) {
    for (var i = 0; i < dateRange.length; i++) {
      if (dateRange[i] >= timestamp) {
        return i;
      }
    }
    return -1;
  }
}

export default new DashboardService();
