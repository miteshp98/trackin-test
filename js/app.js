class DashboardManager {
  _dashboardHeader = document.querySelector(".dashboard-header");
  _body = document.querySelector("body");

  constructor() {
    this.handleNotificationCTA();
    this.handleNavLinks();
    this.fetchProjectData();
    this.handleAsideNavbar();
  }

  handleNotificationCTA() {
    const notificationContainer = document.querySelector(
      ".notification-dropdown"
    );

    this._body.addEventListener("click", function (e) {
      const notificationBtn = e.target.closest(".popup-notification-btn");

      if (!notificationBtn) {
        notificationContainer.classList.remove("open-notification");
        return;
      }

      notificationContainer.classList.toggle("open-notification");
    });
  }

  handleNavLinks() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("mouseover", function (e) {
        let img = link.children[0];
        const imgSource = img.src;

        img.src = imgSource.replaceAll("off", "on");
      });
    });

    navLinks.forEach((link) => {
      link.addEventListener("mouseout", function (e) {
        let img = link.children[0];
        const imgSource = img.src;

        if (link.classList.contains("active-link")) return;

        img.src = imgSource.replace("on", "off");
      });
    });
  }

  handleAsideNavbar() {
    const overlay = document.querySelector(".bg-overlay");
    const aside = document.querySelector(".aside-header");

    this._body.addEventListener("click", function (e) {
      const toggler = e.target.closest(".toggle-aside-btn");

      if (!toggler) {
        aside.classList.remove("toggle-aside");

        setTimeout(() => {
          overlay.classList.add("hidden");
        }, 400);

        return;
      }

      aside.classList.add("toggle-aside");
      overlay.classList.remove("hidden");
    });
  }

  async fetchProjectData() {
    const url = "../data/projectData.json";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Data Not Found: ${response.status}`);
      }

      const data = await response.json();

      this._renderTableBodyMarkup(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  _renderTableBodyMarkup(data) {
    const projectTableBody = document.querySelector(".project-table--body");

    const markup = data
      .map((item) => {
        const { projectName, customerName, sentDate, amount, status } = item;
        return `

            <tr>
                <td>${projectName}</td>
                <td>${customerName}</td>
                <td>${sentDate}</td>
                <td>$ ${amount}</td>
                <td>
                    <span class="project-status project--${status}">${status}</span>
                </td>

              </tr>`;
      })
      .join("");

    projectTableBody.innerHTML = markup;
  }
}

const dashboard = new DashboardManager();
