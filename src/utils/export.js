import { withoutKeys } from "./";

export function exportCsv(expensesData) {
  return new Promise((resolve) => {
    const lineArray = [];
    expensesData = expensesData.map(e => ({...e, value: e.value * -1}));
    expensesData.forEach((expense, index) => {
        const line = Object.values(withoutKeys(expense, ["guid"])).join(",");
        lineArray.push(index === 0 ? "data:text/csv;charset=utf-8," + line : line);
    });
    const csvContent = lineArray.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);

    link.click();
    setTimeout(() => {
      resolve(csvContent);
    }, 1000);
  });
}
