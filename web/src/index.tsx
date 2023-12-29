/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import {
  AccountEdit,
  AccountNew,
  Accounts,
  Dashboard,
  Expenses,
  Investiments,
  Settings,
  Transactions,
} from "@/pages";
import "@/styles/index.css";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/accounts/new" component={AccountNew} />
      <Route path="/accounts/:id/edit" component={AccountEdit} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/investiments" component={Investiments} />
      <Route path="/settings" component={Settings} />
      <Route path="/transactions" component={Transactions} />
    </Router>
  ),
  root!
);
