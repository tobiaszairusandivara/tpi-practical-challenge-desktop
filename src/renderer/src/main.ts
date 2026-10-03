import './style.css';

const versionElement = document.querySelector<HTMLParagraphElement>('#app-version');

if (!versionElement) {
  throw new Error('The application version element is missing.');
}

void window.assessmentApp.getAppVersion().then((version) => {
  versionElement.textContent = `Version ${version}`;
});
