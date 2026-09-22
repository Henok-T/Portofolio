/*
 * Pricing plan detail dialogs.
 * Opens on "Full details" button click; closes on Escape (native), backdrop click,
 * close button, or the "Contact us" link. Returns focus to the opener.
 */
(() => {
  const buttons = document.querySelectorAll('[data-plan-open]');
  if (!buttons.length) return;

  let lastOpener = null;

  function openDialog(dialog, opener) {
    lastOpener = opener;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }

  function closeDialog(dialog) {
    dialog.close();
  }

  buttons.forEach((btn) => {
    const dialog = document.getElementById(btn.dataset.planOpen);
    if (!dialog) return;

    btn.addEventListener('click', () => openDialog(dialog, btn));

    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      if (lastOpener) {
        lastOpener.focus();
        lastOpener = null;
      }
    });

    // Backdrop click: the click target is the <dialog> element itself
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });

    dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => closeDialog(dialog));

    // Close the dialog before following the contact link so the form is visible
    dialog.querySelectorAll('a[href="#contact"]').forEach((link) => {
      link.addEventListener('click', () => closeDialog(dialog));
    });
  });
})();
