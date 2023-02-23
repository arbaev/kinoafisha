import { Notify } from "quasar";

function p(message) {
  Notify.create({
    type: "positive",
    message: message,
  });
}

function n(message) {
  Notify.create({
    type: "negative",
    message: message,
  });
}

function i(message) {
  Notify.create({
    type: "info",
    message: message,
  });
}

export default {
  p,
  n,
  i,
};
