setTimeout(() => {
  const elem = document.querySelector('.landing-title.version-title');
  if (elem && elem.innerText.toLowerCase().includes('google chrome')) {
    window.location.reload();
  }
}, 1000);

window.addEventListener('beforeunload', async () => {
  try {
    const registrations = await window.navigator.serviceWorker.getRegistrations();
    registrations.forEach((r) => {
      r.unregister();
      console.log('ServiceWorker unregistered');
    });
  } catch (err) {
    console.err(err);
  }
});

module.exports = ({ loop, setCount }) => {
  loop(() => {
    const elements = document.querySelectorAll('[aria-label*=unread]');
    console.log(elements);
    let count = 0;
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      const container = el.parentNode.parentNode;
      console.log(container);
      if (container.querySelector('[data-icon=muted]') === null) {
        count += 1;
      }
    }
    setCount(count);
  });
};
