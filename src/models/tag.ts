import randomColor from "randomcolor";
import uuidv4 from "uuid/v4";

export const NAME_ERROR_MESSAGE = "Name can't be empty";

const generateColor = (color: string | undefined) =>
  color || randomColor({ luminosity: "light" });
const formatName = (name: string) => name.trim().toLowerCase();

const TagModel = function(name: string, color?: string) {
  if (!name) {
    throw NAME_ERROR_MESSAGE;
  }

  return {
    id: uuidv4(),
    name: formatName(name),
    color: generateColor(color)
  };
};

export default TagModel;
