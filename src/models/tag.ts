import randomColor from "randomcolor";
import uuidv4 from "uuid/v4";
import { Tag } from "store/tags/types";

export const NAME_ERROR_MESSAGE = "Name can't be empty";

const generateColor = (color: string | undefined): string | string[] =>
  color || randomColor({ luminosity: "light" });

const formatName = (name: string) => name.trim().toLowerCase();

type TagOptional = {
  color?: string;
  notes?: string[];
};

const TagModel = function(name: string, values: TagOptional = {}): Tag {
  if (!name) {
    throw NAME_ERROR_MESSAGE;
  }

  return {
    id: uuidv4(),
    name: formatName(name),
    color: generateColor(values.color),
    notes: values.notes ? values.notes : []
  };
};

export default TagModel;
