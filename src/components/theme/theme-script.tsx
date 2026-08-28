export function ThemeScript() {
  const script = `
(function () {
  try {
    var stored = localStorage.getItem("nova-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    var root = document.documentElement;
    if (theme === "light") root.classList.remove("dark");
    else root.classList.add("dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
