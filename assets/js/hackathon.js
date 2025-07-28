/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";
// Alert Start
  /**
   * Show Hackathon Alert Modal on page load
   */
  function showHackathonAlert() {
    // Check if the modal element exists
    const hackathonModal = document.getElementById('hackathonAlert');
    if (hackathonModal) {
      // Check if the alert was already shown in this session
      if (!sessionStorage.getItem('hackathonAlertShown')) {
        const modal = new bootstrap.Modal(hackathonModal);
        modal.show();
        
        // Mark as shown for this session
        sessionStorage.setItem('hackathonAlertShown', 'true');
      }
    }
  }

  // Show alert after page loads
  window.addEventListener('load', () => {
    // Show modal after 1.5 seconds delay
    setTimeout(showHackathonAlert, 1500);
  });
  // Alert Over
})();