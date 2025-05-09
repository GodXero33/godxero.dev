function getProjectCard (project) {
	return `<div class="card">
		<div class="title">${project.title}</div>
		${project.contents.map(content => `<div class="content">${content}</div>`).join('')}
		<div class="tech">${project.tech.join(' . ')}</div>
		<div class="repo"><a href="${project.repo}" target="_blank"><div class="img"></div></a></div>
	</div>`
}

async function loadProjects () {
	const response = await fetch('res/projects.json');

	if (!response.ok) throw new Error('Failed to fetch projects');

	const projectsData = await response.json();
	const projectsContainer = document.getElementById('project-cards-container');

	projectsData.forEach(project => projectsContainer.innerHTML += getProjectCard(project));
}

loadProjects();
