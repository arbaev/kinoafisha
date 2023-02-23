import notify from "./notify";

export function netError(err) {
  if (err.response) {
    notify.n(`${err.response.status} ${err.response.statusText}`);
  } else if (err.request) {
    notify.n("Ответ сервера не получен (нет подключения к интернет?) ");
  } else {
    console.log(err);
  }
}
