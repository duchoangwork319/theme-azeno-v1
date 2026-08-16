/**
 * Retrieves the script configuration from script properties.
 * @returns {Object} - The script configuration object.
 */
export function getScriptConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const cfg = scriptProperties.getProperty('SCRIPT_CFG');
  return JSON.parse(cfg);
}
