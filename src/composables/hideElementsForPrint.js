import { ref } from "vue";

const hideElementsForPrint = () => {
  const printing = ref(false);
  const hideElementsBeforePrint = () => {
    printing.value = true;
  };

  const showElementsAfterPrint = () => {
    printing.value = false;
  };

  window.onbeforeprint = hideElementsBeforePrint;
  window.onafterprint = showElementsAfterPrint;

  return { printing };
};

export default hideElementsForPrint;
