import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useCallback, useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Typography } from "antd";

interface Options {
  title: string;
  value: string;
}

interface Props {
  editable: boolean;
  index: number;
  options: Options[];
}

const OptionComponent = ({ option, index }) => {
  const { title, value } = option;

  return (
    <Draggable index={index} draggableId={value}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="#E5E5E5"
            bgcolor="white"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <DragIndicatorIcon />
              <Typography>{title}</Typography>
            </Stack>
            <IconButton color="error">
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        </div>
      )}
    </Draggable>
  );
};

const AttributeOptions = ({ editable, options }: Props) => {
  const [sourceOptions, setSourceOptions] = useState(options);

  /**
   * reordering the result
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    ({ source, destination }) => {
      if (!destination) return;
      const items = reorder(sourceOptions, source.index, destination.index);
      setSourceOptions(items);
    },
    [sourceOptions]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="options-container">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
            {...provided.droppableProps}
          >
            {sourceOptions.map((option, index) => (
              <OptionComponent key={option.value} option={option} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AttributeOptions;
