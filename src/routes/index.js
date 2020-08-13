import React from "react";
import { Route, Link, IndexRoute } from "react-router";
import CoreLayout from "../containers/layouts/CoreLayout";
import StationsPage from "../containers/pages/StationsPage";

const routes = {
  index: ""
};

export default function createRoutesWithStore() {
  return (
    <Route component={CoreLayout}>
      <IndexRoute component={StationsPage} />
      <Route path={"/"} component={StationsPage} />
      <Route path={"/StationsPage"} component={StationsPage} />
    </Route>
  );
}
