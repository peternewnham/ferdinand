module.exports = ({ loop, setCount }) => {

  const sectionHeaderSelector = '[role=heading][aria-level="2"]';

  loop(() => {
    let count = 0;
    document.querySelectorAll(sectionHeaderSelector).forEach((node) => {
      const countEl = node.nextSibling;
      const sectionCount = Number(countEl && countEl.textContent);
      count = count + sectionCount;
    });
    setCount(count);
  });
};
