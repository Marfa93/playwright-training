import fs from "fs";

/**
 * Compare the target date with the current date.
 * @param targetDate
 * @param currentDate
 * @returns Return true if the target is strictly lesser than the current one. False otherwise
 */
export const isTargetDateBeforeCurrent = (
  targetDate: string,
  currentDate: string = new Date().toDateString(),
): boolean => {
  const dateLeft = new Date(targetDate);
  const dateRight = new Date(currentDate);

  return dateLeft < dateRight;
};

/**
 * Read and parse a JSON file
 * @param jsonPath The path to the JSON file
 * @returns The JSON object
 */
export const readJSONFile = <T>(jsonPath: string): T =>
  <T>JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
