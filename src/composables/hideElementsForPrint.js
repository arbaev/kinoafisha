import { useKinoAfishaStore } from "@/stores/kinoAfishaStore.js";

// Переключает флаг isPrinting, когда вызывается вывод на печать (нажатие CTRL-P etc)
export function hideElementsForPrint() {
  const kinoAfishaStore = useKinoAfishaStore();

  const { setIsPrinting } = kinoAfishaStore;

  const hideElementsBeforePrint = () => {
    setIsPrinting(true);
  };

  const showElementsAfterPrint = () => {
    setIsPrinting(false);
  };

  window.onbeforeprint = hideElementsBeforePrint;
  window.onafterprint = showElementsAfterPrint;

  return {};
}

export default hideElementsForPrint;
