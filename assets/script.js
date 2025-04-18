async function loadDashboard() {
  const [projects, tickets, resources] = await Promise.all([
    fetch('data/projects.json').then(res => res.json()),
    fetch('data/tickets.json').then(res => res.json()),
    fetch('data/resources.json').then(res => res.json())
  ]);

  renderProjects(projects);
  renderTicketsChart(tickets);
  renderResources(resources);
}

function renderProjects(projects) {
  const projectDiv = document.getElementById('project-summary');
  projects.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p>Status: <strong>${p.status}</strong></p>
          <p>Deadline: ${p.deadline}</p>
        </div>
      </div>
    `;
    projectDiv.appendChild(col);
  });
}

function renderTicketsChart(tickets) {
  const ctx = document.getElementById('ticketChart').getContext('2d');
  const statusCounts = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: '# of Tickets',
        data: Object.values(statusCounts),
        backgroundColor: ['#f94144', '#f8961e', '#90be6d'],
      }]
    }
  });
}

function renderResources(resources) {
  const resTable = document.getElementById('resource-table');
  resources.forEach(r => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${r.name}</td><td>${r.role}</td><td>${r.availability}</td>`;
    resTable.appendChild(row);
  });
}

window.onload = loadDashboard;

