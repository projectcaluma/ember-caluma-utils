import { helper } from "@ember/component/helper";

export function atob(str) {
  return window.atob(str).split(":")[1];
}

export default helper(function([str]) {
  return atob(str);
});
