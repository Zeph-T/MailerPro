import Contact from "../../../models/contact";
import isAuthenticated from "../../middlewares/isAuthenticated.jwt.js";
import DashboardService from "../../services/dashboard.service";

export class Controller {
  create(req, res) {
    isAuthenticated(req, res, async () => {
      try {
        let query = { isValid: true };
        req.isAdmin ? null : (query.createdBy = req.user);
        let allContacts = await Contact.find(query);
        const startTimestamp = req.body.startTimestamp;
        const endTimestamp = req.body.endTimestamp;
        const dateRange = DashboardService.createDateRange(
          startTimestamp,
          endTimestamp
        );
        let subscribers = [];
        for (var i = 0; i < dateRange.length; i++) {
          subscribers.push(0);
        }
        for (var i = 0; i < allContacts.length; i++) {
          let subscribedOn = allContacts[i].createdOn;
          let unsubscribedOn = allContacts[i].updatedOn;
          let index = DashboardService.getIndex(subscribedOn, dateRange);
          if (index != -1) subscribers[index]++;

          if (allContacts[i].status == "Unsubscribed") {
            index = DashboardService.getIndex(unsubscribedOn, dateRange);
            if (index != -1) subscribers[index]--;
          }
        }

        for (var i = 1; i < subscribers.length; i++) {
          subscribers[i] = subscribers[i - 1] + subscribers[i];
        }

        let response = [];

        for (var i = 0; i < subscribers.length; i++) {
          var obj = {};
          obj.date = new Date(dateRange[i]).toDateString();
          obj.subscribers = subscribers[i];
          response.push(obj);
        }
        res.json({
          data: response,
        });
      } catch (err) {
        console.log(err);
        return res.json({ error: err });
      }
    });
  }
}
export default new Controller();
