import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { AttributeValue } from "@/services/pim.service";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";
import { AttributeFormContext } from "@/entities/product/ui/attribute-form";

interface Props {
  editable: boolean;
  options: AttributeValue[];
  onChange: (options: AttributeValue[]) => void;
  onDelete: (code: string) => void;
}
interface OptionComponentProps {
  editable: boolean;
  index: number;
  option: AttributeValue;
  onDelete: (code: string) => void;
}

const OptionComponent = ({ option, index, editable, onDelete }: OptionComponentProps) => {
  const { isMutating } = React.useContext(AttributeFormContext);
  const { title, code } = option;

  return (
    <Draggable index={index} draggableId={code}>
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
              {editable && <DragIndicatorIcon />}
              <Typography>{title}</Typography>
            </Stack>
            <IconButton disabled={isMutating} color="error" onClick={() => onDelete(option.code)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        </div>
      )}
    </Draggable>
  );
};

const AttributeOptions = ({ editable, options: sourceOptions, onChange, onDelete }: Props) => {
  const reorder = (list: AttributeValue[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    ({ source, destination }) => {
      if (!destination) return;
      const items: AttributeValue[] = reorder(sourceOptions, source.index, destination.index);
      onChange(items);
    },
    [sourceOptions, onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="options-container">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {sourceOptions.map((option, index) => (
              <OptionComponent
                key={option.code}
                option={option}
                index={index}
                editable={editable}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AttributeOptions;
