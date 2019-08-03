import randomColor from "randomcolor";
import uuidv4 from "uuid/v4";

export interface Tag {
  id: string;
  name: string;
  color: string | string[];
}

export const NAME_ERROR_MESSAGE = "Name can't be empty";

const generateColor = (color: string | undefined): string | string[] =>
  color || randomColor({ luminosity: "light" });

const formatName = (name: string) => name.trim().toLowerCase();

const TagModel = function(name: string, color?: string): Tag {
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
