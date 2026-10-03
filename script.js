/**
 * PROJECT: Transforming Wireframes into Static Web Pages
 * FILE: script.js
 * DESCRIPTION: Handles interactive behaviors including:
 *   1. Wireframe / Inspector / Final Static Webpage mode switching
 *   2. Responsive mobile navigation menu toggle
 *   3. UI Component category filtering
 *   4. Interactive button state counter demo
 *   5. Client-side form validation and feedback display
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const modeButtons = document.querySelectorAll('.mode-btn');
  const modeStatusText = document.getElementById('modeStatusText');
  const quickToggleBtn = document.getElementById('quickToggleBtn');

  // Mode labels for toolbar status indicator
  const modeDescriptions = {
    wireframe: 'Viewing: <strong>Low-Fidelity Wireframe Blueprint</strong>',
    inspect: 'Viewing: <strong>Semantic HTML &amp; CSS Grid Inspector</strong>',
    final: 'Viewing: <strong>Final Styled Static Webpage</strong>',
  };

  /**
   * Updates the active visual mode on the document body
   * @param {'wireframe' | 'inspect' | 'final'} selectedMode
   */
  function setPageMode(selectedMode) {
    body.classList.remove('wireframe-mode', 'inspect-mode', 'final-mode');
    body.classList.add(`${selectedMode}-mode`);

    // Update toolbar button states
    modeButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-mode') === selectedMode;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    // Update status label
    if (modeStatusText && modeDescriptions[selectedMode]) {
      modeStatusText.innerHTML = modeDescriptions[selectedMode];
    }

    // Update hero quick toggle button label
    if (quickToggleBtn) {
      if (selectedMode === 'wireframe') {
        quickToggleBtn.textContent = 'Switch to Final Styled Webpage';
      } else {
        quickToggleBtn.textContent = 'Switch to Wireframe View';
      }
    }
  }

  // Attach click listeners to top mode switcher buttons
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetMode = button.getAttribute('data-mode');
      setPageMode(targetMode);
    });
  });

  // Hero quick-toggle button switches between Wireframe and Final mode
  if (quickToggleBtn) {
    quickToggleBtn.addEventListener('click', () => {
      const isWireframe = body.classList.contains('wireframe-mode');
      setPageMode(isWireframe ? 'final' : 'wireframe');
    });
  }

  /* ========================================================================
     Mobile Navigation Drawer Toggle
     ======================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const siteNav = document.getElementById('siteNav');

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when a nav link is clicked
    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     UI Components Category Filter
     ======================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const componentCards = document.querySelectorAll('.comp-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active state on filter tabs
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide cards based on selected category
      componentCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ========================================================================
     Interactive Micro-Demo Counter Button
     ======================================================================== */
  const microDemoBtn = document.getElementById('microDemoBtn');
  let clickCount = 0;

  if (microDemoBtn) {
    microDemoBtn.addEventListener('click', () => {
      clickCount += 1;
      microDemoBtn.textContent = `Click to Test Interaction (${clickCount})`;
    });
  }

  /* ========================================================================
     Inspection Note / Feedback Form Validation
     ======================================================================== */
  const feedbackForm = document.getElementById('feedbackForm');
  const formFeedback = document.getElementById('formFeedback');

  if (feedbackForm && formFeedback) {
    feedbackForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('reviewerName');
      const aspectSelect = document.getElementById('reviewAspect');
      const messageInput = document.getElementById('reviewMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const aspect = aspectSelect ? aspectSelect.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      formFeedback.className = 'form-feedback';

      if (!name || !message) {
        formFeedback.classList.add('error');
        formFeedback.textContent =
          'Please fill in both your name and observation notes before submitting.';
        return;
      }

      formFeedback.classList.add('success');
      formFeedback.textContent = `Thank you, ${name}! Your note on "${aspect}" has been recorded.`;
      feedbackForm.reset();
    });
  }

  /* ========================================================================
     Dynamic Footer Year
     ======================================================================== */
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }
});
