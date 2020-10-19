import "../scss/index.scss";
import { Router } from "@core/routes/Router.js";
import { DashboardPage } from "../pages/DashboardPage";
import { ExcelPage } from "../pages/ExcelPage.js";

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage
});
