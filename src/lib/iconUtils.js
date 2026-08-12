export const getIconClass = (iconStr) => {
  if (!iconStr) return "fa-solid fa-code";
  
  // If user already provided full class like "fa-brands fa-react"
  if (iconStr.includes(" ")) return iconStr;

  // Ensure it starts with fa-
  let finalIcon = iconStr;
  if (!finalIcon.startsWith("fa-")) {
    finalIcon = `fa-${finalIcon}`;
  }

  // List of common brand keywords in FontAwesome
  const brands = [
    "react", "node", "laravel", "aws", "github", "html5", "css3", "js", 
    "vue", "angular", "python", "docker", "figma", "sass", "bootstrap", 
    "npm", "yarn", "git", "linux", "apple", "android", "windows", "wordpress", 
    "stripe", "paypal", "slack", "discord", "linkedin", "twitter", "facebook", "php"
  ];
  
  // Check if the icon string contains any of the brand keywords
  const isBrand = brands.some(brand => finalIcon.toLowerCase().includes(brand));
  
  return `${isBrand ? "fa-brands" : "fa-solid"} ${finalIcon}`;
};
